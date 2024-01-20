/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/named */
/* eslint-disable react/prop-types */
import { Stack, Grid, InputAdornment, IconButton } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

import { useSnackbar } from 'notistack';

import { useNavigate, useParams } from 'react-router';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import { WebServices } from 'src/services/requests';

import { renderErrorMessages } from 'src/utils/formatErrorMessages';
import { paths } from 'src/routes/paths';
import RHFSwitch from 'src/components/hook-form/rhf-switch';
import TableLoading from 'src/components/skeleton-template/table';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';

// import AddLocation from './locations-google-map/add-location';

export default function WorkerAddEditForm() {
  // const theme = useTheme();

  const { id } = useParams();

  const navigate = useNavigate();

  const newPassword = useBoolean();
  const confirmPassword = useBoolean();

  const [resByIdData, setResByIdData] = useState(null);

  async function fetchIdData() {
    const { data } = await WebServices.getWorkerGetById({ Id: id });
    setResByIdData(data?.data);
  }

  // console.log(resDataAll[0]);

  useEffect(() => {
    if (id) {
      fetchIdData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(resByIdData);

  const { enqueueSnackbar } = useSnackbar();

  const FieldsSchema = Yup.object().shape({
    name: Yup.string().required('Zorunlu'),
    surname: Yup.string().required('Zorunlu'),
    mail: Yup.string().required('Zorunlu'),
    phone: Yup.string().required('Zorunlu'),
    birthDate: Yup.string().required('Zorunlu'),
    emergencyContact: Yup.string().required('Zorunlu'),
    emergencyContactPhone: Yup.string().required('Zorunlu'),
    bloodType: Yup.string().required('Zorunlu'),
    // Password: Yup.string().required('Yeni Parola Zorunlu'),
    // .min(8, 'Parola en az 8 karakter olmalı')
    // .max(24, 'Parola en fazla 24 karakter olmalı')
    // .matches(/[a-z]/, 'Parola en az 1 küçük harf içermelidir')
    // .matches(/\d/, 'Parola en az 1 rakam içermelidir'),

    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref('Password'), null], 'Yeni şifre ile eşleşmelidir')
    //   .required('Onay şifresi zorunlu'),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      surname: '',
      mail: '',
      phone: '',
      birthDate: new Date(),
      emergencyContact: '',
      emergencyContactPhone: '',
      bloodType: '',
      isAdmin: false,
      Password: '',
      confirmPassword: '',
    }),
    []
  );

  // console.log(resByIdData);

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
      setValue('id', resByIdData?.id || '');
      setValue('name', resByIdData?.name || '');
      setValue('surname', resByIdData?.surname || '');
      setValue('mail', resByIdData?.mail || '');
      setValue('phone', resByIdData?.phone || '');
      setValue('birthDate', dayjs(resByIdData?.birthDate) || new Date());
      setValue('emergencyContact', resByIdData?.emergencyContact || '');
      setValue('emergencyContactPhone', resByIdData?.emergencyContactPhone || '');
      setValue('bloodType', resByIdData?.bloodType || '');
      setValue('isAdmin', resByIdData?.isAdmin || false);
    }
  }, [resByIdData, setValue, id]);

  const values = watch();

  // console.log(values.StartDate.toISOString().slice(0, 10));

  const onSubmit = handleSubmit(async (data) => {
    const isForm = false;

    delete data.confirmPassword;

    const sendData = {
      ...data,
      birthDate: values.birthDate.toISOString(),
    };

    if (id) {
      const response = await WebServices.UpdateWorker(sendData, isForm);
      // console.log('update category = ', response);

      if (response.success) {
        enqueueSnackbar('İşlem Başarılı');
        await new Promise((resolve) => setTimeout(resolve, 200));
        await navigate(paths.dashboard.workers.root);
        reset();
      } else {
        enqueueSnackbar(renderErrorMessages(response.response), {
          variant: 'error',
        });
      }
    } else {
      const response = await WebServices.createWorker(sendData, isForm);
      // console.log('create category = ', response);
      if (response.success) {
        enqueueSnackbar('İşlem Başarılı');
        await new Promise((resolve) => setTimeout(resolve, 200));
        await navigate(paths.dashboard.workers.root);
        reset();
      } else {
        enqueueSnackbar(renderErrorMessages(response.response), {
          variant: 'error',
        });
      }
    }
  });

  const formSection = (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Stack spacing={2}>
          <RHFTextField name="name" label="Ad" />
          <RHFTextField name="surname" label="Soyad" />
          <RHFTextField name="mail" label="Mail Adres" />
          <RHFTextField name="phone" label="Tel" />
          <RHFSwitch name="isAdmin" label="Admin Kullanıcı Olacak Mı ?" />
        </Stack>
      </Grid>

      <Grid item xs={12} md={6}>
        <Stack spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Doğum Günü"
              value={dayjs(values.birthDate)}
              format="DD/MM/YYYY"
              onChange={(newValue) => {
                setValue('birthDate', newValue);
              }}
            />
          </LocalizationProvider>
          <RHFTextField name="emergencyContact" label="Acil Durumda Aranacak Kişi" />
          <RHFTextField name="emergencyContactPhone" label="Acil Durumda Aranacak Kişi Tel No" />
          <RHFTextField name="bloodType" label="Kan Grubu" />

          <RHFTextField
            name="Password"
            placeholder="Yeni Parolanız"
            type={newPassword.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={newPassword.onToggle} edge="end">
                    <Iconify
                      icon={newPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            name="confirmPassword"
            placeholder="Yeni Parolanız Tekrar"
            type={confirmPassword.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={confirmPassword.onToggle} edge="end">
                    <Iconify
                      icon={confirmPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Grid>
    </Grid>
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
            {!id ? 'Yeni Kişi Oluştur' : 'Değişiklikleri Kaydet'}
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );

  return (
    <Stack>
      {id ? resByIdData === null ? <TableLoading /> : renderFormProvider : renderFormProvider}
    </Stack>
  );
}
