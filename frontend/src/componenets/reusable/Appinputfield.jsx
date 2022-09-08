import { Box, TextField } from '@mui/material'
import React from 'react'

export default function Appinputfield({label,helperText,name,onchange,value,id,ref,key,type,error,placeholder}) {
  return (
    <Box>
         <TextField 
         type={type}
         onChange={onchange}
         placeholder={placeholder}
         ref={ref}
         id={id}
         value={value}
         key={key}
         error={error}
           
               sx={{
                fontSize:'50px',
                fontWeight:'bold',
                margin:'7px 0px 7px 3px'
               }}
               size='medium'
              variant='outlined'
              fullWidth
              helperText={helperText}
              label={label}
              name={name}
            />
    </Box>
  )
}
