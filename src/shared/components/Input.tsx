import React, {ChangeEvent, useState} from 'react';
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
  min-height: 35px;
  font-size: ${props => props.theme.text.fontSize};
  padding: 0;
  margin: ${props => props.$margin || '5px'};
  background: none;
  opacity: ${props => props.disabled ? 0.5 : 1};
  outline: 0;
  outline-offset: 0;
  appearance: none;
  border-color: ${props => props.theme.shared.dividerColor};
  border-style: solid;
  border-width: 0 0 1px;
  
`;

type InputPropsType = {
    value: string
    onChange: Function
    placeholder?: string
    disabled?: boolean
    width?: string
    maxWidth?: string
    margin?: string
}
export const Input = React.memo((props: InputPropsType) => {
  const {value, onChange, placeholder, disabled, width, maxWidth, margin} = props;
  const [val, setVal] = useState(value);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setVal(newValue);
    onChange(newValue);
  };
  return <_Input type='text'
                 value={val}
                 onChange={onChangeHandler}
                 placeholder={placeholder}
                 disabled={disabled}
                 width={width}
                 $maxWidth={maxWidth}
                 $margin={margin}/>;
});
