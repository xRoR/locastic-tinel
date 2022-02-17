import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Close } from '../../assets/icons/ic-close.svg';
import { useStores } from '../../models/store-context';

const CartHeaderWrapper = styled.div`
  height: 90px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
`;

const CartTitle = styled.h5`
  padding-left: 70px;
  margin-top: 5px;
`;

const CartBtn = styled(Close)`
  margin-left: auto;
  cursor: pointer;
`;

const CartHeader = observer(() => {
  /** Global state */
  const {cartStore} = useStores();
  const {itemsCount} = cartStore;

  /** Renders */
  const _renderTitle = () => {
    if (itemsCount === 0) return (<CartTitle>Cart is empty</CartTitle>);
    return (<CartTitle>Workshops</CartTitle>)
  }

  return (
    <CartHeaderWrapper>
      {_renderTitle()}
      <CartBtn onClick={() => cartStore.closeCart()} />
    </CartHeaderWrapper>
  );
});

export default CartHeader;
