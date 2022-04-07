import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const LayoutRoot = styled('div')(() => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100vw',
  paddingTop: 64,
}));
type Props = {
  children: any;
};
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <LayoutRoot>
      {children[0]}
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          flexGrow: 1,
          py: 4,
        }}
      >
        {children[1]}
      </Box>
    </LayoutRoot>
  );
};

export default Layout;
