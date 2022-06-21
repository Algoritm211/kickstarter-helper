import {Button, Grid, TextField} from '@mui/material';
import React from 'react';
import {Field, Form } from 'react-final-form';
import {requiredValidator} from "../../validators/requiredValidator";
import AddIcon from "@mui/icons-material/Add";
import {numberValidator} from "../../validators/numberValidator";
import {composeValidators} from "../../validators/composeValidators";

interface FormProps {
  minimumContribution: number;
}

const AddCampaignForm: React.FC = () => {
  const onSubmit = (values: FormProps) => {
    console.log('FormValues', values)
  }

  return (
    <Form<FormProps>
      onSubmit={onSubmit}
      render={({handleSubmit}) => {
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
                        helperText={touched && error}
                      />
                    )
                  }}
                />
              </Grid>
              <Grid>
                <Button variant="contained" type="submit" startIcon={<AddIcon />}>
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
