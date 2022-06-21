import React from 'react';
import Layout from '../../components/UI/Layout';
import {Grid, Typography} from "@mui/material";
import AddCampaignForm from "../../components/forms/AddCampaignForm/AddCampaignForm";

const NewCampaign = () => {
  return (
    <Layout>
      <Grid
        item
        container
        gap={2}
        sx={{ minHeight: 'inherit'}}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid>
          <Typography variant="h5" component="div">
            Add new Campaign
          </Typography>
        </Grid>
        <Grid p={1}>
          <AddCampaignForm />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default NewCampaign;
