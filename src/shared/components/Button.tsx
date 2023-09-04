import React from 'react';
import styled from 'styled-components';

type ButtonTypes = 'primary' | 'secondary'

type _LabelPropsType = {
    type: ButtonTypes
    disabled?: boolean
}

const _Label = styled.span<_LabelPropsType>`
  display: flex;
  align-items: center;
  background-color: transparent;
  color: ${props => props.disabled
    ? props.theme.buttons.disabled.color 
    : props.theme.buttons[props.type].color};
  text-align: end;
`;

type _ButtonPropsType = {
    type: ButtonTypes
    disabled?: boolean
    $fontSize?: string
    width?: string
    $margin?: string
}

const _Button = styled.div<_ButtonPropsType>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  white-space: nowrap;
  width: ${props => props.width};
  min-width: 100px;
  line-height: 30px;
  min-height: 35px;
  font-size: ${props => props.$fontSize ? props.$fontSize : props.theme.text.fontSize};
  margin: ${props => props.$margin || '5px'};
  padding: 5px;
  background-color: ${props => props.disabled
    ? props.theme.buttons.disabled.backgroundColor
    : props.theme.buttons[props.type].backgroundColor};
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
    action: Function
    disabled?: boolean
    fontSize?: string
    width?: string
    margin?: string
}
export const Button = React.memo((props: ButtonPropsType) => {
  const {
    label,
    type = 'primary',
    action,
    disabled,
    fontSize,
    width,
    margin,
  } = props;
  const [internalProcessing, setInternalProcessing] = React.useState<boolean>();
  const onClick = (e:  React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    const prom = action();
    if (prom && prom.then) {
      setInternalProcessing(true);
      prom.finally(() => setInternalProcessing(false));
    }
  };
  return <_Button type={type}
                  onClick={!(disabled || internalProcessing) && typeof action === 'function' ? onClick : undefined}
                  disabled={disabled || internalProcessing}
                  $fontSize={fontSize}
                  width={width}
                  $margin={margin}>
    <_Label type={type} disabled={disabled}>{label}</_Label>
  </_Button>;
});
