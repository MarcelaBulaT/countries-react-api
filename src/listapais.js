import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Region } from "./region";
import Country from "./country";
import { useSelector, useDispatch } from "react-redux";

const ListaPaisStyled = styled.div`
.grid{
  grid-template-columns:480px 200px;
}
.paises{
display: grid;
  grid-row-gap: 2.3em;
  grid-auto.flow: columns;
  grid-template-columns: repeat(auto-fill, 264px);
  grid-columns-gap: 80px;
  background: var(--fondo);
  justify-content: center;
  padding: 4em 2em;
  .buscador input{
       margin: 0px
    width: 100%;
    flex: 1;
    display: flex;
    border-radius: 10px;
    border: none;
    heigth: 48px;
    padding: 0.2em;
    font-size: 0.7em;
    box-shadow: 0.2px 9px 0 rgb(0, 0, 0, 0.5);
  
}
  }
  .
`;

function CountryList() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const countryListByName = useSelector((state) => state.countryListByName);
  const countryList = useSelector((state) => {
    if ("" !== state.filterByRegion) {
      return state.coutryFilteredByRegion;
    }
    if (countryListByName.length > 0) {
      return countryListByName;
    }

    return state.countryList;
  });

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        return response.json();
      })
      .then((dato) => {
        dispatch({
          type: "SET_COUNTRY_LIST",
          payload: dato,
        });
        // setListapais(data);
        console.log(dato);
      })
      .catch(() => {
        console.log("Error");
      });
  }, [dispatch]);
  const filterByName = (e) => {
    setInputValue(e.target.value);
    dispatch({
      type: "SET_COUNTRY_BY_NAME",
      payload: e.target.value,
    });
  };
  const clearInput = () => {
    dispatch({
      type: "SET_COUNTRY_BY_NAME",
      payload: "",
    });
    setInputValue("");
  };

  return (
    <ListaPaisStyled>
      <div className="grid">
        <Region />
        <div className="buscador">
          <input type="text" value={inputValue} onChange={filterByName} />
          {inputValue && <button onClick={clearInput}></button>}
          {countryListByName.length === 0 && inputValue && (
            <p>
              <strong>{inputValue}</strong>
            </p>
          )}
        </div>
      </div>
      <div className="paises">
        {countryList.map(({ name, flag, population, capital, region }) => {
          return (
            <Country
              flag={flag}
              name={name}
              key={name}
              population={population}
              region={region}
              capital={capital}
            />
          );
        })}
      </div>
    </ListaPaisStyled>
  );
}

export default CountryList;
