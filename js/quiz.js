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
    correctAnswer: 0,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    correctAnswer: 0,
  },
  {
    question: "What city is known as 'The big Apple'?",
    options: ["Rome", "New York", "Manilla", "Lome"],
    correctAnswer: 1,
  },
  {
    question: "What country is known for Kangaroos?",
    options: ["Nigeria", "Sweden", "Australia", "New Zealand"],
    correctAnswer: 2,
  },
  {
    question:
      "What city was historically referred to as 'The City Built on Seven Hills'?",
    options: ["Madrid", "Rome", "Algiers", "Bangkok"],
    correctAnswer: 1,
  },
  {
    question: "Which is the largest planet in our solar system?",
    options: ["Venus", "Earth", "Saturn", "Jupiter"],
    correctAnswer: 3,
  },
  {
    question: "What is the name of the largest country in the world?",
    options: ["U.S.A", "Russia", "China", "Canada"],
    correctAnswer: 1,
  },
  {
    question: "What is the name of the smallest country in the world?",
    options: ["Germany", "Ghana", "The Vatican City", "Thailand"],
    correctAnswer: 2,
  },
  {
    question: "How many countries are there in the United Kingdom?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 3,
  },
  {
    question: "What is the name of the tallest mountain in the world?",
    options: [
      "Mount Ararat",
      "Mount Kilimanjaro",
      "Mount Everest",
      "Mount Cameroon",
    ],
    correctAnswer: 2,
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

  const nextButton = document.getElementById("next-button");
  nextButton.addEventListener("click", () => {
    // Skip the question
    handleAnswer(quiz, -1);
  });

  startTimer(quiz);
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

  clearInterval(quiz.timer); // Clear the timer
  setTimeout(() => {
    feedbackElement.textContent = "";
    quiz.currentQuestionIndex++;
    if (quiz.currentQuestionIndex < quiz.questions.length) {
      displayQuestion(quiz);
    } else {
      showFinalScore(quiz);
    }
  }, 1000); // Show feedback for 2 seconds
}

// Part 4: Asynchronous Timer
function startTimer(quiz) {
  let timeLeft = 30;
  const timerElement = document.getElementById("timer");
  timerElement.textContent = `Time left: ${timeLeft}s`;

  quiz.timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time left: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(quiz.timer);
      handleAnswer(quiz, -1); // Mark the question as unanswered
    }
  }, 1000); // Update every second
}

// Part 5: Using ES6 Modules
export { Quiz, displayQuestion };

// Optional: Display final quiz score and restart the quiz
function showFinalScore(quiz) {
  const questionElement = document.getElementById("question");
  questionElement.textContent = "Quiz completed! Your score: " + quiz.score;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  const nextButton = document.getElementById("next-button");
  nextButton.style.display = "none"; // Hide the Next button

  const restartButton = document.getElementById("restart-button");
  restartButton.style.display = "block"; // Show the Restart button

  restartButton.addEventListener("click", () => {
    // Restart the quiz
    quiz.currentQuestionIndex = 0;
    quiz.score = 0;
    restartButton.style.display = "none"; // Hide the Restart button
    nextButton.style.display = "inline"; // Show the Next button
    displayQuestion(quiz);
  });
}

// Initialization
const quiz = new Quiz(questions);
displayQuestion(quiz);
