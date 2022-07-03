import React, { useContext } from 'react';
import { Field, Form } from 'react-final-form';
import { Box, Button, Grid, InputAdornment, TextField } from '@mui/material';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import { composeValidators } from '../../validators/composeValidators';
import { requiredValidator } from '../../validators/requiredValidator';
import { numberValidator } from '../../validators/numberValidator';
import { ethAddressValidator } from '../../validators/ethAddressValidator';
import { Web3Context } from '../../../context/Web3Context';
import { Campaign } from '../../../../contracts/campaign';
import web3 from '../../../../contracts/web3';

interface FormValues {
  recipient: string;
  amount: string;
  description: string;
}

export const AddRequestForm: React.FC = () => {
  const { userWallet } = useContext(Web3Context);
  const router = useRouter();
  const address = router.query.address as string;

  const onSubmit = async (values: FormValues) => {
    const { description, amount, recipient } = values;
    const campaign = Campaign(address);

    try {
      await campaign.methods.createRequest(description, web3.utils.toWei(amount, 'ether'), recipient).send({
        from: userWallet,
      });
      void router.push(`/campaigns/${address}/requests`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form<FormValues>
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting }) => {
        return (
          <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
            <Grid container flexDirection="column" alignItems="center" gap={2}>
              <Field
                name="amount"
                validate={composeValidators(requiredValidator, numberValidator)}
                render={({ input, meta }) => {
                  const { error, touched, submitError } = meta;
                  return (
                    <TextField
                      {...input}
                      error={!!(touched && (error || submitError))}
                      fullWidth
                      label="Amount"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">ETH</InputAdornment>,
                      }}
                      helperText={touched && (error || submitError)}
                    />
                  );
                }}
              />
              <Field
                name="recipient"
                validate={composeValidators(requiredValidator, ethAddressValidator)}
                render={({ input, meta }) => {
                  const { error, touched, submitError } = meta;
                  return (
                    <TextField
                      {...input}
                      fullWidth
                      error={!!(touched && (error || submitError))}
                      label="Recipient address"
                      helperText={touched && (error || submitError)}
                    />
                  );
                }}
              />
              <Field
                name="description"
                validate={composeValidators(requiredValidator)}
                render={({ input, meta }) => {
                  const { error, touched, submitError } = meta;
                  return (
                    <TextField
                      {...input}
                      multiline
                      rows={2}
                      fullWidth
                      error={!!(touched && (error || submitError))}
                      label="Description of request"
                      helperText={touched && (error || submitError)}
                    />
                  );
                }}
              />
              <Button
                variant="contained"
                type="submit"
                disabled={submitting}
                startIcon={submitting ? <HourglassBottomIcon /> : <AddIcon />}
              >
                Add request
              </Button>
            </Grid>
          </Box>
        );
      }}
    />
  );
};
