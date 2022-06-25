import path from "path";
import {config} from 'dotenv';
config({path: path.resolve(__dirname, '..', '.env.local')})

import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import CampaignFactory from './build/CampaignFactory.json'
import {AbiItem} from "ethereum-abi-types-generator";

const provider = new HDWalletProvider({
  mnemonic: process.env.MNEMONIC_PHRASE!,
  providerOrUrl: process.env.RINKEBY_ENDPOINT!,
})

const web3 = new Web3(provider);

const deployContract = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log(`Attempting to deploy from account: ${accounts[0]}`);

  const result = await new web3.eth.Contract(CampaignFactory.abi as AbiItem[])
    .deploy({data: CampaignFactory.evm.bytecode.object})
    .send({from: accounts[0], gas: 5_000_000});

  console.log(`Contract was deployed to ${result.options.address}`);
  provider.engine.stop();
}

void deployContract()
// Deployed address - 0x26Ac6d655237661A5fb33e56418890cD7B66f0Ee
