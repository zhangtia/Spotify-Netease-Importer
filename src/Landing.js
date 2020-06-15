import React, { Component } from "react";
import "./Player.css";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import gif from "./mygif.gif";

class Landing extends Component {

    render() {
        return (

            <div className="Landing">
                <div className="Landing-header">
                    <h1 className="Landing-title">NTESPOT</h1>
                    <img className="Landing-gif" src={gif} alt="netease-spotify-gif" />
                </div>
                <div className="Landing-desc">
                    Web app to import playlists from Netease Music (网易云音乐) to Spotify.
                </div>
                <a className="btn btn--login App-link Landing-login"
                    href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                        "%20"
                    )}&response_type=token&show_dialog=true`}>
                    Login to Spotify
                </a>
            </div>
        );
    }
}

export default Landing;