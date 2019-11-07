// Window load //
window.onload = function(){
    loadMCBanner();
}
// Get mc-banner //
var getMC = new XMLHttpRequest;
getMC.onreadystatechange = function() {
    request = null;
    if (this.readyState == 4 && this.status == 200) {
            var tmp = null;
            var tmp = JSON.parse(getMC.responseText);
            if(tmp.online == false){
                console.log(tmp);
                document.getElementById('mc-banner').innerHTML = '<div class="mc-top"> <img src="server-icons/mc.stibarc.com.png"> <span class="mc-sub-top"> <span class="mc-title">mc.stibarc.com</span> <span class="mc-header" style="color:#AA0000;">Can\'t connect to server</span> </span> </div> <h4 id="playercount"> <div style="display:inline;margin: 0 5px 0 0;"> <span style="color:#AAAAAA;"></span> <span style="color:#555555;"></span> <span style="color:#AAAAAA;"></span> </div> <span class="couponcode"> <div class="ping-badge bad"> </div></span> </h4> <div style="margin:0 0 5px 0;"> <h4 style="margin:1rem 0">Players Online:</h4> <span id="playerlist">None</span> </div> <br /> <div id="refresh" class="mc-button" style="image-rendering: pixelated;" onclick="loadMCBanner()"> <span style="font-family: Minecraft, sans-serif;">Refresh</span> </div>'; 
            }else{
                console.log(tmp);
                document.getElementById('mc-banner').innerHTML = '<div class="mc-top"> <img src="'+tmp.icon+'"> <span class="mc-sub-top"> <span class="mc-title">'+tmp.hostname+'</span> <span class="mc-header">'+tmp.motd.html+'</span> </span> </div> <h4 id="playercount"> <div style="display:inline;margin: 0 5px 0 0;"> <span style="color:#AAAAAA;">'+tmp.players.online+'</span> <span style="color:#555555;">/</span> <span style="color:#AAAAAA;">'+tmp.players.max+'</span> </div> <span class="couponcode"> <div class="ping-badge great"> </div></span> </h4> <div style="margin:0 0 5px 0;"> <h4 style="margin:1rem 0">Players Online:</h4> <span id="playerlist">Loading...</span> </div> <br /> <div id="refresh" class="mc-button" style="image-rendering: pixelated;" onclick="loadMCBanner()"> <span style="font-family: Minecraft, sans-serif;">Refresh</span> </div>';
                getPlayerList(tmp);
            }
        }
};

// --- Functions --- //
function loadMCBanner(){ //send request and kickstart the rest of the banner
    document.getElementById('mc-banner').innerHTML = '<center><div class="lds-ellipsis white"><div></div><div></div><div></div><div></div></div></center>';
    getMC.open("GET", "https://api.mcsrvstat.us/2/mc.stibarc.com", true);
    getMC.send();
}
function getPlayerList(tmp){ //use the json requested to list all players
    document.getElementById('playerlist').innerHTML = null;
    if(tmp.players.list == null){
        document.getElementById('playerlist').innerHTML = "None";
    }else{
        for (i = 0; i < tmp.players.list.length; i++) { 
          document.getElementById('playerlist').innerHTML += '<div class="mc-tooltip"> <img src=https://minotar.net/avatar/'+tmp.players.list[i]+'/16.png"> <span style="display:inline-block;"> '+tmp.players.list[i]+'</span> </div>';
        }
    }
}