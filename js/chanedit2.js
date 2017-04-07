
function View() {
	
	this.divLists = [];
	this.model = new Model(itemArr);
	this.ctrl = new Controller(this.model);
	
//	ctrl.getView(new View())
	var that = this;
	this.pushItems = function (dataItem) {
		var i;
		for (i = 0;i < dataItem.length;i++) {
			this.divLists.push(dataItem[i]);
		}
	}
	
	this.getDiv = function(elem) {
		return document.getElementById(elem);
	};
	
	this.show = function() {
		//ctrl.getView(this);
		this.setPosition(50);
		that.ctrl.setFavorBg();
		that.ctrl.setSkipBg();
	};
	
	this.render = function() {
		//ctrl.getView(this);
		this.setPosition(50);
		that.ctrl.setFavorBg();
		that.ctrl.setSkipBg();
	};
	
	this.setPosition = function(y) {
		this.pushItems(that.ctrl.getView(this));
		var j;
		for (j = 0; j < this.divLists.length; j++) {
			this.divLists[j].style.top = j * y + 'px';
		}
	};

	
	
/*	this.setVisible = function(visible) {
		
	};
	this.setFavor = function () {
		
	}
	this.setSkip = function () {
		
	}*/
	this.onKeyEvent = function(e) {
		var key = e.keyCode; 
		that.ctrl.onkeyDown(key);
		//console.log(that.ctrl)
	};
	
}

/*function ListView() {
	View.call(this);
	this.itemViews = [];
	this.contoller = {};
	
	this.render = function() {

		var i;
		var count = displayCount;
		for (i = 0; i < displayCount; i++) {
			var temp = this.itemViews[i];
			var item = contoller.getView(this, temp, i);
			if (temp) {
				this.itemViews[i] = item;
			}

			item.setPosition(50);
			item.setVisible();
		}
	};

	this.onKeyEvent = function(keycode) {

		if (a) {
			item = this.itemViews[this.selected];
			item.onKeyEvent(keycode);
		}
	};

	return this;
}*/

