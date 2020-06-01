import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import Playlists from "./Playlists";
import "./App.css";

// https://medium.com/@jonnykalambay/now-playing-using-spotifys-awesome-api-with-react-7db8173a7b13
// https://levelup.gitconnected.com/how-to-build-a-spotify-player-with-react-in-15-minutes-7e01991bc4b6

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      display_name: "not logged in",
      playlists: [],
      neteasesearch: 2842615416,
      NEsongs: [],
      sel_playlist: null,
      songs_to_import: []
    };
    this.hi = this.hi.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);
    this.getNetease = this.getNetease.bind(this);
    this.searchSong = this.searchSong.bind(this);
    this.importSongs = this.importSongs.bind(this);
    this.selectPlaylist = this.selectPlaylist.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectAll = this.selectAll.bind(this);
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      this.hi(_token);
      this.getPlaylists(_token);
    }
  }

  hi(token) {
    //e.preventDefault();
    $.ajax({
      url: "https://api.spotify.com/v1/me",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        this.setState({
          display_name: data.display_name
        });
      }
    });
  }

  getPlaylists(token) {
    //e.preventDefault();
    $.ajax({
      url: "https://api.spotify.com/v1/me/playlists",
      type: "GET",
      data: {
        limit: 50,
        offset: 0,
      },
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        //alert(data.items);
        this.setState({
          playlists: data.items
        });
      }
    });
  }

  importSongs() {
    //e.preventDefault();
    if (this.state.sel_playlist === null) {
      alert("Please select a playlist");
      return;
    }
    let song_list = [...this.state.NEsongs];
    let params = "";
    song_list.forEach((element) => {
      if (element[4]) {
        params = params + element[5] + ",";
        element[4] = !element[4];
      }
    })
    params = params.substring(0, params.length - 1);
    $.ajax({
      url: "	https://api.spotify.com/v1/playlists/" + this.state.sel_playlist + "/tracks?" + $.param({ uris: params }),
      type: "POST",
      //dataType: 'json',
      //data: JSON.stringify({ "uris": "spotify:track:3VlbOrM6nYPprVvzBZllE5,spotify:track:3dmfvWITuVs9OumXtwpAPJ" }),
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
      },
      success: data => {
        alert("Import complete!");
        this.setState({
          NEsongs: song_list
        });
      }
    });
  }

  searchSong(song_name, artist_name) {
    //e.preventDefault();
    $.ajax({
      url: "https://api.spotify.com/v1/search",
      type: "GET",
      data: {
        q: "track:'" + song_name + "' artist:'" + artist_name + "'",
        type: "track",
        limit: 1
      },
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
      },
      success: data => {
        if (data.tracks.items.length !== 0) {
          //console.log(data.tracks);
          //alert(data.tracks.items[0].name);
          this.setState(prevState => ({
            NEsongs: [...prevState.NEsongs, [song_name, artist_name, data.tracks.items[0].name, data.tracks.items[0].artists[0].name, false, data.tracks.items[0].uri]]
          }));
        } else {
          this.setState(prevState => ({
            NEsongs: [...prevState.NEsongs, [song_name, artist_name, "N/A", "N/A", false, ""]]
          }));
        }
        //this.setState({
        //playlists: data.items
        //});
      }
    });
  }

  getNetease(event) {
    event.preventDefault();
    this.setState({
      NEsongs: []
    });
    $.ajax({
      url: "https://musicapi.leanapp.cn/playlist/detail",
      type: "GET",
      data: {
        id: this.state.neteasesearch,
      },
      success: data => {
        //alert(data.playlist.trackIds[4].id);
        //alert(data.playlist.trackIds[3].id);
        console.log(data);
        if (data.code !== 200) {
          alert("Error fetching playlist");
          return;
        }
        data.playlist.trackIds.forEach(element => {
          $.ajax({
            url: "https://musicapi.leanapp.cn/song/detail",
            type: "GET",
            data: {
              ids: element.id,
            },
            success: trackdata => {
              //alert(trackdata.songs[0].name);
              this.searchSong(trackdata.songs[0].name, trackdata.songs[0].ar[0].name);
            }
          });
        });

      }
    });
  }

  selectSong(index, e) {
    e.preventDefault();
    //alert(index);
    let song_list = [...this.state.NEsongs];
    if (song_list[index][3] !== "N/A") {
      song_list[index][4] = !song_list[index][4];
      this.setState({ NEsongs: song_list });
    }
  }

  selectPlaylist(playlist) {
    //console.log(playlist);
    this.setState({ sel_playlist: playlist });
  }

  handleChange(event) {
    this.setState({ neteasesearch: event.target.value })
  }

  selectAll() {
    //alert(index);
    let song_list = [...this.state.NEsongs];
    song_list.forEach(song => {
      if (song[3] !== "N/A") song[4] = true;
    });
    this.setState({ NEsongs: song_list });

  }

  render() {
    return (
      <div className="App">
        <div id="col1">

          {this.state.token && <form onSubmit={this.getNetease}>
            <label>
              <input type="text" name="url" value={this.state.neteasesearch} onChange={this.handleChange} className="input-field" />
            </label>
            <input type="submit" value="get playlist" className="submit-btn" />
          </form>}

          {this.state.NEsongs.length !== 0 && <button onClick={this.importSongs} className="btn">
            IMPORT
              </button>}
          {this.state.NEsongs.length !== 0 && <button onClick={this.selectAll} className="btn">
            SELECT ALL
              </button>}

        </div>
        <div id="col2">
          {!this.state.token && (
            <header className="App-header">
              <a
                className="btn btn--loginApp-link"
                href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                  "%20"
                )}&response_type=token&show_dialog=true`}
              >
                Login to Spotify
            </a>
            </header>
          )}

          {this.state.token && <table className="Song-list">
            <thead>
              <tr>
                <th style={{ fontSize: "0.7em" }}>Netease</th>
                <th style={{ fontSize: "0.7em" }}>Spotify</th>
                <th style={{ fontSize: "0.7em" }}>Import?</th>
              </tr>
            </thead>
            <tbody>

              {this.state.NEsongs.map((song, index) => (
                <tr key={song[0]} onClick={this.selectSong.bind(this, index)} className="Song-row">
                  <td style={{ background: (song[4] ? "#1ecd97" : ""), color: (song[4] ? "#333" : "") }}><p className="Song-name">{song[0]}</p><p className="Artist-name">{song[1]}</p></td>
                  <td style={{ background: (song[4] ? "#1ecd97" : ""), color: (song[4] ? "#333" : "") }}><p className="Song-name">{song[2]}</p><p className="Artist-name">{song[3]}</p></td>
                  <td style={{ background: (song[4] ? "#1ecd97" : ""), color: (song[4] ? "#333" : "") }}>[]</td>
                </tr>
              ))}
            </tbody>
          </table>}
        </div>
        <div id="col3" style={{ width: (this.state.token ? "25%" : "100%") }}>
          {this.state.token && (
            <div>
              <Playlists
                playlists={this.state.playlists}
                action={this.selectPlaylist}
                selected={this.state.sel_playlist}
              />
            </div>
          )}
          {this.state.display_name}
        </div>
      </div>
    );
  }
}

export default App;
