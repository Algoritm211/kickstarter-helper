import ganache from 'ganache';
import Web3 from 'web3';
import {Contract} from "web3-eth-contract";
import CampaignFactory from '../ethereum/build/CampaignFactory.json'
import Campaign from '../ethereum/build/Campaign.json'
import {AbiItem} from "ethereum-abi-types-generator";

const web3 = new Web3(ganache.provider() as any);

describe('Testing CampaignFactory and Campaign', () => {
  let accounts: string[];
  let campaign: Contract;
  let campaignFactory: Contract;
  let campaignAddress: string;

  beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    campaignFactory = await new web3.eth.Contract(CampaignFactory.abi as AbiItem[])
      .deploy({data: CampaignFactory.evm.bytecode.object})
      .send({from: accounts[0], gas: 5_000_000 });

    await campaignFactory.methods.deployNewCampaign(100).send({
      from: accounts[0],
      gas: 5_000_000
    })

    const campaignsAddresses = await campaignFactory.methods.getDeployedCampaigns().call();
    campaignAddress = campaignsAddresses.at(-1);

    campaign = await new web3.eth.Contract(
      Campaign.abi as AbiItem[],
      campaignAddress
    );
  })

  it('should true', function () {
    expect(true).toBe(true);
  });
})
