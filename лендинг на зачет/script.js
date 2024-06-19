const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicAtrist = wrapper.querySelector(".song-details .artist");
mainAudio = wrapper.querySelector("#main-audio");
playPauseBtn = wrapper.querySelector(".play-pause");
prevBtn = wrapper.querySelector("#prev");
nextBtn = wrapper.querySelector("#next");
progressBar = wrapper.querySelector(".progress-bar");
progressArea = wrapper.querySelector(".progress-area");

musicList = wrapper.querySelector(".music-list");
showMoreBtn = wrapper.querySelector("#more-music");
hideMusicBtn = musicList.querySelector("#close");

viewLyrics = wrapper.querySelector(".lyrics");
showText = wrapper.querySelector("#show-text");
hideText = viewLyrics.querySelector("#close-txt");

textLyrics = viewLyrics.querySelector(".text");
visualTheme = document.querySelector("#theme");

pse = document.querySelector("#pse");
var Wrapper = document.querySelector(".wrapper");


console.log(pse.style);
function changeImg1(){
    Wrapper.style.background = 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)';
     // картинка на фон
    Wrapper.style.backgroundImage = 'url(background/1.JPG)'
    pse.style.opacity = 0.4;
    //pse.style
}
function changeImg2(){
    Wrapper.style.backgroundImage = 'url(background/2.JPG)'
    pse.style.opacity = 0.2;
}
function changeImg3(){
    Wrapper.style.backgroundImage = 'url(background/4.JPG)'
    pse.style.opacity = 1;
}
function changeImg4(){
    Wrapper.style.backgroundImage = ''
}
//console.log(Wrapper.style);


visualTheme.addEventListener("click", () => {
    let getText = visualTheme.innerText;
    switch(getText) {
        case "star":
            changeImg1();
            visualTheme.innerText = "cloud";
            breack;
        case "cloud":
            changeImg2();
            visualTheme.innerText = "sunny";
            breack;
        case "sunny":
            changeImg3();
            visualTheme.innerText = "eco";
            break;
        case "eco":
            changeImg4();
            visualTheme.innerText = "star";
            break;
    }
})
/*
var block = document.getElementById('block');

function changeBgImg(){
    block.style.backgroundImage = "url('https://cs7062.vk.me/c540107/v540107359/2729/fYQlS_23QdA.jpg')";
}

changeBgImg();
*/
/*
document.querySelector('#volume_audio').onclick = function() {
   //отключение звука

}
*/



let musicIndex = 1;


window.addEventListener( "load", ()=>{
    loadMusic(musicIndex);
    loadText(musicIndex);
    playingNow(); 
})

function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicAtrist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `data/${allMusic[indexNumb - 1].img}`;
    mainAudio.src = `data/${allMusic[indexNumb - 1].src}.mp3`;    
}

function loadText(indexNumb) {
    textLyrics.innerText = allMusic[indexNumb-1].text;
    //работа с файлами

    /*
    var FSO = CreateObject("Scripting.FileSystemObject");
    console.log(`"${allMusic.text}"`)
    var f = FSO.GetFile('/Users/merelicey/Downloads/musicplayer/data/rosemary.txt');
    var txt = f.OpenAsTextStream(1, -2);
    var s = txt.readAll();
    console.log(s);
    txt.Close();
    textLyrics.innerText = s //  =   считать текст с файла с таким названием;
    */
}

/*
const fs = require('fs');
const { default: test } = require('node:test');

const readline = require('readline');
const file = readline.createInterface({
    input: fs.createReadStream('/Users/qwer/Desktop/musicplayer/test.txt'),
    output: process.stdout,
    terminal: false
});
*/


function playMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

function pauseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

function nextMusic(){
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    loadText(musicIndex);
    playMusic();
    playingNow();
}

function prevMusic(){
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    loadText(musicIndex);
    playMusic();
    playingNow();
}

playPauseBtn.addEventListener("click", ()=>{
    const isMusicPaused = wrapper.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
    playingNow();
});

nextBtn.addEventListener("click", ()=>{
    nextMusic();
})

prevBtn.addEventListener("click", ()=>{
    prevMusic();
})

mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current");
    let musicDuration = wrapper.querySelector(".duration");
    mainAudio.addEventListener("loadeddata", ()=> {

        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec1 = Math.floor(audioDuration % 60 / 10);
        let totalSec2 = Math.floor(audioDuration % 60 % 10)
        musicDuration.innerText = `${totalMin}:${totalSec1}${totalSec2}`;

    });
    let currentMin = Math.floor(currentTime / 60);
    let currentSec1 = Math.floor(currentTime % 60 / 10);
    let currentSec2 = Math.floor(currentTime % 60 % 10)
    musicCurrentTime.innerText = `${currentMin}:${currentSec1}${currentSec2}`;
});

progressArea.addEventListener("click", (e)=>{
    let progressWidthval = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
    playMusic();
});

const repeatBtn = wrapper.querySelector("#repeat-plist");

repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText;
    switch(getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffle");
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            break;

    }
});

mainAudio.addEventListener("ended", ()=>{
    let getText = repeatBtn.innerText;
    switch(getText) {
        case "repeat":
            nextMusic();
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            loadText(musicIndex);
            playMusic();
            break;
        case "shuffle":
            let randIndex = Math.floor((math.random() * allMusic.length) + 1)
            do{
                randIndex = Math.floor((math.random() * allMusic.length) + 1)
            }while(musicIndex = randIndex);
            musicIndex = randIndex;
            loadMusic(musicIndex);
            loadText(musicIndex);
            playMusic();
            playingNow();
            break;

    }
})



showMoreBtn.addEventListener("click", ()=> {
    musicList.classList.toggle("show");
});

hideMusicBtn.addEventListener("click", ()=> {
    showMoreBtn.click();
});

const ulTag = wrapper.querySelector("ul");
const ulText = wrapper.querySelector(".container-txt");



for (let i = 0; i < allMusic.length; i++) {
    let liTag = `<li li-index="${i + 1}">
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                    </div>
                    <audio class="${allMusic[i].src}" src="data/${allMusic[i].src}.mp3"></audio>
                    <span id="${allMusic[i].src}" class="audio-duration">6:52</span>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);

    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

    liAudioTag.addEventListener("loadeddata", ()=> {
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec1 = Math.floor(audioDuration % 60 / 10);
        let totalSec2 = Math.floor(audioDuration % 60 % 10)
        liAudioDuration.innerText = `${totalMin}:${totalSec1}${totalSec2}`;
        liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec1}${totalSec2}`);
    });
}



const allLiTags = ulTag.querySelectorAll("li");



function playingNow(){
    for (let j = 0; j < allLiTags.length; j++) {
            let audioTag = allLiTags[j].querySelector(".audio-duration");

        if(allLiTags[j].classList.contains("playing")){
            allLiTags[j].classList.remove("playing")
            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration;
        }

        if(allLiTags[j].getAttribute("li-index") == musicIndex) {
            allLiTags[j].classList.add("playing");
            audioTag.innerText = "Playing";
        }
        allLiTags[j].setAttribute("onclick", "clicked(this)");
    }
}

function clicked(e){
    let getLiIndex = e.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    loadText(musicIndex);
    playMusic();
    playingNow();
}

showText.addEventListener("click", ()=> {
    viewLyrics.classList.toggle("show");
});

hideText.addEventListener("click", ()=> {
    showText.click();
});