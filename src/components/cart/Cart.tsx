import { useDrag } from '@use-gesture/react';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo } from 'react';
import { animated, config, useSpring, useTransition } from 'react-spring';
import styled from 'styled-components';
import { useStores } from '../../models/store-context';
import { colors } from '../../resources/colors';
import useScrollLock from '../../utils/useScrollLock';
import useWindowWidth from '../../utils/useWindowWidth';
import PriceFormat from '../partials/PriceFormat';
import CartHeader from './CartHeader';
import CartItem from './CartItem';

const PANEL_WIDTH = 375;
const WOBBLY_WIDTH = 80;
const CARD_HEADER_HEIGHT = 90;

interface PanelProps {
  readonly width: number;
  readonly $shown?: boolean;
  readonly isMobile?: boolean;
}

const Overlay = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  background-color: #ffffffa0;
`;

const Panel = styled(animated.div)<PanelProps>`
  position: fixed;
  pointer-events: all;
  background-color: white;
  box-shadow: ${({ $shown }) => ($shown ? '-1px -2px 16px rgba(127, 127, 127, 0.25)' : 'none')};

  height: 100%;
  z-index: 98;
  top: 0;
  width: ${({ width }: any) => width + WOBBLY_WIDTH}px;
  right: -${({ width }: any) => width + WOBBLY_WIDTH}px;

  touch-action: pan-y;
  overflow: hidden;
  padding-right: ${WOBBLY_WIDTH + 20 * 2}px;
  box-sizing: border-box;
`;

const CartWrapper = styled.div`
  width: 100%;
  margin-left: 20px;
  margin-bottom: 20px;
`;
interface CardBodyProps {
  readonly isMobile?: boolean;
}
const CartBody = styled.div<CardBodyProps>`
  height: calc(var(--vp-height) - ${CARD_HEADER_HEIGHT}px);
  overflow: hidden;
  overflow-y: auto;
  margin-bottom: 20px;

  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 8px;
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border: none;
    background-color: transparent;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: ${colors.lightGrey};
  }
`;

const CartTotal = styled.div`
  span {
    font-size: 15px;
    text-transform: uppercase;
  }
`;

const CartAmount = styled.h2`
  span {
    font-size: 27px;
  }
`;

const CartBtn = styled.div`
  width: 300px;
  height: 60px;
  background: ${colors.blue};
  color: #fff;
  box-shadow: 1px 2px 8px rgba(127, 127, 127, 0.25);
  border-radius: 6px;
  margin: 40px auto 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: bold;
  font-size: 18.4px;

  cursor: pointer;
`;

const Cart: React.FC<{
  withOverlay?: boolean;
  withScrollLock?: boolean;
}> = observer(({ withOverlay = false, withScrollLock = false }) => {
  const { isMobile, width: windowWidth } = useWindowWidth();
  
  /** Global state */
  const { cartStore } = useStores();
  const { isOpened, items, itemsCount } = cartStore;

  /** State */
  const panelWidth = useMemo(() => (isMobile ? windowWidth : PANEL_WIDTH), [isMobile, windowWidth]);

  /** Animations */
  const [{ right }, api] = useSpring(() => ({ right: -(panelWidth + WOBBLY_WIDTH) }));

  const open = useCallback(() => {
    api.start({ right: -WOBBLY_WIDTH, immediate: false });
  }, [api]);

  const close = useCallback(
    (velocity = 0) => {
      api.start({
        right: -(panelWidth + WOBBLY_WIDTH),
        immediate: false,
        config: { ...config.stiff, velocity },
      });
    },
    [api, panelWidth]
  );

  const bind = useDrag(
    ({ last, movement: [mx], delta: [dx], cancel }) => {
      if (mx < 0) return cancel();
      if (right.get() > -WOBBLY_WIDTH) return cancel();

      if (last) {
        right.get() < -(panelWidth / 2) ? cartStore.closeCart() : open();
      } else api.start({ right: right.get() - dx, immediate: true });
    },
    { from: () => [0, right.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true }
  );

  const overlayTransition = useTransition(isOpened, {
    config: isOpened ? { ...config.stiff } : { duration: 150 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    key: 'overlay',
  });

  /** Effects */
  useEffect(() => {
    isOpened ? open() : close();
  }, [isOpened, open, close]);
  
  useScrollLock(isMobile ? isOpened : (withScrollLock ? isOpened : false), 'cart');

  /** Renders */
  const _renderOverlay = () => {
    if (!withOverlay) return null;

    return overlayTransition(
      (style, item, { key }) => item && <Overlay style={style} onClick={() => cartStore.closeCart()} />
    );
  };

  return (
    <>
      <Panel id="panel" {...bind()} width={panelWidth} $shown={isOpened} style={{ right }}>
        <CartWrapper>
          <CartHeader></CartHeader>
          {itemsCount > 0 && (
            <CartBody>
              {items.map((item, index) => (
                <CartItem item={item} key={`cart_item_${index}`} />
              ))}
              <CartTotal>
                <span>Subtotal</span>
                <CartAmount>
                  <PriceFormat amount={cartStore.cartTotal} />
                  <span>EUR</span>
                </CartAmount>
              </CartTotal>
              <CartBtn onClick={() => cartStore.startCheckout()}>Checkout</CartBtn>
            </CartBody>
          )}
        </CartWrapper>
      </Panel>
      {_renderOverlay()}
    </>
  );
});

export default Cart;
