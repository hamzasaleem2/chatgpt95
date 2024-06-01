"use client";
import React, { useState } from "react";
import {
  AppBar,
  Button,
  MenuList,
  MenuListItem,
  Separator,
  TextInput,
  Toolbar,
} from "react95";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 5rem;
  height: 100vh;
  background: ${({ theme }) => theme.desktopBackground};
`;

export default function Start() {
  const [open, setOpen] = useState(false);

  return (
    <Wrapper>
      {/* <AppBar>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <Button
              onClick={() => setOpen(!open)}
              active={open}
              style={{ fontWeight: "bold" }}
            >
              Start
            </Button>
            {open && (
              <MenuList
                style={{
                  position: "absolute",
                  left: "0",
                  top: "100%",
                }}
                onClick={() => setOpen(false)}
              >
                <MenuListItem disabled>
                  <span role="img" aria-label="👨‍💻">
                    👨‍💻
                  </span>
                  Profile
                </MenuListItem>
                <MenuListItem disabled>
                  <span role="img" aria-label="📁">
                    📁
                  </span>
                  My account
                </MenuListItem>
                <Separator />
                <MenuListItem disabled>
                  <span role="img" aria-label="🔙">
                    🔙
                  </span>
                  Logout
                </MenuListItem>
              </MenuList>
            )}
          </div>
          <TextInput placeholder="Search..." width={150} />
        </Toolbar>
      </AppBar> */}
    </Wrapper>
  );
}
