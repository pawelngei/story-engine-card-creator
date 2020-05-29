import React from "react";
import styled from "styled-components";
import { useDrag, useDrop } from "react-dnd";
import { Card, CardProps } from "./Card";

type DnDCardProps = CardProps & {
  moveCard: (originalIdx: number, newIdx: number) => void;
  cardIndex: number;
};

type DropProps = {
  type: string;
  originalIdx: number;
};

type MovableCardProps = {
  moveLeft?: boolean;
  moveRight?: boolean;
  isDragging?: boolean;
};

export const DraggableItemTypes = {
  CARD: "card",
};

const MovableCard = styled.div<MovableCardProps>`
  transition: transform 200ms ease-in;
  ${({ moveLeft }) =>
    moveLeft
      ? `
    transform: translateX(20%);
  `
      : ``}
  ${({ moveRight }) =>
    moveRight
      ? `
    transform: translateX(-20%);
  `
      : ``}
  ${({ isDragging }) =>
    isDragging
      ? `
    display: none;
  `
      : ``}
  @media print {
    border: none !important;
    display: block;
  }
`;

const DragArea = styled.div`
  position: relative;
`;

const LeftDropArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 50%;
  z-index: 2;
`;

const RightDropArea = styled(LeftDropArea)`
  left: auto;
  right: 0;
`;

export const DnDCard = ({ moveCard, cardIndex, ...props }: DnDCardProps) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: DraggableItemTypes.CARD,
      originalIdx: cardIndex,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const [{ isOverLeft }, dropLeft] = useDrop({
    accept: DraggableItemTypes.CARD,
    drop: ({ originalIdx }: DropProps) => {
      moveCard(originalIdx, cardIndex);
    },
    collect: (mon) => ({
      isOverLeft: !!mon.isOver(),
    }),
  });
  const [{ isOverRight }, dropRight] = useDrop({
    accept: DraggableItemTypes.CARD,
    drop: ({ originalIdx }: DropProps) => {
      moveCard(originalIdx, cardIndex + 1);
    },
    collect: (mon) => ({
      isOverRight: !!mon.isOver(),
    }),
  });
  return (
    <DragArea ref={drag}>
      <LeftDropArea ref={dropLeft} />
      <RightDropArea ref={dropRight} />
      <MovableCard
        isDragging={isDragging}
        moveLeft={isOverLeft}
        moveRight={isOverRight}
      >
        <Card {...props} />
      </MovableCard>
    </DragArea>
  );
};
