# Gattini

A simple smart contract for the Gattini NFT collection, a demo project for Codemotion Workshop Fest 2022.

## Initialization

To run the project you need to have NodeJs 14+ installed.

To install all project dependencies, just open a terminal and type:

```npm install```

To configure the project, create a copy of the file `env.sample` and name it `.env`. Then set the actual value for the variables inside this file.


## Usage

*To run Hardhat CLI and tools, you can use `npx`, the package runner of `npm`. All the following commands must be launched from a terminal in the root directory of the project.*

Remember that if you want to run a permanent test Ethereum node locally, you have to use this command:

```npx hardhat node```


### Compile

To compile the contract just type:

```npx hardhat compile```


### Test

To run the tests, give the following command:

```npx hardhat test```


### Deploy

To deploy the contract on a blockchain use:

```npx hardhat run scripts/deploy_gattini.js```

In the previous command you can specify on which chain you want to deploy your contract by using the option `--network` followed by `localhost` (if you want to deploy on the local test node) or `rinkeby` (if you want to deploy on rinkeby chain).

If the deploy is successful, it will be shown the address of the deployed contract. You can use this address to interact with the contract.

For example, if you have the local node running on another terminal (started with `npx hardhat node`), you can deploy the contract on the local node by typing:

```npx hardhat run scripts/deploy_gattini.js --network localhost```

Once the contract has been deployed to a chain (`localhost` or `rinkeby`), you can interact with it. The project has a sample task you can use to mint a single token. Just run this command:

```npx hardhat mint --contract-address "0x..." -- network [localhost|rinkeby]```

You obviously have to replace the dots with the actual address of your deployed contract and you have to use the same network (`localhost` or `rinkeby` depending on the chain you've deployed the contract to).