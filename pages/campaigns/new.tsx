import React from 'react';
import Layout from '../../src/components/UI/Layout';
import {Grid, Typography} from "@mui/material";
import {AddCampaignForm} from '../../src/components/forms/AddCampaignForm/AddCampaignForm';

const NewCampaign = () => {
  return (
    <Layout>
      <Grid
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
        <Grid item p={1} maxWidth={{sm: '60%', lg: '40%'}}>
          <AddCampaignForm />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default NewCampaign;
