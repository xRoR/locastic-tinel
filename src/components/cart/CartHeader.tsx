import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';
import { useStores } from '../../models/store-context';
import { ReactComponent as Close} from '../../assets/icons/ic-close.svg'
import { ReactComponent as Cart} from '../../assets/icons/ic-cart.svg';

const CartHeaderWrapper = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const CartTitle = styled.h5``;
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

    return (<>
      <Cart />
      <CartTitle>{itemsCount} Workshops</CartTitle>
    </>)
  }
  return (
    <CartHeaderWrapper>
      {_renderTitle()}
      <CartBtn onClick={() => cartStore.closeCart()} />
    </CartHeaderWrapper>
  );
});

export default CartHeader;
