import React from 'react';
import Layout from "../../components/UI/Layout";
import {GetStaticPaths, GetStaticProps} from "next";
import {campaignFactory} from "../../contracts/factory";
import {campaign} from "../../contracts/campaign";
import {GetSummaryResponse} from "../../ethereum/types/campaignTypes";
import {Grid, Typography} from '@mui/material';
import {CampaignInfoCard} from "../../components/CampaignInfoCard/CampaignInfoCard";

interface Props {
  contractInfo: GetSummaryResponse
}

const transformData = (info: GetSummaryResponse) => {
  const {minContribution, contractBalance, requestsCount, contributorsCount} = info;
  return [
    { value: minContribution, description: 'Minimum contribution' },
    { value: contractBalance, description: 'Contract balance' },
    { value: requestsCount, description: 'Requests count' },
    { value: contributorsCount, description: 'Contributors' },
  ]
}

const CampaignPage: React.FC<Props> = ({contractInfo}) => {
  const preparedData = transformData(contractInfo);

  const dataCards = preparedData.map((infoObj) => {
    return (
      <Grid key={infoObj.description} item xs={12} sm={6}>
        <CampaignInfoCard value={infoObj.value} description={infoObj.description} />
      </Grid>
    )
  })

  return (
    <Layout>
      <Grid container flexDirection={{xs: 'column', md: 'row'}}>
        <Grid
          container
          xs={12} md={8}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {dataCards}
        </Grid>
        <Grid container xs={12} md={4}>
          <Typography variant="h5" component="h3">
            Some form
          </Typography>
        </Grid>
      </Grid>
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
