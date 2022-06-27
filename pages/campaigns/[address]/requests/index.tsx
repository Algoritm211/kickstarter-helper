import {Box, Grid, Typography} from '@mui/material';
import React from 'react';
import Layout from "../../../../src/components/UI/Layout";
import {useRouter} from "next/router";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import { LinkButton } from '../../../../src/components/shared/LinkButton';


const RequestsPage = () => {
  const {query} = useRouter();
  const address = query.address as string;

  return (
    <Layout>
      <Box display="flex" justifyContent="space-between">
        <Typography gutterBottom variant="h5" fontWeight="bold" component="h3">
          Requests
        </Typography>
        <LinkButton
          href={`/campaigns/${address}/requests/new`}
          variant="contained"
          startIcon={<RequestPageIcon />}>
          New request
        </LinkButton>
      </Box>

      <Grid container spacing={2} flexDirection={{xs: 'column-reverse', md: 'row'}}>
        <Grid item xs={12}>
          Some content
        </Grid>
      </Grid>
    </Layout>
  );
};

export default RequestsPage;
