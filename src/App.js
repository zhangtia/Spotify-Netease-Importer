import React, { Component } from "react";
import * as $ from "jquery";
import { page_size } from "./config";
import hash from "./hash";
import Playlists from "./Playlists";
import "./App.css";
import Intro from "./Intro";
import Landing from "./Landing";

// https://medium.com/@jonnykalambay/now-playing-using-spotifys-awesome-api-with-react-7db8173a7b13
// https://levelup.gitconnected.com/how-to-build-a-spotify-player-with-react-in-15-minutes-7e01991bc4b6

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      display_name: "Not logged in",
      display_pic: null,
      playlists: [],
      neteasesearch: 463126179,
      NEsongs: [],
      sel_playlist: null,
      songs_to_import: [],
      current_page: 0,
      step_nbr: 1,
      recommended: [],
      loading: false,
    };
    this.trendingPlaylist = this.trendingPlaylist.bind(this);
    this.hi = this.hi.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);
    this.getNetease = this.getNetease.bind(this);
    this.searchSong = this.searchSong.bind(this);
    this.importSongs = this.importSongs.bind(this);
    this.selectPlaylist = this.selectPlaylist.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.testFunction = this.testFunction.bind(this);
    this.selectRecommended = this.selectRecommended.bind(this);
    this.getCookies = this.getCookies.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    // Set token
    var _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });

      if (hash.expires_in) {
        var date = new Date();
        date.setTime(date.getTime() + (parseInt(hash.expires_in) * 100));
        var expires = "; expires=" + date.toUTCString();
        document.cookie = "SpotifyAuth=" + (hash.access_token || "") + expires + "; path=/";
      }

      this.hi(_token);
      this.getPlaylists(_token);
      this.trendingPlaylist();
    }

    if (this.getCookies()) {
      _token = this.getCookies();
      this.setState({
        token: _token
      });
      this.hi(_token);
      this.getPlaylists(_token);
      this.trendingPlaylist();
    }
  }

  getCookies() {
    var nameEQ = "SpotifyAuth=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  logout() {
    console.log('called');
    document.cookie = 'SpotifyAuth=hi; Max-Age=-99999999;';
    this.setState({
      token: null,
      display_name: "Not logged in",
      display_pic: null,
      playlists: [],
      neteasesearch: 463126179,
      NEsongs: [],
      sel_playlist: null,
      songs_to_import: [],
      current_page: 0,
      step_nbr: 1,
      recommended: [],
      loading: false,
    });
  }

  trendingPlaylist() {
    $.ajax({
      url: "https://musicapi.leanapp.cn/top/playlist",
      type: "GET",
      data: {
        limit: 5,
        cat: "欧美",
      },
      success: data => {
        this.setState({
          recommended: data.playlists
        });
      }
    });
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
          display_name: data.display_name,
          display_pic: data.images[0].url,
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
    let param_list = [];
    let params = "";
    song_list.forEach((element, index) => {
      if (index % 50 === 0 && index !== 0) {
        param_list.push(params.substring(0, params.length - 1));
        params = "";
      }
      if (element[4]) {
        params = params + element[5] + ",";
        element[4] = !element[4];
      }
    })
    param_list.push(params.substring(0, params.length - 1));
    param_list.forEach((query) => {
      $.ajax({
        url: "https://api.spotify.com/v1/playlists/" + this.state.sel_playlist + "/tracks?" + $.param({ uris: query }),
        type: "POST",
        beforeSend: xhr => {
          xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
        },
        statusCode: {
          500: () => {
            param_list.push(query);
          },
        }
      });
    })
    this.setState({ NEsongs: song_list });
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
    //event.preventDefault();
    this.setState({
      NEsongs: [],
      step_nbr: 2,
      loading: true
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
        //console.log(data);
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
    this.setState({ loading: false });
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

  prevPage() {
    if (this.state.current_page > 0) {
      let prev_pg = (this.state.current_page - 1);
      this.setState({ current_page: prev_pg });
    }
  }

  nextPage() {
    if ((this.state.current_page + 1) * page_size < this.state.NEsongs.length) {
      let next_pg = (this.state.current_page + 1);
      this.setState({ current_page: next_pg });
    }
  }

  testFunction(nbr) {
    this.setState({ step_nbr: nbr });
  }

  selectRecommended(playlist) {
    this.setState({ neteasesearch: playlist, step_nbr: 2, NEsongs: [] });
    $.ajax({
      url: "https://musicapi.leanapp.cn/playlist/detail",
      type: "GET",
      data: {
        id: playlist,
      },
      success: data => {
        //alert(data.playlist.trackIds[4].id);
        //alert(data.playlist.trackIds[3].id);
        //console.log(data);
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

  render() {
    return (
      <div className="App">

        <ul className="navbar">
          <li className="home-logo">NTESPOT</li>
          {this.state.token && this.state.display_pic && <li className="logged-in-as" onClick={this.logout}><img className="profile-img" src={this.state.display_pic} alt="profile-pic" /><span>{this.state.display_name}</span></li>}
        </ul>

        <div id="col1"
          style={{ width: (this.state.step_nbr === 1 ? "100%" : "0%") }}>

          {this.state.token && this.state.NEsongs.length > 0 && <div className="dud-btn" style={{ float: "left" }}>
            &gt;&gt;&gt;&gt;&gt;
              </div>}
          {this.state.token && this.state.NEsongs.length > 0 && <button onClick={() => this.testFunction(2)} className="btn" style={{ float: "right" }}>
            &gt;&gt;&gt;&gt;&gt;
              </button>}

          {!this.state.token && (
            <Landing />
          )}
          {this.state.token && this.state.step_nbr === 1 && <form onSubmit={this.getNetease}>
            <label>
              <input type="text" name="user" value={this.state.neteasesearch} onChange={this.handleChange} className="input-field" />
            </label>
            <input type="submit" value="get playlist" className="submit-btn" />
          </form>}
          {this.state.token && this.state.step_nbr === 1 && <Intro action={this.selectRecommended} data={this.state.recommended} />}

        </div>
        <div id="col2"
          style={{ width: (this.state.step_nbr === 2 ? "100%" : "0%") }}>
          <button onClick={() => this.testFunction(1)} className="btn" style={{ float: "left" }}>
            &lt;&lt;&lt;&lt;&lt;
              </button>
          <button onClick={() => this.testFunction(3)} className="btn" style={{ float: "right" }}>
            &gt;&gt;&gt;&gt;&gt;</button>

          {!this.state.loading && this.state.NEsongs.length !== 0 && this.state.step_nbr === 2 && <div className="control-panel">
            <button onClick={this.selectAll} className="btn">
              SELECT ALL
              </button>
            <button onClick={this.prevPage} className="page-btn left-space">
              Previous Page
              </button>
            {this.state.current_page + 1}
            <button onClick={this.nextPage} className="page-btn">
              Next Page
              </button>
          </div>}

          {this.state.token && this.state.step_nbr === 2 && <p className="Song-text">Select songs from playlist to import to Spotify</p>}

          {this.state.token && this.state.step_nbr === 2 && <table className="Song-list">
            <thead>
              <tr>
                <th style={{ fontSize: "0.7em" }}>Netease</th>
                <th style={{ fontSize: "0.7em" }}>Spotify</th>
                <th style={{ fontSize: "0.7em" }}>Import?</th>
              </tr>
            </thead>
            <tbody>

              {this.state.NEsongs.slice(this.state.current_page * page_size, (this.state.current_page + 1) * page_size).map((song, index) => (
                <tr key={song[0]} onClick={this.selectSong.bind(this, (this.state.current_page * page_size) + index)} className="Song-row">
                  <td style={{ background: (song[4] ? "#1ecd97" : ""), color: (song[4] ? "#333" : "") }}><p className="Song-name">{song[0]}</p><p className="Artist-name">{song[1]}</p></td>
                  <td style={{ background: (song[4] ? "#1ecd97" : ""), color: (song[4] ? "#333" : "") }}><p className="Song-name">{song[2]}</p><p className="Artist-name">{song[3]}</p></td>
                  <td style={{ background: (song[4] ? "#1ecd97" : ""), color: (song[4] ? "#333" : "") }}>[]</td>
                </tr>
              ))}
            </tbody>
          </table>}
          {this.state.NEsongs.length !== 0 && this.state.step_nbr === 2 && <div className="page-index">
            <button onClick={this.prevPage} className="page-btn left-space">
              Previous Page
              </button>
            {this.state.current_page + 1}
            <button onClick={this.nextPage} className="page-btn">
              Next Page
              </button>
          </div>}
        </div>
        <div id="col3" style={{ width: (this.state.step_nbr === 3 ? "100%" : "0%") }}>
          <button onClick={() => this.testFunction(2)} className="btn" style={{ float: "left" }}>
            &lt;&lt;&lt;&lt;&lt;
              </button>
          <div className="dud-btn" style={{ float: "right" }}>
            &lt;&lt;&lt;&lt;&lt;
              </div>
          {this.state.token && this.state.step_nbr === 3 && (
            <div style={{ alignItems: "center" }}>
              <p>Select Spotify Playlist to import songs to.</p>
              <button onClick={this.importSongs} className="btn import-btn">
                IMPORT
              </button>
              <Playlists
                playlists={this.state.playlists}
                action={this.selectPlaylist}
                selected={this.state.sel_playlist}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
