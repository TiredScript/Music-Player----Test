const audio = document.getElementById("songs");
const ctrlIcon = document.getElementById("ctrlIcon");
const progress = document.getElementById("progress");
const songTitle = document.querySelector(".music-player h1");
const songArtist = document.querySelector(".music-player p");
const songImg = document.querySelector(".song-img");

const songs = [
    {
        title: "Fame is a Gun",
        artist: "Addison Rae",
        src: "/musicPlayer/media/Addison Rae - Fame is a Gun (Official Video).mp3",
        img: "/musicPlayer/media/media:addison.png"
    },
    {
        title: "FNAF 3 Rap",
        artist: "JT Music",
        src: "/musicPlayer/media/FNAF 3 RAP by JT Music - Another Five Nights (Remastered).mp3",
        img: "/musicPlayer/media/jtmusic.png"
    },
    {
        title: "Losin' Streak",
        artist: "Hazbin Hotel",
        src: "/musicPlayer/media/Losin' Streak Sing-Along - Hazbin Hotel S2  Prime Video.mp3",
        img: "/musicPlayer/media/hazbin.png"
    },
    {
        title: "Stay with me",
        artist: "Miki Matsubara",
        src: "/musicPlayer/media/Miki Matsubara - Stay With Me HD (Club Mix).mp3",
        img: "/musicPlayer/media/miki.png"
    }
];

let currentSong = 0;

// Load a song
function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    songImg.src = song.img;
    audio.currentTime = 0;
    progress.value = 0;
}

// Play / pause
function playPause() {
    if (audio.paused) {
        audio.play();
        ctrlIcon.setAttribute("fill", "#e4e2e2"); // optional: change color
        // optionally change the SVG to pause icon
    } else {
        audio.pause();
        ctrlIcon.setAttribute("fill", "#000000");
        // optionally change the SVG to play icon
    }
}

// Next song
function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
}

// Previous song
function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
}

// Progress bar
audio.addEventListener("loadedmetadata", () => {
    progress.max = audio.duration;
});

audio.addEventListener("timeupdate", () => {
    progress.value = audio.currentTime;
});

progress.oninput = function() {
    audio.currentTime = progress.value;
};

// Auto next
audio.addEventListener("ended", () => {
    nextSong();
});

// Load first song on start
loadSong(currentSong);


if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/musicPlayer/sw.js")
        .then((reg) => console.log("Service Worker registered", reg))
        .catch((err) => console.log("Service Worker registration failed", err));
}
