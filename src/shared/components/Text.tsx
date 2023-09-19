import React from 'react';
import styled from 'styled-components';
import {fillWidth, fillHeight} from '../styles/cssUtils';

type _TextPropsType = {
    width?: string
    $maxWidth?: string
    height?: string
    $margin?: string
    $padding?: string
    $fontSize?: string
    $fontFamily?: string
    color?: string
    opacity?: number
    $textAlign?: string
    $textOverflow?: string
    $preset?: string
    children?: React.ReactNode
}

const _Text = styled.span<_TextPropsType>`
  ${props => fillWidth(props.width)};
  max-width: ${props => props.$maxWidth};
  ${props => props.height && fillHeight(props.height === 'fill' ? null : props.height)};
  margin: ${props => props.$margin};
  padding: ${props => props.$padding};
  font-size: ${props => props.$fontSize ? props.$fontSize : props.theme.text.fontSize};
  font-family: ${props => props.$fontFamily};
  text-align: ${props => props.$textAlign ? props.$textAlign : 'center'};
  background-color: transparent;
  color: ${props => props.color};
  opacity: ${props => props.opacity ? props.opacity : 1};
  ${props => props.$textOverflow && `
    overflow: hidden; 
    text-overflow: ${props.$textOverflow};
  `};
`;

type PresetType = 'standard'

const getPreset = (preset: PresetType) => {
  const presets = {
    standard: {
      $margin: '5px',
      $fontSize: '12px',
      opacity: 0.9,
      width: 'fit-content',
      height: null,
      $textAlign: 'center',
      $textOverflow: null,
    },
  };
  return presets[preset];
};

type TextPropsType = {
    fontFamily?: string
    fontSize?: string
    color?: string
    opacity?: number
    textAlign?: string
    width?: string
    maxWidth?: string
    height?: string
    margin?: string
    padding?: string
    textOverflow?: string
    preset?: PresetType
    children?: React.ReactNode
}

export const Text = React.memo((props: TextPropsType) => {
  const opts = getPreset(props.preset || 'standard');
  for (const o in opts) {
    if (opts.hasOwnProperty(o) && props.hasOwnProperty(o)) {
      // @ts-ignore
      opts[o] = props[o];
    }
  }

  const {
    maxWidth,
    margin,
    padding,
    fontSize,
    fontFamily,
    textAlign,
    textOverflow,
    preset,
    ...others
  } = props;

  return <_Text $maxWidth={maxWidth}
                $margin={margin}
                $padding={padding}
                $fontSize={fontSize}
                $fontFamily={fontFamily}
                $textAlign={textAlign}
                $textOverflow={textOverflow}
                $preset={preset}
                {...others}>
    {props.children}
  </_Text>;
});
