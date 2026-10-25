const questions = [
    {
        question: "What does a large language model actually predict?",
        options: [
            "The next token",
            "The entire paragraph",
            "The final answer",
            "The user's intention"
        ],
        answer: "The next token"
    },

    {
        question: "In the commit-message format used in this course, what comes before the colon?",
        options: [
            "The type, such as feat or fix",
            "The filename",
            "The programmer name",
            "The date"
        ],
        answer: "The type, such as feat or fix"
    },

    {
        question: "What must a unit test do before the bug is fixed?",
        options: [
            "Fail",
            "Pass",
            "Stop running",
            "Delete the code"
        ],
        answer: "Fail"
    },

    {
        question: "Where should the styling for a webpage live?",
        options: [
            "In a separate CSS file",
            "Inside Python",
            "Inside the browser console",
            "Inside a text file"
        ],
        answer: "In a separate CSS file"
    },

    {
        question: "What does a loop inside another loop usually mean for time complexity?",
        options: [
            "It is quadratic",
            "It is constant",
            "It is logarithmic",
            "It has no complexity"
        ],
        answer: "It is quadratic"
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const quizElement = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const stepElement = document.getElementById("step");
const progressFill = document.getElementById("progress-fill");
const letters = ["A", "B", "C", "D"];

function updateProgress() {
    const total = questions.length;
    const shown = Math.min(currentQuestion + 1, total);
    stepElement.textContent = "Question " + shown + " of " + total;
    progressFill.style.width = ((shown / total) * 100) + "%";
}

function showQuestion() {
    answered = false;
    quizElement.classList.remove("is-complete");

    const q = questions[currentQuestion];

    questionElement.textContent = q.question;
    optionsElement.innerHTML = "";
    updateProgress();

    q.options.forEach(function(option, index) {
        const button = document.createElement("button");
        button.type = "button";

        const letter = document.createElement("span");
        letter.className = "letter";
        letter.textContent = letters[index];

        const label = document.createElement("span");
        label.textContent = option;

        button.appendChild(letter);
        button.appendChild(label);

        button.addEventListener("click", function() {
            checkAnswer(option);
        });

        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    if (answered) {
        return;
    }

    answered = true;

    Array.from(optionsElement.querySelectorAll("button")).forEach(function(button) {
        button.disabled = true;
    });

    if (selectedOption === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    window.setTimeout(function() {
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            quizElement.classList.add("is-complete");
            questionElement.textContent = "Quiz complete";
            optionsElement.innerHTML = "";
            stepElement.textContent = "Finished";
            progressFill.style.width = "100%";
            resultElement.textContent =
                "Your score is " + score + " out of " + questions.length;
        }
    }, 120);
}

showQuestion();
