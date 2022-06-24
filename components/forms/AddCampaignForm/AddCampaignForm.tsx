import {Box, Button, Grid, InputAdornment, TextField} from '@mui/material';
import React, {useContext} from 'react';
import {Field, Form } from 'react-final-form';
import {requiredValidator} from "../../validators/requiredValidator";
import AddIcon from "@mui/icons-material/Add";
import {numberValidator} from "../../validators/numberValidator";
import {composeValidators} from "../../validators/composeValidators";
import web3 from "../../../ethereum/web3";
import {campaignFactory} from "../../../ethereum/factory";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import {Web3Context} from "../../../context/Web3Context";

interface FormProps {
  minimumContribution: number;
}

const AddCampaignForm: React.FC = () => {
  const {userWallet} = useContext(Web3Context)

  const onSubmit = async (values: FormProps) => {
    try {
      await campaignFactory.methods.deployNewCampaign(values.minimumContribution)
        .send({
          from: userWallet,
        })

      const deployedCampaigns = await campaignFactory.methods.getDeployedCampaigns().call();
      console.log(deployedCampaigns);
    } catch (error) {
      return {
        minimumContribution: (error as Error).message
      }
    }
  }

  return (
    <Form<FormProps>
      onSubmit={onSubmit}
      render={({handleSubmit, submitting}) => {
        return (
          <Box
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}>
            <Grid container flexDirection="column" alignItems="center" gap={2}>
              <Field
                name="minimumContribution"
                validate={composeValidators(requiredValidator, numberValidator)}
                render={({input, meta}) => {
                  const {error, touched, submitError} = meta;
                  return (
                    <TextField
                      {...input}
                      error={touched && (error || submitError)}
                      label="Minimum Value"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">WEI</InputAdornment>
                      }}
                      // sx={{maxWidth: {sm: '30%'}}}
                      helperText={touched && (error || submitError)}
                    />
                  )
                }}
              />
              <Button
                variant="contained"
                type="submit"
                disabled={submitting}
                startIcon={submitting ? <HourglassBottomIcon /> : <AddIcon />}>
                Add campaign
              </Button>
            </Grid>
          </Box>
        )
      }}
    />
  );
};

export default AddCampaignForm;
