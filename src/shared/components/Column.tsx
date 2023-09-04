import React from 'react';
import styled from 'styled-components';
import {fillWidth, fillHeight} from '../styles/cssUtils';

type _ColumnPropsType = {
    $justifyContent?: 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'center'
    $alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'center'
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
    disabled?: boolean
    children?: React.ReactNode
}

const _Column = styled.div<_ColumnPropsType>`
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-align-content: stretch;
  align-content: stretch;
  flex-shrink: 1;
  -webkit-justify-content: ${props => props.$justifyContent || 'flex-start'};
  justify-content: ${props => props.$justifyContent || 'flex-start'};
  -webkit-align-items: ${props => props.$alignItems || 'flex-start'};
  align-items: ${props => props.$alignItems || 'flex-start'};
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
  ${props => props.$action && `cursor: ${props.disabled ? 'not-allowed' : 'pointer'}`};
`;

type ColumnPropsType = {
    justifyContent?: 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'center'
    alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'center'
    width?: string
    height?: string
    maxWidth?: string
    minWidth?: string
    maxHeight?: string
    minHeight?: string
    margin?: string
    padding?: string
    backgroundColor?: string
    border?: string
    borderRadius?: string
    action? : Function
    disabled?: boolean
    children?: React.ReactNode
}
export const Column = (props: ColumnPropsType) => {
  const {
    justifyContent,
    alignItems,
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
    ...others
  } = props;
  return <_Column $justifyContent={justifyContent}
                  $alignItems={alignItems}
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
                  {...others}
                  onClick={() => !props.disabled ? props.action?.() : {}}>
    {props.children}
  </_Column>;
};
