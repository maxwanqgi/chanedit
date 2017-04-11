function View() {
	this.btnIndex = -1;
	this.div = null;
	this.index = 0;
}

View.prototype = {

	getDiv: function() {
		return this.div;
	},
	
	setFocus : function (focus) {
		
	},
	
	setVisible : function (visible) {
		this.div.style.display = visible ? "block": "none";
	},
	
	hide : function () {
		this.setVisible(false);
	},
	
	show : function () {
		
		this.setVisible(true)
	},
	
	onKeyEvent: function(key) {
		
	},

	moveTo: function(t, l, r, b) {
		
		if (typeof(this.div) === "object") {
			if (t || t === 0) this.div.style.top = t + "px";
			if (l || l === 0) this.div.style.left = l + "px";
			if (r || r === 0) this.div.style.right = r + "px";
			if (b || r === 0) this.div.style.bottom = b + "px";
		}
	}
}

function ListView(div, data) {
	View.call(this);
	this.data = data;
	this.items = [];
	this.div = div;
	
	this.selected = 0;
	this.displaycount = 8;  
	this.displaybase = 0;
	this.startY = 0;
	this.item_height = 50;
	this.ctrl = new Controller();
	this.focusDiv = document.getElementById("itemFocus");
	var i;
	var item;
	var itemDiv;

	for (i = 0; i < this.data.length; i++) {
		/* abc */
		item = this.ctrl.getView(this, this.items[i], i);
		item.moveTo(i * this.item_height, null, null, null);
		this.items[i] = item;
	}
	
	//console.log(this.items)
}

ListView.prototype = new View();

ListView.prototype.setVisible = function (visible) {
	
}

ListView.prototype.setFocus = function (focus) {
	var item = this.items[this.selected];
	if(item)
		item.setFocus(focus);
}

ListView.prototype.painterList = function (UpOrDown) {
	var i;
	var sum;
	var startY = this.startY;
	var items = this.items;
	//console.log(items)
	var len = items.length;
	
	if (len < this.displaycount) {
		sum = len;
	} else {
		sum = this.displaycount;
	}
	
	if (UpOrDown) { //by wangqi
		var base = this.displaybase;
		for (i = -1; i < sum; i++) {
			items[i + base].moveTo(startY + i * this.item_height, null, null, null);
		}
	} else {
		startY += (sum - 1) * this.item_height;
		var bottom = this.displaybase + sum - 1;
		for (i = -1; i < sum; i++) {
			items[bottom - i].moveTo(startY - i * this.item_height, null, null, null);
		}
	}
}

ListView.prototype.focusMove = function () {
	var t = this.index * this.item_height + "px";
	var pos = this.selected - this.displaybase;
	if (pos > -1 && pos < 14) {
		//this.focusDiv.style.webkitTransition = 'top 0.3s';
		this.focusDiv.style.top = parseInt(this.startY + pos * this.item_height) + 'px';
	}
}

ListView.prototype.onKeyEvent = function(key) {
	var sel = this.selected;
	var ctrl = this.ctrl;
	var items = this.items;
	var channelCount = items.length;
	if (key == 40) { //down
		items[sel].setFocus(false);
		if (channelCount > 0) {
			sel++;
			if (sel > channelCount -1) {
				sel = channelCount -1
			}
			items[sel].setFocus(true);
			this.index = sel;
			if (sel < channelCount) {
				this.selected = sel;
				if (this.displaybase + parseInt(this.displaycount / 2) < sel && this.displaybase + this.displaycount < channelCount) {
					this.displaybase++;
					this.painterList(true);
					
				} else {
					this.focusMove();
				}
			}
		}
	} else if (key == 38) { //up		
		items[sel].setFocus(false);

		if (channelCount > 0) {
			sel--;
			if (sel < 0) sel = 0;
			items[sel].setFocus(true);
			this.index = sel;
			
			if (sel > -1) {
				this.selected = sel;
				if (this.displaybase + parseInt(this.displaycount / 2) > sel && this.displaybase > 0) {
					this.displaybase--;
					this.painterList(false);
				} else {
					this.focusMove();
				}
			}
		}
		
	} else {
		var item = ctrl.getView(this, items[sel], sel);
		item.onKeyEvent(key,sel);
	}
}

