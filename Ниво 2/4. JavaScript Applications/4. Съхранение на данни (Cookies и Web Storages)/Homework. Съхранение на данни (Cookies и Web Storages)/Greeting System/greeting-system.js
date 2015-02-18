(function() {

	$(document).ready(function() {
		if(localStorage.getItem('name') == null) {
			var button = document.getElementById('submit');

			button.addEventListener('click', function(e) {
				var keyText = 'name';
				var valueText = document.getElementById('value').value;
				localStorage.setItem(keyText, valueText);
				localStorage.setItem('totalVisits', '0');
				sessionStorage.setItem('sessionVisits', '0');
				alert("The user name was successful added!");
			})
		} else {
			var button = document.createElement('button');
			button.innerHTML = 'Delete name and visits!';
			button.addEventListener('click', function (e) {
				localStorage.removeItem('name');
				localStorage.removeItem('totalVisits');
				sessionStorage.removeItem('sessionVisits');
				location.reload();
			})
			var visitsCounter = parseInt(localStorage.getItem('totalVisits'));
			visitsCounter++;
			if(sessionStorage.getItem('sessionVisits') == null) {
				sessionStorage.setItem('sessionVisits', '0');
			}
			var sessionCounter = parseInt(sessionStorage.getItem('sessionVisits'));
			sessionCounter++;
			localStorage.setItem('totalVisits', visitsCounter);
			sessionStorage.setItem('sessionVisits', sessionCounter);
			var contain = document.getElementById('contain');
			contain.innerHTML = "";
			var name = localStorage.getItem('name');
			var header = document.createElement('h1');
			header.innerHTML = "Welcome " + name;
			var sessionParagraph = document.createElement('p');
			sessionParagraph.innerHTML = "Session visits: " + sessionCounter;
			var visitsParagraph = document.createElement('p');
			visitsParagraph.innerHTML = "Total visits: " + visitsCounter;
			contain.appendChild(header);
			contain.appendChild(sessionParagraph);
			contain.appendChild(visitsParagraph);
			contain.appendChild(button);

		}
		
	})
		
}())