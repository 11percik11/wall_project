import React, { useState, forwardRef } from 'react';
import styles from './index.module.scss';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  disabled?: boolean;
  name?: string;
  defaultValue?: string;
  onBlur?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onCursorChange?: (position: number) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>((
  { 
    type = 'text', 
    placeholder, 
    value, 
    onChange, 
    className = '', 
    disabled = false,
    name,
    onClick,
    onKeyUp,
    onCursorChange,
    onBlur,
    defaultValue = '', 
  },
  ref
) => {
  const [localValue, setLocalValue] = useState(defaultValue);

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    onClick?.(e);
    const pos = e.currentTarget.selectionStart || 0;
    onCursorChange?.(pos);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    const pos = e.target.selectionStart || 0;
    onCursorChange?.(pos);
    onChange?.(e);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const pos = e.currentTarget.selectionStart || 0;
    if (
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown' ||
      e.key === 'Home' ||
      e.key === 'End'
    ) {
      onCursorChange?.(pos);
    }
    onKeyUp?.(e);
  };

  return (
    <div className={`${styles.inputWrapper}`}>
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`${styles.input} ${className}`}
        disabled={disabled}
        name={name}
        onClick={handleClick}
        onKeyUp={handleKeyUp}
        onBlur={onBlur}
        value={value !== undefined ? value : localValue}
        onChange={handleChange}
      />
    </div>
  );
});

export default Input;