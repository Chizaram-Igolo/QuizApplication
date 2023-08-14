// Part 1: Building the Quiz Object
class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    // Other quiz-related methods (e.g., checking answers, moving to the next question) can be added here.
}

// Sample questions
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "Madrid", "Rome"],
        correctAnswer: 0
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        correctAnswer: 0
    },
    // Add more questions here
];

// Part 2: Displaying Questions and Accepting Answers
function displayQuestion(quiz) {
    const currentQuestion = quiz.getCurrentQuestion();
    const questionElement = document.getElementById("question");
    questionElement.textContent = currentQuestion.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = ""; // Clear previous options

    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement("button");
        optionElement.textContent = option;
        optionElement.addEventListener("click", () => handleAnswer(quiz, index));
        optionsContainer.appendChild(optionElement);
    });
}

// Part 3: Checking Answers and Displaying Results
function handleAnswer(quiz, selectedOptionIndex) {
    const currentQuestion = quiz.getCurrentQuestion();
    const feedbackElement = document.getElementById("feedback");

    if (selectedOptionIndex === currentQuestion.correctAnswer) {
        feedbackElement.textContent = "Correct!";
        quiz.score++;
    } else {
        feedbackElement.textContent = "Incorrect!";
    }

    setTimeout(() => {
        feedbackElement.textContent = "";
        quiz.currentQuestionIndex++;
        displayQuestion(quiz);
    }, 2000); // Show feedback for 2 seconds
}

// Part 4: Asynchronous Timer
function startTimer() {
    let timeLeft = 30;
    const timerElement = document.getElementById("timer");
    timerElement.textContent = `Time left: ${timeLeft}s`;

    const timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timer);
            handleAnswer(quiz, -1); // Mark the question as unanswered
        }
    }, 1000); // Update every second
}

// Part 5: Using ES6 Modules
export { Quiz, displayQuestion, startTimer };

// Initialization
const quiz = new Quiz(questions);
displayQuestion(quiz);
startTimer();
