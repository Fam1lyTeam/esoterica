import React from 'react';
import IMask from 'imask';
import { IMaskInput } from 'react-imask';

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  onEnter?: () => void;
}

const isUnsupportedDevice = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('hios');
}; 

export const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  className,
  onEnter
}) => {

  if (isUnsupportedDevice()) {
    return (
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      />
    );
  } 

  return (
    <IMaskInput
      mask="d.m.Y"
      value={value}
      onAccept={(value: string) => onChange(value)}
      lazy={false}
      blocks={{
        d: {
          mask: IMask.MaskedRange,
          placeholderChar: 'D',
          from: 1,
          to: 31,
          maxLength: 2
        },
        m: {
          mask: IMask.MaskedRange,
          placeholderChar: 'M',
          from: 1,
          to: 12,
          maxLength: 2
        },
        Y: {
          mask: IMask.MaskedRange,
          placeholderChar: 'Y',
          from: 1000,
          to: 2100,
          maxLength: 4
        },
      }}
      unmask={true}
      className={className}
      inputMode="numeric"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onEnter?.();
        }
      }}
      enterKeyHint="done"
    />
  );
};
