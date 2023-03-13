import { createStore } from "@reduxjs/toolkit";

const persistedState = {
  ...JSON.parse(localStorage.getItem("state")),
};

const initialState =
  localStorage.getItem("state") === null
    ? {
        loggedID: null,
        sessionID: null,
      }
    : persistedState;

const saveState = (state) => {
  localStorage.setItem("state", JSON.stringify(state));
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        sessionID: action.payload.sessionID,
        loggedID: action.payload.loggedID,
      };
    case "LOAD_CONTESTS_DATA":
      return {
        ...state,
        contestsData: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.subscribe(() => {
    saveState(store.getState());
  });

export default(store)
