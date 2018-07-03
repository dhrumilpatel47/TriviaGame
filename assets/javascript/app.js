var triviaQuestions = [{
	question: "How many NBA championships have the Lakers won?",
	answerList: ["17", "16", "20", "14"],
	answer: 1
},{
	question: "What city did the Lakers first start in?",
	answerList: ["Los Angeles", "San Diego", "Sacramento", "Minneapolis"],
	answer: 3
},{
	question: "Who was the tallest player in Lakers history?",
	answerList: ["Will Chamberlain", "Shaquille o'neal", "Chuck Nevitt", "Kareem Abdul-Jabbar"],
	answer: 2
},{
	question: "How many NBA Championships did Shaq and Kobe win together?",
	answerList: ["4", "3", "5", "2"],
	answer: 1
},{
	question: "How many NBA rings does Kobe Bryant have?",
	answerList: ["6", "3", "1", "5"],
	answer: 3
},{
	question: "Which Lakers player is on the NBA logo?",
	answerList: ["Magic Johnson", "Kobe Bryant", "Elgin Baylor", "Jerry West"],
	answer: 3
},{
	question: "Which NBA team are rivals with the Lakers?",
	answerList: ["Boston Celtics", "Detroit Pistons", "San Antonio Spurs", "Sacamento Kings"],
	answer: 0
}];

var picArray = ['1', '2', '3', '4', '5', '6', '7'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#jpg').empty();
	answered = true;
	
	// sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}

	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#jpg').html('<img src = "assets/images/'+ picArray[currentQuestion] +'.jpg" width = "180px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} 	
	else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} 	
	else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 1000)
	} 
	else{
		currentQuestion++;
		setTimeout(newQuestion, 1000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#jpg').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
