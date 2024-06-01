import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  MenuList,
  MenuListItem,
  Toolbar,
  Window,
  WindowContent,
  WindowHeader,
  TextInput,
  Frame,
} from "react95";
import styled from "styled-components";
import { useChat } from "ai/react";
import ArrowDownIcon from "@/components/Icons/arrow-down";
import Settings from "./Settings";
import Draggable from "react-draggable";

interface ChatProps {
  onClose: () => void;
}
const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .window-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .window {
    width: 400px;
    min-height: 400px;
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

const MenuContainer = styled.div`
  position: relative;
`;

const StyledMenuList = styled(MenuList)`
  position: absolute;
  width: 150px;
  top: calc(100% - 1px);
  left: -4px;
  z-index: 1000;
`;

const Checkmark = styled.span`
  position: absolute;
  right: 4px;
`;

const StyledScrollView = styled.div`
  background: white;
  width: 100%;
  height: 200px;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledMessage = styled.div`
  max-width: 70%;
  padding: 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  font-size: 15px;
`;

const UserMessage = styled(StyledMessage)`
  align-self: flex-end;
`;

const AIMessage = styled(StyledMessage)`
  align-self: flex-start;
`;

const MessageContent = styled.div`
  margin-top: 8px;
`;

const UserLabel = styled.div`
  font-size: 18px;
`;

const AIlabel = styled.div`
  font-size: 18px;
`;

export default function Chat({ onClose }: ChatProps) {
  const { setMessages, messages, input, handleInputChange, handleSubmit } =
    useChat();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string | null>("GPT-4o");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleSettings = () => {
    setIsSettingsOpen((prevOpen) => !prevOpen);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (itemName: string) => {
    setSelectedItem(itemName === selectedItem ? null : itemName);
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Wrapper>
      <Draggable handle=".window-title">
        <Window className="window">
          <WindowHeader className="window-title" active={!isSettingsOpen}>
            <span>chatgpt.exe</span>
            <Button onClick={onClose}>
              <span className="close-icon" />
            </Button>
          </WindowHeader>
          <Toolbar>
            <Button
              variant="menu"
              size="sm"
              onClick={() => {
                setMessages([]);
              }}
            >
              New Chat
            </Button>
            <MenuContainer ref={menuRef}>
              <Button variant="menu" size="sm" onClick={toggleMenu}>
                Model
                <ArrowDownIcon />
              </Button>
              {isMenuOpen && (
                <StyledMenuList open={isMenuOpen}>
                  <MenuListItem
                    size="sm"
                    onClick={() => handleMenuItemClick("GPT-4o")}
                  >
                    GPT-4o
                    {selectedItem === "GPT-4o" && <Checkmark>✓</Checkmark>}
                  </MenuListItem>
                  <MenuListItem
                    size="sm"
                    onClick={() => handleMenuItemClick("GPT-3.5 Turbo")}
                  >
                    GPT-3.5 Turbo
                    {selectedItem === "GPT-3.5 Turbo" && (
                      <Checkmark>✓</Checkmark>
                    )}
                  </MenuListItem>
                </StyledMenuList>
              )}
            </MenuContainer>
            <Button variant="menu" size="sm" onClick={toggleSettings}>
              Settings
            </Button>
          </Toolbar>
          <WindowContent>
            <>
              <StyledScrollView>
                <MessageContainer>
                  {messages.map((m) => (
                    <React.Fragment key={m.id}>
                      {m.role === "user" ? (
                        <UserMessage>
                          <UserLabel>You:</UserLabel>
                          <MessageContent>{m.content}</MessageContent>
                        </UserMessage>
                      ) : (
                        <AIMessage>
                          <AIlabel>ChatGPT:</AIlabel>
                          <MessageContent>{m.content}</MessageContent>
                        </AIMessage>
                      )}
                    </React.Fragment>
                  ))}
                </MessageContainer>
              </StyledScrollView>
              <form onSubmit={handleSubmit}>
                <Frame variant="well" className="footer">
                  <TextInput
                    className="input"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Say something..."
                  />
                  <Button type="submit">Send</Button>
                </Frame>
              </form>
            </>
          </WindowContent>
        </Window>
      </Draggable>
      {isSettingsOpen && (
        <Draggable handle=".window-title">
          <div style={{ position: "absolute" }}>
            <Settings onClose={handleCloseSettings} isActive={isSettingsOpen} />
          </div>
        </Draggable>
      )}
    </Wrapper>
  );
}
