define(function () {

	var Item = (function() {
	var itemCount;
	function Item (itemContent) {
		if(itemCount == null) {
			itemCount = 0;
		}
		this.setContent(itemContent);
		this.setStatus(false);
		itemCount++;
	}

	Item.prototype.setContent = function(itemContent) {
		if(!itemContent) {
			throw new Error("Item content cannot be empty");
		}

		if(typeof itemContent != "string"){
			throw new Error("Item content should be of type String!");
		}
		this._itemContent = itemContent;
	};

	Item.prototype.getContent = function() {
		return this._itemContent;
	};

	Item.prototype.setStatus = function(status) {
		if(typeof status !== "boolean") {
			throw new Error("Item status should be a type of Boolean");
		}
		this._status = status;
	};

	Item.prototype.addToDom = function(parent) {
		
		var item = document.createElement('article');
		var itemStatus = document.createElement('input');
		itemStatus.setAttribute("type","checkbox");
		itemStatus.setAttribute('id', "item" + itemCount);
		itemStatus.setAttribute('class', "checkedItem");
		var itemContent = document.createElement('label');
		itemContent.setAttribute('for',"item" + itemCount);
		itemContent.innerHTML = this.getContent();
		item.appendChild(itemStatus);
		item.appendChild(itemContent);
		parent.appendChild(item);
	};

	Item.prototype.getStatus = function() {
		return this._status;
	};
	return Item;
}());
return Item;
});