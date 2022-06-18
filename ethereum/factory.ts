import CampaignFactory from './build/CampaignFactory.json';
import { AbiItem } from "ethereum-abi-types-generator";
import web3 from './web3';

export const campaignFactory = new web3.eth.Contract(
  CampaignFactory.abi as AbiItem[],
  '0xBC92d8CAF595b2fE6AbEB74C1B124ED26A7735fF'
)
