 const questions = [
  {
    q: "What planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: 1
  },
  {
    q: "How many bones are in the adult human body?",
    options: ["186", "206", "226", "256"],
    answer: 1
  },
  {
    q: "Which ocean is the largest?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: 3
  },
  {
    q: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    answer: 2
  },
  {
    q: "In what year did the Titanic sink?",
    options: ["1905", "1912", "1918", "1923"],
    answer: 1
  },
  {
    q: "Which country has the most natural lakes?",
    options: ["USA", "Brazil", "Canada", "Russia"],
    answer: 2
  },
  {
    q: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answer: 2
  },
  {
    q: "Who painted the Mona Lisa?",
    options: ["Michelangelo", "Da Vinci", "Raphael", "Donatello"],
    answer: 1
  },
  {
    q: "What gas do plants primarily absorb?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: 2
  },
  {
    q: "Which animal has the longest lifespan?",
    options: [
      "Elephant",
      "Blue Whale",
      "Giant Tortoise",
      "Bowhead Whale"
    ],
    answer: 3
  }
];

// Quiz State
let currentQuestion = 0;
let score = 0;
let answered = false;
let answers = [];

// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");

const qCounter = document.getElementById("q-counter");
const scoreDisplay = document.getElementById("score-display");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");

const feedbackArea = document.getElementById("feedback-area");
const feedbackText = document.getElementById("feedback-text");
const nextBtn = document.getElementById("next-btn");

const resultEmoji = document.getElementById("result-emoji");
const resultScore = document.getElementById("result-score");
const resultMessage = document.getElementById("result-message");
const resultBars = document.getElementById("result-bars");

// Start Quiz
function startQuiz() {
  currentQuestion = 0;
  score = 0;
  answered = false;
  answers = [];

  startScreen.classList.add("hidden");
  resultsScreen.classList.add("hidden");

  quizScreen.classList.remove("hidden");
  quizScreen.classList.add("flex");

  nextBtn.textContent = "Next →";

  showQuestion();
}

// Show Current Question
function showQuestion() {
  answered = false;

  const question = questions[currentQuestion];

  // Update UI
  qCounter.textContent =
    `Question ${currentQuestion + 1} / ${questions.length}`;

  scoreDisplay.textContent =
    `Score: ${score}`;

  progressBar.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  questionText.textContent = question.q;

  feedbackArea.classList.add("hidden");
  optionsContainer.innerHTML = "";

  // Create Options
  question.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.className =
      "option-btn w-full text-left px-6 py-4 rounded-xl font-medium border-2 transition-all duration-200 hover:scale-[1.02]";

    button.style.background = "transparent";
    button.style.borderColor = "#334155";
    button.style.color = "#f1f5f9";

    button.textContent = option;

    button.addEventListener("click", () => {
      selectAnswer(index);
    });

    optionsContainer.appendChild(button);
  });
}

// Select Answer
function selectAnswer(selectedIndex) {
  if (answered) return;

  answered = true;

  const question = questions[currentQuestion];
  const isCorrect = selectedIndex === question.answer;

  if (isCorrect) {
    score++;
  }

  answers.push(isCorrect);

  const buttons = optionsContainer.children;

  // Disable buttons & style results
  Array.from(buttons).forEach((button, index) => {
    button.disabled = true;

    // Correct answer
    if (index === question.answer) {
      button.style.borderColor = "#22c55e";
      button.style.background =
        "rgba(34,197,94,0.15)";
      button.style.color = "#22c55e";
    }

    // Wrong selected answer
    else if (
      index === selectedIndex &&
      !isCorrect
    ) {
      button.style.borderColor = "#ef4444";
      button.style.background =
        "rgba(239,68,68,0.15)";
      button.style.color = "#ef4444";
    }

    // Fade others
    else {
      button.style.opacity = "0.5";
    }
  });

  // Feedback
  feedbackArea.classList.remove("hidden");

  feedbackText.textContent = isCorrect
    ? "✅ Correct!"
    : `❌ Correct answer: ${question.options[question.answer]}`;

  feedbackText.style.color = isCorrect
    ? "#22c55e"
    : "#ef4444";

  // Change button text on last question
  nextBtn.textContent =
    currentQuestion === questions.length - 1
      ? "See Results →"
      : "Next →";
}

// Next Question
function nextQuestion() {
  if (!answered) return;

  currentQuestion++;

  if (currentQuestion >= questions.length) {
    showResults();
    return;
  }

  showQuestion();
}

// Show Results
function showResults() {
  quizScreen.classList.add("hidden");

  resultsScreen.classList.remove("hidden");
  resultsScreen.classList.add("flex");

  const percentage = Math.round(
    (score / questions.length) * 100
  );

  // Score text
  resultScore.textContent =
    `You scored ${score} out of ${questions.length} (${percentage}%)`;

  // Emoji
  if (percentage >= 80) {
    resultEmoji.textContent = "🏆";
  } else if (percentage >= 50) {
    resultEmoji.textContent = "👏";
  } else {
    resultEmoji.textContent = "💪";
  }

  // Message
  if (percentage >= 80) {
    resultMessage.textContent =
      "Amazing! You really know your stuff!";
  } else if (percentage >= 50) {
    resultMessage.textContent =
      "Nice job! Room to improve though.";
  } else {
    resultMessage.textContent =
      "Keep learning — you'll get there!";
  }

  // Build result bars
  resultBars.innerHTML = "";

  answers.forEach((correct, index) => {
    const bar = document.createElement("div");

    bar.className = "rounded-t";

    bar.style.width = "20px";
    bar.style.height = correct
      ? "100%"
      : "30%";

    bar.style.background = correct
      ? "#22c55e"
      : "#ef4444";

    bar.style.opacity = "0.85";

    bar.style.transition =
      `all 0.4s ease ${index * 0.08}s`;

    bar.title =
      `Question ${index + 1}: ${
        correct ? "Correct" : "Wrong"
      }`;

    resultBars.appendChild(bar);
  });
}

// Restart Quiz
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  answered = false;
  answers = [];

  resultsScreen.classList.add("hidden");
  quizScreen.classList.add("hidden");

  startScreen.classList.remove("hidden");

  progressBar.style.width = "0%";
  feedbackArea.classList.add("hidden");

  nextBtn.textContent = "Next →";
}

// Prevent accidental errors
window.startQuiz = startQuiz;
window.nextQuestion = nextQuestion;
window.restartQuiz = restartQuiz;