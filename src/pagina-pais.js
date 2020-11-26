import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const PaginaPaisStyled = styled.div``;

function PagianPais({ match }) {
  const pais = useSelector((state) =>
    state.countryList.find(
      (item) => item.name.toLowerCase() === match.params.id
    )
  );
  return <PaginaPaisStyled>{match.params.id}</PaginaPaisStyled>;
}

export default PagianPais;
