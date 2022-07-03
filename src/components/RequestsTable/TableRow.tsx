import React, { useContext, useState } from 'react';
import { Box, Button, IconButton, TableCell, TableRow } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useRouter } from 'next/router';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SendIcon from '@mui/icons-material/Send';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { Web3Context } from '../../context/Web3Context';
import { Campaign } from '../../../contracts/campaign';
import useCopyToClipboard from '../shared/hooks/useCopyToClipBoard';
import web3 from '../../../contracts/web3';
import { RequestsResponse } from '../../../ethereum/types/campaignTypes';

interface Props {
  request: RequestsResponse;
  requestId: number;
  totalApproversCount: string;
}

export const RequestTableRow: React.FC<Props> = ({ request, requestId, totalApproversCount }) => {
  const [, copy] = useCopyToClipboard();
  const { userWallet } = useContext(Web3Context);
  const [isApproveLoading] = useState(false);
  const [isFinalizeLoading] = useState(false);
  const { description, value, recipient, approvalCount, isCompleted } = request;
  const readyToFinalize = +approvalCount > +totalApproversCount / 2;

  const router = useRouter();
  const campaignAddress = router.query.address as string;

  const onApprove = async () => {
    const campaign = Campaign(campaignAddress);
    try {
      await campaign.methods.approveRequest(requestId.toString()).send({
        from: userWallet,
      });
      void router.replace(`/campaigns/${campaignAddress}/requests`);
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  };

  // eslint-disable-next-line consistent-return
  const onFinalize = async () => {
    if (!readyToFinalize) {
      return alert('Not enough approvals');
    }
    const campaign = Campaign(campaignAddress);
    try {
      await campaign.methods.finalizeRequest(requestId.toString()).send({
        from: userWallet,
      });
      void router.replace(`/campaigns/${campaignAddress}/requests`);
    } catch (error) {
      console.error(error);
      alert('You can not finalize it');
    }
  };

  return (
    <TableRow
      sx={{
        opacity: isCompleted ? 0.5 : 1,
      }}
    >
      <TableCell>{requestId}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>{web3.utils.fromWei(value, 'ether')}</TableCell>
      <TableCell sx={{ maxWidth: '140px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => copy(recipient)} color="primary" component="button">
            <ContentCopyIcon />
          </IconButton>
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{recipient}</div>
        </Box>
      </TableCell>
      <TableCell>
        {approvalCount}/{totalApproversCount}
      </TableCell>
      <TableCell>
        {isCompleted ? null : (
          <Button
            variant="outlined"
            color="info"
            startIcon={isApproveLoading ? <HourglassBottomIcon /> : <CheckCircleIcon />}
            disabled={isApproveLoading}
            onClick={onApprove}
          >
            Approve
          </Button>
        )}
      </TableCell>
      <TableCell>
        {isCompleted ? null : (
          <Button
            variant={readyToFinalize ? 'contained' : 'outlined'}
            color="success"
            startIcon={isFinalizeLoading ? <HourglassBottomIcon /> : <SendIcon />}
            disabled={isFinalizeLoading}
            onClick={onFinalize}
          >
            Finalize
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};
