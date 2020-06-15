import React, { Component } from "react";
import "./Player.css";
import tutorial from "./Tutorial.png";

class Intro extends Component {

    render() {
        return (

            <div className="Intro">
                <p className="Intro-text">Start by searching up a playlist ID, or pick one from the trending playlists!</p>
                <table className="Intro-list">
                    <thead>
                        <tr>
                            <th style={{ fontSize: "1em" }}>Hot Playlists</th>
                        </tr>
                    </thead>
                    <tbody>

                    {this.props.data.map((playlist) => (
                            <tr key={playlist.id} onClick={() => this.props.action(playlist.id)} className="Song-row">
                                <td >{playlist.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <img className="Intro-pic" src={tutorial} alt="album-cover" />
            </div>
        );
    }
}

export default Intro;