function Controller(model) {
	this.model = model;
	this.index = 0;
	this.btnIndex = -1;
	this.selected = 0;
	this.displaycount = 8;  //页面上最多显示8个节目
	this.displaybase = 0;
	this.startY = 0;
	this.item_height = 50;
	this.getItem = function(i) {
		
	};

	this.getView = function(view, itemView, position) {
		//var data = this.model.getData(1);
		//alert(data)
		//var div = view.getDiv('chan_list');
		var div = document.getElementById("chan_list")
		var chanItem = [];
		if (!itemView) {
			var item = this.model.data;
			var i;
			var chanNum;
			for (i = 0; i < item.length; i++) {
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
				chanItem[i] = item.chanDiv;
			}
			itemView = item;
		};
		return chanItem;
	
	};
	
	this.setFavorBg = function () {
		var favorBtns = document.getElementsByClassName('favor');
		var item = this.model.data;
		
		var i;
		for (i = 0;i < favorBtns.length;i++) {
			if (item[i].favor == false) {
				favorBtns[i].style.backgroundImage = 'url(images/collect1.png)';
			} else { 
				favorBtns[i].style.backgroundImage = 'url(images/collect.png)';
			}
		}
	};
	this.setSkipBg = function () {
		var skipBtns = document.getElementsByClassName('skip');
		var item = this.model.data;
		var chans = document.getElementsByClassName('chan-item');
		var j;
		for (j = 0;j < skipBtns.length;j++) {
			if (item[j].skip == false) {
				skipBtns[j].style.backgroundImage = 'url(images/hide1.png)';
				chans[j].firstElementChild.innerHTML = item[j].no;
			} else {
				skipBtns[j].style.backgroundImage = 'url(images/hide.png)';
				chans[j].firstElementChild.innerHTML = "...";
			}
		}
	};
	this.painterList = function (UpOrDown) {
		var i;
		var sum;
		var startY = this.startY;
		
		var nodes = document.getElementsByClassName('chan-item');
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
	};
	this.btnsHide = function () {
		var i;	
		var index = this.index;
		var operateBtns = document.getElementsByClassName('chan-oper');
		var len = operateBtns.length;
		var timer;
		for(i = 0;i < len;i++) {
			operateBtns[i].style.display = "none";
		}
		timer = setTimeout(function () {
			operateBtns[index].style.display = "block";
		},150)
	}
	
	
	this.focusMove = function(){
		var itemFocu = document.getElementById('itemFocus');
		var pos = this.selected - this.displaybase;
		if (pos > -1 && pos < 14) {
			itemFocu.style.webkitTransition = 'top 0.3s';
			itemFocu.style.top = parseInt(this.startY + pos * this.item_height) + 'px';
		}
	};
	this.choiceBtn = function () {
		var index = this.index;
		//var btnIndex = this.btnIndex
		var currentItem = document.getElementsByClassName('chan-item')[index];
		//alert(index);
		var operate = currentItem.getElementsByClassName('operate-btn');
		//alert(operate.length)
		for(var i = 0;i < operate.length;i++) {
			operate[i].style.border = '';
		}
		//console.log(operate[btnIndex])
		operate[this.btnIndex].style.border = '1px solid red';
	}
	
	this.onEnterDown = function () {
		var item = this.model.data;
		switch (this.btnIndex){
			case 0:
				item[this.index].skip = !item[this.index].skip;
				this.setSkipBg();
				break;
			case 1:
				item[this.index].favor = !item[this.index].favor;
				this.setFavorBg();
				break;
			case 2:
				console.log(item[this.index]);
				break;
			default:
				break;
		}
	}
	
	this.onkeyDown = function (keycode) {
		var sel = this.selected;
		//this.items.length;
		var focusChan = document.getElementsByClassName('chan-item');
		var channelCount = focusChan.length;
		//var btnIndex = this.btnIndex;
		switch (keycode){
			case 38:
				if (channelCount > 0) {
					sel --;
					this.index = sel;
					if (this.index < 0) {
						this.index = 0
					}else {
						this.index = sel;
					}
					if (sel > -1) {
						this.selected = sel;
						if (this.displaybase + parseInt(this.displaycount / 2) > sel && this.displaybase > 0) {
							this.displaybase --;
							this.painterList(false);
						} else{
							this.focusMove();
						}
					} 
				}
				this.btnsHide();
				if (this.btnIndex != -1) {
					focusChan[this.index + 1].getElementsByClassName('operate-btn')[this.btnIndex].style.border = '';		
				}
				this.btnIndex = -1;
				break;
			case 40:
				if (channelCount > 0) {
					sel ++;
					this.index = sel;
					if (this.index == channelCount) {
						this.index = channelCount -1
					}else {
						this.index = sel;
					}
					if (sel < channelCount) {
						this.selected = sel;
						if (this.displaybase + parseInt(this.displaycount / 2) < sel && this.displaybase + this.displaycount < channelCount) {
							this.displaybase ++;
							//alert('this.displaybase is   '+this.displaybase);
							this.painterList(true);
						} else{
							this.focusMove();
						}
					} 
				};
				this.btnsHide();
				if (this.btnIndex != -1) {
					focusChan[this.index -1].getElementsByClassName('operate-btn')[this.btnIndex].style.border = '';		
				}
				this.btnIndex = -1;
				break;
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
				this.choiceBtn();
				break;
			case 13:
				this.onEnterDown();
				break;
			default:
				break;
		}	
	}

}

function Model(arr) {
	this.data = arr;
	this.getData = function(i) {
		return this.data[i];
	};

	this.getCount = function() {
		return this.data.length;
	};

}

var view = new View();
view.render();
document.getElementsByClassName('chan-oper')[0].style.display = "block";

document.onkeydown = view.onKeyEvent;








