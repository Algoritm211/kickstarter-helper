import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Box, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import Layout from '../../../src/components/UI/Layout';
import { campaignFactory } from '../../../contracts/factory';
import { Campaign } from '../../../contracts/campaign';
import { GetSummaryResponse } from '../../../ethereum/types/campaignTypes';
import { CampaignInfoCard } from '../../../src/components/CampaignInfoCard/CampaignInfoCard';
import web3 from '../../../contracts/web3';
import { ContributeForm } from '../../../src/components/forms/ContributeForm/ContributeForm';
import { LinkButton } from '../../../src/components/shared/LinkButton';

interface Props {
  contractInfo: GetSummaryResponse;
}

const transformData = (info: GetSummaryResponse) => {
  const { minContribution, contractBalance, requestsCount, contributorsCount } = info;
  return [
    { value: minContribution, description: 'Minimum contribution (WEI)' },
    { value: web3.utils.fromWei(contractBalance, 'ether'), description: 'Contract balance (ETH)' },
    { value: requestsCount, description: 'Requests count' },
    { value: contributorsCount, description: 'Contributors' },
  ];
};

const CampaignPage: React.FC<Props> = ({ contractInfo }) => {
  const preparedData = transformData(contractInfo);
  const { query } = useRouter();
  const address = query.address as string;

  const dataCards = preparedData.map((infoObj) => {
    return (
      <Grid key={infoObj.description} item xs={12} sm={6}>
        <CampaignInfoCard value={infoObj.value} description={infoObj.description} />
      </Grid>
    );
  });

  return (
    <Layout>
      <Grid container alignItems="center" flexDirection={{ xs: 'column', md: 'row' }} gap={{ xs: 2, md: 0 }}>
        <Grid item xs={12} md={8}>
          <Typography gutterBottom variant="h5" fontWeight="bold" component="h3">
            Campaign Info
          </Typography>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {dataCards}
          </Grid>
          <Box textAlign="center" pt={2}>
            <LinkButton size="large" href={`/campaigns/${address}/requests`} variant="contained" startIcon={<RequestPageIcon />}>
              View requests
            </LinkButton>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <ContributeForm minimumContribution={contractInfo.minContribution} campaignAddress={address} />
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
      },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const address = params?.address as string;
  const campaignInstance = Campaign(address);

  const contractInfo = await campaignInstance.methods.getSummary().call();

  return {
    props: {
      contractInfo: JSON.parse(JSON.stringify(contractInfo)),
    },
  };
};
