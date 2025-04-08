import React from 'react';
import styles from './index.module.scss';

interface InputCheckboxProps {
  children: React.ReactNode;
  className?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputCheckbox({
  children,
  className,
  checked,
  onChange,
}: InputCheckboxProps) {
  const handleCheckboxToggle = () => {
    if (!onChange) return;
    const syntheticEvent = {
      target: {
        checked: !checked,
        type: 'checkbox',
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    onChange(syntheticEvent);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleCheckboxToggle();
    }
  };

  return (
    <label
      className={`${styles.container} ${className}`}
      tabIndex={0}
      role="checkbox"
      aria-checked={checked}
      onKeyDown={handleKeyPress}
      onClick={handleCheckboxToggle}
    >
      <div className={`${styles.customCheckbox} ${checked ? styles.checked : ''}`}>
        {checked && (
          <svg viewBox="0 0 12 10" className={styles.checkmark}>
            <path d="M1 5.5L4.5 9L11 1" stroke="white" strokeWidth="2" fill="none"/>
          </svg>
        )}
      </div>
      <span className={styles.labelText}>{children}</span>
    </label>
  );
}