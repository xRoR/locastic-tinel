import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Workshop } from '../../models/workshop/workshop';
import { colors } from '../../resources/colors';
import { device } from '../../resources/values';
import Card from '../card/Card';
import { Content, LayoutContainer, LeftColumn } from '../layout/Layout';

const SimilarHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 40px;
  justify-content: center;
  grid-auto-rows: 1fr;
  margin-top: 40px;

  @media ${device.laptop} {
    justify-content: flex-start;
    margin-top: 40px;
  }
`;

const SimilarTitle = styled.h2`
  @media ${device.laptop} {
    margin-top: 80px;
  }
`;

const Similar = styled(LayoutContainer)`
  background-color: ${colors.lighterGrey};
`;
const SimilarWorkshops: React.FC<{ workshop: Workshop }> = observer(({ workshop }) => {
  /** Local state */
  const [same, setSame] = useState<Workshop[]>([]);

  /** Fn */
  const getSame = useCallback(async () => {
    setSame((await workshop.fetchWithSamecategory()) ?? []);
  }, [workshop]);

  /** Effects */
  useEffect(() => {
    getSame();
  }, [getSame]);

  if (same.length === 0) return null;

  return (
    <Similar>
      <LeftColumn cols={1}></LeftColumn>
      <Content cols={3}>
        <SimilarTitle>Similar Workshops</SimilarTitle>
        <SimilarHolder>
          {same.map((workshop, index) => (
            <Card replace key={`simillar_${index}`} workshop={workshop} />
          ))}
        </SimilarHolder>
      </Content>
    </Similar>
  );
});

export default SimilarWorkshops;
