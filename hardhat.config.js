const { task } = require('hardhat/config');

require('dotenv').config();
require("@nomiclabs/hardhat-waffle");

const { PRIVATE_KEY, RINKEBY_API_URL } = process.env;

task("mint", "mint a Gattini NFT")
  .addParam("contractAddress", "address of the contract")
  .setAction(async (args, hre) => {
    const contract = await hre.ethers.getContractAt("Gattini", args.contractAddress);

    const txn = await contract.mint(1, { value: hre.ethers.utils.parseEther("0.01") });
    const receipt = await txn.wait();
    const transferEvent = receipt.events.find(e => e.event == "Transfer");
    const { tokenId } = transferEvent.args;

    console.log(`Gattini NFT with id ${tokenId} purchased in transaction ${receipt.transactionHash} (block ${receipt.blockNumber})`);

    const tokenURI = await contract.tokenURI(tokenId);
    console.log("Token URI for your Gattini NFT is: ", tokenURI);
  });

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    rinkeby: {
      url: RINKEBY_API_URL,
      accounts: [ PRIVATE_KEY ],
    },
  },
  solidity: "0.8.9",
};
