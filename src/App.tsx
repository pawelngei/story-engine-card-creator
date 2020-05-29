import "@openfonts/josefin-sans_all";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CardType } from "./Card/Card";
import { PagesManager } from "./PagesManager/PagesManager";
import { LeftMenu } from "./LeftMenu/LeftMenu";
import { MobilePlaceholder } from "./MobilePlaceholder/MobilePlaceholder";
import styled from "styled-components";
import { exportCSV, importCSV } from "./utils/csv";
import {
  emptyCard,
  defaultCards,
  defaultOptions,
  Quality,
} from "./utils/constants";

export type DisplayOptions = {
  displayBacks: boolean;
  frontQuality: Quality;
  backQuality: Quality;
};

const AppContainer = styled.div`
  display: block;
`;

const TabletDesktopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  @media (max-width: 1023px) {
    display: none;
  }
  @media print {
    display: block;
  }
`;

const App = () => {
  const savedCards = JSON.parse(window.localStorage.getItem("cards") || "null");
  const savedOptions = JSON.parse(
    window.localStorage.getItem("displayOptions") || "null"
  );
  const [cards, setCards] = useState<CardType[]>(savedCards || defaultCards);
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const [displayOptions, setDisplayOptions] = useState<DisplayOptions>(
    savedOptions || defaultOptions
  );
  const setAndSaveCards = (cards: CardType[]) => {
    setCards(cards);
    window.localStorage.setItem("cards", JSON.stringify(cards));
  };
  const setAndSaveOptions = (options: DisplayOptions) => {
    setDisplayOptions(options);
    window.localStorage.setItem("displayOptions", JSON.stringify(options));
  };
  const setCard = (changedCard: CardType) => {
    setAndSaveCards([
      ...cards.slice(0, activeCardIdx),
      changedCard,
      ...cards.slice(activeCardIdx + 1),
    ]);
  };
  const createNewCard = () => {
    const lastType = cards[activeCardIdx].type;
    setAndSaveCards([
      ...cards.slice(0, activeCardIdx + 1),
      {
        ...emptyCard,
        type: lastType,
      },
      ...cards.slice(activeCardIdx + 1),
    ]);
    setActiveCardIdx(activeCardIdx + 1);
  };
  const deleteCard = () => {
    if (cards.length === 1) {
      setAndSaveCards([emptyCard]);
    } else {
      setAndSaveCards([
        ...cards.slice(0, activeCardIdx),
        ...cards.slice(activeCardIdx + 1),
      ]);
    }
    const newIndex = activeCardIdx === 0 ? 0 : activeCardIdx - 1;
    setActiveCardIdx(newIndex);
  };
  const moveCard = (originalIdx: number, newIdx: number) => {
    const extraCards = [
      ...cards.slice(0, newIdx),
      cards[originalIdx],
      ...cards.slice(newIdx),
    ];
    const removeIdx = originalIdx < newIdx ? originalIdx : originalIdx + 1;
    const updatedCards = [
      ...extraCards.slice(0, removeIdx),
      ...extraCards.slice(removeIdx + 1),
    ];
    setAndSaveCards(updatedCards);
    const newActiveIdx = newIdx < cards.length - 1 ? newIdx : newIdx - 1;
    setActiveCardIdx(newActiveIdx);
  };
  const exportCards = () => {
    const element = document.createElement("a");
    const csvContent = exportCSV(cards);
    const file = new Blob([csvContent], { type: "text/csv" });
    element.href = URL.createObjectURL(file);
    element.download = "my-story-engine-cards.csv";
    document.body.appendChild(element);
    element.click();
  };
  const importCards = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target?.files?.[0];
      file?.text().then((text) => {
        try {
          setAndSaveCards(importCSV(text));
        } catch (e) {
          alert(`Wrong file imported - ${e}`);
        }
      });
    } catch (e) {
      alert("Safari imports are not supported.");
    }
  };
  const clearCards = () => {
    setAndSaveCards(defaultCards);
    setActiveCardIdx(0);
  };
  const card = cards[activeCardIdx];
  return (
    <DndProvider backend={HTML5Backend}>
      <AppContainer>
        <MobilePlaceholder />
        <TabletDesktopWrapper>
          <LeftMenu
            card={card}
            setCard={setCard}
            createNewCard={createNewCard}
            deleteCard={deleteCard}
            exportCards={exportCards}
            importCards={importCards}
            clearCards={clearCards}
            displayOptions={displayOptions}
            setDisplayOptions={setAndSaveOptions}
          />
          <PagesManager
            cards={cards}
            setActiveCardIdx={setActiveCardIdx}
            displayOptions={displayOptions}
            activeCardIdx={activeCardIdx}
            moveCard={moveCard}
          />
        </TabletDesktopWrapper>
      </AppContainer>
    </DndProvider>
  );
};

export default App;
