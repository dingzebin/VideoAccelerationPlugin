function init() {
	var radios = document.getElementsByName("playbackRate");
	for(var i = 0; i < radios.length; i++) {
		radios[i].onclick = function() {	
			chrome.tabs.executeScript(
			{code: 'document.getElementById("webContentFrame").contentWindow.document.getElementById("ckplayer_player").playbackRate=' + this.value}
			);
		}
	}
}
window.addEventListener("load",
function() {
    init()
});
