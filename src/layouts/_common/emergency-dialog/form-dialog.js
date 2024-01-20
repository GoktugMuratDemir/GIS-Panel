/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/named */
/* eslint-disable react/prop-types */
import { Stack } from '@mui/material';
import { useMemo } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

import { useSnackbar } from 'notistack';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

import { WebServices } from 'src/services/requests';

import { renderErrorMessages } from 'src/utils/formatErrorMessages';
import RHFRadioGroup from 'src/components/hook-form/rhf-radio-group';
import { EMERGENCY_TYPES } from 'src/_mock/enum/emergency_types';
import { useAuthContext } from 'src/auth/hooks';
import { useLocationData } from 'src/auth/context/auth-location';

// import AddLocation from './locations-google-map/add-location';

export default function FormDialog({ handleCloseDialog }) {
  // const theme = useTheme();

  // console.log(resDataAll[0]);

  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuthContext();
  const { currentCenter } = useLocationData();

  const FieldsSchema = Yup.object().shape({
    emergencyType: Yup.string().required('Durum Zorunlu'),
  });

  const defaultValues = useMemo(
    () => ({
      emergencyType: null,
      description: '',
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
    // setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  // console.log(values.StartDate.toISOString().slice(0, 10));

  const onSubmit = handleSubmit(async (data) => {
    const isForm = false;

    const sendData = {
      ...data,
      emergencyType: parseInt(values.emergencyType, 10),
      createdUser: user?.AccountId,
      longitude: currentCenter?.lng,
      latitude: currentCenter?.lat,
    };

    const response = await WebServices.createEmergency(sendData, isForm);
    // console.log('create category = ', response);
    if (response.success) {
      enqueueSnackbar('İşlem Başarılı');
      await new Promise((resolve) => setTimeout(resolve, 200));

      handleCloseDialog();
      reset();
    } else {
      enqueueSnackbar(renderErrorMessages(response.response), {
        variant: 'error',
      });
    }
  });

  const formSection = (
    <Stack spacing={2}>
      <RHFRadioGroup
        name="emergencyType"
        label="Acil Durum Seçenekleri"
        spacing={4}
        options={EMERGENCY_TYPES}
      />
      <RHFTextField label="Açıklama" name="description" />
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
          <LoadingButton type="submit" color="error" variant="contained" loading={isSubmitting}>
            Acil Durum Oluştur
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );

  return <Stack>{renderFormProvider}</Stack>;
}
