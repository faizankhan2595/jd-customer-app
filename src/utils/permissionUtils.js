import { axiosInstance } from "App";
import axios from "axios";
import { API_BASE_URL } from "constants/ApiConstant";

/**
 * Permission utility functions for managing user permissions and local storage
 */

// Default permission structure
export const defaultPermissions = {
  web_app: {
    order_management: [
      { label: 'View Orders', check: false },
      { label: 'Create New Orders', check: false },
      { label: 'Delete Orders', check: false }
    ],
    inquiry_management: [
      { label: 'View Inquiry', check: false },
      { label: 'Create New Inquiry', check: false }
    ],
    job_sites: [
      { label: 'View Jobsites', check: false },
      { label: 'Create New Jobsites', check: false },
      { label: 'Edit Jobsites', check: false },
      { label: 'Delete Jobsites', check: false }
    ],
    machines_and_sensors: [
      { label: 'View Machines and Sensors', check: false },
      { label: 'Create New Machines and Sensors', check: false }
    ],
    operational_areas: [
      { label: 'View Operational Areas', check: false },
      { label: 'Create New Operational Areas', check: false },
      { label: 'Edit Operational Areas', check: false },
      { label: 'Delete Operational Areas', check: false }
    ],
    user_management: [
      { label: 'View Users', check: false },
      { label: 'Create New Users', check: false },
      { label: 'Edit Users', check: false },
      { label: 'Delete Users', check: false }
    ],
    technician_management: [
      { label: 'View Technicians', check: false },
      { label: 'Create New Technicians', check: false },
      { label: 'Edit Technicians', check: false },
      { label: 'Delete Technicians', check: false }
    ]
  },
  mobile_app: [
    { title: "Jobsites", key: "jobsites", check: false },
    { title: "Machines", key: "machines", check: false },
    { title: "Sensors", key: "sensors", check: false },
    { title: "Inquiries", key: "inquiries", check: false },
    { title: "Orders", key: "orders", check: false }
  ]
};

/**
 * Get current user permissions from localStorage
 */
export const getUserPermissions = () => {
  try {
    const permissions = localStorage.getItem('user_permissions');
    return permissions ? JSON.parse(permissions) : defaultPermissions;
  } catch (error) {
    console.error('Error parsing user permissions from localStorage:', error);
    return defaultPermissions;
  }
};

/**
 * Set user permissions in localStorage
 */
export const setUserPermissions = (permissions) => {
  try {
    localStorage.setItem('user_permissions', JSON.stringify(permissions));
  } catch (error) {
    console.error('Error storing user permissions in localStorage:', error);
  }
};

/**
 * Get parent permissions from localStorage
 */
export const getParentPermissions = () => {
  try {
    const permissions = localStorage.getItem('parent_permissions');
    return permissions ? JSON.parse(permissions) : {};
  } catch (error) {
    console.error('Error parsing parent permissions from localStorage:', error);
    return {};
  }
};

/**
 * Set parent permissions in localStorage
 */
export const setParentPermissions = (permissions) => {
  try {
    localStorage.setItem('parent_permissions', JSON.stringify(permissions));
  } catch (error) {
    console.error('Error storing parent permissions in localStorage:', error);
  }
};

/**
 * Fetch and store current user permissions
 */
export const fetchAndStoreUserPermissions = async () => {
  try {

    const axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
      // other configurations
    })


    axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // console.log(error.response);
        if (error.response.status===401 || error.response.data.message === "Unauthorized") {
          localStorage.removeItem("token");
          window.location.href = "/auth/login";
        }

        return Promise.reject(error);
      }
    );

    const response = await axiosInstance.get("/api/admin/getUserByToken");

    const userData = response.data.item;

    // Update user info in localStorage
    localStorage.setItem("name", userData.name);
    localStorage.setItem("parent_id", userData.parent_id);
    localStorage.setItem("company_name", userData.company_name);
    localStorage.setItem('user_id', userData.id);
    localStorage.setItem("role", userData.role_id);
    localStorage.setItem("profile_pic", userData.profile_pic);
    
    // Parse and store user permissions
    let userPermissions = defaultPermissions;
    if (userData.can_access && typeof userData.can_access === 'string') {
      try {
        userPermissions = JSON.parse(userData.can_access);
      } catch (parseError) {
        console.error('Error parsing user can_access JSON:', parseError);
      }
    } else if (userData.can_access && typeof userData.can_access === 'object') {
      userPermissions = userData.can_access;
    }
    
    setUserPermissions(userPermissions);
    
    // If user is a child user (has parent_id), fetch parent permissions
    if (userData.parent_id) {
      try {
        const parentResponse = await axiosInstance.get(`/api/admin/customer-users/parent-permissions/${userData.parent_id}`);
        if (parentResponse.data?.item?.can_access) {
          setParentPermissions(parentResponse.data.item.can_access);
        }
      } catch (error) {
        console.error('Error fetching parent permissions:', error);
        setParentPermissions({});
      }
    } else {
      setParentPermissions({});
    }
    
    return userPermissions;
  } catch (error) {
    console.error('Error fetching user permissions:', error);
    return defaultPermissions;
  }
};

/**
 * Check if user has specific permission
 */
export const hasPermission = (section, permission) => {
  const userPermissions = getUserPermissions();
  const parentPermissions = getParentPermissions();
  const parentId = localStorage.getItem("parent_id");
  
  // For free users (no parent), check only user permissions
  if (!parentId || parentId === "null") {
    return checkUserPermission(userPermissions, section, permission);
  }
  
  // For customer child users, check both user and parent permissions
  const hasUserPermission = checkUserPermission(userPermissions, section, permission);
  const hasParentPermission = checkUserPermission(parentPermissions, section, permission);
  
  // Both user and parent must have the permission
  return hasUserPermission && hasParentPermission;
};

