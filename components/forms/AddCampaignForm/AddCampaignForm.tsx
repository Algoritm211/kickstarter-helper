import {Button, Grid, InputAdornment, TextField} from '@mui/material';
import React from 'react';
import {Field, Form } from 'react-final-form';
import {requiredValidator} from "../../validators/requiredValidator";
import AddIcon from "@mui/icons-material/Add";
import {numberValidator} from "../../validators/numberValidator";
import {composeValidators} from "../../validators/composeValidators";
import web3 from "../../../ethereum/web3";
import {campaignFactory} from "../../../ethereum/factory";

interface FormProps {
  minimumContribution: number;
}

const AddCampaignForm: React.FC = () => {

  const onSubmit = async (values: FormProps) => {
    const accounts = await web3.eth.getAccounts();

    await campaignFactory.methods.deployNewCampaign(values.minimumContribution)
      .send({
        from: accounts[0],
      })

    const deployedCampaigns = await campaignFactory.methods.getDeployedCampaigns().call();
    console.log(deployedCampaigns);
  }

  return (
    <Form<FormProps>
      onSubmit={onSubmit}
      render={({handleSubmit, submitting}) => {
        return (
          <form onSubmit={handleSubmit}>
            <Grid container flexDirection="column" alignItems="center" gap={2}>
              <Grid>
                <Field
                  name="minimumContribution"
                  validate={composeValidators(requiredValidator, numberValidator)}
                  render={({input, meta}) => {
                    const {error, pristine, touched} = meta;
                    return (
                      <TextField
                        {...input}
                        error={touched && error}
                        label="Minimum Value"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">WEI</InputAdornment>
                        }}
                        helperText={touched && error}
                      />
                    )
                  }}
                />
              </Grid>
              <Grid>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={submitting}
                  startIcon={<AddIcon />}>
                  Add campaign
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      }}
    />
  );
};

export default AddCampaignForm;
