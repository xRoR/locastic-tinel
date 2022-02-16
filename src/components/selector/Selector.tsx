import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../resources/colors';
import { ReactComponent as Chevron } from '../../assets/icons/ic-chevron-down.svg';

interface SelctorProps {
  value: number;
  max?: number;
  options: any[];
  className?: string;
  position?: string;
  onSelect?: (selected: any) => void;
}

const SelectorBox = styled.div`
  position: relative;
  display: inline-block;
`;

const DropToggle = styled.div`
  width: 60px;
  height: 45px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  
  border: 1px solid ${colors.blue};
  background-color: #fff;
  
  font-weight: bold;

  cursor: pointer;
  position: relative;
`;

const DropdownMenu = styled.div<{ droped: boolean, position?: string }>`
  position: absolute;
  top: ${({position}) => position === 'top' ? '-128px' : '100%'};
  z-index: 1000;
  float: left;
  min-width: 100%;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  text-align: left;
  list-style: none;
  border-radius: 6px;
  display: ${({ droped }) => (droped ? 'block' : 'none')};
  left: 0;
  background-color: #fff;
  height: 120px;
  box-sizing: border-box;
  overflow-y: scroll;
  border: 1px solid #efefef;
  font-size: 18px;
  font-weight: normal;
`;

const DropdownItem = styled.div`
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.blue};
    color: #fff;
  }
`;

const Selector: React.FC<SelctorProps> = ({ value, options, onSelect, className, position }) => {
  const [droped, setDroped] = useState(false);

  const _handleSelect = (selected: any) => {
    setDroped(false);
    if (typeof onSelect === 'function') onSelect(selected);
  };

  return (
    <SelectorBox>
      <DropToggle className={className} onClick={() => setDroped(!droped)}>
        {value}
        <Chevron />
        <DropdownMenu position={position} droped={droped}>
        {options.map((item, index) => (
          <DropdownItem key={`option_${index}`} onClick={() => _handleSelect(item)}>
            {item}
          </DropdownItem>
        ))}
      </DropdownMenu>
      </DropToggle>
      
    </SelectorBox>
  );
};

export default Selector;
