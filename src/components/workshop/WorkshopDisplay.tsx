import moment from 'moment';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Workshop } from '../../models/workshop/workshop';
import { colors } from '../../resources/colors';
import { device } from '../../resources/values';
import useWindowWidth from '../../utils/useWindowWidth';
import AddToCart from '../add-to-cart/AddToCart';
import AddToCartMobile from '../add-to-cart/AddToCartMobile';
import iconCalend from '../../assets/icons/ic-calendar.svg';
import iconTime from '../../assets/icons/ic-time.svg';
import Icon from '../icon/Icon';

const WorkshopImage = styled.div`
  width: 100%;
  height: 250px;

  border-radius: 8px;

  background-size: contain;
  background-color: ${colors.yellow};
  background-repeat: no-repeat;
  background-position: center center;

  margin-bottom: 20px;

  @media ${device.laptop} {
    height: 382px;
    margin-top: 60px;
    margin-bottom: 40px;
  }
`;
const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

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

const WorkshopDate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0px;

  font-size: 18px;
  font-weight: bold;
`;

const WorkshopDateSegment = styled.div`
  align-items: center;
  display: flex;
  margin-right: 20px;
`;

const WorkshopIcon = styled.div`
  background-color: ${colors.darkerGrey};
  border-radius: 6px;
  width: 40px;
  height: 40px;
  overflow: hidden;
  position: absolute;
  margin-top: -45px;
  right: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${device.laptop} {
    position: relative;
    margin: 0;
    margin-right: 20px;
    right: 0;
  }
`;

const WorkshopDisplay: React.FC<{ workshop: Workshop }> = ({ workshop }) => {
  const { isMobile } = useWindowWidth();

  const _renderDate = () => {
    const date = moment(workshop.date);
    return (
      <WorkshopDate>
        <WorkshopDateSegment>
          <img src={iconCalend} alt="company logo" />
          &nbsp;
          {date.format('DD.M.YYYY')}.
        </WorkshopDateSegment>
        <WorkshopDateSegment>
          <img src={iconTime} alt="company logo" />
          &nbsp;
          {date.format('hh:mm')}h
        </WorkshopDateSegment>
      </WorkshopDate>
    );
  };

  return (
    <>
      <WorkshopImage style={{ backgroundImage: `url(${workshop.imageUrl})` }} />
      <WorkshopBody>
        <WorkshopDetails>
          <InfoRow>
            <WorkshopIcon>
              <Icon color="#FFF" icon={workshop.category || ''} />
            </WorkshopIcon>
            {_renderDate()}
          </InfoRow>
          <WorkshopTitle>{workshop.title}</WorkshopTitle>
          <WorkshopAuthor>
            <span>with</span> {workshop.userId?.name || 'Our best author'}
          </WorkshopAuthor>
          <WorkshopText>{workshop.desc?.split('/n').join('<br />')}</WorkshopText>
        </WorkshopDetails>
        {isMobile ? (
          <AddToCartMobile workshop={workshop} />
        ) : (
          <WorkshopCart>
            <AddToCart workshop={workshop} />
          </WorkshopCart>
        )}
      </WorkshopBody>
    </>
  );
};

export default WorkshopDisplay;
