import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as DeleteIcon } from '../../assets/icons/ic-delete.svg';
import { useStores } from '../../models/store-context';
import { Workshop } from '../../models/workshop/workshop';
import { colors } from '../../resources/colors';
import { margins } from '../../resources/values';
import PriceFormat from '../partials/PriceFormat';
import Selector from '../selector/Selector';

const ItemWrapper = styled.div`
  height: 150px;
  display: flex;
  flex-direction: row;
  background: ${colors.lighterGrey};
  border-radius: 6px;
  margin-bottom: 20px;
  /* overflow: hidden; */
  touch-action: none;
`;

const ItemImage = styled.div`
  width: 110px;
  height: 150px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 6px 0 0 6px;
  min-width: 110px;
`;

const ItemBody = styled.div`
  flex: 1;
  padding: ${margins.defult}px;
`;

const ItemTitle = styled.h4`
  color: ${colors.blue};
  height: 70px;
  overflow: hidden;
  font-size: 18.9px;
  line-height: 125%;
  flex: 1;
`;
const ItemDetails = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ItemCost = styled.h3`
  font-size: 20.3px;
  span {
    font-weight: bold;
    font-size: 13.5px;
    line-height: 125%;
    margin-left: 5px;
  }
`;

const ItemHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Delete = styled(DeleteIcon)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const options = Array.from({ length: 10 }, (_, i) => i + 1);

const CartItem: React.FC<{ item: Workshop }> = observer(({ item }) => {
  /** Global state */
  const { cartStore } = useStores();

  /** Fn */
  const updateQty = (qty: number) => {
    item.setQty(qty);
  };

  const removeItem = () => {
    cartStore.removeFromCart(item);
  };

  /** Renders */
  const _renderTitle = () => {
    const size = 30;
    return String(item.title).length > size ? <>{String(item.title).slice(0, size)} ...</> : item.title;
  }

  return (
    <ItemWrapper>
      <ItemImage style={{ backgroundImage: `url(${item.imageUrl})` }} />
      <ItemBody>

        <ItemHeader>
          <ItemTitle>{_renderTitle()}</ItemTitle>
          <Delete onClick={removeItem}/>
        </ItemHeader>

        <ItemDetails>
          <Selector value={item.qty || 1} options={options} onSelect={updateQty} />
          <ItemCost>
            <PriceFormat amount={item.cost} />
            <span>EUR</span>
          </ItemCost>
        </ItemDetails>

      </ItemBody>
    </ItemWrapper>
  );
});

export default CartItem;
