import React, { useState } from "react";
import {
  Button,
  Frame,
  TextInput,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";
import styled from "styled-components";
import Draggable from "react-draggable";

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  .window-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .window {
    display: flex;
    flex-direction: column;
  }

  .footer {
    display: flex;
    align-items: center;
    padding: 4px;
  }

  .input {
    flex-grow: 1;
    margin-right: 8px;
  }
  .close-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: -1px;
    margin-top: -1px;
    transform: rotateZ(45deg);
    position: relative;
    &:before,
    &:after {
      content: "";
      position: absolute;
      background: ${({ theme }) => theme.materialText};
    }
    &:before {
      height: 100%;
      width: 3px;
      left: 50%;
      transform: translateX(-50%);
    }
    &:after {
      height: 3px;
      width: 100%;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;

export default function Settings({
  onClose,
  isActive,
}: {
  onClose: () => void;
  isActive: boolean;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    isOpen && (
      <Draggable handle=".window-title">
        <div style={{ position: "absolute" }}>
          <Wrapper>
            <Window
              className="window"
              style={{
                height: "200px",
                width: "400px",
                minHeight: "200px",
                maxHeight: "200px",
              }}
            >
              <WindowHeader className="window-title" active={isActive}>
                <span>settings.exe</span>
                <Button onClick={handleClose}>
                  <span className="close-icon" />
                </Button>
              </WindowHeader>
              <WindowContent>
                <Frame variant="well" className="footer">
                  <TextInput className="input" placeholder="OpenAI key..." />
                  <Button type="submit">Save</Button>
                </Frame>
              </WindowContent>
            </Window>
          </Wrapper>
        </div>
      </Draggable>
    )
  );
}
