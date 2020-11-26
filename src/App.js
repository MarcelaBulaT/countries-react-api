import ListaPais from "./listapais";
import "./App.css";
import React from "react";
import Header from "./header";
import { Provider } from "react-redux";
import { createStore } from "redux";

import PaginaPais from "./pagina-pais";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const initialState = {
  countryList: [],
  coutryFilteredByRegion: [],
  filterByRegion: "",
  countryListByName: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_COUNTRY_LIST": {
      console.log(" mi lista donde esta ");
      return { ...state, countryList: action.payload };
    }
    case "SET_COUNTRY_BY_NAME": {
      const countryListByName = (state.countryList || []).filter((country) =>
        country.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return { ...state, countryListByName };
    }
    case "FILTER_BY_REGION": {
      const { regionSelected } = action.payload;
      if ("" === regionSelected) {
        return { ...state, coutryFilteredByRegion: [], filterByRegion: "" };
      }
      const coutryFilteredByRegion = state.countryList.filter(
        (country) => country.region === regionSelected
      );
      return {
        ...state,
        coutryFilteredByRegion,
        filterByRegion: regionSelected,
      };
    }
    default: {
      return state;
    }
  }
}
const store = createStore(reducer, initialState);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/country/:id" component={PaginaPais}>
              <div>Este es el pais</div>
            </Route>
            <Route path="/">
              <ListaPais />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
