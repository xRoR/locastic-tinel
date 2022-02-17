import { observer } from 'mobx-react-lite';
import React, { useCallback, useLayoutEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
import icCart from '../../assets/icons/ic-cart.svg';
import { useStores } from '../../models/store-context';
import { colors } from '../../resources/colors';
import { spacings } from '../../resources/values';
import useWindowWidth from '../../utils/useWindowWidth';
import { Col } from '../layout/Col';

const PANEL_PADDING = 20;
const PANEL_WIDTH = 375;
const MOBILE_CART_POS = 90;

const CartBtn = styled.div<{ mobile: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  justify-content: ${({ mobile }) => (mobile ? 'flex-end' : 'flex-start')};
`;

const CartMarker = styled.div`
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: ${colors.blue};
  position: absolute;
  top: 1px;
  left: 20px;
`;

const CartIcon = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
`;

const Counter = styled(animated.div)`
  outline: none;
  padding: 0;
  z-index: 100;

  cursor: pointer;
  display: flex;
  text-align: center;

  font-weight: bold;

  margin-right: 5px;
  gap: 5px;
  align-items: center;
`;

const CartText = styled.h6`
  margin-top: 3px;
`;

const Cart = observer(() => {
  const { isMobile, width } = useWindowWidth();

  /** Global state */
  const { cartStore } = useStores();
  const { isOpened } = cartStore;
  console.log(isOpened);

  /** Fn */
  const getOffset = useCallback(() => {
    const counter = document.getElementById('counter');
    if (!counter ) return 0;
    const offsetLeft = counter.getBoundingClientRect().left;

    const offset = width - (PANEL_WIDTH - PANEL_PADDING) - offsetLeft;
    return offset;
  }, [width]);

  /** Animation */
  const [{ offset }, api] = useSpring(() => ({ offset: 0 }));
  useLayoutEffect(() => {
    isOpened
      ? api.start({ offset: isMobile ? -(width - MOBILE_CART_POS) : getOffset(), immediate: false })
      : api.start({ offset: 0, immediate: false });
  }, [api, getOffset, isMobile, isOpened, width]);

  return (
    <Col cols={1}>
      <CartBtn id="counter" onClick={() => cartStore.openCart()} mobile={isMobile}>
        {cartStore.itemsCount > 0 ? (
          <>
            <Counter
              style={{
                transform: offset.to((v) => `translateX(${v}px)`),
                position: isOpened ? 'fixed' : 'relative',
                fontSize: isOpened ? 23 : 15,
              }}
            >
              <CartIcon>
                <img src={icCart} style={{ marginRight: spacings[2] }} alt="cart" />
                <CartMarker />
              </CartIcon>
              {cartStore.itemsCount}
            </Counter>

            {!isMobile && (
              <CartText
                style={{
                  marginLeft: isOpened ? 51 : 0,
                }}
              >
                Workshops in cart
              </CartText>
            )}
          </>
        ) : (
          <>
            <CartIcon>
              <img src={icCart} style={{ marginRight: spacings[2] }} alt="cart" />
            </CartIcon>
            {!isMobile && <h6>Cart is Empty</h6>}
          </>
        )}
      </CartBtn>
    </Col>
  );
});

export default Cart;
