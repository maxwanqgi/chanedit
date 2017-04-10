
function View() {
	this.div = null;
}

View.prototype = {
	show: function() {

	},

	getDiv: function() {
		return null;
	},

	move: function(t) {
		
	},

	onkeyEvent: function(e) {
		
	}

}

function ListView(div, data) {
	View.call(this);
	this.data = data;
	this.items = [];
	this.item_height = 50;
	this.div = div;
	this.focusDiv = document.getElementById("itemFocus");
	var i;
	var top;
	var item;
	for (i = 0; i < this.data.length; i++) {
		item = getView(this, this.items[i], i);
		this.items[i] = item;
		top = this.item_height * i;
		//this.items[i].style.top = top + "px";
	}
}
ListView.prototype = {
	
	

	onEnterPress: function() {

	}

	/*onKeyEvent: function(keycode) {
		var ctrl = this.ctrl;
		var items = this.items;
		if (keycode == 37) //up
		{
			var i = 0;

			if ()

					for (i; i < count; count++) {
					var t, b, l, r;
					//var item = ctrl.getView(this,items[i],i);
					var item = ctrl.getView(this, i, items[i]);
					item.move(t, b, l, r);

				}

		}
		if (keycode == 39) {

		}
		if (keycode == 13) {
			//this.onEnterPress();
		} else // keycode to item
		{
			var i = this.selected;
			//var item = ctrl.getView(this,items[i],i);
			var item = ctrl.getView(this, i, items[i]);
			item.onKeyEvent(keycode);
		}
	}*/
}

function getView(listview, itemview, position) {
	var view = listview.div;
	if (!itemview) {
		var data = listview.data[position];
		var skip = data.skip;
		var favor = data.favor;

		var chanDiv = document.createElement('div');
		chanDiv.className = 'chan-item';

		var numDiv = document.createElement('div');
		numDiv.className = 'chan-num';
		if (data.no < 10) {
			data.no = "00" + data.no;
		} else if (data.no > 9 && data.no < 100) {
			data.no = "0" + data.no;
		}
		if (skip) {
			numDiv.innerHTML = "..."
		} else {
			numDiv.innerHTML = data.no;
		}

		var nameDiv = document.createElement('div');
		nameDiv.className = 'chan-name';
		nameDiv.innerHTML = data.name;

		var operDiv = document.createElement('div');
		operDiv.className = "chan-oper";

		var skipDiv = document.createElement("div");
		skipDiv.className = "skip operate-btn";
		skip ? skipDiv.style.backgroundImage = "url(images/hide.png)" : skipDiv.style.backgroundImage = "url(images/hide1.png)";

		var favorDiv = document.createElement("div");
		favorDiv.className = "favor operate-btn";
		favor ? favorDiv.style.backgroundImage = "url(images/collect.png)" : favorDiv.style.backgroundImage = "url(images/collect1.png)"

		var moveDiv = document.createElement("div");
		moveDiv.className = "move operate-btn";

		operDiv.appendChild(skipDiv);
		operDiv.appendChild(favorDiv);
		operDiv.appendChild(moveDiv);

		chanDiv.appendChild(numDiv);
		chanDiv.appendChild(nameDiv);
		chanDiv.appendChild(operDiv);

		view.appendChild(chanDiv);
		
		var item = new View();
		item.div = chanDiv;
		
		itemview = item;
	} else {
		numDiv.innerHTML = data.no;
		nameDiv.innerHTML = data.name;
	}
	return itemview;
}
/*
Controller.prototype = {
	getView: function(listview, itemview, position) {
		//var div = view.getDiv("chan_list");
		var view = listview.div;
		var div = document.getElementById("chan_list")
		var data = this.model.data[position];
		//console.log(data)
		if (!itemView) {
			var i;
			var skip = data.skip;
			var favor = data.favor;
			itemView = new View();

			itemView.chanDiv = document.createElement('div');
			itemView.chanDiv.className = 'chan-item';

			itemView.numDiv = document.createElement('div');
			itemView.numDiv.className = 'chan-num';
			if (data.no < 10) {
				data.no = "00" + data.no;
			} else if (data.no > 9 && data.no < 100) {
				data.no = "0" + data.no;
			}
			if (skip) {
				itemView.numDiv.innerHTML = "..."
			} else {
				itemView.numDiv.innerHTML = data.no;
			}

			itemView.nameDiv = document.createElement('div');
			itemView.nameDiv.className = 'chan-name';
			itemView.nameDiv.innerHTML = data.name;

			itemView.operDiv = document.createElement('div');
			itemView.operDiv.className = "chan-oper";

			itemView.skipDiv = document.createElement("div");
			itemView.skipDiv.className = "skip operate-btn";
			skip ? itemView.skipDiv.style.backgroundImage = "url(images/hide.png)" : itemView.skipDiv.style.backgroundImage = "url(images/hide1.png)";

			itemView.favorDiv = document.createElement("div");
			itemView.favorDiv.className = "favor operate-btn";
			favor ? itemView.favorDiv.style.backgroundImage = "url(images/collect.png)" : itemView.favorDiv.style.backgroundImage = "url(images/collect1.png)"

			itemView.moveDiv = document.createElement("div");
			itemView.moveDiv.className = "move operate-btn";

			itemView.operDiv.appendChild(itemView.skipDiv);
			itemView.operDiv.appendChild(itemView.favorDiv);
			itemView.operDiv.appendChild(itemView.moveDiv);

			itemView.chanDiv.appendChild(itemView.numDiv);
			itemView.chanDiv.appendChild(itemView.nameDiv);
			itemView.chanDiv.appendChild(itemView.operDiv);

			div.appendChild(itemView.chanDiv);

			var item = {};
			item.div = itemView.chanDiv;
			item.getDiv = function() {
				return this.div;
			}

			item.move = function(t) {
				var div = this.getDiv();

				//	div.style.
			}

		} else {
			itemView.numDiv.innerHTML = data.no;
			itemView.nameDiv.innerHTML = data.name;

		}

		return item;
	}

}
*/
function Model(data) {
	this.data = data;
}
Model.prototype = {
	getItems: function() {

	},
	getDate: function() {

	}
}

function init_listview() {
	/*	var view = new View();

		view.show();
		document.onkeydown = view.onKeyEvent;*/

	var listview = new ListView(document.getElementById("chan_list"), itemArr)
}

init_listview();