import Cookies from 'js-cookie';

export function vuexCookie(store) {
  store.subscribe((mutation, state) => {
    // Serialize the state to a JSON string
    const serializedState = JSON.stringify(state);
    // Save to a cookie, adjust the cookie options as needed
    Cookies.set('vuexState', serializedState, { expires: 3, secure: true });
  });
}