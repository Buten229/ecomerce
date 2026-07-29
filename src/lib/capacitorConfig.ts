export function setupMobileEnvironment() {
  if (typeof window !== 'undefined') {
    // Basic mobile setup for Capacitor / Web view
    document.addEventListener('deviceready', () => {
      console.log('Mobile environment initialized');
    });
  }
}
