let player; // YouTubePlayer
let currentPlay = 0; // Index of current playing song
let isLoop = false; // Flag for loop mode

$(document).ready(function() {
    // Show the modal window on page load
    $("#myModal").css("display", "block");
  
    // Add click event listener for the close button
    $(".close").click(function() {
        // Hide the modal window when close button is clicked
        $("#myModal").css("display", "none");
    });
});

// YouTubeAPIReady
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "390",
        width: "640",
        videoId: playList[currentPlay],
        playerVars: {
            autoplay: 0, // Auto-play
            controls: 0, // Show controls
            start: playTime[currentPlay][0], // Start time in seconds
            end: playTime[currentPlay][1], // End time in seconds
            iv_load_policy: 3
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });
}

// YouTubePlayerReady
function onPlayerReady(event) {
    $("#playButton").on("click", function () {
        $("#songTitle").text(player.getVideoData().title); // Update the song title
        player.playVideo();
    });
}

// PlayerStateChange
function onPlayerStateChange(event) {
    if (Math.floor(player.getCurrentTime()) == playTime[currentPlay][1]) {
        if (currentPlay < playList.length - 1) {
            currentPlay++;
            player.loadVideoById({
                videoId: playList[currentPlay],
                startSeconds: playTime[currentPlay][0],
                endSeconds: playTime[currentPlay][1],
                suggestedQuality: "large"
            });
        } else {
            currentPlay = 0;
            player.cueVideoById({
                videoId: playList[currentPlay],
                startSeconds: playTime[currentPlay][0],
                endSeconds: playTime[currentPlay][1],
                suggestedQuality: "large"
            });
        }
    }
    if (event.data == 1) {
        $("#songTitle").text(player.getVideoData().title); // Update the song title
    }
}

// Play/Pause song
function togglePlay() {
    if (player.getPlayerState() === 1) {
        player.pauseVideo();
    } else if (player.getPlayerState() === 2 || player.getPlayerState() === 5) {
        player.playVideo();
    }
}

// Play next song
function playNextSong() {
    if (currentPlay < playList.length - 1) {
        currentPlay++;
    } else {
        currentPlay = 0;
    }
    player.loadVideoById({
        videoId: playList[currentPlay],
        startSeconds: playTime[currentPlay][0],
        endSeconds: playTime[currentPlay][1],
        suggestedQuality: "large"
    });
}

// Play previous song
function playPrevSong() {
    if (currentPlay > 0) {
        currentPlay--;
    } else {
        currentPlay = playList.length - 1;
    }
    player.loadVideoById({
        videoId: playList[currentPlay],
        startSeconds: playTime[currentPlay][0],
        endSeconds: playTime[currentPlay][1],
        suggestedQuality: "large"
    });
}

// Shuffle playlist
function shufflePlaylist() {
    for (let i = playList.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [playList[i], playList[j]] = [playList[j], playList[i]];
        [playTime[i], playTime[j]] = [playTime[j], playTime[i
        ]];
    }
    if (currentPlay > 0) {
    currentPlay = 0; // Reset currentPlay index to the first song
    }
    player.loadVideoById({
    videoId: playList[currentPlay],
    startSeconds: playTime[currentPlay][0],
    endSeconds: playTime[currentPlay][1],
    suggestedQuality: "large"
    });
}
    
// Toggle loop mode
function toggleLoop() {
    isLoop = !isLoop;
    if (isLoop) {
        document.getElementById("player").loop = true;
    } else {
        document.getElementById("player").loop = false;
    }
}
    
// YouTube API error handling
function onYouTubeIframeAPIError() {
    console.error("Error loading YouTube API.");
}


