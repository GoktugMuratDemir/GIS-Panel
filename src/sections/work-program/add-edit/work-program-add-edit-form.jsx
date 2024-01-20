/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/named */
/* eslint-disable react/prop-types */
import { Stack, Skeleton, CircularProgress, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

import { useSnackbar } from 'notistack';

import { useNavigate, useParams } from 'react-router';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import FormProvider from 'src/components/hook-form';

import { WebServices } from 'src/services/requests';

import { renderErrorMessages } from 'src/utils/formatErrorMessages';
import { paths } from 'src/routes/paths';
import RHFAutocomplete from 'src/components/hook-form/rhf-autocomplete';
// import AddLocation from './locations-google-map/add-location';

export default function WorkProgramAddEditForm() {
  // const theme = useTheme();

  const { id } = useParams();

  const navigate = useNavigate();

  const [resByIdData, setResByIdData] = useState(null);
  const [getAllWorkers, setGetAllWorkers] = useState(null);
  const [getAllJobTypes, setGetAllJobTypes] = useState(null);
  const [getAllFields, setGetAllFields] = useState(null);

  async function fetchIdData() {
    const { data } = await WebServices.getProgramGetById({ Id: id });
    setResByIdData(data?.data);
  }

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
    if (id) {
      fetchIdData();
    }
    fetchGetAllWorkers();
    fetchGetAllJobTypes();
    fetchGetAllFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const FieldsSchema = Yup.object().shape({
    accountId: Yup.object().required('Zorunlu'),
    jobTypeId: Yup.object().required('Zorunlu'),
    fieldId: Yup.object().required('Zorunlu'),
  });

  const defaultValues = useMemo(
    () => ({
      accountId: null,
      jobTypeId: null,
      fieldId: null,
      date: new Date(),
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(FieldsSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    // control,
    // trigger,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (id) {
      setValue('assignmentId', id || '');
      setValue('accountId', _.find(getAllWorkers, { id: resByIdData?.accountId }) || '');
      setValue('jobTypeId', _.find(getAllJobTypes, { id: resByIdData?.jobTypeId }) || '');
      setValue('fieldId', _.find(getAllFields, { id: resByIdData?.fieldId }) || '');
      setValue('date', dayjs(resByIdData?.date) || new Date());
    }
  }, [resByIdData, setValue, id, getAllWorkers, getAllJobTypes, getAllFields]);

  const values = watch();

  // console.log(values.StartDate.toISOString().slice(0, 10));

  const onSubmit = handleSubmit(async (data) => {
    const isForm = false;

    const sendData = {
      ...data,
      accountId: values.accountId.id,
      jobTypeId: values.jobTypeId.id,
      fieldId: values.fieldId.id,
      date: values.date.toISOString(),
    };

    if (id) {
      const response = await WebServices.UpdateProgram(sendData, isForm);
      // console.log('update category = ', response);

      if (response.success) {
        enqueueSnackbar('İşlem Başarılı');
        await new Promise((resolve) => setTimeout(resolve, 200));
        await navigate(paths.dashboard.workProgram.root);
        reset();
      } else {
        enqueueSnackbar(renderErrorMessages(response.response), {
          variant: 'error',
        });
      }
    } else {
      const response = await WebServices.createProgram(sendData, isForm);
      // console.log('create category = ', response);
      if (response.success) {
        enqueueSnackbar('İşlem Başarılı');
        await new Promise((resolve) => setTimeout(resolve, 200));
        await navigate(paths.dashboard.workProgram.root);
        reset();
      } else {
        enqueueSnackbar(renderErrorMessages(response.response), {
          variant: 'error',
        });
      }
    }
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

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Tarih"
          value={dayjs(values.date)}
          format="DD/MM/YYYY"
          onChange={(newValue) => {
            setValue('date', newValue);
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

        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!id ? 'Yeni İş Programı Oluştur' : 'Değişiklikleri Kaydet'}
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );

  return (
    <Stack>
      {id ? (
        resByIdData === null ? (
          <Skeleton height={340} sx={{ mt: 5 }} />
        ) : (
          renderFormProvider
        )
      ) : (
        renderFormProvider
      )}
    </Stack>
  );
}
