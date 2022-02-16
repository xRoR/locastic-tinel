import React, { useState } from 'react';
import styled from 'styled-components';
import { useStores } from '../../models/store-context';
import { Workshop } from '../../models/workshop/workshop';
import Btn from '../partials/Btn';
import PriceFormat from '../partials/PriceFormat';
import Selector from '../selector/Selector';
import {ReactComponent as Cart} from '../../assets/icons/ic-cart.svg';

const MobileAddToCart = styled.div`
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  right: 0;

  width: 100%;
  height: 80px;

  background: #ffffff;
  box-shadow: -1px -2px 4px rgba(127, 127, 127, 0.25);
  gap: 16px;
  justify-content: space-evenly;
  align-items: center;
`;

const ItemPrice = styled.h3`
  font-size: 20.3px;
  span {
    font-size: 13.5px;
    line-height: 125%;
    margin-left: 5px;
  }
`;
const ItemSelector = styled(Selector)``;
const AddToCartBtn = styled(Btn)`
  padding: 14px 20px;
`;

const options = Array.from({ length: 10 }, (_, i) => i + 1);

const AddToCartMobile: React.FC<{ workshop: Workshop }> = ({ workshop }) => {
  /** Global state */
  const { cartStore } = useStores();

  /** Local state */
  const [qty, setQty] = useState(1);

  return (
    <MobileAddToCart>
      <ItemPrice>
        <PriceFormat amount={workshop.cost} />
        <span>EUR</span>
      </ItemPrice>
      <ItemSelector position={'top'} options={options} value={qty} onSelect={setQty} />
      <AddToCartBtn onClick={() => cartStore.addToCart(workshop, qty)}>Add to <Cart /></AddToCartBtn>
    </MobileAddToCart>
  );
};

export default AddToCartMobile;
