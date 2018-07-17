var questions = [{
    question: 'How many NBA championships have the Lakers won?',
    answers: ["Seventeen", "Sixteen", "Twenty", "Fourteen"],
    correctAnswer: "Seventeen",
    image:"assets/images/1.jpg"
  }, {
    question: 'What city did the Lakers first start in?',
    answers: ["Los Angeles", "San Diego", "Sacramento", "Minneapolis"],
    correctAnswer: "Minneapolis",
    image:"assets/images/2.jpg"
  }, {
    question: 'Who was the tallest player in Lakers history?',
    answers: ["Will Chamberlain", "Shaquille o'neal", "Chuck Nevitt", "Kareem Abdul-Jabbar"],
    correctAnswer: "Chuck Nevitt",
    image:"assets/images/3.jpg"
  }, {
    question: 'How many NBA Championships did Shaq and Kobe win together?',
    answers: ["Four", "Three", "Five", "Two"],
    correctAnswer: "Three",
    image:"assets/images/4.jpg"
  }, {
    question: 'How many NBA rings does Kobe Bryant have?',
    answers: ["Five", "Three", "One", "Five"],
    correctAnswer: "Five",
    image:"assets/images/5.jpg"
  }, {
    question: 'Which Lakers player is on the NBA logo?',
    answers: ["Magic Johnson", "Kobe Bryant", "Elgin Baylor", "Jerry West"],
    correctAnswer: "Jerry West",
    image:"assets/images/6.jpg"
  }, {
    question: "Which NBA team are rivals with the Lakers?",
    answers: ["Boston Celtics", "Detroit Pistons", "San Antonio Spurs", "Sacamento Kings"],
    correctAnswer: "Boston Celtics",
    image:"assets/images/7.jpg"
  }];
  
  var panel = $('#quiz');
  var countStartNumber = 15;
  
  
  $(document).on('click', '#start-over', function(e) {
    game.reset();
  });
  
  $(document).on('click', '.answer-button', function(e) {
    game.clicked(e);
  });
  
  $(document).on('click', '#start', function(e) {
    $('#subcontainer').prepend('<h3>Time Remaining: <span id="counter-number">15</span> Seconds</h3>');
    game.loadQuestion();
  });
  
  var game = {
    questions:questions,
    currentQuestion:0,
    counter:countStartNumber,
    correct:0,
    incorrect:0,
    countdown: function(){
      game.counter--;
      $('#counter-number').html(game.counter);
      if (game.counter === 0){
        console.log('TIME UP');
        game.timeUp();
      }
    },
  
    loadQuestion: function(){
      timer = setInterval(game.countdown, 1000);
      panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
      for (var i = 0; i < questions[this.currentQuestion].answers.length; i++){
        panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
      }
    },
    
    nextQuestion: function(){
      game.counter = countStartNumber;
      $('#counter-number').html(game.counter);
      game.currentQuestion++;
      game.loadQuestion();
    },
  
    timeUp: function (){
      clearInterval(timer);
      $('#counter-number').html(game.counter);
      panel.html('<h2>Out of Time!</h2>');
      panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
      panel.append('<img src="' + questions[this.currentQuestion].image + '" />');
      if (game.currentQuestion === questions.length - 1){
        setTimeout(game.results, 2 * 1000);
      } else {
        setTimeout(game.nextQuestion, 2 * 1000);
      }
  
    },
    results: function() {
      clearInterval(timer);
      panel.html('<h2>All done, Lets see how you did!</h2>');
      $('#counter-number').html(game.counter);
      panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
      panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
      panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
      panel.append('<br><button id="start-over">Start Over?</button>');
    },
  
    clicked: function(e) {
      clearInterval(timer);
      if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
        this.answeredCorrectly();
      } else {
        this.answeredIncorrectly();
      }
    },
  
    answeredIncorrectly: function() {
      game.incorrect++;
      clearInterval(timer);
      panel.html('<h2>No, thats not right!</h2>');
      panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
      panel.append('<img src="' + questions[game.currentQuestion].image + '" />');
      if (game.currentQuestion === questions.length - 1){
        setTimeout(game.results, 2 * 1000);
      } else {
        setTimeout(game.nextQuestion, 2 * 1000);
      }
    },
  
    answeredCorrectly: function(){
      clearInterval(timer);
      game.correct++;
      panel.html('<h2>Yes, thats right!</h2>');
      panel.append('<img src="' + questions[game.currentQuestion].image + '" />');
      if (game.currentQuestion === questions.length - 1){
        setTimeout(game.results, 2 * 1000);
      } else {
        setTimeout(game.nextQuestion, 2 * 1000);
      }
    },
  
    reset: function(){
      this.currentQuestion = 0;
      this.counter = countStartNumber;
      this.correct = 0;
      this.incorrect = 0;
      this.loadQuestion();
    }
  };
  
