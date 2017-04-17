/**
 * 
 */
function View() {
	this.div = null;
	this.index = 0;
}

View.prototype = {

/**
 * 
 */
	getDiv: function() {
		return this.div;
	},

	setFocus: function(focus) {

	},

	setVisible: function(visible) {
		this.div.style.display = visible ? "block" : "none";
	},

	hide: function() {
		this.setVisible(false);
	},

	show: function() {

		this.setVisible(true);
	},
	
	render: function() {
		
	},

	onKeyEvent: function(key) {

	},

	moveTo: function(t, l, r, b) {

		if (typeof(this.div) === "object") {
			if (t || t === 0) this.div.style.top = t + "px";
			if (l || l === 0) this.div.style.left = l + "px";
			if (r || r === 0) this.div.style.right = r + "px";
			if (b || b === 0) this.div.style.bottom = b + "px";
		}
	}
}

function ListView(div, data,itemViewConstructor,focusViewConstructor,controller) {
	View.call(this);
	this.data = data;
	this.items = [];
	this.div = div;

	this.selected = 0;
	this.displaycount = 8;
	this.displaybase = 0;
	this.startY = 0;
	this.item_height = 50;
	
	this.itemViewConstructor = itemViewConstructor || ItemView;
	
	this.focusView = focusViewConstructor ? new focusViewConstructor() : new FocusView();
	this.ctrl = controller ? new controller(this.itemViewConstructor) : new Controller(this.itemViewConstructor) ;
	
	//

	this.needRepaintFocus = true;
	this.needRepaintItems = true;
	this.repaintItemsDirect = true; 
	this.needDescendKeyEvent = true;
	this.render();
}

ListView.prototype = new View();

ListView.prototype.setVisible = function(visible) {

}

ListView.prototype.setNeedDescendKeyEvent = function (isDown) {
	if (isDown) {
		this.needDescendKeyEvent = true;
	} else {
		this.needDescendKeyEvent = false;
	}
}

ListView.prototype.setFocus = function(focus) {
	var item = this.items[this.selected];
	if (item) {
		item.setFocus(focus);
	}
}

ListView.prototype.painterList = function(isUp) {
	var i;
	var sum;
	var startY = this.startY;
	var items = this.items;
	var len = this.data.length;
	sum = len < this.displaycount ? len : this.displaycount;
//	debugger;
	if (isUp) {
		var base = this.displaybase;
		for (i = base > 0 ? -1 : 0; i < sum; i++) {
			items[i + base] = this.ctrl.getView(this,items[i + base],i + base);
			items[i + base].moveTo(startY + i * this.item_height, null, null, null);	
		}
		
	} else {
		
		startY += (sum - 1) * this.item_height;
		var bottom = this.displaybase + sum - 1;
		for (i = bottom > this.displaycount - 2 ? - 1: 0; i < sum; i++) {
			items[bottom - i] = this.ctrl.getView(this,items[bottom - i],bottom - i);
			items[bottom - i].moveTo(startY - i * this.item_height, null, null, null);
		}
		
	}
}

ListView.prototype.focusMove = function() {
	var t = this.index * this.item_height + "px";
	var pos = this.selected - this.displaybase;
	if (pos > -1 && pos < 14) {
	//	this.focusDiv.style.webkitTransition = 'top 0.3s';
		//this.focusDiv.style.top = parseInt(this.startY + pos * this.item_height) + 'px';
	}
}

ListView.prototype.setSelected = function(postion) {
	
}

ListView.prototype.render = function() {
	if (this.needRepaintFocus) {
		this.focusMove();
	}
	if (this.needRepaintItems) {
		this.painterList(this.repaintItemsDirect);
	}
}

ListView.prototype.onKeyEvent = function(keycode) {
	var sel = this.selected;
	var ctrl = this.ctrl;
	var items = this.items;
	var old_sel = sel;
	var channelCount = this.data.length;
	if (keycode == 40) { //down
		if (channelCount > 0) {
			sel ++;
			if (sel > channelCount - 1) {
				sel = channelCount - 1
			}
			this.index = sel;
			if (sel < channelCount) {	
				this.selected = sel;
				if (this.displaybase + parseInt(this.displaycount / 2) < sel && this.displaybase + this.displaycount < channelCount) {
					this.displaybase ++;
					this.needRepaintFocus = false;
					this.needRepaintItems = true;
					this.repaintItemsDirect = true; 
				} else {
					this.needRepaintFocus = true;  
					this.needRepaintItems = false; 
				}
				this.render(); 
			}
		}
		
		if (sel !== old_sel) {
			this.needRepaintItems = true;
			if (channelCount > this.displaycount) {
				this.repaintItemsDirect = sel > parseInt(this.displaycount / 2) ? true : false;
			} else{
				this.repaintItemsDirect = false;
			}
			this.onItemSelected(this, items[sel], sel, items[old_sel], old_sel);
		}
	} 
	else if (keycode == 38) { //up
		if (channelCount > 0) {
			sel--;
			if (sel < 0) sel = 0;
			this.index = sel;
			if (sel > -1) {
				this.selected = sel;
				if (this.displaybase + parseInt(this.displaycount / 2) > sel && this.displaybase > 0) {
					this.displaybase --;
					this.needRepaintFocus = false;
					this.needRepaintItems = true;
					this.repaintItemsDirect = false;
				} else {
					this.needRepaintFocus = true;
					this.needRepaintItems = false;
				}
				
				this.render();  
			}
		}
		if (sel !== old_sel) {
			this.needRepaintItems = true;
			if (channelCount > this.displaycount) {
				this.repaintItemsDirect = sel > parseInt(this.displaycount / 2) ? true : false;
			} else{
				this.repaintItemsDirect = false;
			}
			this.onItemSelected(this, items[sel], sel, items[old_sel], old_sel);
		}
	} else {
		var item = ctrl.getView(this, items[sel], sel);
		
		if (this.needDescendKeyEvent) {
			
			item.onKeyEvent(keycode, sel);
		} else if (keycode == 13) { //enter
			this.onItemClicked(this, item, sel);
		}
	}
}

ListView.prototype.onItemClicked = function (listview, itemview, postion) {
	
}

ListView.prototype.onItemSelected = function (listview, itemview_now, postion_now, itemview_old, postion_old) {
	
}


function FocusView () {
	View.call(this);
	//this.div = document.getElementById("itemFocus");
}

FocusView.prototype = new View();
	


function ItemView() {
	View.call(this);
}

ItemView.prototype = new View();
ItemView.prototype.update = function(data) {
	
}

function Controller(viewConstructor) {
	this.viewConstructor = viewConstructor;
}

Controller.prototype = {
	getView: function(listview, itemview, position) {
		if (!itemview) {
			var item = new this.viewConstructor(listview, listview.data[position]);
			itemview = item;
		} else {
			itemview.update(listview.data[position]);
		}
		return itemview;
	}
}


function itemViewConstructor () {
	
}

function Model(data) {
	this.data = data;
}

Model.prototype = {
	getItems: function() {

	},
	getDate: function() {

	}
}

