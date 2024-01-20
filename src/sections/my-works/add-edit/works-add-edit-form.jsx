/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/named */
/* eslint-disable react/prop-types */
import { Stack, Skeleton, Grid } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

import { useSnackbar } from 'notistack';

import { useNavigate, useParams } from 'react-router';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import { WebServices } from 'src/services/requests';

import { renderErrorMessages } from 'src/utils/formatErrorMessages';
import { paths } from 'src/routes/paths';
import EditLocationComponent from 'src/components/polygon-map/EditLocation';
import { useRenderData } from '../context/context';
// import AddLocation from './locations-google-map/add-location';
// import EditLocation from './locations-google-map/edit-location';

export default function WorksAddEditForm() {
  // const theme = useTheme();

  const { id } = useParams();

  const { resDataAll } = useRenderData();

  const navigate = useNavigate();

  const [resByIdData, setResByIdData] = useState(null);

  async function fetchIdData() {
    const { data } = await WebServices.getSliderById({ Id: id });
    setResByIdData(resDataAll[id - 1] || data?.data);
  }

  // console.log(resDataAll[0]);

  useEffect(() => {
    if (id) {
      fetchIdData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const FieldsSchema = Yup.object().shape({
    worker: Yup.string().required('Zorunlu'),
    fieldName: Yup.string().required('Zorunlu'),
    description: Yup.string().required('Zorunlu'),
    workDay: Yup.string().required('Zorunlu'),
    contactNo: Yup.string().required('Zorunlu'),

    // workerLocation: Yup.string().required('Zorunlu'),
  });

  const defaultValues = useMemo(
    () => ({
      worker: '',
      fieldName: '',
      description: '',
      workDay: '',
      contactNo: '',
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
    // control,
    // trigger,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (id) {
      setValue('id', resByIdData?.id || '');
      setValue('worker', resByIdData?.worker || '');
      setValue('fieldName', resByIdData?.fieldName || '');
      setValue('description', resByIdData?.description || '');
      setValue('workDay', resByIdData?.workDay || '');
      setValue('contactNo', resByIdData?.contactNo || '');

      setValue('workerLocation', resByIdData?.workerLocation || '');
    }
  }, [resByIdData, setValue, id]);

  // const values = watch();

  // console.log(values.StartDate.toISOString().slice(0, 10));

  const onSubmit = handleSubmit(async (data) => {
    const isForm = true;

    const sendData = {
      ...data,
    };

    if (id) {
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
    } else {
      const response = await WebServices.createSlider(sendData, isForm);
      // console.log('create category = ', response);
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
    }
  });

  const formSection = (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Stack spacing={2}>
          <RHFTextField name="worker" label="İşçi" />
          <RHFTextField name="contactNo" label="Tel No" />
        </Stack>
      </Grid>

      <Grid item xs={12} md={6}>
        <Stack spacing={2}>
          <RHFTextField name="fieldName" label="Tarla Adı" />
          <RHFTextField name="description" label="Açıklama" />
          <RHFTextField name="workDay" label="Çalışılacak Gün" />
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <EditLocationComponent />
      </Grid>
      {/* <RHFTextField name="Description" label="Açıklama" /> */}

      {/* {!id ? <AddLocation /> : <EditLocation />} */}
      {/* <EditLocation /> */}
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
            {!id ? 'Yeni Tarla Oluştur' : 'Değişiklikleri Kaydet'}
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
