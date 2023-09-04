import React, {ChangeEventHandler} from 'react';
import styled, {keyframes} from 'styled-components';

const _Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const _Input = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`;

const _Label = styled.label`
  height: 20px;
  position: relative;
  margin: 5px 5px 5px 30px;
`;

const _LabelText = styled.div<{$fontSize?: string}>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 20px;
  font-size: ${props => props.$fontSize ? props.$fontSize : props.theme.text.fontSize};
`;

const scale = keyframes`
 from {
    opacity: 0;
    transform: scale(0) rotate(42deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(42deg);
  }
`;

type _IndicatorPropsType = {
    checked: boolean
    disabled?: boolean
}

const _Indicator = styled.div<_IndicatorPropsType>`
  width: 20px;
  height: 20px;
  background: #FFFFFF;
  position: absolute;
  top: 0;
  left: -1.6em;
  border: ${props => props.checked ? 'none' : '2px solid #a9afc5'};
  border-radius: 2px;
  background: ${props => props.checked && props.theme.backgroundColors.secondary};
  opacity: ${props => props.disabled ? 0.5 : 1};
  cursor: ${props => !props.disabled ? 'pointer' : 'not-allowed'};

  ${_Input}:not(:disabled):checked & {
    background: #d1d1d1;
  }

  ${_Input}:checked + &::after {
    display: block;
    top: 0.1em;
    left: 0.35em;
    width: 30%;
    height: 60%;
    background: ${props => props.theme.backgroundColors.secondary};
    border: solid #FFFFFF;
    border-width: 0 0.2em 0.2em 0;
    animation-name: ${scale};
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  }

  &::after {
    content: '';
    position: absolute;
    display: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

type CheckboxPropsType = {
    value: boolean
    onChange: ChangeEventHandler<HTMLInputElement>
    disabled?: boolean
    label: string
    labelFontSize?: string
}

export const Checkbox = React.memo((props: CheckboxPropsType) => {
  const {value, onChange, disabled, label, labelFontSize} = props;
  return (
    <_Wrapper>
      <_Label>
        <_LabelText $fontSize={labelFontSize}>{label}</_LabelText>
        <_Input type='checkbox' onChange={onChange} checked={value} disabled={disabled}/>
        <_Indicator checked={value} disabled={disabled}/>
      </_Label>
    </_Wrapper>
  );
});
