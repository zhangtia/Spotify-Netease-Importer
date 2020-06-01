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
                                <img className="album-img" src={playlist.images[0].url} alt="album-cover"/>
                            </div>
                            <div className="now-playing__side">
                                <div className="now-playing__name">{playlist.name}</div>
                            </div>
                            <div className="background" style={{
                                backgroundImage: `url(${
                                    playlist.images[0].url
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
