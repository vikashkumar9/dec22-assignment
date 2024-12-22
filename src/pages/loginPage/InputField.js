import React from 'react';
import TextField from '@mui/material/TextField';

const InputField = ({
  id,
  label,
  type = 'text',
  register,
  error,
  helperText,
  ...props
}) => {
  return (
    <div className='w-full md:w-[385px] m-auto mt-6'>
      <TextField
        {...register}
        id={id}
        label={label}
        type={type}
        variant='standard'
        fullWidth
        error={!!error}
        helperText={helperText}
        sx={{
          '& .MuiInputBase-input': {
            color: '#20B716',
            fontSize: '16px',
          },
          '& .MuiInput-underline:before': {
            borderBottomColor: '#E2E8F0',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#E2E8F0',
          },
          '& .MuiInputLabel-root': { color: 'green' },
          '& .MuiInputLabel-root.Mui-focused': { color: 'green' },
        }}
        {...props}
      />
    </div>
  );
};

export default InputField;
