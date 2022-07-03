import { AbiItem } from 'ethereum-abi-types-generator';
import CampaignFactory from '../ethereum/build/CampaignFactory.json';
import web3 from './web3';

export const campaignFactory = new web3.eth.Contract(CampaignFactory.abi as AbiItem[], '0x17d9D3A516817d8B0c8E75BbaDbc9Cb35e1f2Ac1');
