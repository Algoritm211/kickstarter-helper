import ganache from 'ganache';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'ethereum-abi-types-generator';
import CampaignFactory from '../build/CampaignFactory.json';
import Campaign from '../build/Campaign.json';
import { getValidationError } from '../utils/getValidationContractError';

const web3 = new Web3(ganache.provider() as any);

describe('Testing CampaignFactory and Campaign', () => {
  let accounts: string[];
  let campaign: Contract;
  let campaignFactory: Contract;
  let campaignAddress: string;

  beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    campaignFactory = await new web3.eth.Contract(CampaignFactory.abi as AbiItem[])
      .deploy({ data: CampaignFactory.evm.bytecode.object })
      .send({ from: accounts[0], gas: 5_000_000 });

    await campaignFactory.methods.deployNewCampaign(100).send({
      from: accounts[0],
      gas: 5_000_000,
    });

    const campaignsAddresses = await campaignFactory.methods.getDeployedCampaigns().call();
    campaignAddress = campaignsAddresses.at(-1);

    campaign = await new web3.eth.Contract(Campaign.abi as AbiItem[], campaignAddress);
  });

  it('Factory and Campaign deployed successfully', () => {
    expect(campaignFactory.options.address).toMatch(/^0x/);
    expect(campaign.options.address).toMatch(/^0x/);
  });

  it('Contract creator through Campaign factory is manager of Campaign', async () => {
    const manager = await campaign.methods.manager().call();
    expect(accounts[0]).toBe(manager);
  });

  it('Allows user to contribute and check if user after contributing in "approvers" mapping', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: 200,
    });
    const isUserContributor = await campaign.methods.approvers(accounts[1]).call();
    expect(isUserContributor).toBe(true);
  });

  it('Requires a minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[1],
        value: 90,
      });
    } catch (error: any) {
      await expect(getValidationError(web3, error.message)).resolves.toMatch('You send lower than minimum contribution');
    }
  });

  it('Allows manager to get request', async () => {
    await campaign.methods.createRequest('Buy screen', 100, accounts[2]).send({
      from: accounts[0],
      gas: 1_000_000,
    });

    const request = await campaign.methods.requests(0).call();
    expect(request.description).toBe('Buy screen');
  });

  it('Testing Request full flow', async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('20', 'ether'),
    });

    await campaign.methods.createRequest('Buy screen', web3.utils.toWei('10', 'ether'), accounts[7]).send({
      from: accounts[0],
      gas: 1_000_000,
    });

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: 1_000_000,
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: 1_000_000,
    });

    let balance = await web3.eth.getBalance(accounts[7]);
    balance = web3.utils.fromWei(balance, 'ether');

    console.log(balance);

    expect(+balance).toBeGreaterThan(1009);
  });
});
