import PropTypes from 'prop-types';
// @mui
import Stack from '@mui/material/Stack';

import TextField from '@mui/material/TextField';

import InputAdornment from '@mui/material/InputAdornment';

// components

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function CustomTableToolbar({ filterName, handleFilterName }) {
  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{
        p: 2.5,
        pr: { xs: 2.5, md: 1 },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
        <TextField
          fullWidth
          value={filterName}
          onChange={handleFilterName}
          placeholder="Ara..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Stack>
  );
}

CustomTableToolbar.propTypes = {
  filterName: PropTypes.string,
  handleFilterName: PropTypes.func,
};
