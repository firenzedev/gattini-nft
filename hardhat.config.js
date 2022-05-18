require('dotenv').config();
require("@nomiclabs/hardhat-waffle");

const { PRIVATE_KEY, RINKEBY_API_URL } = process.env;


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
