import React, { useState } from 'react';

import { Input } from '../UI/Input';

export const SearchForm = ({ onSubmit }) =>  {
  const [value, setValue] = useState(''); 
  
  let submitHandler = e => {
    e.preventDefault();
    onSubmit(value);
  };

  let changeHandler = e => {
    const val = e.currentTarget.value;
    setValue(val);
  }

  return(
    <form onSubmit={submitHandler}>
      <Input 
        onChange={changeHandler}
        value={value}
        placeholder={'Search'}
      />
    </form>
  )
}