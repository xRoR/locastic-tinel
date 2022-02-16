import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Layout, { Content, LeftColumn } from '../components/layout/Layout';
import NotFoundMessage from '../components/partials/NotFoundMessage';
import { useStores } from '../models/store-context';
import { Workshop } from '../models/workshop/workshop';
import { colors } from '../resources/colors';
import { device } from '../resources/values';
import { ReactComponent as BackIcon } from '../assets/icons/ic-back.svg';
import AddToCart from '../components/add-to-cart/AddToCart';
import useWindowWidth from '../utils/useWindowWidth';
import AddToCartMobile from '../components/add-to-cart/AddToCartMobile';

const BackButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;

  @media ${device.laptop} {
    margin-top: 60px;
  }
`;

const WorkshopImage = styled.div`
  width: 100%;
  height: 250px;

  border-radius: 8px;

  background-size: contain;
  background-color: ${colors.yellow};
  background-repeat: no-repeat;
  background-position: center center;

  margin-bottom: 40px;

  @media ${device.laptop} {
    height: 382px;
    margin-top: 60px;
  }
`;
const InfoRow = styled.div``;

const WorkshopBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;

  @media ${device.laptop} {
    flex-direction: row;
  }
`;

const WorkshopDetails = styled.div`
  flex: 1;
`;
const WorkshopTitle = styled.h1`
  color: ${colors.blue};
`;
const WorkshopAuthor = styled.h4`
  margin: 30px 0;

  span {
    font-size: 18px;
  }
`;
const WorkshopText = styled.p``;

const WorkshopCart = styled.div`
  width: 360px;
  height: 320px;

  padding: 40px;
  box-sizing: border-box;

  background: #ffffff;
  box-shadow: 1px 2px 16px rgba(127, 127, 127, 0.25);
  border-radius: 8px;
`;

const WorkshopPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isMobile } = useWindowWidth();

  /** Global state */
  const { catalogStore } = useStores();
  const { showWorkshop, getWorkshop } = catalogStore;

  /** Local state */
  const [workshop, setWorkshop] = useState<Workshop>();
  const [notFound, setNotFound] = useState(false);

  /** Fn */
  const fetchWorkshop = useCallback(async () => {
    try {
      if (!id) return;
      let workshop = showWorkshop(+id);
      if (!workshop) workshop = await getWorkshop(+id);

      if (!workshop) return setNotFound(true);

      setWorkshop(workshop);
    } catch (error) {
      // !TODO handle errors
    }
  }, [getWorkshop, id, showWorkshop]);

  const _handleBackButton = () => {
    const idx = window?.history?.state?.idx;
    if (!idx) return navigate('/');
    navigate(-1);
  };

  /** Effects */
  useEffect(() => {
    fetchWorkshop();
  }, [fetchWorkshop, id, showWorkshop]);

  /** Renders */
  if (notFound)
    return (
      <Layout>
        <NotFoundMessage>404 ;)</NotFoundMessage>
      </Layout>
    );

  if (!workshop) return null;

  return (
    <Layout>
      <LeftColumn cols={1}>
        <BackButton onClick={_handleBackButton}>
          <BackIcon />
          <span>Natrag</span>
        </BackButton>
      </LeftColumn>
      <Content cols={3}>
        <WorkshopImage style={{ backgroundImage: `url(${workshop.imageUrl})` }} />
        <WorkshopBody>
          <WorkshopDetails>
            <InfoRow></InfoRow>
            <WorkshopTitle>{workshop.title}</WorkshopTitle>
            <WorkshopAuthor>
              <span>with</span> {workshop.userId?.name || 'Our best author'}
            </WorkshopAuthor>
            <WorkshopText>{workshop.desc?.split('/n').join('<br />')}</WorkshopText>
          </WorkshopDetails>
          {isMobile ? (
            <AddToCartMobile workshop={workshop}/>
          ) : (
            <WorkshopCart>
              <AddToCart workshop={workshop} />
            </WorkshopCart>
          )}
        </WorkshopBody>
      </Content>
    </Layout>
  );
};

export default WorkshopPage;
