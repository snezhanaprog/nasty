var dialog = document.querySelector('dialog')
            // выводим диалоговое окно
            document.querySelector('#open_dialog').onclick = function () {
              dialog.show();

            document.querySelector('#close_dialog').onclick = function () {
            dialog.close();
            }
    }

var filename;


var inputArray = document.getElementsByClassName('input');
        
for(var i = 0; i < inputArray.length; i++){
    inputArray[i].addEventListener('change',prepareUpload,false);
};
    
function prepareUpload(event)
{
    var files = event.target.files;
    var fileName = files[0].name;
    //alert(fileName);
    filename = fileName;
    console.log(files[0].name);
    allMusic2.push(files[0].name);
} 
    
var music, artist;
var allMusic2 = [];
    

function getName() {
    var inputElement = document.getElementById("input_name");
    var value = inputElement.value;
    music = value;
    console.log(music);// name
}

function getArtist() {
    var inputElement = document.getElementById("input_artist");
    var value = inputElement.value;
    artist = value;
    console.log(artist); // artist
}


Done = dialog.querySelector("#done");
Done.addEventListener("click", ()=> {
    getName();
    getArtist();
    allMusic2.push(music);
    allMusic2.push(artist);
    console.log(allMusic2);

    //allMusic.push({name: allMusic2[0], artist: allMusic2[1], img: allMusic2[2], src: allMusic2[3]});
    /*
    {
        name: "Rosemary",
        artist: "Deftones",
        img: "music-1.JPG",
        src: "music-1.mp3"
    },
    */

});
/*
closeDialog = dialog.querySelector("#close-dialog");

closeDialog.addEventListener("click", ()=>{
    dialog.close();
});
*/

/*
var allNumbers = ["1", "2"];
allNumbers.push("3");
console.log(allNumbers);
*/



