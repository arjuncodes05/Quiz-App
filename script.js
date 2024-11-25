let container1 = document.querySelector('.container')
let container2 = document.querySelector('.container-2')
let container3 = document.querySelector('.container-3')

let questionBox = document.querySelector(".question");
let questionCounter = document.querySelector('.question-count > p');

let audio = document.querySelectorAll('.audio');
let vol = false;

let countDown = document.querySelector('.count-down > p');

let optionsBox = document.querySelectorAll(".option");
let skipQuestionBtn = document.querySelector('.skipQuestionBtn');

let start = document.querySelector(".startNow");
let continuePreviousGame = document.querySelector('.continue');


let correctAnswers = document.querySelector(".correctAnswers");
let resultBar = document.querySelector('.result > h3');
let retryBtn = document.querySelector('.retryBtn');
let report = document.querySelector('.report');

let questions = [
    {
        question: "Which HTML tag is used to define an unordered list?",
        options: ["<ol>", "<ul>", "<li>", "<dl>"],
        answer: 1
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        options: ["<br>", "<lb>", "<break>", "<hr>"],
        answer: 0
    },
    {
        question: "Which attribute is used to specify a unique identifier for an HTML element?",
        options: ["class", "id", "name", "unique"],
        answer: 1
    },
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyperlinking Text Marking Language"],
        answer: 0
    },
    {
        question: "Which HTML element is used to specify a footer for a document or section?",
        options: ["<footer>", "<bottom>", "<foot>", "<section>"],
        answer: 0
    },
    {
        question: "Which of the following is the correct HTML element for the largest heading?",
        options: ["<heading>", "<h1>", "<h6>", "<head>"],
        answer: 1
    },
    {
        question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
        options: ["src", "alt", "title", "longdesc"],
        answer: 1
    },
    {
        question: "What is the correct HTML element to define emphasized text?",
        options: ["<i>", "<em>", "<strong>", "<italic>"],
        answer: 1
    },
    {
        question: "Which HTML tag is used to define a table header?",
        options: ["<thead>", "<head>", "<th>", "<header>"],
        answer: 2
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        options: ["class", "styles", "style", "font"],
        answer: 2
    },
    {
        question: "Which HTML element is used to define important text?",
        options: ["<b>", "<important>", "<strong>", "<i>"],
        answer: 2
    },
    {
        question: "What is the correct HTML element for the title of a document?",
        options: ["<title>", "<head>", "<header>", "<meta>"],
        answer: 0
    },
    {
        question: "Which HTML tag is used to define a list item?",
        options: ["<li>", "<list>", "<item>", "<ul>"],
        answer: 0
    },
    {
        question: "Which HTML attribute is used to specify that an input field must be filled out before submitting the form?",
        options: ["placeholder", "required", "value", "validate"],
        answer: 1
    },
    {
        question: "Which HTML element is used to define a container for an external app or interactive content?",
        options: ["<embed>", "<object>", "<iframe>", "<div>"],
        answer: 2
    },
    {
        question: "Which of these elements is a self-closing tag?",
        options: ["<div>", "<span>", "<img>", "<section>"],
        answer: 2
    },
    {
        question: "What does the `<head>` element contain?",
        options: ["The visible content of the page", "Metadata and links to scripts and styles", "The main content of the document", "The footer content"],
        answer: 1
    },
    {
        question: "Which HTML element is used to play video files?",
        options: ["<video>", "<movie>", "<media>", "<source>"],
        answer: 0
    },
    {
        question: "What is the purpose of the `<meta>` tag in HTML?",
        options: ["To define metadata about an HTML document", "To link to external CSS files", "To create a division or section", "To specify JavaScript code"],
        answer: 0
    },
    {
        question: "Which attribute is used to provide a tooltip for an HTML element?",
        options: ["tooltip", "title", "alt", "hint"],
        answer: 1
    }
];


let questionCount = localStorage.getItem('questionCount') || 0;
let currentQuestion = '';
let choice;
let timerId;
let sec = 30;
let correctAnswersCount = localStorage.getItem('correctAnswersCount') || 0;
let percent = 0;

const feedback = [  "You need to try atleast",
                    "There's potential here, but it needs more work.",     
                    "Nice work, but you need to get better!",     
                    "Excellent work, keep up the great effort!",  
                    "Outstanding performance, you've nailed it!"]


// continue Previous Game
if(localStorage.length > 0){
    continuePreviousGame.addEventListener('click', ()=>{
        container1.style.display = 'none'
        container2.style.display = 'flex'
        container3.style.display = 'none'
    
        startQuiz(questionCount);
    });
} else {
        continuePreviousGame.style.display = 'none';
}

start.addEventListener('click', ()=>{
    localStorage.clear();
    questionCount = 1;
    correctAnswersCount = 0;
    container1.style.display = 'none'
    container2.style.display = 'flex'
    container3.style.display = 'none'

    startQuiz(questionCount);
})

function startQuiz(questionCount){
    nextQuestion(questionCount);

    optionsBox.forEach((optionNum)=>{
        optionNum.addEventListener('click', (e)=>{
            skipQuestionBtn.classList.add('skipBtnDisable')
            skipQuestionBtn.classList.add('noClick');
            clearInterval(timerId);
            correctOption(currentQuestion, e);
        });
    });

};

