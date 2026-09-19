// =========================================
// NURSE BIRTHDAY ASSESSMENT
// MAIN JAVASCRIPT
// =========================================


// =========================================
// SCREEN CONTROL
// =========================================

function showScreen(screenId) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });


    const selectedScreen =
        document.getElementById(screenId);


    if (selectedScreen) {

        selectedScreen.classList.add("active");

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =========================================
// QUESTIONS
// =========================================

const questions = [

    {

        question:
            "Which vital sign is commonly checked when assessing a patient's condition?",

        answers: [

            "Blood pressure",

            "Favorite color",

            "Phone battery",

            "Social media followers"

        ],

        correct: 0

    },


    {

        question:
            "Which quality is especially important when caring for patients?",

        answers: [

            "Patience and compassion",

            "Ignoring the patient",

            "Getting angry quickly",

            "Sleeping during duty 😂"

        ],

        correct: 0

    },


    {

        question:
            "A patient's condition suddenly changes. What should a nurse do?",

        answers: [

            "Ignore the change",

            "Assess the patient and respond appropriately",

            "Go home 😂",

            "Wait until tomorrow"

        ],

        correct: 1

    }

];


let currentQuestion = 0;


// =========================================
// START ASSESSMENT
// =========================================

function startAssessment() {

    currentQuestion = 0;

    document.getElementById(
        "totalQuestions"
    ).textContent =
        questions.length;

    showScreen("quizScreen");

    loadQuestion();

}


// =========================================
// LOAD QUESTION
// =========================================

function loadQuestion() {

    const question =
        questions[currentQuestion];


    document.getElementById(
        "questionNumber"
    ).textContent =
        currentQuestion + 1;


    document.getElementById(
        "question"
    ).textContent =
        question.question;


    const progress =
        ((currentQuestion + 1)
        / questions.length) * 100;


    document.getElementById(
        "progressFill"
    ).style.width =
        progress + "%";


    const answersContainer =
        document.getElementById("answers");


    answersContainer.innerHTML = "";


    document.getElementById(
        "quizResult"
    ).textContent = "";


    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");


            button.className =
                "answer";


            button.textContent =
                answer;


            button.onclick =
                function() {

                    checkAnswer(index);

                };


            answersContainer.appendChild(
                button
            );

        }
    );

}


// =========================================
// CHECK ANSWER
// =========================================

function checkAnswer(selectedAnswer) {

    const correctAnswer =
        questions[currentQuestion].correct;


    const result =
        document.getElementById(
            "quizResult"
        );


    const buttons =
        document.querySelectorAll(
            ".answer"
        );


    if (selectedAnswer === correctAnswer) {

        result.textContent =
            "✓ Correct! Eyyy Naka Chamba Siya";


        buttons.forEach(button => {

            button.disabled = true;

        });


        setTimeout(
            function() {

                currentQuestion++;


                if (
                    currentQuestion <
                    questions.length
                ) {

                    loadQuestion();

                }

                else {

                    beginNeedleProcedure();

                }

            },
            900
        );

    }

    else {

        result.textContent =
            "✕ Dili Mao Bulok ka. Utro, Nurse!!.";

    }

}


// =========================================
// BEGIN NEEDLE PROCEDURE
// =========================================

function beginNeedleProcedure() {

    showScreen("needleScreen");

    startNeedleGame();

}


// =========================================
// NEEDLE GAME
// =========================================

function startNeedleGame() {

    const needle =
        document.getElementById("needle");


    const area =
        document.getElementById(
            "injectionArea"
        );


    const target =
        document.getElementById("target");


    const result =
        document.getElementById(
            "needleResult"
        );


    let dragging = false;

    let completed = false;


    // Reset game

    needle.style.left =
        "25px";

    needle.style.top =
        "120px";


    needle.style.pointerEvents =
        "auto";


    target.textContent =
        "🎯";


    target.style.transform =
        "scale(1)";


    result.textContent =
        "";


    // =====================================
    // POINTER DOWN
    // Works with mouse + touchscreen
    // =====================================

    needle.onpointerdown =
        function(event) {

            if (completed) return;


            dragging = true;


            needle.setPointerCapture(
                event.pointerId
            );

        };


    // =====================================
    // POINTER MOVE
    // =====================================

    needle.onpointermove =
        function(event) {

            if (
                !dragging ||
                completed
            ) {

                return;

            }


            const areaRect =
                area.getBoundingClientRect();


            const needleWidth =
                needle.offsetWidth;


            const needleHeight =
                needle.offsetHeight;


            let x =
                event.clientX
                - areaRect.left
                - needleWidth / 2;


            let y =
                event.clientY
                - areaRect.top
                - needleHeight / 2;


            // Keep needle inside game

            x = Math.max(
                0,
                Math.min(
                    x,
                    area.clientWidth
                    - needleWidth
                )
            );


            y = Math.max(
                0,
                Math.min(
                    y,
                    area.clientHeight
                    - needleHeight
                )
            );


            needle.style.left =
                x + "px";


            needle.style.top =
                y + "px";


            checkNeedlePosition();

        };


    // =====================================
    // POINTER UP
    // =====================================

    needle.onpointerup =
        function() {

            dragging = false;

        };


    needle.onpointercancel =
        function() {

            dragging = false;

        };


    // =====================================
    // CHECK TARGET
    // =====================================

    function checkNeedlePosition() {

        const needleRect =
            needle.getBoundingClientRect();


        const targetRect =
            target.getBoundingClientRect();


        const needleX =
            needleRect.left
            + needleRect.width / 2;


        const needleY =
            needleRect.top
            + needleRect.height / 2;


        const targetX =
            targetRect.left
            + targetRect.width / 2;


        const targetY =
            targetRect.top
            + targetRect.height / 2;


        const distance =
            Math.hypot(

                needleX - targetX,

                needleY - targetY

            );


        // Successful injection

        if (distance < 65) {

            completed = true;

            dragging = false;


            target.textContent =
                "✓";


            target.style.transform =
                "scale(1.4)";


            needle.style.pointerEvents =
                "none";


            result.textContent =
                "🎉 PROCEDURE SUCCESSFUL!";


            // Go to birthday reveal

            setTimeout(
                function() {

                    window.location.href =
                        "birthday.html";

                },
                1600
            );

        }

    }

}