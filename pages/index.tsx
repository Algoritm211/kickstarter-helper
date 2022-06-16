import type {NextPage} from 'next'
import {campaignFactory} from "../ethereum/factory";
import {useEffect, useState} from "react";
import { useWeb3React } from '@web3-react/core';
import {injected} from "../components/wallet/connectors";


const Home: NextPage = () => {
  const { active, account, library, connector, activate, deactivate } = useWeb3React();

  const [deployedCampaigns, setDeployedCampaigns] = useState([])

  useEffect(() => {
    const getDeployedCampaigns = async () => {
      const {ethereum} = window;
      // const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      await activate(injected)
      // const campaigns = await campaignFactory.methods.getDeployedCampaigns().call();
      // setDeployedCampaigns(campaigns);
    }

    void getDeployedCampaigns();
  }, [])

  return (
    <div>
      Basic config for ETH app
    </div>
  )
}

export default Home
