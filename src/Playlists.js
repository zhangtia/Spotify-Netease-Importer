import React, { Component } from "react";
import "./Player.css";

class Playlists extends Component {

    render() {
        return (

            <div className="App-playlist">
                {this.props.playlists.map((playlist) => (
                    <div key={playlist.id} onClick={() => this.props.action(playlist.id)}>
                        <div className="main-wrapper btn" style={{ background: (this.props.selected === playlist.id ? "#1ecd97" : ""), color: (this.props.selected === playlist.id ? "#333" : "") }}>
                            <div className="now-playing__img">
                                <img className="album-img" src={(playlist.images.length !== 0) ? playlist.images[0].url : "https://img.icons8.com/material-sharp/24/000000/no-image.png"} alt="album-cover"/>
                            </div>
                            <div className="now-playing__side">
                                <div className="now-playing__name">{playlist.name}</div>
                            </div>
                            <div className="background" style={{
                                backgroundImage: `url(${
                                    (playlist.images.length !== 0) ? playlist.images[0].url : "https://img.icons8.com/material-sharp/24/000000/no-image.png"
                                    })`,
                            }} />{" "}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default Playlists;
