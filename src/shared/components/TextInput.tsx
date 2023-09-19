import React, {ChangeEvent} from 'react';
import styled from 'styled-components';

type _InputPropsType = {
    disabled?: boolean
    width?: string
    $maxWidth?: string
    $margin?: string
}

const _Input = styled.input<_InputPropsType>`
  width: ${props => props.width || 'inherit'};
  max-width: ${props => props.$maxWidth};
  height: 35px;
  font-weight: inherit;
  padding: 0;
  margin: ${props => props.$margin || '0'};
  background-color: transparent;
  opacity: ${props => props.disabled ? 0.5 : 1};
  outline: 0;
  outline-offset: 0;
  appearance: none;
  border-color: ${props => props.theme.shared.dividerColor};
  border-style: solid;
  border-width: 0 0 1px;
  
`;

type TextInputPropsType = {
    value: string
    onChange: Function
    maxLength?: number
    placeholder?: string
    disabled?: boolean
    upperCaseOnly?: boolean
    width?: string
    maxWidth?: string
    margin?: string
}

export const TextInput = React.memo((props: TextInputPropsType) => {
  const {
    value,
    onChange,
    maxLength= 255,
    placeholder,
    disabled,
    upperCaseOnly,
    width,
    maxWidth,
    margin,
  } = props;
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.currentTarget.value;
    if (targetValue.length <= maxLength) {
      onChange(upperCaseOnly ? e.currentTarget.value.toUpperCase() : e.currentTarget.value);
    }
  };

  return <_Input type='text'
                 value={value}
                 onChange={onChangeHandler}
                 placeholder={placeholder}
                 disabled={disabled}
                 width={width}
                 $maxWidth={maxWidth}
                 $margin={margin}/>;
});
