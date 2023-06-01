class Test {
    // Сами вопросы...
    questions = [
        {
            question: 'Для того, чтобы указать на готовность пива, в Англии "alewives" выставляли на улицу некий предмет, что это за предмет?',
            answers: ['Наковальню', 'Ведро', 'Сапог', 'Весло'],
            correctAnswer: 'Весло'
        },
        {
            question: 'Всего за время СССР 1922-го по 1991 было сварено сколько сортов пива?',
            answers: ['350', '175', '69', '7'],
            correctAnswer: '350'
        },
        {
            question: 'В следствии какого мероприятия появился знаменитый Германский пивной фестиваль?',
            answers: ['Свадьбы', 'Эпидемии вируса', 'Скуки', 'Казни'],
            correctAnswer: 'Свадьбы'
        },
        {
            question: 'Универсальный бокал для пива?',
            answers: ['Какой мне больше нравится','Стопка','Дегустационный','Хайрикейн'],
            correctAnswer: 'Дегустационный'
        },
        {
            question: 'В каком году было первое упоминание в газетах о крафтовой пивоварне?',
            answers: ['1818', '2001', '1984', '2024'],
            correctAnswer: '1984'
        },
        {
            question: 'Райнхайтсгебот, самый знаменитый Германский закон о чистоте пива был введён? ',
            answers: ['1516', '1843', '1921'],
            correctAnswer: '1516'
        },
        {
            question: 'Применение несоложенных продуктов до 30-50% наблюдалось больше всего в каком сорте пива?',
            answers: ['Биттер', 'Балтика 9', 'Жигулёвское', 'Портер'],
            correctAnswer: 'Жигулёвское'
        },
        {
            question: '"Пивоварение в Британии, вероятно, было хорошо развито, когда ... прибыли в 54 г. до н.э., и, безусловно, продолжало работать при них." *Кто это был?*',
            answers: ['Римляне', 'Французы', 'Китайцы', 'Греки'],
            correctAnswer: 'Французы'
        },
        {
            question: 'Название пива в Древней Германии?',
            answers: ['Pivo', 'Alut', 'Öl', 'Cerveza'],
            correctAnswer: 'Alut'
        }
    ];

    constructor () {
        this.testContainer = document.querySelector('#cont');
        this.startTestButton = document.querySelector('#start-test');
        this.testElement = document.querySelector('#test');
        this.resultElement = document.querySelector('#result');
        this.currentQuestion = 0;
        this.score = 0;
        this.resultMessage;

        this.startTestButton.onclick = () => {
            this.startTestButton.classList.add('hidden');
            this.testElement.classList.remove('hidden');
            this.displayQuestion(0);
        };
    }

    displayResult () {
        this.testElement.classList.add('hidden');
        this.resultElement.classList.remove('hidden');
    
        const percentage = (this.score / this.questions.length) * 100;
    
        if (percentage >= 90) this.resultMessage = 'Как говорится выпить я не любитель, а профессионал!';
        if (percentage >= 70) this.resultMessage = 'Вы товарищ, достойны похвалы!';
        if (percentage >= 50) this.resultMessage = 'Вы месье, любитель';
        if (percentage < 50) this.resultMessage = 'Ужасно, просто ужасно! Выпивайте чаще!';
      
        this.resultElement.innerHTML = `
            <h2>Ваш результат: ${this.score} из ${this.questions.length} (${percentage}%)</h2>
            <p>${this.resultMessage}</p>
            <button id="restart-test">Повторить тест</button>
        `;    

        const restartTestButton = this.resultElement.querySelector("#restart-test");
        
        restartTestButton.addEventListener("click", () => {
            this.resultElement.classList.add('hidden');
            this.startTestButton.classList.remove('hidden');
            this.currentQuestion = 0;
            this.score = 0;
            this.displayQuestion(this.currentQuestion);
        });
    }

    displayQuestion (index) {
        if (index >= this.questions.length) {
            this.displayResult();
            return;
        }
    
        let question = this.questions[index];

        this.testElement.innerHTML = `
            <h2>${question.question}</h2>
            <form id="question-form">
                ${question.answers.map( answer => `
                    <label>
                        <input type="radio" name="answer" value="${answer}">
                        ${answer}
                    </label>
                `).join('')}
                <button type="submit" disabled>Дальше</button>
            </form>
        `;    

        const questionForm = this.testElement.querySelector("#question-form");
        const submitButton = questionForm.querySelector("button");

        questionForm.addEventListener('change', () => {
            submitButton.disabled = false;
        });
    
        questionForm.addEventListener('submit', (ev) => {    
            ev.preventDefault();
            const selectedAnswer = questionForm.querySelector("input[name='answer']:checked").value;
            
            if (selectedAnswer === question.correctAnswer) this.score++;
    
            this.currentQuestion++;
            this.displayQuestion(this.currentQuestion);
        });
    }    
}

let test = new Test();