import React from 'react'
import styled from 'styled-components'
import { device } from '../../resources/values'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import { Col } from './Col'

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: 0 auto;

  min-height: calc(100vh - 90px - 80px);

  @media ${device.laptop} {
    flex-direction: row;
  }
`
export const LeftColumn = styled(Col)`
`
export const Content = styled(Col)`
  flex: 1;
  padding-top: 0;

  @media ${device.laptop} {
    padding-top: 20px;
  }
`

const Layout: React.FC = ({children}) => {
  return (
    <>
      <Header />
      <LayoutContainer>
        {children}
      </LayoutContainer>
      <Footer />
    </>
  )
}

export default Layout