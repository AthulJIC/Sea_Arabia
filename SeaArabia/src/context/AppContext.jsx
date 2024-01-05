import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

// export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [item, setItem] = React.useState(null);
  const [list, setList] = React.useState(null);
  const [title, setTitle] = React.useState(null)

  const updateItem = (newItem) => {
    setItem(newItem);
  };

  const updateList = (newList) => {
     setList(newList);
  }
  const updateTitle = (newList) => {
    setTitle(newList);
 }
  return (
    <AppContext.Provider
        value={{ item, updateItem, list,updateList, title, updateTitle }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useItem must be used within an ItemProvider');
  }
  return context;
};
