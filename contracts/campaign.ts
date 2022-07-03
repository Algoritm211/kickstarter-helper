import { AbiItem } from 'ethereum-abi-types-generator';
import CampaignInfo from '../ethereum/build/Campaign.json';
import web3 from './web3';

export const Campaign = (address: string) => {
  return new web3.eth.Contract(CampaignInfo.abi as AbiItem[], address);
};
