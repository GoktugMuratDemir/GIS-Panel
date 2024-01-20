/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/named */
/* eslint-disable react/prop-types */
import { Stack, CircularProgress, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import FormProvider from 'src/components/hook-form';

import { WebServices } from 'src/services/requests';

import RHFAutocomplete from 'src/components/hook-form/rhf-autocomplete';
import { useRenderData } from '../context/context';
// import AddLocation from './locations-google-map/add-location';

export default function ReportFilterForm() {
  // const theme = useTheme();

  const { fetchAllData } = useRenderData();

  const [getAllWorkers, setGetAllWorkers] = useState(null);
  const [getAllFields, setGetAllFields] = useState(null);
  const [getAllJobTypes, setGetAllJobTypes] = useState(null);

  async function fetchGetAllWorkers() {
    const { data } = await WebServices.getAllWorkers();
    setGetAllWorkers(data?.data);
  }

  async function fetchGetAllJobTypes() {
    const { data } = await WebServices.getAllWorkTypes();
    setGetAllJobTypes(data?.data);
  }

  async function fetchGetAllFields() {
    const { data } = await WebServices.getAllFields();
    setGetAllFields(data?.data);
  }
  // console.log(resDataAll[0]);

  useEffect(() => {
    fetchGetAllWorkers();
    fetchGetAllFields();
    fetchGetAllJobTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const FieldsSchema = Yup.object().shape({
    accountId: Yup.object().required('Zorunlu'),
    jobTypeId: Yup.object().required('Zorunlu'),
    fieldId: Yup.object().required('Zorunlu'),
  });

  const defaultValues = useMemo(
    () => ({
      accountId: null,
      fieldId: null,
      jobTypeId: null,
      workDate: new Date(),
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(FieldsSchema),
    defaultValues,
  });

  const {
    // reset,
    watch,
    // control,
    // trigger,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  //   console.log(values);

  const onSubmit = handleSubmit(async (data) => {
    // const isForm = false;

    const sendData = {
      ...data,
      accountId: values.accountId.id,
      fieldId: values.fieldId.id,
      workDate: values.workDate.toISOString(),
    };

    fetchAllData(sendData);
  });

  const formSection = (
    <Stack spacing={2}>
      <RHFAutocomplete
        name="accountId"
        // sx={{ minWidth: 400 }}
        label="Kişi Seçiniz"
        options={getAllWorkers || []}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.name}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Kişi Seçiniz"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {!getAllWorkers ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      <RHFAutocomplete
        name="fieldId"
        // sx={{ minWidth: 400 }}
        label="Tarla Seçiniz"
        options={getAllFields || []}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.name}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tarla Seçiniz"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {!getAllFields ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      <RHFAutocomplete
        name="jobTypeId"
        // sx={{ minWidth: 400 }}
        label="İş Tipi Seçiniz"
        options={getAllJobTypes || []}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.name}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="İş Tipi Seçiniz"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {!getAllJobTypes ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Tarih"
          value={dayjs(values.workDate)}
          format="DD/MM/YYYY"
          onChange={(newValue) => {
            setValue('workDate', newValue);
          }}
        />
      </LocalizationProvider>
    </Stack>
  );

  const renderFormProvider = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        {/* <div>
          <code>{JSON.stringify(values, null, 2)}</code>
        </div> */}

        {formSection}

        <Stack alignItems="flex-end" sx={{ my: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Filtrele
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );

  return <Stack>{renderFormProvider}</Stack>;
}
