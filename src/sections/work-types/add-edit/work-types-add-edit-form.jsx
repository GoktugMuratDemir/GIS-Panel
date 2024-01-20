/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/named */
/* eslint-disable react/prop-types */
import { Stack, Skeleton } from '@mui/material';
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
// import AddLocation from './locations-google-map/add-location';

export default function WorkTypesAddEditForm() {
  // const theme = useTheme();

  const { id } = useParams();

  const navigate = useNavigate();

  const [resByIdData, setResByIdData] = useState(null);

  async function fetchIdData() {
    const { data } = await WebServices.getWorkTypeGetById({ Id: id });
    setResByIdData(data?.data);
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
    Name: Yup.string().required('Zorunlu'),
  });

  const defaultValues = useMemo(
    () => ({
      Name: '',
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
      setValue('Name', resByIdData?.name || '');
    }
  }, [resByIdData, setValue, id]);

  // const values = watch();

  // console.log(values.StartDate.toISOString().slice(0, 10));

  const onSubmit = handleSubmit(async (data) => {
    const isForm = false;

    const sendData = {
      ...data,
    };

    if (id) {
      const response = await WebServices.UpdateWorkType(sendData, isForm);
      // console.log('update category = ', response);

      if (response.success) {
        enqueueSnackbar('İşlem Başarılı');
        await new Promise((resolve) => setTimeout(resolve, 200));
        await navigate(paths.dashboard.workTypes.root);
        reset();
      } else {
        enqueueSnackbar(renderErrorMessages(response.response), {
          variant: 'error',
        });
      }
    } else {
      const response = await WebServices.createWorkType(sendData, isForm);
      // console.log('create category = ', response);
      if (response.success) {
        enqueueSnackbar('İşlem Başarılı');
        await new Promise((resolve) => setTimeout(resolve, 200));
        await navigate(paths.dashboard.workTypes.root);
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
      <RHFTextField name="Name" label="İş Tipi" />
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
            {!id ? 'Yeni İş Tipi Oluştur' : 'Değişiklikleri Kaydet'}
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
