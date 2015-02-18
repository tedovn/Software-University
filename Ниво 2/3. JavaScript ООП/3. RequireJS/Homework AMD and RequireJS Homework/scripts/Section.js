define(['Item'], function (Item) {
	var Section = (function () {
	var items;
	var sectionCount;
	function Section (title) {
		if(sectionCount == undefined) {
			sectionCount = 0;
		}
		
		this.setTitle(title);
		sectionCount++;
		items = [];
	}	

	Section.prototype.setTitle = function(title) {
		if(!title) {
			throw new Error("Title value cannot be empty!")
		}
	this._title = title;
	};

	Section.prototype.getTitle = function() {
		return this._title;
	};

	Section.prototype.addItem = function(item) {
		if(!item) {
			throw new Error("Item value cannot be empty!");
		}

		if(!(item instanceof Item)) {
			throw new Error("Item value should be instanceof Item");
		}

		items.push(item);
	};

	Section.prototype.getItems = function() {
		return items;
	};
	Section.prototype.addToDom = function(parent) {
		var divAddButton = document.createElement('div');
		divAddButton.setAttribute("class","itemButtonPostion")
		var innerDiv = document.createElement('div');
		var outerDiv = document.createElement('div');
		outerDiv.setAttribute("class","sectionOuterDiv");
		var header = document.createElement("h3");
		header.innerHTML = this.getTitle();
		var section = document.createElement("section");
		section.setAttribute("class","section");
		section.setAttribute("name",'section' + sectionCount);
		var input = document.createElement("input");
		input.setAttribute("type","text");
		input.setAttribute("placeholder","Add item...");
		input.setAttribute("name","addItem");
		var button = document.createElement("button");
		button.setAttribute("type","button");
		button.setAttribute("class","addItem");
		button.innerHTML = "+"
		section.appendChild(header);
		section.appendChild(innerDiv);
		divAddButton.appendChild(input);
		divAddButton.appendChild(button);	
		outerDiv.appendChild(section);
		outerDiv.appendChild(divAddButton);
		parent.appendChild(outerDiv);
	};
	return Section;
}());
return Section;
});