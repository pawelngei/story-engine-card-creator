import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { CardType } from "../Card/Card";
import { colors } from "../styles/colors";
import {
  typeOptions,
  twoSectionCards,
  Quality,
  frontQualityOptions,
  backQualityOptions,
} from "../utils/constants";
import { DisplayOptions } from "../App";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import LogoPng from "./logo.png";

type LeftMenuProps = {
  card: CardType;
  setCard: (card: CardType) => void;
  createNewCard: () => void;
  deleteCard: () => void;
  exportCards: () => void;
  importCards: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearCards: () => void;
  displayOptions: DisplayOptions;
  setDisplayOptions: (displayOptions: DisplayOptions) => void;
};

const theme = createMuiTheme({
  typography: {
    button: {
      fontSize: "1em",
      fontFamily: "Josefin Sans",
      fontWeight: 700,
    },
  },
  palette: {
    primary: {
      main: colors.gold,
      contrastText: colors.white,
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

const LeftMenuContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 700px;
  border-right: 1px solid black;
  background: ${colors.navy};
  color: ${colors.white};
  overflow: auto;
  @media print {
    display: none;
  }
  @media (max-width: 1279px) {
    width: 600px;
  }
`;

const InnerContainer = styled.div`
  padding: 70px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Josefin Sans", sans-serif;
  font-weight: 500;
  a {
    text-decoration: none;
    color: ${colors.gold};
  }
  @media (max-width: 1279px) {
    padding: 40px;
  }
`;

const SectionContainer = styled.div`
  padding: 28px 0;
  width: 100%;
  border-bottom: 2px solid ${colors.white};
  &:first-of-type {
    padding-top: 0;
  }
  &:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 2.2em;
`;

const Logo = styled.img`
  width: 160px;
  height: 160px;
  margin-right: 20px;
`;

const TextContainer = styled.div`
  font-size: 1.2em;
  margin-bottom: 20px;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const EmTextContainer = styled(TextContainer)`
  font-size: 1em;
  font-style: italic;
`;

const Subtitle = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
`;

const ButtonLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 28px;
`;

const NoPadButtonLine = styled(ButtonLine)`
  margin-bottom: 0;
`;

const SelectLine = styled.div`
  font-size: 1.2em;
  margin-bottom: 8px;
  display: inline-flex;
  align-items: center;
`;

const FileInputWrapper = styled.div`
  /* Safari cannot process files from display: none */
  width: 0;
  height: 0;
  overflow: hidden;
`;

const InputContainer = styled.div``;

const StyledTextarea = styled.textarea`
  font-family: "Josefin Sans", sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  width: 100%;
`;

const StyledSelect = styled.select`
  font-family: "Josefin Sans", sans-serif;
  font-size: 1.2em;
  outline: none;
  background: none;
  color: ${colors.gold};
  padding: 2px;
  border: 2px solid ${colors.gold};
  border-radius: 5px;
`;

const LinksContainer = styled(TextContainer)`
  display: flex;
  flex-direction: row;
`;

const LinksSection = styled.div`
  display: inline-block;
  width: 50%;
  padding-left: 10px;
`;

const LinksList = styled.ul`
  margin: 8px 0 0;
  > li {
    margin-top: 4px;
  }
`;

export const LeftMenu = ({
  card,
  setCard,
  createNewCard,
  deleteCard,
  exportCards,
  importCards,
  clearCards,
  displayOptions,
  setDisplayOptions,
}: LeftMenuProps) => {
  const { top, bottom, left, right, type } = card;
  const setCardValue = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = event.target.value;
    const key = event.target.name;
    const otherOptions =
      key === "type" && twoSectionCards.indexOf(value) !== -1
        ? { left: "", right: "" }
        : {};
    setCard({
      ...card,
      [key]: value,
      ...otherOptions,
    });
  };
  const { displayBacks, backQuality, frontQuality } = displayOptions;
  const displayLeftRifght = twoSectionCards.indexOf(type) === -1;
  return (
    <LeftMenuContainer>
      <ThemeProvider theme={theme}>
        <InnerContainer>
          <SectionContainer>
            <LogoContainer>
              <Logo src={LogoPng} />
              <Title>
                <i>THE STORY ENGINE</i>
                <br />
                CARD CREATOR
              </Title>
            </LogoContainer>
            <TextContainer>
              Learn more about <i>The Story Engine</i> at{" "}
              <a href="https://storyenginedeck.com/">storyenginedeck.com</a>.
            </TextContainer>
          </SectionContainer>
          <SectionContainer>
            <Subtitle>Create Cards</Subtitle>
            <ButtonLine>
              <Button
                variant="contained"
                color="primary"
                onClick={() => createNewCard()}
              >
                Create new card
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => deleteCard()}
              >
                Delete this card
              </Button>
            </ButtonLine>
            <SelectLine>
              Card type:&nbsp;
              <StyledSelect
                name="type"
                value={type}
                onChange={(e) => setCardValue(e)}
              >
                {typeOptions.map((option, i) => (
                  <option key={`select-${i}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </StyledSelect>
            </SelectLine>
            <InputContainer>
              <StyledTextarea
                name="bottom"
                placeholder="bottom"
                value={bottom}
                onChange={(e) => setCardValue(e)}
              />
              <StyledTextarea
                name="top"
                placeholder="top"
                value={top}
                onChange={(e) => setCardValue(e)}
              />
              {displayLeftRifght ? (
                <>
                  <StyledTextarea
                    name="left"
                    placeholder="left"
                    value={left}
                    onChange={(e) => setCardValue(e)}
                  />
                  <StyledTextarea
                    name="right"
                    placeholder="right"
                    value={right}
                    onChange={(e) => setCardValue(e)}
                  />
                </>
              ) : null}
            </InputContainer>
          </SectionContainer>
          <SectionContainer>
            <Subtitle>Design Deck</Subtitle>
            <TextContainer>
              Card fronts:&nbsp;
              <StyledSelect
                name="frontQuality"
                value={frontQuality}
                onChange={(e) =>
                  setDisplayOptions({
                    ...displayOptions,
                    frontQuality: e.target.value as Quality,
                  })
                }
              >
                {frontQualityOptions.map((option, i) => (
                  <option key={`select-back-${i}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </StyledSelect>
              &nbsp; Card backs:&nbsp;
              <StyledSelect
                name="backQuality"
                value={backQuality}
                onChange={(e) =>
                  setDisplayOptions({
                    ...displayOptions,
                    backQuality: e.target.value as Quality,
                  })
                }
              >
                {backQualityOptions.map((option, i) => (
                  <option key={`select-back-${i}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </StyledSelect>
            </TextContainer>
            <TextContainer>
              <label htmlFor="backs">Display card backs on screen?&nbsp;</label>
              <input
                type="checkbox"
                id="backs"
                name="backs"
                checked={displayBacks}
                onChange={() =>
                  setDisplayOptions({
                    ...displayOptions,
                    displayBacks: !displayBacks,
                  })
                }
              />
            </TextContainer>
          </SectionContainer>
          <SectionContainer>
            <Subtitle>Manage Deck</Subtitle>
            <NoPadButtonLine>
              <Button
                variant="contained"
                color="primary"
                onClick={() => window.print()}
              >
                Print
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => clearCards()}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => exportCards()}
              >
                Export CSV
              </Button>
              <Button variant="contained" color="primary" component="label">
                Import CSV
                <FileInputWrapper>
                  <input type="file" onChange={(e) => importCards(e)} />
                </FileInputWrapper>
              </Button>
            </NoPadButtonLine>
          </SectionContainer>
          <SectionContainer>
            <TextContainer>
              Webapp developed by Paweł Ngei. <i>The Story Engine Deck</i>{" "}
              created by Peter Chiykowski.
            </TextContainer>
            <LinksContainer>
              <LinksSection>
                <b>More from Peter:</b>
                <LinksList>
                  <li>
                    <a href="http://storyenginedeck.com/cardcreationguide">
                      Card creation guide
                    </a>
                  </li>
                  <li>
                    <a href="http://storyenginedeck.com/tutorial">
                      Deck tutorial
                    </a>
                  </li>
                  <li>
                    <a href="http://storyenginedeck.com/">
                      Buy <i>The Story Engine</i>
                    </a>
                  </li>
                </LinksList>
              </LinksSection>
              <LinksSection>
                <b>More from Paweł:</b>
                <LinksList>
                  <li>
                    <a href="https://alxd.org/">solarpunk | hacker blog</a>
                  </li>
                  <li>
                    <a href="https://twitter.com/PawelNgei">Twitter</a>
                  </li>
                  <li>
                    <a href="https://github.com/pawelngei/story-engine-card-creator">
                      This project on Github
                    </a>
                  </li>
                </LinksList>
              </LinksSection>
            </LinksContainer>
            <EmTextContainer>
              The Story Engine and The Story Engine logo are trademarks of Peter
              Chiykowski. The Story Engine is not related to Story Engine, which
              is a Precis Intermedia trademark and game (
              <a href="https://pigames.net/">pigames.net</a>).
            </EmTextContainer>
            <EmTextContainer>
              This webapp may not be used for commercial purposes.
            </EmTextContainer>
          </SectionContainer>
        </InnerContainer>
      </ThemeProvider>
    </LeftMenuContainer>
  );
};
