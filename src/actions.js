const logIn = (loggedID, sessionID) => ({
    type: "LOG_IN",
    payload: {
        loggedID: loggedID,
        sessionID : sessionID
    }
  })

const loadContestsData = (data) => ({
  type : "LOAD_CONTESTS_DATA",
  payload : data
})

const addToCart = (id, tickets, ppt) => ({
  type : "ADD_TO_CART",
  payload : {id : id, tickets : tickets, ppt: ppt}
})

export {logIn, loadContestsData, addToCart}