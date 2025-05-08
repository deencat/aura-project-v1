import React from 'react';

/**
 * Mock authentication for testing purposes
 * This file provides mock implementations of Clerk authentication functions
 * that can be used during testing to avoid actual authentication calls
 */

export const auth = () => {
  return {
    userId: 'test-user-id',
    sessionId: 'test-session-id',
    getToken: async () => 'test-token',
    protect: async () => {
      return true; // Always allow access in test environment
    }
  };
};

export const currentUser = async () => {
  return {
    id: 'test-user-id',
    firstName: 'Test',
    lastName: 'User',
    emailAddresses: [
      {
        emailAddress: 'test@example.com',
        id: 'test-email-id',
        verification: { status: 'verified' },
      },
    ],
    profileImageUrl: '/images/placeholders/site/avatar.jpg',
    username: 'testuser',
  };
};

interface ProviderProps {
  children: React.ReactNode;
}

interface ButtonProps {
  children?: React.ReactNode;
}

export const ClerkProvider: React.FC<ProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export const SignedIn: React.FC<ProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export const SignedOut: React.FC<ProviderProps> = ({ children }) => {
  return null; // Don't render anything in SignedOut during tests
};

export const SignInButton: React.FC<ButtonProps> = ({ children }) => {
  return <button>{children || 'Sign In'}</button>;
};

export const SignUpButton: React.FC<ButtonProps> = ({ children }) => {
  return <button>{children || 'Sign Up'}</button>;
};

export const UserButton: React.FC = () => {
  return <button aria-label="User menu">User</button>;
};

// Export a helper function to check if we're in a test environment
export const isTestEnvironment = () => {
  return process.env.NODE_ENV === 'test' || process.env.PLAYWRIGHT_TEST === 'true';
}; 