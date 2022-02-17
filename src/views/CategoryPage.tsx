import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/card/Card';
import { CategoryFilter } from '../components/category-filter';
import { Col } from '../components/layout/Col';
import Layout, { Content, LayoutContainer, LeftColumn } from '../components/layout/Layout';
import { useStores } from '../models/store-context';
import { colors } from '../resources/colors';
import { device, spacings } from '../resources/values';
import useWindowWidth from '../utils/useWindowWidth';

const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 40px;
  justify-content: center;
  margin-top: ${spacings[4]}px;
  grid-auto-rows: 1fr;

  @media ${device.laptop} {
    justify-content: flex-start;
  }
`;

const CategoryTitle = styled.div`
  color: ${colors.darkerGrey};
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-end;

  @media ${device.laptop} {
    height: 140px;
  }
`;

const SubTitle = styled.div`
  color: ${colors.lightGrey};
`;

const MoreBtn = styled.div`
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  margin-left: 20px;
  span {
    border-bottom: 2px solid ${colors.blue};
  }
`;

const CategoryPage = observer(() => {
  /** Hooks */
  const { isMobile } = useWindowWidth();

  /** Global state */
  const { catalogStore } = useStores();
  const { workshops, totalWorkshops, pagination } = catalogStore;

  /** Effects */
  useEffect(() => {
    async function fetchData() {
      if (totalWorkshops === 0) await catalogStore.getWorkshops();
      await catalogStore.getCategories();
    }

    fetchData();
  }, [catalogStore, totalWorkshops]);

  return (
    <Layout>
      <LayoutContainer>
        <LeftColumn cols={1}>
          <CategoryTitle>{!isMobile && <SubTitle>Filter by category:</SubTitle>}</CategoryTitle>
          <CategoryFilter />
        </LeftColumn>
        <Content cols={3}>
          <CategoryTitle>
            <h2>Workshops</h2>
            <SubTitle>Displayed: {totalWorkshops}</SubTitle>
          </CategoryTitle>
          <CategoryList>
            {workshops.map((workshop) => (
              <Card key={`workshop_${workshop.id}`} workshop={workshop} />
            ))}
          </CategoryList>
          {pagination?.next && (
            <Col style={{ marginLeft: 'auto' }} cols={1}>
              <MoreBtn onClick={() => catalogStore.fetchNextWorkshops()}>
                <span>Load More</span>
              </MoreBtn>
            </Col>
          )}
        </Content>
      </LayoutContainer>
    </Layout>
  );
});

export default CategoryPage;
