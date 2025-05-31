const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const finalScreen = document.getElementById('final-screen');

const questionText = document.querySelector('.question');
const choicesContainer = document.querySelector('.choices');
const resultMessage = document.querySelector('.result');
const nextButton = document.getElementById('next-btn');
const finalScoreText = document.getElementById('final-score');
const restartButton = document.getElementById('restart-btn');


let currentTopic = '';
let questions = [];
let currentQuestionIndex = 0;
let score = 0;


const allQuestions = {
    geography: [
        { question: "What is the capital of Canada?", choices: ["Toronto", "Vancouver", "Ottawa", "Montreal"], answer: "Ottawa" },
        { question: "Which continent is Egypt in?", choices: ["Asia", "Africa", "Europe", "South America"], answer: "Africa" },
        { question: "Mount Everest is located in which mountain range?", choices: ["Alps", "Rockies", "Himalayas", "Andes"], answer: "Himalayas" },
        { question: "Which ocean is the largest?", choices: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: "Pacific" },
        { question: "What is the capital of Sweden?", choices: ["Helsinki", "Riga", "Oslo", "Stockholm"], answer: "Stockholm" },
        { question: "Guess the population of Russia?", choices: ["200m", "100m", "150m", "Under 100m"], answer: "New York" },
        { question: "The Sahara Desert is primarily located in which continent?", choices: ["Asia", "Africa", "Australia", "South America"], answer: "Africa" },
        { question: "Which river is the longest in the world?", choices: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: "Nile" },
        { question: "What country is Tokyo the capital of?", choices: ["China", "South Korea", "Japan", "Thailand"], answer: "Japan" },
        { question: "Which country has the most population?", choices: ["India", "USA", "China", "Russia"], answer: "India" }
    ],
    math: [
        { question: "What is 5 + 7?", choices: ["10", "11", "12", "13"], answer: "12" },
        { question: "What is 9 × 3?", choices: ["27", "26", "29", "25"], answer: "27" },
        { question: "What is the square root of 81?", choices: ["7", "8", "9", "10"], answer: "9" },
        { question: "What is 15 ÷ 3?", choices: ["3", "5", "6", "4"], answer: "5" },
        { question: "What is 7²?", choices: ["14", "3.2", "7", "49"], answer: "49" },
        { question: "What is 10 - 4?", choices: ["5", "6", "7", "4"], answer: "6" },
        { question: "What is 7 + 6?", choices: ["13", "12", "14", "15"], answer: "13" },
        { question: "What is 20% of 50?", choices: ["5", "10", "15", "20"], answer: "10" },
        { question: "What is 3 × 8?", choices: ["21", "24", "27", "20"], answer: "24" },
        { question: "What is the value of pi (approx)?", choices: ["3.14", "3.15", "3.13", "3.16"], answer: "3.14" }
    ],
    english: [
        {
    question: "Which sentence uses the subjunctive mood correctly?",
    choices: [
      "If I was a king, I would rule wisely.",
      "If I were a king, I would rule wisely.",
      "If I am a king, I would rule wisely.",
      "If I had been a king, I will rule wisely."
    ],
    answer: "If I were a king, I would rule wisely."
  },
  {
    question: "Her explanation was so _____ that everyone understood the complex concept immediately.",
    choices: ["abstruse", "pellucid", "enigmatic", "ambiguous"],
    answer: "pellucid"
  },
  {
    question: "What is the meaning of the idiom: “to cut the Gordian knot”?",
    choices: [
      "To delay a problem indefinitely",
      "To solve a complex problem with a simple solution",
      "To create more problems by overthinking",
      "To tie something in a complicated way"
    ],
    answer: "To solve a complex problem with a simple solution"
  },
  {
    question: "Identify the figure of speech: “The wind whispered through the trees.”",
    choices: ["Metaphor", "Personification", "Alliteration", "Hyperbole"],
    answer: "Personification"
  },
  {
    question: "Which of the following sentences is grammatically correct?",
    choices: [
      "Each of the students have completed their assignment.",
      "Neither of the answers are correct.",
      "Everybody has their own opinion.",
      "The team are winning the game."
    ],
    answer: "Everybody has their own opinion."
  },
  {
    question: "The scientist’s hypothesis was _____ by recent experiments.",
    choices: ["corroborated", "conflated", "dissuaded", "obfuscated"],
    answer: "corroborated"
  },
  {
    question: "What is the origin of the word “quarantine”?",
    choices: [
      "From Latin meaning “forty days”",
      "From Greek meaning “isolation”",
      "From Old English meaning “cleanse”",
      "From French meaning “separate”"
    ],
    answer: "From Latin meaning “forty days”"
  },
  {
    question: "Which Shakespeare play features the line: “The lady doth protest too much, methinks.”?",
    choices: ["Hamlet", "Macbeth", "Hamlet", "The Merchant of Venice"],
    answer: "Hamlet"
  },
  {
    question: "In which sentence is the word “literally” used correctly?",
    choices: [
      "I literally died laughing at that joke.",
      "He literally ran five miles in under 30 minutes.",
      "She was literally on cloud nine after the test.",
      "They literally had a blast at the party."
    ],
    answer: "He literally ran five miles in under 30 minutes."
  },
  {
    question: "What is the meaning of the suffix “-phobia”?",
    choices: [
      "Love or fondness",
      "Fear or aversion",
      "Study or science of",
      "Condition or state of"
    ],
    answer: "Fear or aversion"
  }
    ],
    biology: [
        { question: "What is the largest organ in the human body?", choices: ["Heart", "Skin", "Liver", "Brain"], answer: "Skin" },
        { question: "What do plants need for photosynthesis?", choices: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon dioxide" },
        { question: "What blood type is known as the universal donor?", choices: ["A", "B", "AB", "O"], answer: "O" },
        { question: "What part of the cell contains genetic material?", choices: ["Cytoplasm", "Nucleus", "Ribosome", "Membrane"], answer: "Nucleus" },
        { question: "Which animal is a mammal?", choices: ["Shark", "Frog", "Whale", "Lizard"], answer: "Whale" },
        { question: "What gas do humans exhale?", choices: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon dioxide" },
        { question: "Which vitamin is produced by sunlight?", choices: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], answer: "Vitamin D" },
        { question: "What is the main function of red blood cells?", choices: ["Fight infection", "Carry oxygen", "Clot blood", "Produce hormones"], answer: "Carry oxygen" },
        { question: "What is the study of animals called?", choices: ["Botany", "Zoology", "Geology", "Ecology"], answer: "Zoology" },
        { question: "Which part of the brain controls balance?", choices: ["Cerebrum", "Cerebellum", "Medulla", "Hypothalamus"], answer: "Cerebellum" }
    ]
};

function mixArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[randomIndex];
        arr[randomIndex] = temp;
    }
    return arr;
}


