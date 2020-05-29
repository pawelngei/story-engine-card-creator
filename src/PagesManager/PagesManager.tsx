import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { Page } from "../Page/Page";
import { CardType } from "../Card/Card";
import { DisplayOptions } from "../App";
import { maxZoom } from "../utils/constants";

const CARDS_PER_PAGE = 12;

type PagesManagerProps = {
  cards: CardType[];
  setActiveCardIdx: (index: number) => void;
  displayOptions: DisplayOptions;
  activeCardIdx: number;
  moveCard: (originalIdx: number, newIdx: number) => void;
};

const PageScrollContainer = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  @media print {
    overflow: visible;
  }
`;

const InnerScrollContainer = styled.div<{ multiplier: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  width: 100%;
  height: 100%;
  transform-origin: top center;
  ${({ multiplier }) => `transform: scale(${multiplier});`}
  @media print {
    display: block;
    transform: none;
  }
`;

const TwoPageWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  @supports (-moz-appearance: none) {
    @media print {
      display: block;
    }
  }
`;

const PageWrapper = styled.div`
  display: inline-block;
  margin: 20px 40px; /* need to be px, not percent */
  &:first-of-type {
    margin-top: 40px;
  }
  &:last-of-type {
    margin-bottom: 40px;
  }
  @media print {
    margin: 0 !important;
  }
`;

const BackPageWrapper = styled(PageWrapper)<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "inline-block" : "none")};
  @media print {
    display: inline-block !important;
  }
`;

export const PagesManager = ({
  cards,
  setActiveCardIdx,
  displayOptions,
  activeCardIdx,
  moveCard,
}: PagesManagerProps) => {
  const [widthMultiplier, setWidthMultiplier] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { displayBacks, frontQuality, backQuality } = displayOptions;
  const numberOfPages = Math.ceil(cards.length / CARDS_PER_PAGE);
  const pages = Array.from(Array(numberOfPages).keys()).map((i) => {
    return cards.slice(i * CARDS_PER_PAGE, (i + 1) * CARDS_PER_PAGE);
  });
  useEffect(() => {
    const updateWidth = () => {
      const containerWidth = containerRef.current?.clientWidth || 0;
      const pageWidth = 795.69; // pixels for 210mm, A4
      const paddedWidth = pageWidth * 1.1;
      const multiplier = containerWidth / paddedWidth;
      if (multiplier) {
        const maxedMultiplier = multiplier > maxZoom ? maxZoom : multiplier;
        setWidthMultiplier(maxedMultiplier);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);
  return (
    <PageScrollContainer ref={containerRef}>
      <InnerScrollContainer multiplier={widthMultiplier}>
        {pages.map((cardsOnPage, index) => {
          return (
            <TwoPageWrapper key={`page-set-${index}`}>
              <PageWrapper key={`front-page-${index}`}>
                <Page
                  offsetIndex={index * CARDS_PER_PAGE}
                  activeCardIdx={activeCardIdx}
                  cards={cardsOnPage}
                  setActiveCard={setActiveCardIdx}
                  quality={frontQuality}
                  moveCard={moveCard}
                />
              </PageWrapper>
              <BackPageWrapper
                key={`back-page-${index}`}
                visible={displayBacks}
              >
                <Page
                  offsetIndex={index * CARDS_PER_PAGE}
                  activeCardIdx={activeCardIdx}
                  cards={cardsOnPage}
                  setActiveCard={setActiveCardIdx}
                  quality={backQuality}
                  moveCard={moveCard}
                  backs
                />
              </BackPageWrapper>
            </TwoPageWrapper>
          );
        })}
      </InnerScrollContainer>
    </PageScrollContainer>
  );
};
