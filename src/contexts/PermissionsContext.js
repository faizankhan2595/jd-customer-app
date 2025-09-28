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

  // Watch for token changes and refresh permissions automatically
  useEffect(() => {
    const handleTokenChange = () => {
      const currentToken = localStorage.getItem('token');
      if (currentToken) {
        refreshPermissions();
      }
    };

    // Listen for storage events (cross-tab changes)
    window.addEventListener('storage', (e) => {
      if (e.key === 'token' && e.newValue !== e.oldValue) {
        handleTokenChange();
      }
    });

    // For same-tab changes, we'll use a polling approach as a fallback
    // This is minimal and will catch token changes made by the current tab
    let lastToken = localStorage.getItem('token');
    const checkTokenChange = () => {
      const currentToken = localStorage.getItem('token');
      if (currentToken !== lastToken && currentToken) {
        lastToken = currentToken;
        refreshPermissions();
      }
    };

    const tokenCheckInterval = setInterval(checkTokenChange, 1000);

    return () => {
      window.removeEventListener('storage', handleTokenChange);
      clearInterval(tokenCheckInterval);
    };
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