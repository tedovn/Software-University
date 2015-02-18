(function (){
	require(["Factory"], function (Factory) {
		
		function addElementToDom(e){
			var target = event.target || event.srcElement;
			var className = target.className;
			var input;
			var errorMsg;
			var errorDiv = document.getElementsByClassName('errorMessage')[0];
			var container = document.getElementsByClassName("containerList")[0];
			if(errorDiv ===  undefined) {
				errorDiv = document.createElement('div');
				errorDiv.setAttribute("class","errorMessage");
			}

			if(errorDiv.innerHTML != "") {

				container.removeChild(errorDiv);
				errorDiv = document.createElement('div');
				errorDiv.setAttribute("class","errorMessage");
			}

			var errorMessageDisplay = container.getElementsByTagName('div')[0]
			var parent = target.parentNode;
			switch(className) {
				case "addSection": 
				try {
					parent = parent.parentNode;
					input = parent.querySelector('input[name=addSection]');
					var value = input.value;
					var section = Factory.getSection(value);
					section.addToDom(parent.getElementsByTagName('div')[0]);
					con.addSection(section);
				}
				catch (e) {
					errorMsg = "Section Title cannot be empty";
					errorDiv.innerHTML = errorMsg;
					container.insertBefore(errorDiv,errorMessageDisplay);
				
				}
					break;

				case "addItem" : 
				try {
					var section = parent.parentNode.querySelector('section');
					var sectionName = section.getAttribute('name');
					var index = sectionName.substr(sectionName.length - 1);
					input = parent.querySelector('input[name=addItem]');
					var value = input.value;
					var item = Factory.getItem(value);
					item.addToDom(parent.parentNode.getElementsByTagName('div')[0]);
					var sections = con.getSections();
					sections[index-1].addItem(item)

				}
				catch (e){
					errorMsg = "Item content cannot be empty";
					errorDiv.innerHTML = errorMsg;
					container.insertBefore(errorDiv,errorMessageDisplay);
				}
				break;

				default:
				break;
			}
			if(input) {
				input.value = "";
			}
		}
		var con = Factory.getContainer();
		con.addToDom(document.body);
		document.body.addEventListener('click', addElementToDom);
	})

}());

