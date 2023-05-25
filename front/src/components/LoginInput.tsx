import React from 'react';

interface LoginInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type: 'text' | 'password';
}

const LoginInput: React.FC<LoginInputProps> = ({ value, onChange, placeholder, type }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <input className='input-login' type={type} placeholder={placeholder} value={value} onChange={handleChange} />
    </div>
  );
};

export default LoginInput;