function startTimer(){
    timerId = setInterval(()=>{
        
        if(sec > 9 && sec <= 30){
            countDown.innerText = `00:${sec--}`;
        } else if(sec < 10 && sec > 0){
            countDown.style.backgroundColor = 'red';
            countDown.innerText = `00:0${sec--}`;
        } else if(sec <= 0){
            clearInterval(timerId);
            ontoTheNext();
        }
    }, 1000);
};


function nextQuestion(questionCount){

    optionsBox.forEach( opt => opt.classList.remove('noClick') ); 

    countDown.innerText = `00:${sec}`;
    countDown.style.backgroundColor = '#09af11';
    skipQuestionBtn.classList.remove('noClick');
    skipQuestionBtn.classList.remove('skipBtnDisable')

    if(questionCount <= questions.length){
        questionCounter.innerText = `${questionCount}/${questions.length}`
    }
    
    currentQuestion = questions[questionCount];

    if(currentQuestion === undefined){
        container1.style.display = 'none';
        container2.style.display = 'none';
        container3.style.display = 'flex';
        result();
    } else{
        questionBox.children[0].innerText = currentQuestion.question;
        choice = 0;
    
        currentQuestion.options.forEach((opt)=>{  
            optionsBox[choice].children[0].innerText = opt;
            choice++;
        });    
        startTimer();
    }
}

function correctOption(currentQuestion, e){
    let {answer} = currentQuestion;
    
    optionsBox.forEach( opt => opt.classList.add('noClick') );     
    
    if(e.currentTarget.children[0].innerText === currentQuestion.options[answer]){

        correctAnswersCount++;
        if(vol === true) audioOn('correct.wav');    
            localStorage.setItem('correctAnswersCount', correctAnswersCount);
            e.currentTarget.classList.add('correctAnswer');
            e.currentTarget.children[1].classList.add('correct-icon');

            let currentOption = e.currentTarget;

            setTimeout(()=>{
                currentOption.classList.remove('correctAnswer');
                currentOption.children[1].classList.remove('correct-icon');
                currentOption = '';
                ontoTheNext();
            }, 2000)

    } else{ 
            if(vol === true) audioOn('wrong.wav');

            e.currentTarget.classList.add('incorrectAnswer');
            e.currentTarget.children[2].classList.add('incorrect-icon');

            optionsBox[answer].classList.add('correctAnswer');
            optionsBox[answer].children[1].classList.add('correct-icon')

            let currentOption = e.currentTarget;

            setTimeout(()=>{
                currentOption.classList.remove('incorrectAnswer');
                currentOption.children[2].classList.remove('incorrect-icon');

                optionsBox[answer].classList.remove('correctAnswer');
                optionsBox[answer].children[1].classList.remove('correct-icon')

                currentOption = ''
                ontoTheNext();
            }, 2000)
    }
};

function ontoTheNext(){
    sec = 30;
    currentQuestion = '';
    questionCount++;
    localStorage.setItem('questionCount', questionCount);
    if(questionCount <= questions.length){
        nextQuestion(questionCount);
    } else if(questionCount > questions.length){
        container1.style.display = 'none';
        container2.style.display = 'none';
        container3.style.display = 'flex';
        result();
    }
}

function result(){    
    if(vol === true) audioOn('result.wav');

    percent = parseFloat((correctAnswersCount/questions.length * 100).toFixed(2))

    correctAnswers.innerText = correctAnswersCount + "/" + questions.length ;
    resultBar.innerText = `${percent}%`;
    
    resultBar.parentElement.style.width = resultBar.innerText

    if(percent === 0){
        report.innerText = feedback[0];
    }else if(percent > 0 && percent < 26){
        report.innerText = feedback[1];
    } else if(percent <= 50){
        report.innerText = feedback[2];
    } else if(percent <= 75){
        report.innerText = feedback[3];
    } else if(percent >= 75 && percent <= 100){
        report.innerText = feedback[4];
    } else {
        report.innerText = 'Something went wrong';
    }
}


// next question button
skipQuestionBtn.addEventListener('click', ()=>{

    vol === true && audioOn('skip.wav');

    if(questionCount < questions.length){
        clearInterval(timerId);
        sec = 30;
        questionCount++;
        localStorage.setItem('questionCount', questionCount); 
        nextQuestion(questionCount);
    } else {
        container1.style.display = 'none';
        container2.style.display = 'none';
        container3.style.display = 'flex';
        result();
    }
});

// retry button
retryBtn.addEventListener('click', ()=>{
    localStorage.clear();
    window.location.reload();
})

// audio 
audio.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
        
        if(e.target.className.includes('off')){
            audioOn('volumeOn.wav');
            vol = true;
            e.target.classList.add('audio-icon-toggle')
            e.target.previousElementSibling.classList.remove('audio-icon-toggle')
            
        } else{
            vol = false;
            e.target.classList.add('audio-icon-toggle');
            e.target.nextElementSibling.classList.remove('audio-icon-toggle');
        }
        
    });
})

function audioOn(name){
    let audio = new Audio("./audio/" + name);
    audio.play();
}