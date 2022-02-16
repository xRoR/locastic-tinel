import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import styled from 'styled-components';
import { useStores } from '../../models/store-context'
import { colors } from '../../resources/colors';
import { spacings } from '../../resources/values';
import useWindowWidth from '../../utils/useWindowWidth';
import Icon from '../icon/Icon';
import {ReactComponent as Chevron} from '../../assets/icons/ic-chevron-down.svg';

const FiltersWrapepr = styled.div`
  margin-top: ${spacings[4]}px;
`

const CategoryItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 25px;
  cursor: pointer;
`

const CategoryTitle = styled.h5<
  {active?: boolean;}>`
  margin-left: 5px;
  color: ${({active}) => active ? colors.blue : colors.darkerGrey};
  text-decoration: ${({active}) => active ? 'underline' : 'initial'};
`

const CategoryIcon = styled.div`
  width: 30px;
`

const DropdownMenu = styled.div<
  {active: boolean}>`
  height: ${({active}) => active ? 'auto' : 0 };
  display: ${({active}) => active ? 'block' : 'none' };
  overflow: hidden;
  padding-top: 20px;
  box-sizing: content-box;
`

const DropdownTrigger = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`

function capitalize (str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export const CategoryFilter = observer( () => {
  const {isMobile} = useWindowWidth(); 

  /** Global state */
  const { catalogStore } = useStores();
  const  { category, categories } = catalogStore;
  
  /** State */
  const [opened, setOpened] = useState(false);

  /** Fn */
  const _handleCatChage = (item: string) => {
    catalogStore.chooseCategory(item);
    setOpened(false);
  }

  /** Renders */
  const _renderItem = (item: string, index: number) => {
    const isActive = (category === item) || (item === 'all' && !category);
    return (
      <CategoryItem key={`category_${index}`} onClick={() => _handleCatChage(item)}>
        <CategoryIcon>
          <Icon icon={item} color={isActive ? colors.blue : undefined}/>
        </CategoryIcon>
        <CategoryTitle active={isActive}>{capitalize(item)}</CategoryTitle>
      </CategoryItem>
    )
  }

  if (isMobile) return (
    <FiltersWrapepr>
      <DropdownTrigger onClick={() => setOpened(!opened)}>
        <CategoryIcon>
          <Chevron />
        </CategoryIcon>
        <CategoryTitle active={true}>{capitalize(category || 'All')}</CategoryTitle>
      </DropdownTrigger>
      <DropdownMenu active={opened}>
        {['all', ...categories].filter(i => i !== category).map(_renderItem)}
      </DropdownMenu>
      
    </FiltersWrapepr>
  ) 

  return (
    <FiltersWrapepr>
      {['all', ...categories].map(_renderItem)}
    </FiltersWrapepr>
  )
})

export default CategoryFilter