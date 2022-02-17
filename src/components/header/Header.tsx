import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/logo.svg';
import { colors } from '../../resources/colors';
import { Col } from '../layout/Col';
import Cart from './Cart';
import CartPanel  from '../cart/Cart';

const HeaderWrapper = styled.div`
  height: 90px;
  background-color: ${colors.yellow};
  align-items: center;
	position: fixed;
	top: 0;
  left: 0;
  right: 0;
  z-index: 3;
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
        <CartPanel />
      </HeaderContainer>
    </HeaderWrapper>
  )
}

export default Header