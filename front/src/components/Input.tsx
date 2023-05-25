import React from 'react';
import './scss/input.scss'

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

interface InputPropsWithVisibility extends InputProps {
  visibleOnVagasPage: boolean;
}

const Input: React.FC<InputPropsWithVisibility> = ({ value, onChange, placeholder, visibleOnVagasPage }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  if (!visibleOnVagasPage) {
    return null;
  }

  return (
    <div>
      <input className='input-filter-vagas' type="text" placeholder={placeholder} value={value} onChange={handleChange} />
    </div>
  );
};

export default Input;
