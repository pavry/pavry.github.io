function readFile(input) {
    let file = input.files[0];

    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function() {
        const mdContent = reader.result;
        doOurJob(mdContent);
    };

    reader.onerror = function() {
        console.log(reader.error);
    };
}

function doOurJob(mdContent) {

    const topics = parseTopics(mdContent);
    const cards = topics.flatMap(topic => 
        topic.questions.map(q => {            
            q["topic"] = topic.name;
            return q;
        })
    );

    console.dir(cards)

    let i = 0
    function getTopic() {
        return cards[i].topic;
    }

    function getQuestion() {
        return cards[i].question;
    }

    function getAnswer() {
        return cards[i].answer;
    }

    function prepareNextQuestion() {
        i = Math.floor(Math.random() * cards.length) 
    }

    const card = document.querySelector('.card__inner');
    const topicView = document.getElementById("topic")
    const questionView = document.getElementById("question") 
    const answerView = document.getElementById("answer")
    
    card.addEventListener('click', function() {
        if (card.classList.toggle('is-flipped')) {
            updateAnswer(getAnswer());
            prepareNextQuestion();
        } else {
            updateQuestion(getQuestion())
            updateTopic(getTopic())
        }
    });

    updateTopic(getTopic());
    updateQuestion(getQuestion());

    function updateQuestion(txt, delay) {
        setTimeout(() => questionView.innerHTML = txt, delay);
    }

    function updateAnswer(txt) {
        answerView.innerHTML = txt 
    }

    function updateTopic(txt) {
        topicView.innerHTML = txt
    }
}
