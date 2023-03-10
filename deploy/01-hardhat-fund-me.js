const { networkConfig } = require("../helper-hardhat-config");
//const helperConfig = require("../helper-hardhat-config");
//const networkConfig =helperConfig.networkConfig();
const network = require("hardhat");
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  //if chainId is x use y
  //if chainId is a use b

  /*for chainId, we we use the command
  yarn hardhat deploy --network goerli, //it selects the id of goerli from helper-hardhat-config and assign it to the variable 
  chainId */

  //well what happens to a chain that doesn't have a priceFeed address?
  let ethUsdPriceFeedAddress;

  if (chainId == 31337) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }

  const fundMe = deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeedAddress],
    log: true,
  });
  log("--------------------------------------------------------------");
};

module.exports.tags = ["all", "fundme"];
