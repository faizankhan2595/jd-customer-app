import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchAndStoreUserPermissions, clearPermissions } from 'utils/permissionUtils';

const PermissionsContext = createContext();

export const usePermissions = () => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
};

export const PermissionsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPermissions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      clearPermissions();
      await fetchAndStoreUserPermissions();
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading permissions:', err);
      setError(err);
      setIsLoading(false);
    }
  };

  const refreshPermissions = async () => {
    await loadPermissions();
  };

  useEffect(() => {
    loadPermissions();
  }, []);

  return (
    <PermissionsContext.Provider value={{ 
      isLoading, 
      error, 
      refreshPermissions 
    }}>
      {children}
    </PermissionsContext.Provider>
  );
};