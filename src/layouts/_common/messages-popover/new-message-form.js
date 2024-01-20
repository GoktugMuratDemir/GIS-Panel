/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/named */
/* eslint-disable react/prop-types */
import { Stack } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

import { useSnackbar } from 'notistack';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

import { WebServices } from 'src/services/requests';

import { renderErrorMessages } from 'src/utils/formatErrorMessages';
import RHFAutocomplete from 'src/components/hook-form/rhf-autocomplete';

// import AddLocation from './locations-google-map/add-location';

export default function NewMessageForm({ handleCloseDialog }) {
  // const theme = useTheme();

  // console.log(resDataAll[0]);

  const [resDataAllWorkers, setResDataAllWorkers] = useState(null);

  async function fetchAllDataWorkers() {
    const { data } = await WebServices.getAllWorkers();
    setResDataAllWorkers(data?.data);
  }

  useEffect(() => {
    fetchAllDataWorkers();
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const FieldsSchema = Yup.object().shape({
    Worker: Yup.object().required('Kişi Zorunlu'),
    Message: Yup.string().required('Mesaj Zorunlu'),
  });

  const defaultValues = useMemo(
    () => ({
      Worker: null,
      Message: '',
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
    const isForm = true;

    const sendData = {
      ...data,
      receiverId: values.Worker.id,
      content: values.Message,
    };

    const response = await WebServices.createMessage(sendData, isForm);
    // console.log('create category = ', response);
    if (response.success) {
      enqueueSnackbar('İşlem Başarılı');
      await new Promise((resolve) => setTimeout(resolve, 200));
      // await navigate(paths.dashboard.fields.root);
      handleCloseDialog();
      reset();
    } else {
      enqueueSnackbar(renderErrorMessages(response.response), {
        variant: 'error',
      });
    }
  });

  console.log(values.Worker);

  const formSection = (
    <Stack spacing={2}>
      <RHFAutocomplete
        name="Worker"
        // sx={{ minWidth: 400 }}
        label="Mesaj Gönderilecek Kişi Seçiniz"
        options={resDataAllWorkers || []}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.name}
          </li>
        )}
      />
      <RHFTextField name="Message" label="Mesajı Giriniz" multiline rows={4} />
    </Stack>
  );

  const renderFormProvider = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} mt={5}>
        {/* <div>
          <code>{JSON.stringify(values, null, 2)}</code>
        </div> */}

        {formSection}

        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Yeni Mesaj Oluştur
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );

  return <Stack>{renderFormProvider}</Stack>;
}
