const { ethers } = require("hardhat");

const { METADATA_BASE_URI } = process.env;

async function main() {
  const contractFactory = await ethers.getContractFactory("Gattini");
  const contract = await contractFactory.deploy(METADATA_BASE_URI);
  await contract.deployed();

  console.log("Contract deployed to " + contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
