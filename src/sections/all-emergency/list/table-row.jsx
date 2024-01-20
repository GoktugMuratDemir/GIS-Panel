/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types';
// @mui

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { EMERGENCY_TYPES } from 'src/_mock/enum/emergency_types';
import { useRenderData } from '../context/context';

// ----------------------------------------------------------------------

export default function CustomTableRow({ row, selected, onDeleteRow }) {
  const { emergencyType, description, createdUser } = row;
  const { resDataAllWorkers } = useRenderData();

  const findEmergencyLabelById = (id) => {
    // Eğer lodash kullanmak istiyorsan alttaki satırı kullanabilirsin
    // const emergency = _.find(EMERGENCY_TYPES, { value: id });

    const emergency = EMERGENCY_TYPES.find((item) => item.value === id);

    return emergency ? emergency.label : 'Bilinmeyen Acil Durum';
  };

  const findWorkerId = (id) => {
    const worker = resDataAllWorkers?.find((item) => item.id === id);
    return worker ? worker.name : 'Bilinmeyen Kişi';
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{findWorkerId(createdUser)}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{findEmergencyLabelById(emergencyType)}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{description}</TableCell>
    </TableRow>
  );
}

CustomTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
