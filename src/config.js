export const authEndpoint = "https://accounts.spotify.com/authorize";

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = "60707a33a22f4caaa987faa27cd9251b";
export const redirectUri = "http://localhost:3000";
export const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-read-playback-state",
    "playlist-modify-public",
    "playlist-modify-private"
];
