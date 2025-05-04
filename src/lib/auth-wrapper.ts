/**
 * Authentication wrapper that automatically switches between
 * real Clerk authentication and mock authentication during tests
 */

const isTestEnvironment = () => {
  return process.env.NODE_ENV === 'test' || process.env.PLAYWRIGHT_TEST === 'true';
};

// Dynamically import the appropriate authentication module
export const useAuth = () => {
  if (isTestEnvironment()) {
    // Use mock authentication for tests
    // Using require instead of import for dynamic loading
    const mockAuth = require('./auth-mock');
    return mockAuth;
  } else {
    // Use real Clerk authentication for production
    const realAuth = require('@clerk/nextjs');
    return realAuth;
  }
};

// Convenience exports
export const getAuth = () => {
  const authModule = useAuth();
  return authModule.auth;
};

export const getCurrentUser = () => {
  const authModule = useAuth();
  return authModule.currentUser;
};

export const getClerkProvider = () => {
  const authModule = useAuth();
  return authModule.ClerkProvider;
};

export const getSignedIn = () => {
  const authModule = useAuth();
  return authModule.SignedIn;
};

export const getSignedOut = () => {
  const authModule = useAuth();
  return authModule.SignedOut;
};

export const getSignInButton = () => {
  const authModule = useAuth();
  return authModule.SignInButton;
};

export const getUserButton = () => {
  const authModule = useAuth();
  return authModule.UserButton;
}; 