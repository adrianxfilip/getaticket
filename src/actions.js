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

const addToCart = (id, tickets, ppt, image, name) => ({
  type : "ADD_TO_CART",
  payload : {id : id, tickets : tickets, ppt: ppt, image:image, name:name}
})

const removeFromCart = (id) => ({
  type : "REMOVE_FROM_CART",
  payload : {id : id}
})

const clearCart = () => ({
  type : "CLEAR_CART"
})

export {logIn, loadContestsData, addToCart, clearCart, removeFromCart}