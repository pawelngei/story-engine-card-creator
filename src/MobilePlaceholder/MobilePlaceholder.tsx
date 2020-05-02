import React from 'react'
import styled from 'styled-components'

const PlaceholderContainer = styled.div`
  display: none;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media (max-width: 767px) {
    display: flex;
  }
  @media print {
    display: none !important;
  }
`

const TextContainer = styled.div`
  padding: 10%;
`

export const MobilePlaceholder = () => (
  <PlaceholderContainer>
    <TextContainer>
      The Story Engine App is best used on tablet and desktop
    </TextContainer>
  </PlaceholderContainer>
)