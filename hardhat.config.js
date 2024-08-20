require("@nomicfoundation/hardhat-toolbox");

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-sepolia/example"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.24",
    // defaultNetwork: "hardhat",
    networks: {
        // sepolia: {
        //     url: SEPOLIA_RPC_URL,
        //     accounts: [PRIVATE_KEY],
        //     chainId: 11155111,
        //     blovckConfirmations: 6,
        // },
        localhost: {
            url: "http://127.0.0.1:8545/",
            // accounts: Thanks hardhat!
            chainId: 31337,
        },
    },
}
