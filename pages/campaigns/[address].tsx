import React from 'react';
import {useRouter} from "next/router";
import Layout from "../../components/UI/Layout";
import {GetStaticPaths, GetStaticProps} from "next";
import {campaignFactory} from "../../contracts/factory";
import {campaign} from "../../contracts/campaign";
import {GetSummaryResponse} from "../../ethereum/types/campaignTypes";

interface Props {
  contractInfo: GetSummaryResponse
}

const CampaignPage: React.FC<Props> = ({contractInfo}) => {
  const {query} = useRouter()
  const {address} = query;

  return (
    <Layout>
      <pre>
        {JSON.stringify(contractInfo, null, 2)}
      </pre>
    </Layout>
  );
};

export default CampaignPage;


export const getStaticPaths: GetStaticPaths = async () => {

  const allCampaignsAddresses: string[] = await campaignFactory.methods.getDeployedCampaigns().call();

  const paths = allCampaignsAddresses.map((address) => {
    return {
      params: {
        address,
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}


export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
  const address = params?.address as string;
  const campaignInstance = campaign(address);

  const contractInfo = await campaignInstance.methods.getSummary().call();

  return {
    props: {
      contractInfo: JSON.parse(JSON.stringify(contractInfo))
    }
  }
};
