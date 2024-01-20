/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';

import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

// hooks
// import { Avatar, ListItemText } from '@mui/material';

import { useNavigate } from 'react-router';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function CustomTableRow({ row, selected, onDeleteRow }) {
  const { name, surname, isAdmin } = row;

  const navigate = useNavigate();

  const confirm = useBoolean();

  const popover = usePopover();

  // console.log('row: ', row);

  return (
    <>
      <TableRow hover selected={selected}>
        {/* <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={title} variant="rounded" src={imageUrl} sx={{ mr: 2 }} />
          <ListItemText primary={title} primaryTypographyProps={{ typography: 'body2' }} />
        </TableCell> */}
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{name}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{surname}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{isAdmin ? 'Admin' : 'İşçi'}</TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Sil
        </MenuItem>

        <MenuItem
          onClick={() => {
            navigate(paths.dashboard.workers.edit(row.id));
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Düzenle
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Sil"
        content="Bu işçiyi silmek istediğinden emin misiniz?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Sil
          </Button>
        }
      />
    </>
  );
}

CustomTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
