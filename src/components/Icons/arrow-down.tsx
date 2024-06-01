import React from "react";
import styled from "styled-components";

const StyledSVG = styled.svg`
  width: 24px;
  height: 16px;
  transform: scale(0.5);
  transform-origin: center;
  margin: auto;
`;

const ArrowDownIcon = () => (
  <StyledSVG
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="8"
    viewBox="0 0 12 8"
  >
    <path fill="#000000" d="M6 8L0 0h12z" />
  </StyledSVG>
);

export default ArrowDownIcon;
