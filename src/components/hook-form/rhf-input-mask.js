import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';

export default function RHFIpnutMask({ name, mask, helperText, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <InputMask
          mask={mask}
          maskChar={null}
          value={field.value}
          onChange={field.onChange} 
          onBlur={field.onBlur}
        >
          {(inputProps) => (
            <TextField
              {...inputProps}
              fullWidth
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...other}
            />
          )}
        </InputMask>
      )}
    />
  );
}

RHFIpnutMask.propTypes = {
  helperText: PropTypes.string,
  name: PropTypes.string,
  mask: PropTypes.string.isRequired,
};
