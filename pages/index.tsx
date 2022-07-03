import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { campaignFactory } from '../contracts/factory';
import { CampaignCard } from '../src/components/CampaingnCard/CampaignCard';
import Layout from '../src/components/UI/Layout';
import { LinkButton } from '../src/components/shared/LinkButton';

interface Props {
  campaigns: string[];
}

const Home: NextPage<Props> = ({ campaigns }) => {
  const cardItems = campaigns.map((address) => {
    return <CampaignCard key={address} address={address} />;
  });

  return (
    <Layout>
      <Grid container spacing={2} flexDirection={{ xs: 'column-reverse', md: 'row' }}>
        <Grid item xs={12} md={8}>
          <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
            Open campaigns
          </Typography>
          {cardItems}
        </Grid>
        <Grid item xs={12} md={4} textAlign="center">
          <LinkButton href="/campaigns/new" variant="contained" startIcon={<AddIcon />}>
            Add Campaign
          </LinkButton>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const campaigns = await campaignFactory.methods.getDeployedCampaigns().call();
  return {
    props: {
      campaigns,
    },
  };
};
