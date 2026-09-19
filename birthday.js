// =================================
// BIRTHDAY PAGE
// =================================


// =================================
// SCREEN CONTROL
// =================================

function showSection(id) {

    document
        .querySelectorAll(".birthday-section")
        .forEach(section => {

            section.classList.remove("active");

        });


    const section =
        document.getElementById(id);


    if (section) {

        section.classList.add("active");

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =================================
// BEGIN BIRTHDAY
// =================================

function beginBirthday() {

    showSection("reveal");

    createStars();

}


// =================================
// SHOW LETTER
// =================================

function showLetter() {

    showSection("letter");

}


// =================================
// SHOW VOICE MESSAGE
// =================================

function showVoice() {

    showSection("voice");

}


// =================================
// SHOW MEMORIES
// =================================

function showMemories() {

    showSection("memories");

}


// =================================
// SHOW FINAL MESSAGE
// =================================

function showFinal() {

    showSection("final");

}


// =================================
// CREATE GOLDEN STARS
// =================================

function createStars() {

    const container =
        document.getElementById("stars");


    if (!container) return;


    container.innerHTML = "";


    for (let i = 0; i < 40; i++) {

        const star =
            document.createElement("div");


        star.style.position =
            "absolute";

        star.style.width =
            "3px";

        star.style.height =
            "3px";

        star.style.borderRadius =
            "50%";

        star.style.background =
            "#b99a5b";

        star.style.opacity =
            Math.random();


        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";


        star.style.animation =
            `float ${2 + Math.random() * 4}s ease-in-out infinite`;


        container.appendChild(star);

    }

}


// =================================
// VOICE MESSAGE
// =================================

const voice =
    document.getElementById("voiceMessage");

const soundWave =
    document.getElementById("soundWave");


if (voice && soundWave) {

    voice.addEventListener(
        "play",
        function() {

            soundWave.classList.add(
                "playing"
            );

        }
    );


    voice.addEventListener(
        "pause",
        function() {

            soundWave.classList.remove(
                "playing"
            );

        }
    );


    voice.addEventListener(
        "ended",
        function() {

            soundWave.classList.remove(
                "playing"
            );

        }
    );

}


// =================================
// PHOTO GALLERY
// =================================

const photos = [

    "assets/sister-photo.jpg",

    "assets/photo2.jpg",

    "assets/photo3.jpg"

];


let currentPhoto = 0;


// =================================
// UPDATE PHOTO
// =================================

function updatePhoto() {

    const image =
        document.getElementById(
            "memoryImage"
        );


    const number =
        document.getElementById(
            "photoNumber"
        );


    if (!image || !number) return;


    image.src =
        photos[currentPhoto];


    number.textContent =
        `${currentPhoto + 1} / ${photos.length}`;

}


// =================================
// NEXT PHOTO
// =================================

function nextPhoto() {

    currentPhoto++;


    if (currentPhoto >= photos.length) {

        currentPhoto = 0;

    }


    updatePhoto();

}


// =================================
// PREVIOUS PHOTO
// =================================

function previousPhoto() {

    currentPhoto--;


    if (currentPhoto < 0) {

        currentPhoto =
            photos.length - 1;

    }


    updatePhoto();

}