import { Outlet } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const DefaultGrid = styled.div`
  display: grid;
  grid-template-rows: 100 1fr;
  min-height: 100vh;
  width: 100vw;
`;

const Root: React.FC = () => {
  return (
    <DefaultGrid>
      <Outlet />
    </DefaultGrid>
  );
};

export default Root;
