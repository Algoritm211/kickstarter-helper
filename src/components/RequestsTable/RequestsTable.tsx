import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { RequestsResponse } from '../../../ethereum/types/campaignTypes';
import { RequestTableRow } from './TableRow';

interface Props {
  rawRequests: RequestsResponse[];
  totalApproversCount: string;
}

export const RequestsTable: React.FC<Props> = ({ rawRequests, totalApproversCount }) => {
  const requestsBlock = rawRequests.map((request, index) => {
    // eslint-disable-next-line react/no-array-index-key
    return <RequestTableRow key={index} request={request} requestId={index} totalApproversCount={totalApproversCount} />;
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount (ETH)</TableCell>
            <TableCell>Recipient</TableCell>
            <TableCell>Approval Count</TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>{requestsBlock}</TableBody>
      </Table>
    </TableContainer>
  );
};
