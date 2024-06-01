"use client";
import { Hourglass } from "react95";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("/background.png") no-repeat center center fixed;
  background-size: cover;
`;

export default function Loading() {
  return (
    <Wrapper>
      <Hourglass size={20} />
    </Wrapper>
  );
}
