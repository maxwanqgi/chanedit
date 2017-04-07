function View () {
	this.index = 0;
	this.selected = 0;
	this.displaycount = 8;
	this.displaybase = 0;
	this.item_height = 50;
	this.startY = 0;
	
	this.model = new Model(itemArr);
	this.ctrl = new Controller(this.model);
	//this.divList = this.ctrl.chanList;
}

View.prototype = {
	show : function () {
		var divlists = this.divList;
		var HEIGHT = this.item_height;
		//this.setPosition(divlists,HEIGHT);
		
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
		var timer = null;
		for (i = 0;i < obj.length;i++) {
			obj[i].style.display = "none";
		}	
		timer = setTimeout(function () {
			obj[this.index].style.display = "block";
		},150)	
	},
	
	focusMove : function (obj) {
		var pos = this.selected - this.displaybase;
		if (pos > -1 && pos < 14) {
			obj.style.webkitTransition = 'top 0.3s';
			obj.style.top = parseInt(this.startY + pos * this.item_height) + 'px';
		}
	},
	
	move:function(t,b,l,r)
	{
		var div = this.getDiv();
		//div.
	},
	
	onkeyEvent : function (key) {
		
	}
	
}

function ListView () {
	
}
ListView.prototype = {

	onEnterPress : function () {
		
	},
	
	onKeyEvent : function (keycode) {
		var ctrl = this.ctrl;
		var items = this.items;
		if(keycode == "UP")
		{
			var i = 0;
			for(i;i < count;count++)
			
			{
				var t,b,l,r;
				var item = ctrl.getView(this,items[i],i);
				
				item.move(t,b,l,r);
				
			}
		}
		
		
		else // keycode to item
		{
			var i = this.selected;
			var item = ctrl.getView(this,items[i],i);
			item.onKeyEvent(keycode);
		}
	}
}

function Controller (model) {
	this.model = model;
	//this.chanList = [];
}

Controller.prototype = {
	getView : function (view,itemView,position) {
		var div = view.getDiv();
		var data = this.data[position]

		if (!itemView) {
			var i;
			itemView = new View();
			
			itemView.chanDiv = document.createElement('div');
			itemView.chanDiv.className = 'chan-item';
				
			itemView.numDiv = document.createElement('div');
			itemView.numDiv.className = 'chan-num';
			itemView.numDiv.innerHTML = data.no;
				
			itemView.nameDiv = document.createElement('div');
			itemView.nameDiv.className = 'chan-name';
			itemView.nameDiv.innerHTML = data.name;
				
			itemView.operDiv = document.createElement('div');
			itemView.operDiv.className = "chan-oper";
			
			itemView.skipDiv = document.createElement("div");
			itemView.skipDiv.className = "skip operate-btn";
				
			itemView.favorDiv = document.createElement("div");
			itemView.favorDiv.className = "favor operate-btn";
				
			itemView.moveDiv = document.createElement("div");
			itemView.moveDiv.className = "move operate-btn";
				
			itemView.operDiv.appendChild(item.skipDiv);
			itemView.operDiv.appendChild(item.favorDiv);
			itemView.operDiv.appendChild(item.moveDiv);
				
			itemView.chanDiv.appendChild(item.numDiv);
			itemView.chanDiv.appendChild(item.nameDiv);
			itemView.chanDiv.appendChild(item.operDiv);
			
			div.appendChild(itemView.chanDiv);
			
			item.div = chanDiv;
			item.getDiv = function()
			{
				return this.div;
			}
			
			item.move = function(t,b,r,l)
			{
				var div = this.getDiv();
			//	div.style.
			}
			
			
			
		}
		else
		{
//			var div = itemView.getDiv();
			itemView.numDiv.innerHTML = data.no;
			itemView.nameDiv.innerHTML = data.name;

		}
		
		return item;
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


/*var model = new Model();
var listview = new ListView();
var view = new View(model,listview);
var controller = new Controller(model,view);

view.show();
document.onkeydown = view.onKeyEvent;*/



