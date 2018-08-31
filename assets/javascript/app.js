window.onload = function () {
  $("#timeLeft").hide();
  $("#start").on("click", startGame);
  $(document).on("click", ".option", correctAns);
}

var currentQIndex = 0;
var correct = 0;
var incorrect = 0;
var timer = 10;
var timerId;
var unanswered = 0;
var resultId;

var questions = ["How many NBA championships have the Lakers won?",
                "What city did the Lakers first start in?",
                "Who was the tallest player in Lakers history?",
                "How many NBA Championships did Shaq and Kobe win together?",
                 "How many NBA rings does Kobe Bryant have?"];

var ans_choices = [["Seventeen", "Sixteen", "Twenty", "Fourteen"],
               ["Los Angeles", "San Diego", "Sacramento", "Minneapolis"],
               ["Will Chamberlain", "Shaquille o'neal", "Chuck Nevitt", "Kareem Abdul-Jabbar"],
               ["Four", "Three", "Five", "Two"],
               ["Five", "Three", "One", "Five"]
              ];

var answers = ["Seventeen",
    "Minneapolis",
    "Chuck Nevitt",
    "Three",
    "Five"
  ]; 
  
  function startGame() {
      clearInterval(timerId);
      currentQIndex = 0;
      correct = 0;
      incorrect = 0;
      unanswered = 0;
      $('#start').hide();
      $("#quiz").show();
      $("#timeLeft").show();
      $("#results").empty();
      nextQuestion();
  };
  
  function correctAns(){
      $("#ans_choices").empty();
      clearInterval(timerId);
      if($(this).text() === answers[currentQIndex]){
          correct++;
          $('#results').html("<h3>Correct!</h3>");
          currentQIndex++;
          clearTimeout(resultId);
          resultId = setTimeout(nextQuestion, 1000);
        }
      else{
          incorrect++;
          $('#results').html("<h3>Nope!</h3>"+"<p>The correct answer is.. "+ answers[currentQIndex] +"</p>");
          currentQIndex++;
          clearTimeout(resultId);
          resultId = setTimeout(nextQuestion, 2000);
      }
  };
  
  function next() {
      if(timer > 0 && currentQIndex < questions.length){
        timer--;
        $('#timer').text(timer);
      }
      else if(timer == 0){
        $("#ans_choices").empty();
        unanswered++;
        clearInterval(timerId);
        $('#results').html("<h3>Out of Time!</h3>"+"<p>The right answer is: "+ answers[currentQIndex] +"</p>");
        currentQIndex++;
        clearTimeout(resultId);
        resultId = setTimeout(nextQuestion, 2000);
      }
      else if(currentQIndex === questions.length){
        $("#quiz").hide();
        $("#start").show();
        $("#results")
          .html('<h3>Game Over!</h3>'+
          '<p>Correct: '+ correct +'</p>'+
          '<p>Incorrect: '+incorrect +'</p>'+
          '<p>Unaswered: '+unanswered +'</p>'
          );
      }
    };
  
  function nextQuestion(){
      $("#results").empty();
      timer = 10;
      $('#timer').text(timer);
      timerId = setInterval(next, 1000);
      $('#question').text(questions[currentQIndex]);
      $.each(ans_choices[currentQIndex], function(i, item){
       $("#ans_choices").append($('<button class="btn btn-outline-dark option">'+item+'</button>'+'<br><br>'));
      })
  
     
   };