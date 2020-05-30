import React from "react";
import styled from "styled-components";
import { useDrag, useDrop } from "react-dnd";
import { MoveCard } from "../App";
import { Card, CardProps } from "./Card";

type DnDCardProps = CardProps & {
  cardIndex: number;
  moveCard: MoveCard;
};

export type DropProps = {
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
    transform: none;
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
      moveCard(originalIdx, cardIndex, true);
    },
    collect: (mon) => ({
      isOverRight: !!mon.isOver(),
    }),
  });
  // The cards on the back side are displayed in the reverse order
  const isBack = props.back;
  return (
    <DragArea ref={drag}>
      <LeftDropArea ref={isBack ? dropRight : dropLeft} />
      <RightDropArea ref={isBack ? dropLeft : dropRight} />
      <MovableCard
        isDragging={isDragging}
        moveLeft={isBack ? isOverRight : isOverLeft}
        moveRight={isBack ? isOverLeft : isOverRight}
      >
        <Card {...props} />
      </MovableCard>
    </DragArea>
  );
};
