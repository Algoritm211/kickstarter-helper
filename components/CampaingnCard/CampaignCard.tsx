import {Box, Button, Card, CardActions, CardContent, Typography} from '@mui/material';
import Link from 'next/link';
import React from 'react';

interface Props {
  address: string;
}

export const CampaignCard: React.FC<Props> = ({address}) => {
  return (
    <>
      <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Address of campaign
        </Typography>
        <Typography noWrap variant="h5" component="div">
          {address}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/campaigns/${address}`}>
          <Button
            component="a"
            href={`/campaigns/${address}`}
            size="small">View Contract</Button>
        </Link>
      </CardActions>
    </Card>
      <Box mb={2}/>
    </>
  );
};
