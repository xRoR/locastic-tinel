
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as BackIcon } from '../assets/icons/ic-back.svg';
import Layout, { Content, LayoutContainer, LeftColumn } from '../components/layout/Layout';
import NotFoundMessage from '../components/partials/NotFoundMessage';
import SimilarWorkshops from '../components/similar-workshops/SimilarWorkshops';
import WorkshopDisplay from '../components/workshop/WorkshopDisplay';
import { useStores } from '../models/store-context';
import { Workshop } from '../models/workshop/workshop';
import { device } from '../resources/values';


const BackButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;

  @media ${device.laptop} {
    margin-top: 60px;
  }
`;


const WorkshopPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();


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
    console.log(window?.history);
    console.log(location);
    
    const idx = window?.history?.state?.idx;
    if (!idx) return navigate('/');
    navigate(-1);
  };

  /** Effects */
  useEffect(() => {
    fetchWorkshop();
  }, [fetchWorkshop, id, showWorkshop]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [workshop]);

  /** Renders */
  if (notFound)
    return (
      <Layout>
        <NotFoundMessage>404 ;)</NotFoundMessage>
      </Layout>
    );

  return (
    <Layout>
      <LayoutContainer>
        <LeftColumn cols={1}>
          <BackButton onClick={_handleBackButton}>
            <BackIcon />
            <span>Natrag</span>
          </BackButton>
        </LeftColumn>
        <Content cols={3}>
          {workshop && (<WorkshopDisplay workshop={workshop}/>)}
        </Content>
      </LayoutContainer>
      {workshop && (<SimilarWorkshops workshop={workshop}/>)}
    </Layout>
  );
};

export default WorkshopPage;
