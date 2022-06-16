import CampaignFactory from './build/CampaignFactory.json';
import { AbiItem } from "ethereum-abi-types-generator";
import {getLibrary} from "../pages/_app";

const web3 = getLibrary(window.ethereum);

export const campaignFactory = new web3.eth.Contract(
  CampaignFactory as unknown as AbiItem[],
  '0x10FB7B55B5476cff57aACD54dB094e7b35d0ee8b'
)
