/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/named */
/* eslint-disable react/prop-types */
import { Stack, Skeleton, Grid, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Controller, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

import { useSnackbar } from 'notistack';

import { useNavigate } from 'react-router';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs from 'dayjs';
import FormProvider, { RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';

import { WebServices } from 'src/services/requests';

import { renderErrorMessages } from 'src/utils/formatErrorMessages';
import { paths } from 'src/routes/paths';
import { fData } from 'src/utils/format-number';
// import AddLocation from './locations-google-map/add-location';

export default function ProfilEditForm({ resDataAll }) {
  // const theme = useTheme();

  const navigate = useNavigate();

  const [isNewImageUploaded, setIsNewImageUploaded] = useState(false);

  const [resByIdData, setResByIdData] = useState(null);

  async function fetchIdData() {
    const { data } = await WebServices.getSliderById();
    setResByIdData(resDataAll || data?.data);
  }

  // console.log(resDataAll[0]);

  useEffect(() => {
    fetchIdData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const FieldsSchema = Yup.object().shape({
    nameSurname: Yup.string().required('Zorunlu'),
    bloodType: Yup.string().required('Zorunlu'),
    bornDate: Yup.string().required('Zorunlu'),
    telNo: Yup.string().required('Zorunlu'),
    emergencyTelNo: Yup.string().required('Zorunlu'),
    userType: Yup.string().required('Zorunlu'),
    profilImg: Yup.mixed()
      .test('fileFormat', 'İzin Verilen Formatlar .PNG, .JPG, .JPEG, .SVG', (value) => {
        if (!isNewImageUploaded) return true; // Sadece isNewImageUploaded true ise testi uygula
        if (!value) return true; // Allow null or undefined
        const allowedFormats = ['.png', '.jpg', '.jpeg', '.svg'];
        const fileExtension = value.name.split('.').pop().toLowerCase();
        return allowedFormats.includes(`.${fileExtension}`);
      })
      .required('Resim Zorunlu'),
  });

  const defaultValues = useMemo(
    () => ({
      nameSurname: '',
      bloodType: '',
      bornDate: new Date(),
      telNo: '',
      emergencyTelNo: '',
      userType: '',
      profilImg: null,
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(FieldsSchema),
    defaultValues,
  });

  const {
    reset,
    // watch,
    control,
    // trigger,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (resByIdData) {
      setValue('id', resByIdData?.id || '');
      setValue('nameSurname', resByIdData?.nameSurname || '');
      setValue('bloodType', resByIdData?.bloodType || '');
      // setValue('bornDate', dayjs(resByIdData?.bornDate || null));
      setValue('telNo', resByIdData?.telNo || '');
      setValue('emergencyTelNo', resByIdData?.emergencyTelNo || '');
      setValue('userType', resByIdData?.userType || '');
      setValue('profilImg', resByIdData?.profilImg || '');
    }
  }, [resByIdData, setValue]);

  // const values = watch();

  // console.log(values.StartDate.toISOString().slice(0, 10));

  const onSubmit = handleSubmit(async (data) => {
    const isForm = true;

    const sendData = {
      ...data,
    };

    const response = await WebServices.updateSlider(sendData, isForm);
    // console.log('update category = ', response);

    if (response.success) {
      enqueueSnackbar('İşlem Başarılı');
      await new Promise((resolve) => setTimeout(resolve, 200));
      await navigate(paths.dashboard.fields.root);
      reset();
    } else {
      enqueueSnackbar(renderErrorMessages(response.response), {
        variant: 'error',
      });
    }
  });

  const handleDropImage = useCallback(
    (acceptedFiles, setIsNewUpload, valueName) => {
      setIsNewUpload(true);
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue(valueName, newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const formSection = (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Stack spacing={2}>
          <RHFTextField name="nameSurname" label="Ad Soyad" />
          <RHFTextField name="userType" label="Kullanıcı Pozisyonu" />
          <RHFTextField name="telNo" label="Telefon No" />
          <RHFTextField name="emergencyTelNo" label="Acil Durum Tel No" />
          <RHFTextField name="bloodType" label="Kan Grubu" />
          <Controller
            name="bornDate"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                {...field}
                label="Doğum Tarihi"
                format="dd/MM/yyyy"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!error,
                    helperText: error?.message,
                  },
                }}
              />
            )}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <RHFUploadAvatar
          name="profilImg"
          maxSize={1048576}
          onDrop={(acceptedFiles) =>
            handleDropImage(acceptedFiles, setIsNewImageUploaded, 'profilImg')
          }
          helperText={
            <Typography
              variant="caption"
              sx={{
                mt: 3,
                mx: 'auto',
                display: 'block',
                textAlign: 'center',
                color: 'text.disabled',
              }}
            >
              Şu Formatlarda Yükleyiniz: *.PNG, *.JPG, *.JPEG, *.SVG
              <br /> En fazla dosya boyutu: {fData(1048576)}
            </Typography>
          }
        />
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
            Değişiklikleri Kaydet
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );

  return <Stack>{resByIdData === null ? <Skeleton height={340} /> : renderFormProvider}</Stack>;
}
