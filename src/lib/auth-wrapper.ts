/**
 * Authentication wrapper that automatically switches between
 * real Clerk authentication and mock authentication during tests
 */
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  auth,
  currentUser,
} from '@clerk/nextjs';

import {
  ClerkProvider as MockClerkProvider,
  SignInButton as MockSignInButton,
  SignUpButton as MockSignUpButton,
  SignedIn as MockSignedIn,
  SignedOut as MockSignedOut,
  UserButton as MockUserButton,
  auth as mockAuth,
  currentUser as mockCurrentUser,
} from './auth-mock';

const isTestEnvironment = () => {
  return process.env.NODE_ENV === 'test' || process.env.PLAYWRIGHT_TEST === 'true';
};

// Convenience exports
export const getAuth = () => {
  return isTestEnvironment() ? mockAuth : auth;
};

export const getCurrentUser = () => {
  return isTestEnvironment() ? mockCurrentUser : currentUser;
};

export const getClerkProvider = () => {
  return isTestEnvironment() ? MockClerkProvider : ClerkProvider;
};

export const getSignedIn = () => {
  return isTestEnvironment() ? MockSignedIn : SignedIn;
};

export const getSignedOut = () => {
  return isTestEnvironment() ? MockSignedOut : SignedOut;
};

export const getSignInButton = () => {
  return isTestEnvironment() ? MockSignInButton : SignInButton;
};

export const getSignUpButton = () => {
  return isTestEnvironment() ? MockSignUpButton : SignUpButton;
};

export const getUserButton = () => {
  return isTestEnvironment() ? MockUserButton : UserButton;
}; 