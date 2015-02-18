(function () {
	
	$(document).ready(function() {
		"use strict";

		var time = 300;
		var update;
		// Function to update counters on all elements with class counter
		var doUpdate = function() {

			if (time > 0) {
				$('.countdown').html("");
				var minutes = Math.floor(time / 60);
				var seconds = time - minutes * 60;
				$('.countdown').html(minutes + ":" + seconds);
				time--;
			} else {
				contain = $('#contain');
				contain.html("your are out of time");
			}

		}

		// Schedule the update to happen once every second

		$('#login').on('click', login);
		$('#reloadPage').on('click', reloadPage);
		var header, input, btn, contain, p, names, person, persons, username;
		var questions = {
			0: ['1.	Inside which HTML element do we put the JavaScript?', 2],
			1: ['2. Where is the correct place to insert a JavaScript?', 2],
			2: ['3.	What is the correct syntax for referring to an external script called "xxx.js"?', 2],
			3: ['4. How do you write "Hello World" in an alert box?', 0]
		};
		var answers = {
			0: ['<js>', '<scripting>', '<script>', '<javascript>'],
			1: ['The <head> section',
				'The <body> section',
				'Both the <head> section and the <body> section are correct',
				'In your <head>'
			],
			2: ['<script href="xxx.js">',
			 	'<script name="xxx.js">', 
			 	'<script src="xxx.js">', 
			 	'<script style="xxx.js">'],
			3: ['alert("Hello World");', 
				'msg("Hello World");',
				'alertBox("Hello World");',
			 	'msgBox("Hello World");']
		};

		function login () {
			username = $('#username').val();
			if (!username) {
				throw new Error("username cannot be empty");
			}

			var pollName = localStorage.getItem('pollName');
			if (pollName == null) {
				names = [];
				person = {
					name: username,
					score: 0,
					alreadyDone: false
				}
				names[0] = person;
				localStorage.setObject("pollName", JSON.stringify(names));

			} else {

				persons = localStorage.getObject("pollName");
				var personsArray = JSON.parse(persons);

				if (!checkUserName(personsArray, username)) {
					person = {
						name: username,
						score: 0,
						alreadyDone: false
					};
					personsArray.push(person);
					localStorage.setObject("pollName", JSON.stringify(personsArray));
				}

				if (checkIfTestIsAlreadyDone(personsArray) !== undefined) {
					person = checkIfTestIsAlreadyDone(personsArray);
					var p = $("<p>");
					p.text("already done with that test and your last score was: " + person.score +"%");
					contain = $("#contain");
					person.score = 0;
					writePersonToLocalStorage(person);
					loadQuestions(username);
					p.appendTo(contain);
				} else {
					loadQuestions(username);
				}
			}
		}	

		function loadQuestions(username) {
			var countdown = $('.countdown');
	
			if(countdown.length === 0) {

				countdown = $('<div>');
			}
			countdown.addClass('countdown');
			update = setInterval(doUpdate, 1000);
			countdown.prependTo($('body'));
			contain = $("#contain");
			contain.html("");
			header = $("<h1>").text("Welcome " + username);
			header.appendTo(contain);
			var div = $('<div>');
			div.attr('id', 'questionContain');
			var button = $('<button>');
			button.text('check results');
			var counter = 0;
			for (var q in questions) {
				var ul = $('<ul>');
				var question = $('<p>');
				question.text(questions[q][0]);
				question.appendTo(ul);
				for (var a in answers) {

					var label = $('<label>');
					var li = $("<li>");
					var input = $('<input>').prop('type', 'radio');
					input.attr('id', counter);
					input.attr('name', "poll" + q);
					label.attr('for', counter);
					label.text(answers[q][a]);
					input.appendTo(li);
					label.appendTo(li);
					li.appendTo(ul);
					counter++;
				}
				ul.appendTo(div);


			}

			button.click(displayResults);
			button.appendTo(div);
			div.appendTo(contain);


		}

		function reloadPage() {
			var contain = $('#contain');
			contain.html("");
			header = $("<h1>").text("Poll system");
			var span = $("<span>Name:</span>");
			var input = $("<input>").prop('type', 'text');
			input.attr("id", 'username');
			var btn = $("<button>").text("Login");
			btn.attr('id', 'login');
			btn.click(login);
			header.appendTo(contain);
			span.appendTo(contain);
			input.appendTo(contain);
			btn.appendTo(contain);
			clearInterval(update);
			$('.countdown').remove();
			time = 300;
		}

		function checkIfTestIsAlreadyDone(personsArray) {
			var i, len;
			len = personsArray.length;
			for (i = 0; i < len; i += 1) {
				var alreadyDone = personsArray[i].alreadyDone;
				console.log(alreadyDone);
				if (alreadyDone) {
					return personsArray[i];

				}
			}

		}

		function checkUserName(array, name) {
			for (var i = 0; i < array.length; i++) {
				if (array[i].name == name) {
					return true;
				}
			}
			return false;
		}

		function escapeTag(str) {
			return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		}

		function displayResults() {
			var answersResult = [];
			var person, currectAnswer;
			var results = $('input').filter(':checked');
			if (results.length != 4) {

				alert("you must answer to all questions");
				loadQuestions(username);
				return;

			}
			if (findPersonByUsername(username) !== undefined) {
				person = findPersonByUsername(username);
			}

			var personScore = person.score;

			for (var q in questions) {
				var idStr = results[q].id;
				var id = parseInt(idStr) % 4;
				var currectAnswerNumber = questions[q][1];
				console.log(id);
				console.log(currectAnswerNumber);
				if (id === currectAnswerNumber) {
					personScore += 25;
					currectAnswer = "for question: \n" + questions[q][0] +
						" currect answer is " + answers[q][id] + " - you gain 25 ponts";
					answersResult.push(currectAnswer);
				} else {
					currectAnswer = "for question: \n" + questions[q][0] +
						" currect answer is " + answers[q][currectAnswerNumber] + "\n and your answer is: " +
						answers[q][id] + " - you gain 0 points";
					answersResult.push(currectAnswer);

				}

			}

			contain = $('#contain');
			contain.html("");

			for (var i = 0; i < answersResult.length; i++) {
				var p = $("<p>");
				p.text(answersResult[i]);
				p.appendTo(contain);
			}

			var p = $('<p>');
			p.text("Final score is " + personScore + "%");
			p.appendTo(contain);
			person.score = personScore;
			person.alreadyDone = true;
			writePersonToLocalStorage(person);
			clearInterval(update);
			$('.countdown').remove();

		}

		function findPersonByUsername(username) {
			var persons = localStorage.getObject("pollName");
			var personsArray = JSON.parse(persons);
			for (var i = 0; i < personsArray.length; i++) {
				if (personsArray[i].name === username) {
					console.log(username);
					return personsArray[i];
				}
			}

			return undefined;
		}

		function writePersonToLocalStorage(person) {
			var persons = localStorage.getObject("pollName");
			var personsArray = JSON.parse(persons);
			var personResult = [];
			for (var i = 0; i < personsArray.length; i++) {
				if (personsArray[i].name == person.name) {
					personResult.push(person);
				} else {
					personResult.push(personsArray[i]);
				}
			}
			localStorage.setObject("pollName", JSON.stringify(personResult));

		}

	});

}());