import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function paper(theme) {
  return {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        outlined: {
          borderColor: alpha(theme.palette.grey[500], 0.16),
        },
        contained : {
          boxShadow: " 0px 12px 24px -4px rgba(0, 0, 0, 0.12), 0px 0px 2px 0px rgba(0, 0, 0, 0.20)",
        }
      },
    },
  };
}
