import React from 'react'
import styled from 'styled-components'
import { colors } from '../../resources/colors'
import { Col } from '../layout/Col'

const FooterWrapepr = styled.div`
    display: flex;
    align-items: center;

    width: 100%;
    height: 80px;
    background-color: ${colors.lighterGrey};
`

const Footer = () => {
  return (
    <FooterWrapepr>
        <Col cols={1}>© TINEL Meetup 2020.</Col>
    </FooterWrapepr>
  )
}

export default Footer