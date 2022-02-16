import moment from 'moment';
import React, { memo } from 'react';
import styled from 'styled-components';
import { Workshop } from '../../models/workshop/workshop';
import { colors } from '../../resources/colors';
import { spacings } from '../../resources/values';
import iconCalend from '../../assets/icons/ic-calendar.svg';
import iconTime from '../../assets/icons/ic-time.svg';
import Icon from '../icon/Icon';
import { useStores } from '../../models/store-context';
import { Link } from 'react-router-dom';

const CardBox = styled.div`
  background: #ffffff;
  border: 1px solid #f2f2f2;
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  width: 100%;
  max-width: 320px;
  flex-direction: column;
  overflow: hidden;

  &:hover {
    box-shadow: 1px 2px 16px rgba(127, 127, 127, 0.35);
  }
`;

const CardHeader = styled.div`
  position: relative;
  height: 180px;
  max-height: 180px;
`;

const CardImage = styled.div`
  width: 100%;
  height: 180px;
  background-size: contain;
  background-color: ${colors.yellow};
  background-repeat: no-repeat;
  background-position: center center;
`;

const CardBody = styled.div`
  padding: 20px 40px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const WorkshopIcon = styled.div`
  background-color: ${colors.darkerGrey};
  border-radius: 6px;
  width: 40px;
  height: 40px;
  overflow: hidden;
  position: absolute;
  margin-top: -20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WorkshopDate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0px;
`;

const WorkshopDateSegment = styled.div`
  align-items: center;
  display: flex;
  margin-right: ${spacings[4]}px;
`;

const WorkshopTitle = styled.h4`
  color: ${colors.blue};
  height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UnstyledLink = styled(Link)`
  color: inherit;
  text-decoration: inherit;
`;

const WorkshopPrice = styled.h3`
  margin: ${spacings[4]}px 0px;

  span {
    font-weight: bold;
    font-size: 15px;
    text-transform: uppercase;
    margin-left: 4px;
  }
`;

const WorkshopBtn = styled.div`
  background-color: ${colors.yellow};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 13.5px 60px;
  box-shadow: 1px 2px 8px rgba(127, 127, 127, 0.25);
  border-radius: 6px;

  font-family: Livvic;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;

  text-align: center;
  color: ${colors.darkerGrey};

  cursor: pointer;
`;

interface ColProps {
  workshop: Workshop;
}

const Card: React.FC<ColProps> = memo(({ workshop }) => {
  /** Global state */
  const { cartStore } = useStores();

  /** Renders */
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

  const _renderTitle = () => {
    const size = 45;
    return String(workshop.title).length > size ? (
      <>{String(workshop.title).slice(0, size)} ...</>
    ) : (
      workshop.title
    );
  };

  return (
    <CardBox>
      <CardHeader>
        <Link to={`workshop/${workshop.id}`}>
          <CardImage style={{ backgroundImage: `url(${workshop.imageUrl})` }} />
        </Link>
        <WorkshopIcon>
          <Icon color="#FFF" icon={workshop.category || ''} />
        </WorkshopIcon>
      </CardHeader>

      <CardBody>
        {_renderDate()}
        <WorkshopTitle>
          <UnstyledLink to={`workshop/${workshop.id}`}>{_renderTitle()}</UnstyledLink>
        </WorkshopTitle>
        <WorkshopPrice>
          {workshop.price}
          <span>eur</span>
        </WorkshopPrice>
        <WorkshopBtn onClick={() => cartStore.addToCart(workshop)}>Add to cart</WorkshopBtn>
      </CardBody>
    </CardBox>
  );
});

export default Card;
