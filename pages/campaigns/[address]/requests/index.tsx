import { Box, Typography } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { LinkButton } from '../../../../src/components/shared/LinkButton';
import Layout from '../../../../src/components/UI/Layout';
import { campaignFactory } from '../../../../contracts/factory';
import { RequestsResponse } from '../../../../ethereum/types/campaignTypes';
import { Campaign } from '../../../../contracts/campaign';
import { RequestsTable } from '../../../../src/components/RequestsTable/RequestsTable';

interface Props {
  requests: RequestsResponse[];
  totalApproversCount: string;
}

const RequestsPage: NextPage<Props> = ({ requests, totalApproversCount }) => {
  const { query } = useRouter();
  const address = query.address as string;

  return (
    <Layout>
      <Box display="flex" justifyContent="space-between">
        <Typography gutterBottom variant="h5" fontWeight="bold" component="h3">
          Requests
        </Typography>
        <LinkButton href={`/campaigns/${address}/requests/new`} variant="contained" startIcon={<RequestPageIcon />}>
          New request
        </LinkButton>
      </Box>

      <Box py={1}>
        <RequestsTable rawRequests={requests} totalApproversCount={totalApproversCount} />
      </Box>

      <Typography component="h6" fontWeight="normal" variant="h6">
        Found {requests.length} requests
      </Typography>
    </Layout>
  );
};

export default RequestsPage;

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
  const campaign = Campaign(address);

  const requestsCount = await campaign.methods.getRequestsCount().call();
  const totalApproversCount = await campaign.methods.approversCount().call();

  // We can't make one request to get all data in array,
  // data must be returned one by one element. It's Solidity))
  const requestsToGetData = [];

  for (let i = 0; i < requestsCount; i++) {
    const rawRequest = campaign.methods.requests(i).call();
    requestsToGetData.push(rawRequest);
  }

  const requests = await Promise.all(requestsToGetData);

  return {
    props: {
      requests: requests.map((elem) => JSON.parse(JSON.stringify(elem))),
      totalApproversCount,
    },
  };
};
