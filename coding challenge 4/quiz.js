(function () {
        function Question(text, answers, correctAnswer) {
            this.text = text;
            this.answers = answers;
            this.correctAnswer = correctAnswer;
        }

        Question.prototype.writeQuestionWithAnswers = function () {
            console.log(this.text);
            for (var i = 0; i < currentQuestion.answers.length; i++) {
                console.log((i + 1) + ': ' + currentQuestion.answers[i] + '\n');
            }
        };

        Question.prototype.checkTheAnswer = function (answer) {
            if (answer === null || answer.toLowerCase() === 'exit') {
                playing = false;
            } else if (typeof +answer === 'number') {
                if (+answer === currentQuestion.correctAnswer + 1) {
                    score++;
                    console.log('Correct!');
                } else {
                    console.log('Incorrect!');
                }
                console.log('Your current score is ' + score);
            } else {
                console.log('Please enter a number from 1 to ' + currentQuestion.answers.length);
                console.log('============================================');
            }

        };

        var question1 = new Question('Who is the president of the USA?', [
            'Francis Underwood',
            'Donald Trump',
            'George Bush Jr.'
        ], 1);

        var question2 = new Question('What is the name of the German airline?', [
            'Turkish Airlines',
            'Aeroflot',
            'Lufthansa',
            'Berlin'
        ], 2);

        var question3 = new Question('How long is the Great Wall of China?', [
            '4000 miles',
            '1000 miles',
            '6000 miles'
        ], 0);

        var question4 = new Question('How many stars feature on the flag of New Zealand?', [
            'Two stars',
            'Three stars',
            'Four stars',
            'Five stars'
        ], 2);

        var questions = [question1, question2, question3, question4];

        var playing = true;
        var score = 0;

        while (playing) {
            var currentQuestion = questions[Math.floor(Math.random() * questions.length)];
            currentQuestion.writeQuestionWithAnswers();
            var answer = prompt('Choose the right answer?', 0);
            currentQuestion.checkTheAnswer(answer);
        }

        console.log('Your current score is ' + score + '.\nGood bye!');
    }
)();