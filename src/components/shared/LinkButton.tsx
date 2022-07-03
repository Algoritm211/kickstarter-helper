import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import Link from 'next/link';

interface Props extends ButtonProps {
  children: React.ReactNode;
  href: string;
}

export const LinkButton: React.FC<Props> = (props) => {
  const { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <Button component={'a' as 'button' | 'a'} {...rest}>
        {children}
      </Button>
    </Link>
  );
};