/**
 * Helper function to check permission in a permission object
 */
const checkUserPermission = (permissions, section, permission) => {
  try {
    if (!permissions?.web_app?.[section]) return false;
    
    const sectionPermissions = permissions.web_app[section];
    if (!Array.isArray(sectionPermissions)) return false;
    
    const permissionObj = sectionPermissions.find(perm => perm.label === permission);
    return permissionObj ? permissionObj.check : false;
  } catch (error) {
    console.error('Error checking permission:', error);
    return false;
  }
};

/**
 * Check if user has any permission in a section
 */
export const hasSectionAccess = (section) => {
  const userPermissions = getUserPermissions();
  const parentPermissions = getParentPermissions();
  const parentId = localStorage.getItem("parent_id");
  
  console.log(`Checking section access for: ${section}`);
  console.log(`Parent ID: ${parentId}`);
  console.log(`User permissions for ${section}:`, userPermissions?.web_app?.[section]);
  console.log(`Parent permissions for ${section}:`, parentPermissions?.web_app?.[section]);
  
  // For free users (no parent), check only user permissions
  if (!parentId || parentId === "null") {
    const result = checkSectionAccess(userPermissions, section);
    console.log(`Free user access result for ${section}: ${result}`);
    return result;
  }
  
  // For customer child users, check both user and parent permissions
  const hasUserAccess = checkSectionAccess(userPermissions, section);
  const hasParentAccess = checkSectionAccess(parentPermissions, section);
  
  console.log(`User access for ${section}: ${hasUserAccess}`);
  console.log(`Parent access for ${section}: ${hasParentAccess}`);
  
  // Both user and parent must have at least one permission in the section
  const finalResult = hasUserAccess && hasParentAccess;
  console.log(`Final access result for ${section}: ${finalResult}`);
  
  return finalResult;
};

/**
 * Helper function to check if user has any access to a section
 */
const checkSectionAccess = (permissions, section) => {
  try {
    if (!permissions?.web_app?.[section]) return false;
    
    const sectionPermissions = permissions.web_app[section];
    if (!Array.isArray(sectionPermissions)) return false;
    
    return sectionPermissions.some(perm => perm.check === true);
  } catch (error) {
    console.error('Error checking section access:', error);
    return false;
  }
};

/**
 * Check mobile app permission
 */
export const hasMobilePermission = (key) => {
  try {
    const userPermissions = getUserPermissions();
    const parentPermissions = getParentPermissions();
    const parentId = localStorage.getItem("parent_id");
    
    // For free users (no parent), check only user permissions
    if (!parentId || parentId === "null") {
      return checkMobilePermission(userPermissions, key);
    }
    
    // For customer child users, check both user and parent permissions
    const hasUserPermission = checkMobilePermission(userPermissions, key);
    const hasParentPermission = checkMobilePermission(parentPermissions, key);
    
    return hasUserPermission && hasParentPermission;
  } catch (error) {
    console.error('Error checking mobile permission:', error);
    return false;
  }
};

/**
 * Helper function to check mobile permission
 */
const checkMobilePermission = (permissions, key) => {
  try {
    if (!permissions?.mobile_app) return false;
    
    const mobileApp = permissions.mobile_app;
    if (!Array.isArray(mobileApp)) return false;
    
    const permissionObj = mobileApp.find(perm => perm.key === key);
    return permissionObj ? permissionObj.check : false;
  } catch (error) {
    console.error('Error checking mobile permission:', error);
    return false;
  }
};

/**
 * Get effective permissions that user can assign to others (intersection of user and parent)
 */
export const getAssignablePermissions = () => {
  const userPermissions = getUserPermissions();
  const parentPermissions = getParentPermissions();
  const parentId = localStorage.getItem("parent_id");
  
  // For free users (no parent), they cannot assign permissions to anyone
  // Free users don't have user_management access
  if (!parentId || parentId === "null") {
    return {
      web_app: {
        order_management: [],
        inquiry_management: [],
        job_sites: [],
        machines_and_sensors: [],
        operational_areas: [],
        user_management: [],
        technician_management: []
      },
      mobile_app: []
    };
  }
  
  // For customer child users, return intersection of user and parent permissions
  const assignablePermissions = {
    web_app: {},
    mobile_app: []
  };
  
  // Process web app permissions
  Object.keys(userPermissions.web_app || {}).forEach(section => {
    const userSection = userPermissions.web_app[section];
    const parentSection = parentPermissions.web_app?.[section];
    
    if (Array.isArray(userSection) && Array.isArray(parentSection)) {
      assignablePermissions.web_app[section] = userSection.filter(userPerm => {
        const parentPerm = parentSection.find(p => p.label === userPerm.label);
        return userPerm.check && parentPerm?.check;
      }).map(perm => ({ ...perm, check: false })); // Reset to false for assignment
    }
  });
  
  // Process mobile app permissions
  if (Array.isArray(userPermissions.mobile_app) && Array.isArray(parentPermissions.mobile_app)) {
    assignablePermissions.mobile_app = userPermissions.mobile_app.filter(userPerm => {
      const parentPerm = parentPermissions.mobile_app.find(p => p.key === userPerm.key);
      return userPerm.check && parentPerm?.check;
    }).map(perm => ({ ...perm, check: false })); // Reset to false for assignment
  }
  
  return assignablePermissions;
};

/**
 * Clear all permissions from localStorage
 */
export const clearPermissions = () => {
  localStorage.removeItem('user_permissions');
  localStorage.removeItem('parent_permissions');
};

/**
 * Initialize permissions on app load
 */
export const initializePermissions = async () => {
  return await fetchAndStoreUserPermissions();
};