import React from "react";
import Directory from "../../components/directory/directory.component";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
`;

export const HomePage = () => (
  <Wrapper>
    <Directory />
  </Wrapper>
)