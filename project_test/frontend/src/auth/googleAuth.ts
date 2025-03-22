import { gapi } from "gapi-script";
import googleAuthConfig from './google_auth.json';

const CLIENT_ID = googleAuthConfig.web.client_id;

let authPromise: Promise<gapi.auth2.GoogleAuth> | null = null;

export const initGoogleAuth = (): Promise<gapi.auth2.GoogleAuth> => {
  if (!authPromise) {
    authPromise = new Promise((resolve, reject) => {
      const loadGapiAndInit = () => {
        window.gapi.load('auth2', () => {
          window.gapi.auth2
            .init({
              client_id: CLIENT_ID,
              scope: 'email profile',
              prompt: 'select_account'
            })
            .then(resolve, reject);
        });
      };

      if (window.gapi) {
        loadGapiAndInit();
      } else {
        // Add script dynamically if gapi is not loaded
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = loadGapiAndInit;
        script.onerror = reject;
        document.head.appendChild(script);
      }
    });
  }
  return authPromise;
};

export const signInWithGoogle = async () => {
  try {
    const auth = await initGoogleAuth();
    const googleUser = await auth.signIn();
    const profile = googleUser.getBasicProfile();
    const user = {
      id: profile.getId(),
      name: profile.getName(),
      email: profile.getEmail(),
      imageUrl: profile.getImageUrl(),
      preferences: {
        theme: 'dark',
        fontSize: 'medium'
      }
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');
    return { user };
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw error;
  }
};

export const signOutGoogle = async () => {
  try {
    const auth = await initGoogleAuth();
    await auth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  } catch (error) {
    console.error("Google sign-out error:", error);
    throw error;
  }
};

// Add type declaration for google accounts
declare global {
  interface Window {
    gapi: typeof gapi;
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: (callback: (notification: any) => void) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          revoke: (hint: string, callback: () => void) => void;
        };
      };
    };
  }
}
