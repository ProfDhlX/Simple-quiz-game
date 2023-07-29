const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit-btn");

function shuffleArray(arr) {
   
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function displayQuiz() {
    let output = "";
    quizData.forEach((data, index) => {
        const optionsCopy = [...data.options];
        shuffleArray(optionsCopy);
        output += `
            <div class="question">
                ${index + 1}. ${data.question}
            </div>
            <div class="options">
                ${optionsCopy.map(option => `
                    <label>
                        <input type="radio" name="question${index}" value="${option}">
                        ${option}
                    </label>
                `).join("")}
            </div>
        `;
    });
    quizContainer.innerHTML = output;
}

function submitQuiz() {
    let score = 0;
    quizData.forEach((data, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            if (selectedOption.value === data.answer) {
                score++;
                selectedOption.parentElement.classList.add("correct");
            } else {
                selectedOption.parentElement.classList.add("incorrect");
            }
        }
    });
    showResult(score);
}

function showResult(score) {
    resultContainer.innerHTML = `Your score: ${score} out of ${quizData.length}`;
}

displayQuiz();
submitButton.addEventListener("click", submitQuiz);
