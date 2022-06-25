import Campaign from '../ethereum/build/Campaign.json';
import { AbiItem } from "ethereum-abi-types-generator";
import web3 from './web3';

export const campaign = (address: string) => {
  return new web3.eth.Contract(
    Campaign.abi as AbiItem[],
    address
  )
}

