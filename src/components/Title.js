import styled from "styled-components";
import React from "react";
const StyledH1 = styled.h1`
  text-align: center;
`;
export const Title = (props) => {
  return <StyledH1>{props.title}</StyledH1>;
};