function startQuiz(topicName) {
    currentTopic = topicName;

    
    questions = mixArray([...allQuestions[topicName]]).slice(0, 10);

    currentQuestionNumber = 0;
    totalScore = 0;

    startScreen.style.display = "none";  
    finalScreen.style.display = "none";  
    quizScreen.style.display = "block";  

    showQuestion();
}


function showQuestion() {
    nextButton.style.display = "none";   
    resultMessage.textContent = "";      

    let question = questions[currentQuestionNumber];

    questionText.textContent = "Question " + (currentQuestionNumber + 1) + ": " + question.question;

    choicesContainer.innerHTML = "";     

 
    question.choices.forEach(function(choice) {
        let button = document.createElement("button");
        button.textContent = choice;
        button.classList.add("choice-button");

        button.onclick = function() {
            checkAnswer(choice);
        };

        choicesContainer.appendChild(button);
    });
}


function checkAnswer(selectedChoice) {
    let question = questions[currentQuestionNumber];

    if (selectedChoice === question.answer) {
        totalScore += 10;
        resultMessage.textContent = "Correct!";
        resultMessage.style.color = "green";
    } else {
        resultMessage.textContent = "Wrong! The right answer is: " + question.answer;
        resultMessage.style.color = "red";
    }

  
    let buttons = choicesContainer.querySelectorAll("button");
    buttons.forEach(function(btn) {
        btn.disabled = true;
    });

    nextButton.style.display = "inline-block";  
}


nextButton.onclick = function() {
    currentQuestionNumber++;
    if (currentQuestionNumber < questions.length) {
        showQuestion();
    } else {
        showFinalScore();
    }
}


function showFinalScore() {
    quizScreen.style.display = "none";
    finalScreen.style.display = "block";
    finalScoreText.textContent = "Your score is: " + totalScore;
}


restartButton.onclick = function() {
    finalScreen.style.display = "none";
    startScreen.style.display = "block";
}

let topicButtons = document.querySelectorAll("#start-screen button");
topicButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        startQuiz(button.dataset.topic);
    });
});
