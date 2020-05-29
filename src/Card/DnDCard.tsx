import React from "react";
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

export const DraggableItemTypes = {
  CARD: "card",
};

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
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DraggableItemTypes.CARD,
    drop: ({ originalIdx }: DropProps) => {
      console.log("dropped", originalIdx, cardIndex);
      moveCard(originalIdx, cardIndex);
    },
    collect: (mon) => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  });
  return (
    <div ref={drop}>
      <div ref={drag}>
        <Card {...props} />
      </div>
    </div>
  );
};
