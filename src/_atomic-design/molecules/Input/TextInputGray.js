import React from 'react'

export default function Textinput ({
  id,
  defaultValue,
  value,
  label,
  placeholder,
  onChange,
  type,
  className,
  required,
  disabled,
  onKeyDown
}) {
  return (
        <div className={className}>
            <label className="block text-xs sm:text-base mb-1" htmlFor={id}>
                {label}
            </label>
            <input
                type={type || 'text'}
                id={id}
                rows="2"
                placeholder={placeholder}
                onChange={onChange}
                className="bg-[#F4F7F9] rounded-lg w-full p-4 h-[40px] sm:h-[50px] placeholder:text-xs sm:placeholder:text-base"
                defaultValue={defaultValue}
                value={value}
                required={required}
                disabled={disabled}
                onKeyDown={onKeyDown}
            />
        </div>
  )
}
