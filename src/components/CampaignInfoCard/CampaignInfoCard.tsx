import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

interface Props {
  description: string;
  value: string | number;
}

export const CampaignInfoCard: React.FC<Props> = ({ description, value }) => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" fontWeight="bold" component="div">
          {value}
        </Typography>
        <Typography>{description}</Typography>
      </CardContent>
    </Card>
  );
};
