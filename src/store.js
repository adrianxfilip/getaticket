import { createStore } from "@reduxjs/toolkit";

const persistedState = {
  ...JSON.parse(localStorage.getItem("state")),
};

const initialState =
  localStorage.getItem("state") === null
    ? {
        loggedID: null,
        sessionID: null,
        contestsData: null,
        cart: {}
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
    case "ADD_TO_CART":
      return{
        ...state,
        cart : {
          ...state.cart,
          [action.payload.id] : {
            id : action.payload.id,
            tickets : action.payload.tickets ,
            ppt : action.payload.ppt
          }
        }
      }
    default:
      return state;
  }
};

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.subscribe(() => {
    saveState(store.getState());
  });

export default(store)
