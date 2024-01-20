/* eslint-disable import/no-unresolved */
import { useCallback, useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';

import TableBody from '@mui/material/TableBody';

import TableContainer from '@mui/material/TableContainer';

// components

import { useSnackbar } from 'notistack';
import Scrollbar from 'src/components/scrollbar';

import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TablePaginationCustom,
  getComparator,
} from 'src/components/table';
//
import { WebServices } from 'src/services/requests';

import CustomTableRow from './table-row';
import CustomTableToolbar from './table-toolbar';
import { useRenderData } from '../context/context';
import CustomTableHead from './table-head';

const TABLE_HEAD = [
  { id: 'name', label: 'Tarla Adı' },
  // { id: 'ownerName', label: 'Kullanıcı Adı' },
  { id: '', width: 88 },
];

export default function FieldsList() {
  const { enqueueSnackbar } = useSnackbar();
  const {
    page,
    order,
    orderBy,
    onSort,
    rowsPerPage,
    setPage,
    dense,
    selected,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
    onUpdatePageDeleteRow,
  } = useTable();

  const { resDataAll } = useRenderData();

  const [filterName, setFilterName] = useState('');
  const [tableData, setTableData] = useState(null);

  // console.log(tableData);

  useEffect(() => {
    if (resDataAll) {
      setTableData(resDataAll);
    }
  }, [resDataAll]);

  // tüm işlemleri dataFilter a göre yap
  const dataFiltered = applyFilter({
    inputData: tableData || [],
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const handleFilterName = (e) => {
    setPage(0);
    setFilterName(e.target.value);
  };

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const notFound = !dataFiltered.length || !dataFiltered.length;

  const handleDeleteRow = useCallback(
    async (id) => {
      const response = await WebServices.DeleteField({ Id: id });
      if (response.success) {
        enqueueSnackbar('Tarla Silindi');
        const deleteRow = dataFiltered.filter((row) => row.id !== id);
        setTableData(deleteRow);
        onUpdatePageDeleteRow(dataInPage.length);
      } else {
        enqueueSnackbar('İşlem Başarısız', { variant: 'error' });
      }
    },
    [dataFiltered, dataInPage.length, onUpdatePageDeleteRow, enqueueSnackbar]
  );

  return (
    <Card>
      <CustomTableToolbar filterName={filterName} handleFilterName={handleFilterName} />

      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
            <CustomTableHead
              onSort={onSort}
              headLabel={TABLE_HEAD}
              orderBy={orderBy}
              order={order}
            />

            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <CustomTableRow
                    key={row.id}
                    row={row}
                    selected={selected.includes(row.id)}
                    onDeleteRow={() => handleDeleteRow(row.id)} // direkt api içindeki id yi alıyor
                  />
                ))}

              <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(page, rowsPerPage, dataFiltered.length)}
              />

              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        count={dataFiltered.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        dense={dense}
        onChangeDense={onChangeDense}
      />
    </Card>
  );
}

function applyFilter({ inputData, comparator, filterName }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
