import React from 'react';
import styled from 'styled-components';
import {fillWidth} from '../styles/cssUtils';

type _ImagePropsType = {
    src: string
    width?: string
    $maxWidth?: string
    $maxHeight?: string
    $minHeight?: string
    $margin?: string
    $padding?: string
    $action? : Function
    disabled?: boolean
}

const _Image = styled.img<_ImagePropsType>`
  object-fit: contain;
  background-color: transparent;
  ${props => props.width && fillWidth(props.width === 'fill' ? null : props.width)};
  max-width: ${props => props.$maxWidth};
  max-height: ${props => props.$maxHeight};
  min-height: ${props => props.$minHeight};
  margin: ${props => props.$margin};
  padding: ${props => props.$padding};
  &:hover {
    ${props => props.$action ? 'cursor: pointer' : ''};
  }
  &:hover[disabled] {
    cursor: not-allowed;
  }
`;

type ImagePropsType = {
    src: string
    width?: string
    maxWidth?: string
    maxHeight?: string
    minHeight?: string
    margin?: string
    padding?: string
    action? : Function
    disabled?: boolean
}

export const Image = React.memo((props: ImagePropsType) => {
  const {
    src,
    maxWidth,
    maxHeight,
    minHeight,
    margin,
    padding,
    disabled,
    action,
    ...others
  } = props;

  return <_Image src={src}
                 $maxWidth={maxWidth}
                 $maxHeight={maxHeight}
                 $minHeight={minHeight}
                 $margin={margin}
                 $padding={padding}
                 $action={action}
                 {...others}
                 onClick={action && (e => {
                   if (disabled) {
                     return;
                   }
                   e.stopPropagation();
                   e.preventDefault();
                   action(e);
                 })}
                 disabled={disabled}/>;
});
