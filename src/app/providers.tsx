"use client";
import React, { ReactNode } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import original from "react95/dist/themes/original";
import { styleReset } from "react95";
import useLoading from "@/hooks/useLoading";
import Loading from "./loading";

type Props = {
  children: ReactNode;
};

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url("/fonts/ms_sans_serif.woff2") format("woff2");
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url("/fonts/ms_sans_serif_bold.woff2") format("woff2");
    font-weight: bold;
    font-style: normal
  }
  body, input, select, textarea {
    font-family: 'ms_sans_serif';
  }
`;

const Providers = ({ children }: Props) => (
  <div>
    <GlobalStyles />
    {useLoading() ? (
      <ThemeProvider theme={original}>{children}</ThemeProvider>
    ) : (
      <Loading />
    )}
  </div>
);

export default Providers;
