
import React, { useState } from 'react';
import { MdOutlineEmail, MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';

const InputWithIcon = ({
  label,
  type,
  placeholder,
  icon,
  value,
  onChange,
  name,
  containerClassName = '',
  labelClassName = '',
  inputClassName = ''
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordInput = type === 'password';
  const inputType = isPasswordInput ? (showPassword ? 'text' : 'password') : type;
  const displayIcon = isPasswordInput ? (
    <button
      type="button"
      onClick={togglePasswordVisibility}
      className="text-gray-100 hover:text-gray-200 focus:outline-none"
    >
      {showPassword ? (
        <MdOutlineVisibilityOff className="h-6 w-6" />
      ) : (
        <MdOutlineVisibility className="h-6 w-6" />
      )}
    </button>
  ) : (
    icon
  );

  return (
    <div className={containerClassName}>
      <label className={`block text-sm font-medium text-gray-100 mb-1 ${labelClassName}`}>
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete="new-password"
          className={`w-full pl-4 pr-10 py-2.5 border text-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${inputClassName}`}
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
          {displayIcon}
        </span>
      </div>
    </div>
  );
};

export default InputWithIcon;