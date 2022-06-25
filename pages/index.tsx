import React from "react";
import type {GetServerSideProps, NextPage} from 'next'
import {campaignFactory} from "../contracts/factory";
import {Button, Grid, Typography} from "@mui/material";
import {CampaignCard} from "../components/CampaingnCard/CampaignCard";
import AddIcon from '@mui/icons-material/Add'
import Layout from "../components/UI/Layout";
import Link from "next/link";

interface Props {
  campaigns: string[]
}


const Home: NextPage<Props> = ({campaigns}) => {
  const cardItems = campaigns.map((address) => {
    return <CampaignCard key={address} address={address} />
  });

  return (
    <Layout>
      <Grid container spacing={2} flexDirection={{xs: 'column-reverse', md: 'row'}}>
        <Grid item xs={12} md={8}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            fontWeight="bold">
            Open campaigns
          </Typography>
          {cardItems}
        </Grid>
        <Grid item xs={12} md={4} textAlign="center">
          <Link href="/campaigns/new">
            <Button
              component="a"
              href="/campaigns/new"
              variant="contained"
              startIcon={<AddIcon />}>
              Add Campaign
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const campaigns = await campaignFactory.methods.getDeployedCampaigns().call()
  return {
    props: {
      campaigns,
    }
  }
}
