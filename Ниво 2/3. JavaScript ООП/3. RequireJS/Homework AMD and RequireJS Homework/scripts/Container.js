define(['Section'], function (Section) {
	
	var Container = (function () {
		var sections;
		function Container () {
			sections = [];
		}

		Container.prototype.getSections = function() {
			return sections;
		};

		Container.prototype.addSection = function(section) {
			if(!section) {
				throw new Error("Section value cannot be empty!");
			}

			if(!(section instanceof Section)) {
				throw new Error('Section value should be instanceof Section');
			}

			sections.push(section);
		};

		Container.prototype.addToDom = function(parent) {
			var container = document.createElement("div");
			var header = document.createElement('h1');
			header.innerHTML = "List Container";
			container.setAttribute("class","containerList");
			var input = document.createElement('input');
			input.setAttribute("type","text");
			input.setAttribute("class","inputSectionTitle");
			input.setAttribute("placeholder","Title...")
			var button = document.createElement("button");
			button.setAttribute("class","addSection");
			input.setAttribute("name","addSection");
			button.innerHTML = "New Section";
			var div = document.createElement('div');
			div.setAttribute("id","container");
			var buttonPosition = document.createElement('div');
			buttonPosition.appendChild(input);
			buttonPosition.appendChild(button);
			buttonPosition.setAttribute("class","searchPosition");
			container.appendChild(header);
			container.appendChild(div);
			container.appendChild(buttonPosition);
			parent.appendChild(container);
		};
		return Container;

	}());
return Container;
});