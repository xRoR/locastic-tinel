import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/logo.svg';
import { colors } from '../../resources/colors';
import { Col } from '../layout/Col';
import Cart from './Cart';

const HeaderWrapper = styled.div`
  height: 90px;
  background-color: ${colors.yellow};
  align-items: center;
	position: sticky;
	top: 0;
  z-index: 2;
`
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1440px;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
`

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Col cols={1}><Link to="/"><img src={logo} alt="company logo" /></Link></Col>
        <Cart />
      </HeaderContainer>
    </HeaderWrapper>
  )
}

export default Header