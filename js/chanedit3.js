var listArray = [];

function View () {
	
	
	/*this.divLists = [];
	this.model = new Model(itemArr);
	this.ctrl = new Controller(this.model);*/
}

View.prototype = {
	show : function () {
		
		//this.divLists = this.pushItem();
		//this.setDivTop(this.divLists,HEIGHT);
	},
		
	getDiv : function (elem) {
		return null;
	},

	
	/*btnsHide : function (btns) {
		var i;
		var timer = null;
		for (i = 0;i < btns.length;i ++) {
			btns[i].style.display = "none";
		}	
		timer = setTimeout(function () {
			btns[this.index].style.display = "block";
		},150)	
	},*/
//	focusMove : function (focusDiv) {
//		var pos = this.selected - this.displaybase;
//		if (pos > -1 && pos < 14) {
//			focusDiv.style.webkitTransition = 'top 0.3s';
//			focusDiv.style.top = parseInt(this.startY + pos * this.item_height) + 'px';
//		}
//	},
	
	move:function(t,b,l,r)
	{
		var div = this.getDiv("itemFocus");
		this.focusMove(div);
	},
	
	onkeyEvent : function (e) {
		
	}
	
}

function ListView () {
	View.call(this);
	
	this.index = 0;
	this.selected = 0;
	this.displaycount = 8;
	this.displaybase = 0;
	this.item_height = 50;
	this.startY = 0;
	this.btnIndex = -1;
	
}
ListView.prototype = {
	pushItem : function () {
		var len = this.model.data.length;
		var i;
		var aDiv = null;
		for (i = 0;i < len;i ++) {
			aDiv = this.ctrl.getView(this,i).getDiv();
			this.divLists.push(aDiv);
		}
		return this.divLists;
	},
	
	setDivTop : function (elems,y) {
		var i;
		for (i = 0;i < elems.length;i ++) {
			elems[i].style.top = i * y + "px";
		}
	},
	//焦点移动到指定位置焦点不在做移动，改为列表移动
	/*painterList : function (nodes,UpOrDown) {
		var i;
		var sum;
		var startY = this.startY;
		var nodes = nodes;
		var chanCnt = nodes.length;
		
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
	},*/
	onEnterPress : function () {
		//alert(this.btnIndex);
		
	},
	
	onKeyEvent : function (keycode) {
		var ctrl = this.ctrl;
		var items = this.items;
		if(keycode == 37)//up
		{
			var i = 0;
			
			if()
			
			for(i;i < count;count++)
			{
				var t,b,l,r;
				//var item = ctrl.getView(this,items[i],i);
				var item = ctrl.getView(this,i,items[i]);
				item.move(t,b,l,r);
				
			}
			
		}
		if (keycode == 39) {
			
		}
		if (keycode == 13) {
			//this.onEnterPress();
		}
		
		else // keycode to item
		{
			var i = this.selected;
			//var item = ctrl.getView(this,items[i],i);
			var item = ctrl.getView(this,i,items[i]);
			item.onKeyEvent(keycode);
		}
	}
}

function Controller (model) {
	this.model = model;
	//this.chanList = [];
}

Controller.prototype = {
	getView : function (view,position,itemView) {
		//var div = view.getDiv("chan_list");
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
			} else{
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
			item.getDiv = function()
			{
				return this.div;
			}
			
			item.move = function(t)
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
		//console.log(item)
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


function init_listview () {
	var view = new View();


	view.show();
	document.onkeydown = view.onKeyEvent;	
}

init_listview();




