import React from 'react';
import Layout from "../../../../src/components/UI/Layout";
import {AddRequestForm} from "../../../../src/components/forms/AddRequestForm/AddRequestForm";
import {Grid, Typography} from "@mui/material";

const CreateNewRequest: React.FC = () => {
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
            Add new Request
          </Typography>
        </Grid>
        <Grid item p={1} width={{xs: '100%', sm: '60%', lg: '40%'}}>
          <AddRequestForm />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CreateNewRequest;
