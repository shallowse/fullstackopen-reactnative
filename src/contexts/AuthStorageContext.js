import React from 'react';

const AuthStorageContext = React.createContext();

// https://kentcdodds.com/blog/how-to-use-react-context-effectively/
export const useAuthStorage = () => {
  const context = React.useContext(AuthStorageContext);
  if (context === undefined) {
    throw new Error('useAuthStorage must be used within AuthStorageContext.Provider');
  }
  return context;
};

export default AuthStorageContext;