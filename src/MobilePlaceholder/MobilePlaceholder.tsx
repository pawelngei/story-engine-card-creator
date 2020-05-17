import React from "react";
import styled from "styled-components";
import { colors } from "../styles/colors";
import LogoPng from "../LeftMenu/logo.png";

const PlaceholderContainer = styled.div`
  display: none;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${colors.navy};
  color: ${colors.white};
  @media (max-width: 1023px) {
    display: flex;
  }
  @media print {
    display: none !important;
  }
`;

const Logo = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 40px;
`;

const TextContainer = styled.div`
  padding: 10%;
  font-size: 1.2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MobilePlaceholder = () => (
  <PlaceholderContainer>
    <TextContainer>
      <Logo src={LogoPng} />
      <p>
        <i>The Story Engine</i> Card Creator is designed for Desktops and
        landscape tablets.
      </p>
      <p>Please use on a device above 1024px width.</p>
    </TextContainer>
  </PlaceholderContainer>
);
