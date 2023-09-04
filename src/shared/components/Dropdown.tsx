import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import dropdownIcon from '../assets/images/icon/dropdownIcon64.png';

export const _DropdownWrapper = styled.div`
  position: relative;
`;

type _DropdownPropsType = {
    disabled?: boolean
    width?: string
    $maxWidth?: string
    $margin?: string
}

export const _Dropdown = styled.div<_DropdownPropsType>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${props => props.width || 'inherit'};
  height: 35px;
  min-width: 150px;
  max-width: ${props => props.$maxWidth};
  font-size: ${props => props.theme.text.fontSize};
  margin: ${props => props.$margin || '5px'};
  padding: 0;
  background: none;
  opacity: ${props => props.disabled ? 0.5 : 1};
  appearance: none;
  border-color: #a3a8c1;
  border-style: solid;
  border-width: 0 0 1px;
  cursor: ${props => !props.disabled ? 'pointer' : 'not-allowed'};
`;

type _IconPropsTypes = {
    $showOptions: boolean
}

export const _Icon = styled.img<_IconPropsTypes>`
  width: 17px;
  height: 17px;
  transform: ${props => props.$showOptions ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.3s;
`;

type _OptionMenuPropsType = {
    $backgroundColor?: string
}

export const _OptionMenu = styled.div<_OptionMenuPropsType>`
  position: absolute;
  z-index: 40;
  width: 100%;
  background-color: ${props => props.$backgroundColor || props.theme.backgroundColors.primary};
  border-radius: ${props => props.theme.shared.borderRadius};
  overflow: hidden;
`;

type _OptionRowPropsType  = {
    key?: any
    $isSelected?: boolean
    $noOptions?: boolean
}

export const _OptionRow = styled.div<_OptionRowPropsType>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  padding: 5px;
  background-color: transparent;
  color: ${props => props.$isSelected ? props.theme.text.tertiaryColor : props.theme.text.secondaryColor};
  cursor: ${props => props.$noOptions ? 'auto' : 'pointer'}; 

  &:hover {
    ${props => !props.$noOptions && `color: ${props.theme.text.tertiaryColor}`};
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    width: 100%;
    height: 35px;
    border-bottom: ${props => `1px solid ${props.theme.shared.dividerColor}`};
  }

  &:last-child::after {
    display: none;
  }
`;

type OptionValueType = {
    name: string | number,
    value: any
}

type DropdownPropsType = {
    value: OptionValueType | null | undefined
    onChange: Function
    options: Array<OptionValueType> | []
    disabled?: boolean
    width?: string
    maxWidth?: string
    margin?: string
    optionsBackgroundColor?: string
}
export const Dropdown = React.memo((props: DropdownPropsType) => {
  const {
    value,
    onChange,
    options,
    disabled,
    width,
    maxWidth,
    margin,
    optionsBackgroundColor,
  } = props;

  const [val, setVal] = useState(value);
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);
  const clickCloseHandler = (event: Event) => {
    const path = event.composedPath();
    const isClickInside = path.find((element: any) => element === dropdownRef.current);
    if (showOptions && isClickInside === undefined) {
      setShowOptions(false);
    }
  };

  const onOptionClickHandler = (option: OptionValueType) => {
    onChange({name: option.name, value: option.value});
    setVal({name: option.name, value: option.value});
    setShowOptions(false);
  };

  useEffect(() => {
    document.addEventListener('mouseup', clickCloseHandler);
    return () => {
      document.removeEventListener('mouseup', clickCloseHandler);
    };
  });

  return (
    <_DropdownWrapper ref={dropdownRef}>
      <_Dropdown onClick={() => setShowOptions(showOptions => !showOptions)}
                 disabled={disabled}
                 width={width}
                 $maxWidth={maxWidth}
                 $margin={margin}>
        {val ? val.name : <div>&nbsp;</div>}
        <_Icon $showOptions={showOptions} src={dropdownIcon}/>
      </_Dropdown>
      <_DropdownWrapper>
        {showOptions
              && <_OptionMenu $backgroundColor={optionsBackgroundColor}>
                {options?.length ? options.map((option: OptionValueType, index: number) => (
                  <_OptionRow key={index}
                              onClick={() => onOptionClickHandler(option)}
                              $isSelected={option.name === val?.name && option.value === val?.value}>
                    {option.name}
                  </_OptionRow>
                ))
                  : <_OptionRow $noOptions={true}>No Options</_OptionRow>}
              </_OptionMenu>}
      </_DropdownWrapper>
    </_DropdownWrapper>
  );
});
