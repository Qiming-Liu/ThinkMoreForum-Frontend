import React from 'react';
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Grid,
} from '@mui/material';

interface DisplaySettingsProps {
  displayHeadImg: boolean;
  toggleHeadImgDisplay: () => void;
  displayAbstract: boolean;
  toggleAbstractDisplay: () => void;
}

const DisplaySettings = ({
  displayHeadImg,
  toggleHeadImgDisplay,
  displayAbstract,
  toggleAbstractDisplay,
}: DisplaySettingsProps) => {
  return (
    <Grid
      item
      alignItems="center"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
      zeroMinWidth
    >
      <Typography variant="h6" align="center" sx={{ mr: 2 }} noWrap>
        Display setting:
      </Typography>
      <FormGroup row style={{ display: 'flex', flexWrap: 'nowrap' }}>
        <FormControlLabel
          checked={displayHeadImg}
          control={<Switch color="primary" />}
          label="Cover"
          labelPlacement="end"
          onChange={toggleHeadImgDisplay}
        />
        <FormControlLabel
          checked={displayAbstract}
          control={<Switch color="primary" />}
          label="Abstract"
          labelPlacement="end"
          onChange={toggleAbstractDisplay}
        />
      </FormGroup>
    </Grid>
  );
};

export default DisplaySettings;
