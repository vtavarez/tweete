import React, { useState } from "react";

export const Context = React.createContext();

export const TweetsContextProvider = props => {
  const [selectedTweet, selectTweet] = useState("");
  return (
    <Context.Provider value={{ selectedTweet, selectTweet }}>
      {props.children}
    </Context.Provider>
  );
};
