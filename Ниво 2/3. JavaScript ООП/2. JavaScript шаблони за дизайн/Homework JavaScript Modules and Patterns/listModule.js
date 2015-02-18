var module = (function () {
		var Container = (function () {
			var containerCount;
			var sections;
			function Container() {
				if(containerCount === undefined ) {
					containerCount = 0;
				}

				containerCount++;
				sections = [];
			
			}

			Container.prototype.addSection = function(value) {
				if(!(value instanceof Section)) {
					throw new Error("Section value should be insntace of Section");
				}
				sections.push(value);
			};

			Container.prototype.getSections = function() {
				return sections;
			};

			Container.prototype.addToDom = function() {
				var contaninerName = document.getElementById('ContentName').value;
				var container = document.getElementById('wrapper');
				if(container === null) {
					var wrapper = document.createElement('div');
					warrper.id = "wrapper";
					document.body.appendChild(wrapper);
				}
				var innerContnet = document.createElement('div');
				innerContnet.id = "Container" + containerCount;
				innerContnet.className = "Container";
				innerContnet.innerHTML = "<h1 class='containerName'>" + contaninerName +"</h1><input type=text class ='section' id='section" + containerCount + "' placeholder='Title...'/><button id='addSection" + containerCount + "'>New Section</button>";
				container.appendChild(innerContnet);
				
				return containerCount;
			};

			return Container;
		}());
		var Section = (function () {
			var items;
			function Section () {
				
				items = {};
			}
			Section.prototype.setTitle = function(value) {
				this._title = title;
			};
			Section.prototype.getTitle = function() {
				return this._title;
			};

			Section.prototype.setItems = function(item) {
				this._item = item;
			};
			Section.prototype.getItems = function() {
				return this.items;
			};
			function addItem(item) {
				// if(!(item instanceof of Item)) {
				// 	throw new Error("Item value should be instanceof of Item")
				// }

				this.items.add(item);
			}

			Section.prototype.addToDom = function() {
				var section = this.parentNode;
				console.log(section);
				console.log(section);
				// var innerContnet = document.createElement('div');
				// innerContnet.id = "Section" + containerCount;
				// innerContnet.className = "Section";
				// innerContnet.innerHTML = "<h3 class='sectionName'>" + sectionName +"</h3><div>Section</div>";
				// container.appendChild(innerContnet);
				// return innerContent.id;
			};

			return Section;

		}());
		var Item = (function () {
			function Item(){
			
				this.setStatus(false);
			}

			Item.prototype.setContent = function(value) {
				this._content = value;
			};

			Item.prototype.getContent = function() {
				return this._content;
			};

			Item.prototype.setStatus = function(value) {
				if(typeof value != "boolean") {
					throw new Error("Status should be boolean value!")
				}
				this._status = value;
			};
			Item.prototype.getStatus = function() {
				return this._status;
			};

			return Item;
		}());
		return {
			Container : Container,
			Section : Section,
			Item : Item
		}
}());
var section = {};
function addContainer() {
	var container = new module.Container();
	var innerContent = container.addToDom();
	console.log(innerContent)
	var name = "Container" + innerContent;
	var button = document.getElementById(name).querySelector('button');
	console.log(button);
	button.addEventListener('click', addSection );
}
function addSection () {
	var section = new module.Section();
	section.addToDom();
}


document.getElementById('addContent').addEventListener('click', addContainer);
