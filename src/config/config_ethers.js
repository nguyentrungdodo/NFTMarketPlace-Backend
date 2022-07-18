const paymentABI = require('../contracts/deployPayment.json');

const { DeployPayment: paymentAddress } = require('../contracts/contract');

const ethers = require('ethers');
const { NonceManager } = require("@ethersproject/experimental");
const { JsonRpcProvider } = require("@ethersproject/providers");
const { Contract } = require("@ethersproject/contracts");
const { Wallet } = require("@ethersproject/wallet");

// Initial RPC network provider
const provider = new JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/');

const signer = new NonceManager(new Wallet('df6b78edc40a3c420b5accfdd5a88b8e6502a3293ee511e60d1296c21e5361ce', provider));

const paymentContract = new Contract(paymentAddress, paymentABI, signer);

module.exports = { paymentContract, provider, signer };