import { observer } from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { animated, config, useTransition } from 'react-spring';
import styled from 'styled-components';
import { ReactComponent as Close } from '../../assets/icons/ic-close.svg';
import { useStores } from '../../models/store-context';
import { device } from '../../resources/values';
import useScrollLock from '../../utils/useScrollLock';
import Btn from '../partials/Btn';
import CheckoutForm from './CheckoutForm';

const Overlay = styled(animated.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  pointer-events: all;
  overflow-y: scroll;
  background-color: #06151ca0;
`;

const Modal = styled(animated.div)`
  background: #fff;
  max-width: 780px;
  height: calc(100vh - 10px);

  border-radius: 10px;
  padding: 40px;
  margin: 10px auto;

  position: absolute;
  left: 0;
  right: 0;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  @media ${device.laptop} {
    padding: 90px;
    height: auto;
  }
`;

const CheckoutHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 35px;
  width: 100%;
`

const Checkout = observer(() => {
  const navigate = useNavigate();

  /** Global state */
  const { cartStore } = useStores();
  const { inCheckout, sendOrder } = cartStore;
  
  /** Local state */
  const [submitted, setSubmitted] = useState(false);

  /** Fn */
  const handleSubmit = useCallback(
    async (values) => {
      const {kind} = await sendOrder(values);
      if (kind === 'ok') setSubmitted(true);
    },
    [sendOrder],
  )

  const handleBack = () => {
    navigate("/", { replace: true });
    cartStore.cancelCheckout();
    setSubmitted(false);
  }
  
  /** Animations */
  const modalTransition = useTransition(inCheckout, {
    config: inCheckout ? { ...config.stiff } : { duration: 150 },
    from: { opacity: 0, transform: "translateY(-40px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(-40px)" },
    key: 'checkoutModal'
  });

  /** Effects */
  useScrollLock(inCheckout);

  return (
    <>
      {modalTransition(
        (style, item, { key }) =>
         {
          return item && (
            <Overlay key={`el_${key}`} style={{ opacity: style.opacity }} >
              <Modal style={style}>
                <CheckoutHeader>
                  <div>
                    <h2>{submitted ? 'Thank you!' : 'Checkout'}</h2>
                    <p style={{width: 300}}>What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing.</p>
                  </div>
                  {submitted ? null : (<div style={{marginLeft: 'auto'}}>
                    <Close style={{cursor: 'pointer'}} onClick={() => cartStore.cancelCheckout()}/>
                  </div>)}
                  
                </CheckoutHeader>
                {submitted ? <Btn onClick={handleBack}>Back to Shop</Btn> : <CheckoutForm onSubmit={handleSubmit}/>}
              </Modal>
            </Overlay>
          )
         }
      )}
    </>
  );
});

export default Checkout;
