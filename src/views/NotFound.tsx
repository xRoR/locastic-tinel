import React from 'react'
import Layout, { LayoutContainer } from '../components/layout/Layout'
import NotFoundMessage from '../components/partials/NotFoundMessage'



const NotFound = () => {
  return (
    <Layout>
      <LayoutContainer>
      <NotFoundMessage>404 ;)</NotFoundMessage>
      </LayoutContainer>
    </Layout>
  )
}

export default NotFound