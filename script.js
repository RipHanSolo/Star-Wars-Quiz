
const startbutton = document.getElementById('start-Btn');
const nextButton = document.getElementById('next-Btn');
const title = document.getElementById('title');
const questionContainer = document.getElementById('quiz-contianer');
const questionElement = document.getElementById('question');
let shuffledQuestions, currentQuestionsIndex;
const answerButtonElement =  document.getElementById('answerGrid');
const correctResult = document.getElementById('correctResult');
const incorrectResult = document.getElementById('incorrectResult');

startbutton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    selectNextQuestion()
})

function startGame() {
    startbutton.classList.add('hide');
    title.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove('hide');
    selectNextQuestion();
}

function selectNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex]);

}

function showQuestion(question){
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonElement.appendChild(button)
    })
}   

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    correctResult.classList.add('hide')
    incorrectResult.classList.add('hide')
    while (answerButtonElement.firstChild){
        answerButtonElement.removeChild
        (answerButtonElement.firstChild)
    }
}



function selectAnswer (e){
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct)
    Array.from(answerButtonElement.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    }else{
        startbutton.innerText = 'Restart';
        startbutton.classList.remove('hide')
    }

    nextButton.classList.remove('hide')
}


function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct){
        element.classList.add('correct')   
    } else{
        element.classList.add('wrong') 
        
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


const questions = [
    