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

export {logIn, loadContestsData}