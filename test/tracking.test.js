const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Tracking Contract", function () {
    let Tracking, tracking
    let owner, receiver
    let pickupTime, distance, price

    beforeEach(async function () {
        Tracking = await ethers.getContractFactory("Tracking");
        [owner, receiver] = await ethers.getSigners()
        tracking = await Tracking.deploy()
        await tracking.deployed()

        pickupTime = Math.floor(Date.now() / 1000) // current timestamp
        distance = 500 // arbitrary distance in miles or km
        price = ethers.utils.parseEther("1") // price in ether (1 ETH)
    })

    it("should create a new shipment", async function () {
        await expect(
            tracking.createShipment(receiver.address, pickupTime, distance, price, {
                value: price,
            }),
        )
            .to.emit(tracking, "ShipmentCreated")
            .withArgs(owner.address, receiver.address, pickupTime, distance, price)

        const shipment = await tracking.getShipment(owner.address, 0)

        expect(shipment[0]).to.equal(owner.address) // shipment.sender
        expect(shipment[1]).to.equal(receiver.address) // shipment.receiver
        expect(shipment[2]).to.equal(pickupTime) // shipment.pickupTime
        expect(shipment[3]).to.equal(0) // shipment.deliveryTime
        expect(shipment[4]).to.equal(distance) // shipment.distance
        expect(shipment[5]).to.equal(price) // shipment.price
        expect(shipment[6]).to.equal(0) // shipment.status (PENDING = 0)
        expect(shipment[7]).to.equal(false) // shipment.isPaid
    })


    it("should start a shipment", async function () {
        await tracking.createShipment(receiver.address, pickupTime, distance, price, {
            value: price,
        })

        await expect(tracking.startShipment(owner.address, receiver.address, 0))
            .to.emit(tracking, "ShipmentInTransit")
            .withArgs(owner.address, receiver.address, pickupTime)

        const shipment = await tracking.getShipment(owner.address, 0)
        expect(shipment[6]).to.equal(1) // IN_TRANSIT = 1
    })

    it("should complete a shipment and pay the sender", async function () {
        await tracking.createShipment(receiver.address, pickupTime, distance, price, {
            value: price,
        })

        await tracking.startShipment(owner.address, receiver.address, 0)

        // Call the function and verify emitted events
        await expect(tracking.completeShipment(owner.address, receiver.address, 0))
            .to.emit(tracking, "ShipmentDelivered")
            .withArgs(owner.address, receiver.address, ethers.BigNumber.from("0")) // Verify the event emissions
            .to.emit(tracking, "ShipmentPaid")
            .withArgs(owner.address, receiver.address, price)

        // Fetch updated shipment details
        const shipment = await tracking.getShipment(owner.address, 0)

        // Check updated status and payment
        expect(shipment[6]).to.equal(2) // DELIVERED = 2
        expect(shipment[7]).to.equal(true) // isPaid = true
        expect(shipment[3]).to.be.above(0) // deliveryTime should be set and positive
    })

    it("should return the correct shipment count for a sender", async function () {
        await tracking.createShipment(receiver.address, pickupTime, distance, price, {
            value: price,
        })

        const count = await tracking.getShipmentCount(owner.address)
        expect(count).to.equal(1)
    })

    it("should return all transactions", async function () {
        await tracking.createShipment(receiver.address, pickupTime, distance, price, {
            value: price,
        })

        const transactions = await tracking.getAllTransactions()
        expect(transactions.length).to.equal(1)
        expect(transactions[0].sender).to.equal(owner.address)
    })
})
