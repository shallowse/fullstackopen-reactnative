import React from 'react';

const AuthStorageContext = React.createContext();

export const useAuthStorage = () => {
  const context = React.useContext(AuthStorageContext);
  if (context === undefined) {
    throw new Error('useAuthStorage must be used within AuthStorageContext.Provider');
  }
  return context;
};

export default AuthStorageContext;