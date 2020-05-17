import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../styles/colors";

type TitleAndInstructionsProps = {
  title: string;
  instructions: string[];
};

const Container = styled.div`
  margin-bottom: 24px;
`;

const Subtitle = styled.h2`
  display: inline-flex;
  align-items: center;
  margin: 0;
`;

const InstructionsButton = styled.span`
  font-size: 1.2rem;
  > span {
    cursor: pointer;
    color: ${colors.gold};
    &:hover {
      color: ${colors.lightGold};
    }
  }
`;

const InstructionsBox = styled.div<{ visible: boolean }>`
  font-size: 1.2em;
  padding-left: 20px;
  margin-bottom: 20px;
  display: ${({ visible }) => (visible ? "block" : "none")};
`;

export const TitleAndInstructions = ({
  title,
  instructions,
}: TitleAndInstructionsProps) => {
  const [showInstructions, setShowInstructions] = useState(false);
  return (
    <Container>
      <Subtitle>
        {title}&nbsp;
        <InstructionsButton>
          [
          <span onClick={() => setShowInstructions(!showInstructions)}>
            {showInstructions ? "hide instructions" : "show instructions"}
          </span>
          ]
        </InstructionsButton>
      </Subtitle>
      <InstructionsBox visible={showInstructions}>
        {instructions.map((line, index) => {
          const [item, ...description] = line.split(":");
          return (
            <p key={`instruction-${title}-${index}`}>
              <b>{item}</b>: {description}
            </p>
          );
        })}
      </InstructionsBox>
    </Container>
  );
};
