(this["webpackJsonpplaylist-importer"]=this["webpackJsonpplaylist-importer"]||[]).push([[0],[,,,,,,,,function(e,t,a){},,,function(e,t,a){e.exports=a.p+"static/media/Tutorial.31b792ab.png"},function(e,t,a){e.exports=a.p+"static/media/mygif.6758da32.gif"},function(e,t,a){e.exports=a(20)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),i=a(10),l=a.n(i),c=(a(18),a(7)),o=a(3),r=a(4),u=a(1),p=a(6),m=a(5),h=a(2),g=["playlist-modify-public","playlist-modify-private"],d=window.location.hash.substring(1).split("&").reduce((function(e,t){if(t){var a=t.split("=");e[a[0]]=decodeURIComponent(a[1])}return e}),{});window.location.hash="";var y=d,f=(a(8),function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"App-playlist"},this.props.playlists.map((function(t){return n.a.createElement("div",{key:t.id,onClick:function(){return e.props.action(t.id)}},n.a.createElement("div",{className:"main-wrapper btn",style:{background:e.props.selected===t.id?"#1ecd97":"",color:e.props.selected===t.id?"#333":""}},n.a.createElement("div",{className:"now-playing__img"},n.a.createElement("img",{className:"album-img",src:0!==t.images.length?t.images[0].url:"https://img.icons8.com/material-sharp/24/000000/no-image.png",alt:"album-cover"})),n.a.createElement("div",{className:"now-playing__side"},n.a.createElement("div",{className:"now-playing__name"},t.name))))})))}}]),a}(s.Component)),b=(a(19),a(11)),E=a.n(b),v=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"Intro"},n.a.createElement("p",{className:"Intro-text"},"Start by searching up a playlist ID, or pick one from the trending playlists!"),n.a.createElement("table",{className:"Intro-list"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",{style:{fontSize:"1em"}},"Hot Playlists"))),n.a.createElement("tbody",null,this.props.data.map((function(t){return n.a.createElement("tr",{key:t.id,onClick:function(){return e.props.action(t.id)},className:"Song-row"},n.a.createElement("td",null,t.name))})))),n.a.createElement("img",{className:"Intro-pic",src:E.a,alt:"album-cover"}))}}]),a}(s.Component),N=a(12),k=a.n(N),S=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return n.a.createElement("div",{className:"Landing"},n.a.createElement("div",{className:"Landing-header"},n.a.createElement("h1",{className:"Landing-title"},"NETSPOT"),n.a.createElement("img",{className:"Landing-gif",src:k.a,alt:"netease-spotify-gif"}),n.a.createElement("h1",{className:"Landing-subtitle"}," Netease-Spotify music importer")),n.a.createElement("div",{className:"Landing-desc"},n.a.createElement("p",null,"Web app to import playlists between Spotify and Netease Music (\u7f51\u6613\u4e91\u97f3\u4e50)."),n.a.createElement("br",null),n.a.createElement("p",null,"Currently, app only supports importing music from Netease to Spotify.")),n.a.createElement("a",{className:"btn btn--login App-link Landing-login",href:"".concat("https://accounts.spotify.com/authorize","?client_id=").concat("60707a33a22f4caaa987faa27cd9251b","&redirect_uri=").concat("https://zhangtia.github.io/Spotify-Netease-Importer/","&scope=").concat(g.join("%20"),"&response_type=token&show_dialog=true")},"Login to Spotify"))}}]),a}(s.Component),_=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(e){var s;return Object(o.a)(this,a),(s=t.call(this,e)).state={token:null,display_name:"Not logged in",display_pic:null,playlists:[],neteasesearch:463126179,NEsongs:[],sel_playlist:null,songs_to_import:[],current_page:0,step_nbr:1,recommended:[],loading:!1},s.trendingPlaylist=s.trendingPlaylist.bind(Object(u.a)(s)),s.hi=s.hi.bind(Object(u.a)(s)),s.getPlaylists=s.getPlaylists.bind(Object(u.a)(s)),s.getNetease=s.getNetease.bind(Object(u.a)(s)),s.searchSong=s.searchSong.bind(Object(u.a)(s)),s.importSongs=s.importSongs.bind(Object(u.a)(s)),s.selectPlaylist=s.selectPlaylist.bind(Object(u.a)(s)),s.handleChange=s.handleChange.bind(Object(u.a)(s)),s.selectAll=s.selectAll.bind(Object(u.a)(s)),s.prevPage=s.prevPage.bind(Object(u.a)(s)),s.nextPage=s.nextPage.bind(Object(u.a)(s)),s.testFunction=s.testFunction.bind(Object(u.a)(s)),s.selectRecommended=s.selectRecommended.bind(Object(u.a)(s)),s.getCookies=s.getCookies.bind(Object(u.a)(s)),s.logout=s.logout.bind(Object(u.a)(s)),s}return Object(r.a)(a,[{key:"componentDidMount",value:function(){var e=y.access_token;if(e){if(this.setState({token:e}),y.expires_in){var t=new Date;t.setTime(t.getTime()+100*parseInt(y.expires_in));var a="; expires="+t.toUTCString();document.cookie="SpotifyAuth="+(y.access_token||"")+a+"; path=/"}this.hi(e),this.getPlaylists(e),this.trendingPlaylist()}this.getCookies()&&(e=this.getCookies(),this.setState({token:e}),this.hi(e),this.getPlaylists(e),this.trendingPlaylist())}},{key:"getCookies",value:function(){for(var e=document.cookie.split(";"),t=0;t<e.length;t++){for(var a=e[t];" "===a.charAt(0);)a=a.substring(1,a.length);if(0===a.indexOf("SpotifyAuth="))return a.substring("SpotifyAuth=".length,a.length)}return null}},{key:"logout",value:function(){console.log("called"),document.cookie="SpotifyAuth=hi; Max-Age=-99999999;",this.setState({token:null,display_name:"Not logged in",display_pic:null,playlists:[],neteasesearch:463126179,NEsongs:[],sel_playlist:null,songs_to_import:[],current_page:0,step_nbr:1,recommended:[],loading:!1})}},{key:"trendingPlaylist",value:function(){var e=this;h.ajax({url:"https://musicapi.leanapp.cn/top/playlist",type:"GET",data:{limit:5,cat:"\u6b27\u7f8e"},success:function(t){e.setState({recommended:t.playlists})}})}},{key:"hi",value:function(e){var t=this;h.ajax({url:"https://api.spotify.com/v1/me",type:"GET",beforeSend:function(t){t.setRequestHeader("Authorization","Bearer "+e)},success:function(e){t.setState({display_name:e.display_name,display_pic:e.images[0].url})}})}},{key:"getPlaylists",value:function(e){var t=this;h.ajax({url:"https://api.spotify.com/v1/me/playlists",type:"GET",data:{limit:50,offset:0},beforeSend:function(t){t.setRequestHeader("Authorization","Bearer "+e)},success:function(e){t.setState({playlists:e.items})}})}},{key:"importSongs",value:function(){var e=this;if(null!==this.state.sel_playlist){var t=Object(c.a)(this.state.NEsongs),a=[],s="";t.forEach((function(e,t){t%50===0&&0!==t&&(a.push(s.substring(0,s.length-1)),s=""),e[4]&&(s=s+e[5]+",",e[4]=!e[4])})),a.push(s.substring(0,s.length-1)),a.forEach((function(t){h.ajax({url:"https://api.spotify.com/v1/playlists/"+e.state.sel_playlist+"/tracks?"+h.param({uris:t}),type:"POST",beforeSend:function(t){t.setRequestHeader("Authorization","Bearer "+e.state.token)},statusCode:{500:function(){a.push(t)}}})})),this.setState({NEsongs:t})}else alert("Please select a playlist")}},{key:"searchSong",value:function(e,t){var a=this;h.ajax({url:"https://api.spotify.com/v1/search",type:"GET",data:{q:"track:'"+e+"' artist:'"+t+"'",type:"track",limit:1},beforeSend:function(e){e.setRequestHeader("Authorization","Bearer "+a.state.token)},success:function(s){0!==s.tracks.items.length?a.setState((function(a){return{NEsongs:[].concat(Object(c.a)(a.NEsongs),[[e,t,s.tracks.items[0].name,s.tracks.items[0].artists[0].name,!1,s.tracks.items[0].uri]])}})):a.setState((function(a){return{NEsongs:[].concat(Object(c.a)(a.NEsongs),[[e,t,"N/A","N/A",!1,""]])}}))}})}},{key:"getNetease",value:function(e){var t=this;this.setState({NEsongs:[],step_nbr:2,loading:!0}),h.ajax({url:"https://musicapi.leanapp.cn/playlist/detail",type:"GET",data:{id:this.state.neteasesearch},success:function(e){200===e.code?e.playlist.trackIds.forEach((function(e){h.ajax({url:"https://musicapi.leanapp.cn/song/detail",type:"GET",data:{ids:e.id},success:function(e){t.searchSong(e.songs[0].name,e.songs[0].ar[0].name)}})})):alert("Error fetching playlist")}}),this.setState({loading:!1})}},{key:"selectSong",value:function(e,t){t.preventDefault();var a=Object(c.a)(this.state.NEsongs);"N/A"!==a[e][3]&&(a[e][4]=!a[e][4],this.setState({NEsongs:a}))}},{key:"selectPlaylist",value:function(e){this.setState({sel_playlist:e})}},{key:"handleChange",value:function(e){this.setState({neteasesearch:e.target.value})}},{key:"selectAll",value:function(){var e=Object(c.a)(this.state.NEsongs);e.forEach((function(e){"N/A"!==e[3]&&(e[4]=!0)})),this.setState({NEsongs:e})}},{key:"prevPage",value:function(){if(this.state.current_page>0){var e=this.state.current_page-1;this.setState({current_page:e})}}},{key:"nextPage",value:function(){if(20*(this.state.current_page+1)<this.state.NEsongs.length){var e=this.state.current_page+1;this.setState({current_page:e})}}},{key:"testFunction",value:function(e){this.setState({step_nbr:e})}},{key:"selectRecommended",value:function(e){var t=this;this.setState({neteasesearch:e,step_nbr:2,NEsongs:[]}),h.ajax({url:"https://musicapi.leanapp.cn/playlist/detail",type:"GET",data:{id:e},success:function(e){200===e.code?e.playlist.trackIds.forEach((function(e){h.ajax({url:"https://musicapi.leanapp.cn/song/detail",type:"GET",data:{ids:e.id},success:function(e){t.searchSong(e.songs[0].name,e.songs[0].ar[0].name)}})})):alert("Error fetching playlist")}})}},{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"App"},n.a.createElement("ul",{className:"navbar"},n.a.createElement("li",{className:"home-logo"},"NETSPOT"),this.state.token&&this.state.display_pic&&n.a.createElement("li",{className:"logged-in-as",onClick:this.logout},n.a.createElement("img",{className:"profile-img",src:this.state.display_pic,alt:"profile-pic"}),n.a.createElement("span",null,this.state.display_name))),n.a.createElement("div",{id:"col1",style:{width:1===this.state.step_nbr?"100%":"0%"}},this.state.token&&this.state.NEsongs.length>0&&n.a.createElement("div",{className:"dud-btn",style:{float:"left"}},">>>>>"),this.state.token&&this.state.NEsongs.length>0&&n.a.createElement("button",{onClick:function(){return e.testFunction(2)},className:"btn",style:{float:"right"}},">>>>>"),!this.state.token&&n.a.createElement(S,null),this.state.token&&1===this.state.step_nbr&&n.a.createElement("form",{onSubmit:this.getNetease},n.a.createElement("label",null,n.a.createElement("input",{type:"text",name:"user",value:this.state.neteasesearch,onChange:this.handleChange,className:"input-field"})),n.a.createElement("input",{type:"submit",value:"get playlist",className:"submit-btn"})),this.state.token&&1===this.state.step_nbr&&n.a.createElement(v,{action:this.selectRecommended,data:this.state.recommended})),n.a.createElement("div",{id:"col2",style:{width:2===this.state.step_nbr?"100%":"0%"}},n.a.createElement("button",{onClick:function(){return e.testFunction(1)},className:"btn",style:{float:"left"}},"<<<<<"),n.a.createElement("button",{onClick:function(){return e.testFunction(3)},className:"btn",style:{float:"right"}},">>>>>"),!this.state.loading&&0!==this.state.NEsongs.length&&2===this.state.step_nbr&&n.a.createElement("div",{className:"control-panel"},n.a.createElement("button",{onClick:this.selectAll,className:"btn"},"SELECT ALL"),n.a.createElement("button",{onClick:this.prevPage,className:"page-btn left-space"},"Previous Page"),this.state.current_page+1,n.a.createElement("button",{onClick:this.nextPage,className:"page-btn"},"Next Page")),this.state.token&&2===this.state.step_nbr&&n.a.createElement("p",{className:"Song-text"},"Select songs from playlist to import to Spotify"),this.state.token&&2===this.state.step_nbr&&n.a.createElement("table",{className:"Song-list"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",{style:{fontSize:"0.7em"}},"Netease"),n.a.createElement("th",{style:{fontSize:"0.7em"}},"Spotify"),n.a.createElement("th",{style:{fontSize:"0.7em"}},"Import?"))),n.a.createElement("tbody",null,this.state.NEsongs.slice(20*this.state.current_page,20*(this.state.current_page+1)).map((function(t,a){return n.a.createElement("tr",{key:t[0],onClick:e.selectSong.bind(e,20*e.state.current_page+a),className:"Song-row"},n.a.createElement("td",{style:{background:t[4]?"#1ecd97":"",color:t[4]?"#333":""}},n.a.createElement("p",{className:"Song-name"},t[0]),n.a.createElement("p",{className:"Artist-name"},t[1])),n.a.createElement("td",{style:{background:t[4]?"#1ecd97":"",color:t[4]?"#333":""}},n.a.createElement("p",{className:"Song-name"},t[2]),n.a.createElement("p",{className:"Artist-name"},t[3])),n.a.createElement("td",{style:{background:t[4]?"#1ecd97":"",color:t[4]?"#333":""}},"[]"))})))),0!==this.state.NEsongs.length&&2===this.state.step_nbr&&n.a.createElement("div",{className:"page-index"},n.a.createElement("button",{onClick:this.prevPage,className:"page-btn left-space"},"Previous Page"),this.state.current_page+1,n.a.createElement("button",{onClick:this.nextPage,className:"page-btn"},"Next Page"))),n.a.createElement("div",{id:"col3",style:{width:3===this.state.step_nbr?"100%":"0%"}},n.a.createElement("button",{onClick:function(){return e.testFunction(2)},className:"btn",style:{float:"left"}},"<<<<<"),n.a.createElement("div",{className:"dud-btn",style:{float:"right"}},"<<<<<"),this.state.token&&3===this.state.step_nbr&&n.a.createElement("div",{style:{alignItems:"center"}},n.a.createElement("p",null,"Select Spotify Playlist to import songs to."),n.a.createElement("button",{onClick:this.importSongs,className:"btn import-btn"},"IMPORT"),n.a.createElement(f,{playlists:this.state.playlists,action:this.selectPlaylist,selected:this.state.sel_playlist}))))}}]),a}(s.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(_,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[13,1,2]]]);
//# sourceMappingURL=main.8f34ccf6.chunk.js.map