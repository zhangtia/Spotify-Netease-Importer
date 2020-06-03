export const authEndpoint = "https://accounts.spotify.com/authorize";

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = "hi";
export const redirectUri = "https://zhangtia.github.io/Spotify-Netease-Importer/";
//export const redirectUri = "http://localhost:3000/";
export const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-read-playback-state",
    "playlist-modify-public",
    "playlist-modify-private"
];
