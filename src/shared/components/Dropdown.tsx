import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import dropdownIcon from '../assets/images/icon/dropdownIcon52.png';
import closeIcon from '../assets/images/icon/closeIcon150.png';

const _Wrapper = styled.div`
  position: relative;
  background-color: inherit;
`;

type _DropdownPropsType = {
    disabled?: boolean
    width?: string
    $maxWidth?: string
    $margin?: string
}

const _Dropdown = styled.div<_DropdownPropsType>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${props => props.width || 'inherit'};
  height: 35px;
  min-width: 150px;
  max-width: ${props => props.$maxWidth};
  margin: ${props => props.$margin || '0'};
  padding: 0;
  background-color: transparent;
  opacity: ${props => props.disabled ? 0.5 : 1};
  appearance: none;
  border-color: #a3a8c1;
  border-style: solid;
  border-width: 0 0 1px;
  cursor: ${props => !props.disabled ? 'pointer' : 'not-allowed'};
`;

const _PlaceholderText = styled.span`
  background-color: transparent;
  opacity: 0.5;
  text-overflow: ellipsis;
`;

const _IconWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const _ClearIcon = styled.img`
  width: 11px;
  height: 11px;
  margin: 0 5px 0 0;
  background-color: transparent;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

type _DropdownIconPropsType = {
    $showOptions: boolean
}

const _DropdownIcon = styled.img<_DropdownIconPropsType>`
  width: 12px;
  height: 12px;
  background-color: transparent;
  transform: ${props => props.$showOptions ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.3s;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

type _OptionMenuPropsType = {
    $backgroundColor?: string
}

const _OptionMenu = styled.div<_OptionMenuPropsType>`
  position: absolute;
  z-index: 40;
  width: 100%;
  background-color: ${props => props.$backgroundColor || props.theme.backgroundColors.primary};
  box-shadow: 0 7px 15px 0 rgba(0, 0, 0, .1);
  border-radius: ${props => props.theme.shared.borderRadius};
  overflow: hidden;
`;

type _OptionRowPropsType  = {
    key?: any
    $isSelected?: boolean
    $noOptions?: boolean
}

const _OptionRow = styled.div<_OptionRowPropsType>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 35px;
  padding: 2px;
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

const _OptionText = styled.span`
  background-color: transparent;
  text-overflow: ellipsis;
`;

type OptionValueType = {
    name: any,
    value: any
}

type DropdownPropsType = {
    value: OptionValueType | undefined | null
    onChange: Function
    clearAction?: Function
    options: Array<OptionValueType> | []
    placeholder?: string
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
    clearAction,
    options,
    placeholder,
    disabled,
    width,
    maxWidth,
    margin,
    optionsBackgroundColor,
  } = props;

  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);

  const selectOption = (option: OptionValueType) => {
    onChange({name: option.name, value: option.value});
    setShowOptions(false);
  };

  const clearSelection = (e:  React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();
    clearAction && clearAction();
    onChange(null);
    setShowOptions(false);
  };

  const onCloseHandler = (e: Event) => {
    const path = e.composedPath();
    const isClickInside = path.find((element: any) => element === dropdownRef.current);
    if (showOptions && isClickInside === undefined) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', onCloseHandler);
    return () => {
      document.removeEventListener('mouseup', onCloseHandler);
    };
  });

  return (
    <_Wrapper ref={dropdownRef}>
      <_Dropdown onClick={() => !disabled ? setShowOptions(showOptions => !showOptions) : {}}
                 disabled={disabled}
                 width={width}
                 $maxWidth={maxWidth}
                 $margin={margin}>
        {value?.name ? value.name : (placeholder ? <_PlaceholderText>{placeholder}</_PlaceholderText> : <div></div>)}
        <_IconWrapper>
          {!!clearAction && !!value && <_ClearIcon onClick={clearSelection} src={closeIcon}/>}
          <_DropdownIcon $showOptions={showOptions} src={dropdownIcon}/>
        </_IconWrapper>
      </_Dropdown>
      <_Wrapper>
        {showOptions
              && <_OptionMenu $backgroundColor={optionsBackgroundColor}>
                {options?.length ? options.map((option: OptionValueType, index: number) => (
                  <_OptionRow key={index}
                              onClick={() => selectOption(option)}
                              $isSelected={option.name === value?.name && option.value === value?.value}>
                    <_OptionText>{option.name}</_OptionText>
                  </_OptionRow>
                ))
                  : <_OptionRow $noOptions={true}>No Options</_OptionRow>}
              </_OptionMenu>}
      </_Wrapper>
    </_Wrapper>
  );
});
