import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';
import icCart from '../../assets/icons/ic-cart.svg';
import { useStores } from '../../models/store-context';
import { colors } from '../../resources/colors';
import { spacings } from '../../resources/values';
import useWindowWidth from '../../utils/useWindowWidth';
import { Col } from '../layout/Col';

const CartBtn = styled.div<
  {mobile: boolean;}>`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  justify-content: ${({mobile}) => mobile ? 'flex-end' : 'flex-start'};
`

const CartMarker = styled.div`
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: ${colors.blue};
  position: absolute;
  top: 1px;
  left: 20px;
`

const CartIcon = styled.div`
  position: relative;
`

const Cart = observer(() => {
  const {isMobile} = useWindowWidth(); 
  
  /** Global state */
  const {cartStore} = useStores();
  
  return (
    <Col cols={1}>
      <CartBtn onClick={() => cartStore.openCart()} mobile={isMobile}>
        {cartStore.itemsCount > 0 ? (
          <>
            <CartIcon>
              <img src={icCart} style={{ marginRight: spacings[2] }} alt="cart"/>
              <CartMarker />
            </CartIcon>
            
            {!isMobile && (<h6>{cartStore.itemsCount} Workshops in cart</h6>)}
          </>
        ) : (
          <>
            <CartIcon>
              <img src={icCart} style={{ marginRight: spacings[2] }} alt="cart"/>
            </CartIcon>
            {!isMobile && (<h6>Cart is Empty</h6>)}           
          </>
        )}
        
      </CartBtn>
    </Col>
  )
})

export default Cart