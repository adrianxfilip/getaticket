import { createStore } from "@reduxjs/toolkit";

const persistedState = {
  ...JSON.parse(localStorage.getItem("state")),
};

const initialState =
  localStorage.getItem("state") === null
    ? {
        loggedID: null,
        sessionID: null,
        userData : null,
        userContests : null,
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
        userData : action.payload.userData,
        userContests : action.payload.userContests
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
            ppt : action.payload.ppt,
            image : action.payload.image,
            name : action.payload.name,
            drawDate : action.payload.drawDate
          }
        }
      }
    case "REMOVE_FROM_CART":
      var newCart = state.cart
      delete newCart[action.payload.id]
      return{
        ...state,
        cart : {
          ...newCart
        }
      }
    case "CLEAR_CART" :
      return {
        ...state,
        cart : {}
      }
    case "LOAD_USER_DATA":
      return {
        ...state,
        userContests : action.payload.contests,
        userData : action.payload.data
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
