function View () {
	this.index = 0;
	this.selected = 0;
	this.displaycount = 8;
	this.displaybase = 0;
	this.item_height = 50;
	this.startY = 0;
	this.divList = [];
}

View.prototype = {
	show : function () {
		var divlists = this.divList;
		var HEIGHT = this.item_height;
		this.setPosition(divlists,HEIGHT);
	},
	render : function () {
		
	},
	getDiv : function () {
		
	},
	setPostion : function (elems,y) {
		var i;
		for (i = 0;i < elems.length;i++) {
			elems[i].style.top = i * y + "px";
		}
	},
	painterList : function (nodes,UpOrDown) {
		var i;
		var sum;
		var startY = this.startY;
		var nodes = nodes;
		var chanCnt = nodes.length;
		//console.log(nodes);
		if (chanCnt < this.displaycount) {
			sum = chanCnt; 
		}else {
			sum = this.displaycount;
		}
		if (UpOrDown) {
			var base = this.displaybase;
			for(i = -1;i < sum;i++){
				nodes[i + base].style.top = (startY + i * this.item_height) + 'px';
				
			}
		} else {
			startY += (sum - 1) * this.item_height;
			var bottom = this.displaybase + sum -1;
			for (i = -1;i < sum;i++) {	
				nodes[bottom - i].style.top = (startY - i * this.item_height) + 'px';
			}
		}
	},
	btnsHide : function (obj) {
		var i;
		for (i = 0;i < obj.length;i++) {
			obj[i].style.display = "none";
		}		
		obj[this.index].style.display = "block";
	},
	focusMove : function (elem) {
		var pos = this.selected - this.displaybase;
		if (pos > -1 && pos < 14) {
			elem.style.webkitTransition = 'top 0.3s';
			elem.style.top = parseInt(this.startY + pos * this.item_height) + 'px';
		}
	},
	onkeyEvent : function (key) {
		
	}
	
}

function ListView () {
	View.call(this);
}

ListView.prototype = {
	setSkipBG : function () {
		
	},
	setFavorBG : function () {
		
	},
	setMoveBG : function () {
		
	},
	onEnterPress : function () {
		
	},
	onKeyEvent : function () {
		
	}
}

function Controller (model,view) {
	this.model = model;
}

Controller.prototype = {
	getView : function (view,itemView,position) {
		var div = view.getDiv();
		if (!itemView) {
			var i;
			var item;
			for (i = 0;i < item.length;i++) {
				item.chanDiv = document.createElement('div');
				item.chanDiv.className = 'chan-item';
				
				item.numDiv = document.createElement('div');
				item.numDiv.className = 'chan-num';
				item.numDiv.innerHTML = item[i].no;
				
				item.nameDiv = document.createElement('div');
				item.nameDiv.className = 'chan-name';
				item.nameDiv.innerHTML = item[i].name;
				
				item.operDiv = document.createElement('div');
				item.operDiv.className = "chan-oper";
				
				item.skipDiv = document.createElement("div");
				item.skipDiv.className = "skip operate-btn";
				
				item.favorDiv = document.createElement("div");
				item.favorDiv.className = "favor operate-btn";
				
				item.moveDiv = document.createElement("div");
				item.moveDiv.className = "move operate-btn";
				
				item.operDiv.appendChild(item.skipDiv);
				item.operDiv.appendChild(item.favorDiv);
				item.operDiv.appendChild(item.moveDiv);
				
				item.chanDiv.appendChild(item.numDiv);
				item.chanDiv.appendChild(item.nameDiv);
				item.chanDiv.appendChild(item.operDiv);
				div.appendChild(item.chanDiv);
			}
		}
	}
	/*setSkipBG : function () {
		
	},
	setFavorBG : function () {
		
	},
	setMoveBG : function () {
		
	}*/
}

function Model (data) {
	this.data = data;
}
Model.prototype = {
	getItems : function () {
		
	},
	getDate : function () {
		
	}
}


var model = new Model();
/*var listView = new ListView();*/
var view = new View(model,listView);
var controller = new Controller(model,view);

view.show();
document.onkeydown = view.onKeyEvent;


