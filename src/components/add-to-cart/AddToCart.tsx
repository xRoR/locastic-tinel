import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useStores } from '../../models/store-context';
import { Workshop } from '../../models/workshop/workshop';
import { colors } from '../../resources/colors';
import Btn from '../partials/Btn';
import PriceFormat from '../partials/PriceFormat';
import Selector from '../selector/Selector';

const ItemCost = styled.h2`
  margin: 20px 0 30px;
  span {
    font-weight: bold;
    font-size: 23px;
    line-height: 125%;
    margin-left: 5px;
  }
`;

const AddToCardSelctor = styled(Selector)`
  font-weight: bold;
  font-size: 20px;
`

const AddToCardBtn = styled(Btn)`
  font-size: 18px;
  text-align: center;
  flex: 1;
`

const CartBtnGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Subtotal = styled.h6`
  margin-top: 10px;
  color: ${colors.lightGrey};
  font-weight: normal;
`

const CartBtnHolder = styled.div`
  flex: 1;
`;

const options = Array.from({ length: 10 }, (_, i) => i + 1);

const AddToCart: React.FC<{ workshop: Workshop }> = observer(({ workshop }) => {
  /** Global state */
  const { cartStore } = useStores();

  /** Local state */
  const [qty, setQty] = useState(1);

  /** Fn */
  const getTottal = () => +(workshop?.price || 0) * qty;
  
  return (
    <div>
      <h5>Buy Your Ticket</h5>
      <ItemCost>
      <PriceFormat amount={workshop.cost} />
        <span>EUR</span>
      </ItemCost>
      <CartBtnGroup>
        <AddToCardSelctor value={qty} options={options} onSelect={setQty} />
        <CartBtnHolder>
          <AddToCardBtn onClick={() => cartStore.addToCart(workshop, qty)}>Add to Cart</AddToCardBtn>
          <Subtotal>Subtotal: <PriceFormat amount={getTottal()} /> EUR</Subtotal>
        </CartBtnHolder>
      </CartBtnGroup>
    </div>
  );
});

export default AddToCart;
