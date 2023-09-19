import React from 'react';
import styled from 'styled-components';

type ButtonTypes = 'button' | 'reset' | 'submit'
type ButtonImportanceTypes = 'primary' | 'secondary'

type _LabelPropsType = {
    $importance: ButtonImportanceTypes
    disabled?: boolean
}

const _Label = styled.span<_LabelPropsType>`
  display: flex;
  align-items: center;
  background-color: transparent;
  color: ${props => props.disabled
    ? props.theme.buttons.disabled.color 
    : props.theme.buttons[props.$importance].color};
  text-align: end;
`;

type _ButtonPropsType = {
    type: ButtonTypes
    $importance: ButtonImportanceTypes
    disabled?: boolean
    $fontSize?: string
    width?: string
    $margin?: string
}

const _Button = styled.button<_ButtonPropsType>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  white-space: nowrap;
  width: ${props => props.width};
  min-width: 100px;
  line-height: 30px;
  min-height: 35px;
  font-size: ${props => props.$fontSize};
  margin: ${props => props.$margin || '5px'};
  padding: 5px;
  background-color: ${props => props.disabled
    ? props.theme.buttons.disabled.backgroundColor
    : props.theme.buttons[props.$importance].backgroundColor};
  border: ${props => props.disabled ? `3px solid ${props.theme.buttons.disabled.borderColor}` : 'none'};
  border-radius: ${props => props.theme.shared.borderRadius};
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: ${props => !props.disabled ? 'pointer' : 'not-allowed'};
  appearance: none;
  
  &:hover {
    opacity: ${props => !props.disabled && 0.5};
    transition: 0.2s;
  }
`;

type ButtonPropsType = {
    label: string
    type?: ButtonTypes
    importance?: ButtonImportanceTypes
    action: Function
    disabled?: boolean
    fontSize?: string
    width?: string
    margin?: string
}

export const Button = React.memo((props: ButtonPropsType) => {
  const {
    label,
    type = 'button',
    importance = 'primary',
    action,
    disabled,
    fontSize,
    width,
    margin,
  } = props;

  const onClick = (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  return <_Button type={type}
                  $importance={importance}
                  onClick={!disabled && typeof action === 'function' ? onClick : undefined}
                  disabled={disabled}
                  $fontSize={fontSize}
                  width={width}
                  $margin={margin}>
    <_Label $importance={importance} disabled={disabled}>{label}</_Label>
  </_Button>;
});
