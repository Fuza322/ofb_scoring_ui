import React, {ChangeEvent, useState} from 'react';
import styled from 'styled-components';

type _WrapperPropsType = {
    disabled?: boolean
    width?: string
    $maxWidth?: string
    $margin?: string
}

const _Wrapper = styled.div<_WrapperPropsType>`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: ${props => props.width || 'inherit'};
  max-width: ${props => props.$maxWidth};
  margin: ${props => props.$margin || '0'};
  background-color: transparent;
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

type _ExtraInputTextPropsType = {
    $fontSize?: string
    $fontFamily?: string
    color?: string
    opacity?: number
    $textAlign?: string
    $textOverflow?: string
    $preset?: string
    children?: React.ReactNode
}

const _ExtraInputText = styled.span<_ExtraInputTextPropsType>`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 35px;
  padding: 5px;
  font-size: ${props => props.$fontSize ? props.$fontSize : props.theme.text.fontSize};
  font-family: ${props => props.$fontFamily};
  background-color: transparent;
  color: ${props => props.color};
  border-color: ${props => props.theme.shared.dividerColor};
  border-style: solid;
  border-width: 0 0 1px;
`;

const _Input = styled.input`
  width: 100%;
  height: 35px;
  font-weight: inherit;
  padding: 0;
  outline: 0;
  outline-offset: 0;
  appearance: none;
  border-color: ${props => props.theme.shared.dividerColor};
  border-style: solid;
  border-width: 0 0 1px;
`;

type NumberInputPropsType = {
    type?: 'integer' | 'positiveInteger' | 'currency'
    value: string
    onChange: Function
    extraInputText?: string
    maxValue?: number
    placeholder?: string
    disabled?: boolean
    width?: string
    maxWidth?: string
    margin?: string
}

export const NumberInput = React.memo((props: NumberInputPropsType) => {
  const {
    type = 'integer',
    value,
    onChange,
    extraInputText,
    placeholder,
    disabled,
    width,
    maxWidth,
    margin,
  } = props;
  const [val, setVal] = useState(value);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.currentTarget.value;
    switch (type) {
      case 'integer': {
        const integerValue =  targetValue.replace(/[,.]/, '');
        if (!!integerValue.match(/^[+-]?(?:\d+\.?\d*|\.\d+)$/) || integerValue === '' || integerValue === '-') {
          setVal(integerValue);
          onChange(Number(integerValue));
        }
        break;
      }
      case 'positiveInteger': {
        const integerValue =  targetValue.replace(/[,.]/, '');
        if (!!integerValue.match(/^(\d)*$/g)) {
          setVal(integerValue);
          onChange(Number(integerValue));
        }
        break;
      }
      case 'currency':
        const nonSpacesValue  = targetValue.replace(/\s/g,'');
        if (!!nonSpacesValue.match(/^[0-9]*[.,]?[0-9]{0,2}?$/)) {
          const displayValue = nonSpacesValue.replace('.', ',');
          const newValue = Number(nonSpacesValue.replace(',', '.'));
          setVal(displayValue);
          onChange(newValue);
        }
        break;
    }
  };

  return <_Wrapper width={width} $maxWidth={maxWidth} $margin={margin}>
    <_Input type='text'
            value={type === 'currency'
              ? val.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + ' ')
              : val}
            onChange={onChangeHandler}
            placeholder={placeholder}
            disabled={disabled}/>
    {extraInputText && <_ExtraInputText>{extraInputText}</_ExtraInputText>}
  </_Wrapper>;
});
