import React, {useContext} from 'react';
import {Field, Form} from 'react-final-form';
import {Box, Button, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import {composeValidators} from "../../validators/composeValidators";
import {requiredValidator} from "../../validators/requiredValidator";
import {numberValidator} from "../../validators/numberValidator";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {Campaign} from "../../../contracts/campaign";
import {Web3Context} from "../../../context/Web3Context";
import web3 from "../../../contracts/web3";
import {minValue} from "../../validators/minimumValidator";

interface Props {
  campaignAddress: string;
  minimumContribution: string;
}

interface FormProps {
  contribution: string;
}

export const ContributeForm: React.FC<Props> = ({campaignAddress, minimumContribution}) => {
  const {userWallet} = useContext(Web3Context);

  const onSubmit = async (values: FormProps) => {
    const campaign = Campaign(campaignAddress);

    try {
      await campaign.methods.contribute().send({
        from: userWallet,
        value: web3.utils.toWei(values.contribution, 'ether'),
      })
    } catch (error) {
      return {
        contribution: (error as Error).message
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
            onSubmit={handleSubmit}
          >
            <Grid container flexDirection="column" alignItems="center" gap={1} >
              <Typography gutterBottom variant="h5" textAlign="center" component="h3" fontWeight="bold">
                Contribute to this campaign
              </Typography>
              <Grid item>
                <Field
                  name="contribution"
                  validate={composeValidators(
                    requiredValidator,
                    numberValidator,
                    minValue(+web3.utils.fromWei(minimumContribution, 'ether')))}
                  render={({input, meta}) => {
                    const {error, touched, submitError} = meta;
                    return (
                      <TextField
                        {...input}
                        error={!!(touched && (error || submitError))}
                        label="Enter your contribution"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">ETH</InputAdornment>
                        }}
                        helperText={touched && (error || submitError)}
                      />
                    )
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={submitting}
                  startIcon={submitting ? <HourglassBottomIcon /> : <AttachMoneyIcon />}>
                  Contribute
                </Button>
              </Grid>
            </Grid>
          </Box>
        )
      }}
    />
  );
};
