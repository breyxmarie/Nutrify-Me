import React, { createContext, useState, useContext, useEffect } from "react";

const LoggedInUserContext = createContext(null);

export const LoggedInUserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(
    () => JSON.parse(localStorage.getItem("loggedInUser")) || null
  ); // Read from local storage on initial render

  const [profiled, setProfiled] = useState(
    () => JSON.parse(localStorage.getItem("profiled")) || null
  ); // Read from local storage on initial render

  const [nutritionist, setnNutritionist] = useState(
    () => JSON.parse(localStorage.getItem("nutritionist")) || null
  ); // Read from local storage on initial render

  useEffect(() => {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    localStorage.setItem("nutritionist", JSON.stringify(nutritionist));
    localStorage.setItem("profiled", JSON.stringify(profiled));
  }, [loggedInUser]); // Update local storage when state changes

  return (
    <LoggedInUserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        profiled,
        setProfiled,
        nutritionist,
        setnNutritionist,
      }}
    >
      {children}
    </LoggedInUserContext.Provider>
  );
};

export const useLoggedInUser = () => useContext(LoggedInUserContext);
