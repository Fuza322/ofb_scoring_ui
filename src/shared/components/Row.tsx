import React from 'react';
import styled from 'styled-components';
import {fillWidth, fillHeight} from '../styles/cssUtils';

type _RowPropsType = {
    $justifyContent?: 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'center'
    $alignContent?: 'stretch' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'center'
    $alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'center'
    $reverse?: boolean
    $wrap?: boolean
    width?: string
    height?: string
    $maxWidth?: string
    $minWidth?: string
    $maxHeight?: string
    $minHeight?: string
    $margin?: string
    $padding?: string
    $backgroundColor?: string
    $border?: string
    $borderRadius?: string
    $action? : Function
    $disabled?: boolean
    children?: React.ReactNode
}

const _Row = styled.div<_RowPropsType>`
  display: flex;
  -webkit-justify-content: ${props => props.$justifyContent || 'flex-start'};
  justify-content: ${props => props.$justifyContent || 'flex-start'};
  -webkit-align-content: ${props => props.$alignContent || 'flex-start'};
  align-content: ${props => props.$alignContent || 'flex-start'};
  -webkit-align-items: ${props => props.$alignItems || 'flex-start'};
  align-items: ${props => props.$alignItems || 'flex-start'};
  -webkit-flex-direction: ${props => props.$reverse ? 'row-reverse' : 'row'};
  flex-direction: ${props => props.$reverse ? 'row-reverse' : 'row'};
  -webkit-flex-wrap: ${props => props.$wrap ? 'wrap' : 'nowrap'};
  flex-wrap: ${props => props.$wrap ? 'wrap' : 'nowrap'};
  ${props => fillWidth(props.width)};
  ${props => props.height && fillHeight(props.height === 'fill' ? null : props.height)};
  max-width: ${props => props.$maxWidth};
  min-width: ${props => props.$minWidth};
  max-height: ${props => props.$maxHeight};
  min-height: ${props => props.$minHeight};
  margin: ${props => props.$margin};
  padding: ${props => props.$padding};
  background-color: ${props => props.$backgroundColor || 'transparent'};
  border: ${props => props.$border};
  border-radius: ${props => props.$borderRadius};
  ${props => props.$action && `cursor: ${props.$disabled ? 'not-allowed' : 'pointer'}`};
`;

type RowPropsType = {
    justifyContent?: 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'center'
    alignContent?: 'stretch' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'center'
    alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'center'
    reverse?: boolean
    wrap?: boolean
    width?: string
    height?: string
    maxHeight?: string
    minHeight?: string
    maxWidth?: string
    minWidth?: string
    margin?: string
    padding?: string
    backgroundColor?: string
    border?: string
    borderRadius?: string
    action? : Function
    disabled?: boolean
    children?: React.ReactNode
}

export const Row = React.memo((props: RowPropsType) => {
  const {
    justifyContent,
    alignContent,
    alignItems,
    reverse,
    wrap,
    maxWidth,
    minWidth,
    maxHeight,
    minHeight,
    margin,
    padding,
    backgroundColor,
    border,
    borderRadius,
    action,
    disabled,
    ...others
  } = props;

  return <_Row $justifyContent={justifyContent}
               $alignContent={alignContent}
               $alignItems={alignItems}
               $reverse={reverse}
               $wrap={wrap}
               $maxWidth={maxWidth}
               $minWidth={minWidth}
               $maxHeight={maxHeight}
               $minHeight={minHeight}
               $margin={margin}
               $padding={padding}
               $backgroundColor={backgroundColor}
               $border={border}
               $borderRadius={borderRadius}
               $action={action}
               $disabled={disabled}
               {...others}
               onClick={() => !props.disabled ? props.action?.() : {}}>
    {props.children}
  </_Row>;
});
