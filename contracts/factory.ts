import CampaignFactory from '../ethereum/build/CampaignFactory.json';
import { AbiItem } from "ethereum-abi-types-generator";
import web3 from './web3';

export const campaignFactory = new web3.eth.Contract(
  CampaignFactory.abi as AbiItem[],
  '0x26Ac6d655237661A5fb33e56418890cD7B66f0Ee'
)