function ItemView(listview, data) {	
	View.call(this);

	var div = listview.div; /**TODO getDiv*/
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
	numDiv.innerHTML = skip ? "..." : data.no;

	var nameDiv = document.createElement('div');
	nameDiv.className = 'chan-name';
	nameDiv.innerHTML = data.name;

	var operDiv = document.createElement("div");
	operDiv.className = "chan-oper";


	var skipDiv = document.createElement("div");
	skipDiv.className = "skip operate-btn";
	skipDiv.style.backgroundImage = skip ? "url(images/hide.png)" : "url(images/hide1.png)";

	var favorDiv = document.createElement("div");
	favorDiv.className = "favor operate-btn";
	favorDiv.style.backgroundImage = favor ? "url(images/collect.png)" : "url(images/collect1.png)";

	var moveDiv = document.createElement("div");
	moveDiv.className = "move operate-btn";

	operDiv.appendChild(skipDiv);
	operDiv.appendChild(favorDiv);
	operDiv.appendChild(moveDiv);

	chanDiv.appendChild(numDiv);
	chanDiv.appendChild(nameDiv);
	chanDiv.appendChild(operDiv);

	this.div = chanDiv;
	this.numDiv = numDiv;
	this.nameDiv = nameDiv;
	this.operDiv = operDiv;
	this.skipDiv = skipDiv;
	this.favorDiv = favorDiv;
	this.moveDiv = moveDiv;
	this.listview = listview;

	div.appendChild(chanDiv);
}

ItemView.prototype = new View();

ItemView.prototype.choiceBtn = function() {
	var operate = [];
	operate.push(this.skipDiv);
	operate.push(this.favorDiv);
	operate.push(this.moveDiv);
	//console.log(operate);
	var i;
	for(i = 0;i < operate.length;i ++) {
		operate[i].style.border = '';
	}
	operate[this.btnIndex].style.border = "1px solid red";
}

ItemView.prototype.setFocus = function(focus) {
	this.operDiv.style.display = focus ? "block" : "none";
}

ItemView.prototype.onEnterDown = function (data) {
	//alert("enter");
	var btnindex = this.btnIndex;
	switch (btnindex){
		case 0:
			data.skip =　!data.skip;
			break;
		case 1:
			data.favor = !data.favor;
			break;
		case 2:
			break;
		default:
			break;
	}
}

ItemView.prototype.onKeyEvent = function(keycode,index) {
	switch (keycode) {
		case 37: 
			this.btnIndex --;
			if (this.btnIndex <0) {
				this.btnIndex = 0;
			}
			this.choiceBtn();
			break;
		case 39:
			
			this.btnIndex ++;
			if (this.btnIndex > 2) {
				this.btnIndex = 2;
			}
			this.choiceBtn()
			break;
		case 13: 
			this.onEnterDown(itemArr[index]);  // the argument of here need to change;
			this.update(itemArr[index]);
			break;
		default:
			break;
	}
}

ItemView.prototype.update = function(data) {
	this.nameDiv.innerHTML = data.name;
	this.numDiv.innerHTML = data.skip ? "..." : data.no;
	this.skipDiv.style.backgroundImage = data.skip ? "url(images/hide.png)" : "url(images/hide1.png)";
	this.favorDiv.style.backgroundImage = data.favor ? "url(images/collect.png)" : "url(images/collect1.png)";
}

function Controller() {
	
}

Controller.prototype = {
	getView: function(listview, itemview, position) {
		if (!itemview) {
			var item = new ItemView(listview, listview.data[position]);
			itemview = item;
		} else {
			itemview.update(listview.data[position]);
		}
		return itemview;
	}
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

function init_listview() {
	var listview = new ListView(document.getElementById("chan_list"), itemArr);
	listview.show();
	
	listview.setFocus(true);
	
	document.onkeydown = function(e) {
		var key = e.keyCode;
		listview.onKeyEvent(key);

	}
}

init_listview();