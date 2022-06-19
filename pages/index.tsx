import React from "react";
import type {GetServerSideProps, NextPage} from 'next'
import {campaignFactory} from "../ethereum/factory";
import {Button, Container, Grid} from "@mui/material";
import {CampaignCard} from "../components/CampaingnCard/CampaignCard";
import AddIcon from '@mui/icons-material/Add'
import Layout from "../components/Layout";

interface Props {
  campaigns: string[]
}


const Home: NextPage<Props> = ({campaigns}) => {
  const cardItems = campaigns.map((address) => {
    return <CampaignCard key={address} address={address} />
  });

  return (
    <Layout>
      <Container>
        <Grid container spacing={2} flexDirection={{xs: 'column-reverse', md: 'row'}}>
          <Grid item xs={12} md={8}>
            {cardItems}
          </Grid>
          <Grid item xs={12} md={4} container justifyContent="center">
            <div>
              <Button variant="contained" startIcon={<AddIcon />}>
                Add Campaign
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
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
