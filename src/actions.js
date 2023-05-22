const logIn = (loggedID, sessionID, userData, userContests) => ({
    type: "LOG_IN",
    payload: {
        loggedID: loggedID,
        sessionID : sessionID,
        userData : userData,
        userContests : userContests
    }
  })

const loadContestsData = (data) => ({
  type : "LOAD_CONTESTS_DATA",
  payload : data
})

const addToCart = (id, tickets, ppt, image, name, drawDate) => ({
  type : "ADD_TO_CART",
  payload : {id : id, tickets : tickets, ppt: ppt, image:image, name:name, drawDate : drawDate}
})

const removeFromCart = (id) => ({
  type : "REMOVE_FROM_CART",
  payload : {id : id}
})

const clearCart = () => ({
  type : "CLEAR_CART"
})

const loadUserData = (data, contests) => ({
  type: "LOAD_USER_DATA",
  payload : {
    data : data,
    contests : contests
  }
})

export {logIn, loadContestsData, addToCart, clearCart, removeFromCart, loadUserData}