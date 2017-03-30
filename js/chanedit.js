
var channels = null;
var index = 0;
var isSkip = false;
var isFavor = false;
var isMove = false;
var btnIndex = -1;
function chanList (div,items) {
	this.isFocus = true;
	this.div = div;
	this.items = items;
	this.item_height = 50;
	this.displaycount = 8;  //页面上最多显示8个节目
	this.displaybase = 0;
	this.divLists = [];
	this.selected = 0;
	this.startY = 0;
	this.focusDiv = document.getElementById('itemFocus');

	var chanDiv;
 	var numDiv;
 	var nameDiv;
 	var operDiv;
 	var delBtn;
 	var collBtn;
 	var moveBtn;	
 	var lockBtn;  //预留
 	var i;
 	//var divTemp;
 	var chanNumber;
 	for(i = 0;i < this.items.length;i++) {
 		chanDiv = document.createElement('div');
 		chanDiv.className = "chan-item";
 		chanDiv.style.top = this.item_height* i+'px';

 		numDiv = document.createElement('div');
 		numDiv.className = 'chan-num';
 		chanNumber = DVBPlayer.getChannelAttr(this.items[i],'no');
 		if(chanNumber < 10) {
 			chanNumber = '00' + chanNumber;
 		} else if(chanNumber >= 10 && chanNumber < 100) {
 			chanNumber = '0' + chanNumber;
 		} else {
 			chanNumber = chanNumber;
 		}
 		numDiv.innerHTML = chanNumber;

 		nameDiv = document.createElement('div');
 		nameDiv.className = 'chan-name';
 		nameDiv.innerHTML = DVBPlayer.getChannelAttr(this.items[i],'name')

 		operDiv = document.createElement('div');
 		operDiv.className = 'chan-oper';
 		
 		delBtn = document.createElement('div');
 		delBtn.className = 'skip operate-btn';

 		collBtn = document.createElement('div');
		collBtn.className = 'favor operate-btn';

		moveBtn = document.createElement('div');
		moveBtn.className = 'move operate-btn';	

		operDiv.appendChild(delBtn);
		operDiv.appendChild(collBtn);
		operDiv.appendChild(moveBtn);
		
		chanDiv.appendChild(numDiv);
		chanDiv.appendChild(nameDiv);
		chanDiv.appendChild(operDiv);

		div.appendChild(chanDiv);
		this.divLists[i] = chanDiv;
 	}
 	
 	
}

chanList.prototype.painterList = function(UpOrDown){
	var i;
	var sum;
	var chanCnt = this.items.length;
	var nodes = this.divLists;
	//alert('the length of nodes is   ' + nodes.length)
	var startY = this.startY;
	if (chanCnt < this.displaycount) {
		sum = chanCnt; 
	}else {
		sum = this.displaycount;
	}
	//alert("sum is   "+sum);
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
//显示隐藏按钮
chanList.prototype.btnsHide = function(){
	var i;	
	var operateBtns = document.getElementsByClassName('chan-oper');
	var len = operateBtns.length;
	var position = this.selected - this.displaybase;
	var timer;
	for(i = 0;i < len;i++) {
		operateBtns[i].style.display = "none";
	}
	timer = setTimeout(function () {
		operateBtns[index].style.display = "block";
	},150)
	/*if (index == 0 || index == this.items.length -1) {
		timer = setTimeout(function () {
			operateBtns[index].style.display = "block";
		},0)
	}*/
};
//焦点的移动
chanList.prototype.focusMove = function(){
	var itemFocu = this.focusDiv;
	/*itemFocu.style.webkitTransition = 'top 0.3s';
	itemFocu.style.top = this.item_height * index + 'px';*/
	
	var position = this.selected - this.displaybase;
	//alert('position is   ' + position) //0
	if (position > -1 && position < this.items.length) {
		itemFocu.style.webkitTransition = 'top 0.3s';
		itemFocu.style.top = parseInt(this.startY + position * this.item_height) + 'px';
	}
};

/*chanList.prototype.reset = function () {
	this.selected = 0;
	this.displaybase = 0;
	
	var i;
	for (i = 0;i < this.divLists.length;i ++) {
		this.divLists[i].style.top = this.startY + i * this.item_height + 'px';
	}
	this.focusDiv.style.top = this.startY + 'px';
}
*/
//确认键替换按钮的图片
chanList.prototype.onEnterPress = function(){
	var operates = this.div.getElementsByClassName('chan-oper');
	var focusBtn = operates[index].getElementsByClassName('operate-btn');
	//alert(focusBtn.length)
	//alert(operates.length)
	switch (btnIndex) {
		case 0:
			focusBtn[btnIndex].isSkip = !focusBtn[btnIndex].isSkip;
			if (focusBtn[btnIndex].isSkip == true) {
				focusBtn[btnIndex].style.backgroundImage = 'url(images/hide.png)';
			}else {
				focusBtn[btnIndex].style.backgroundImage = 'url(images/hide1.png)';
			}
			break;
		case 1:
			focusBtn[btnIndex].isFavor = !focusBtn[btnIndex].isFavor;
			if (focusBtn[btnIndex].isFavor == true) {
				focusBtn[btnIndex].style.backgroundImage = 'url(images/collect.png)';
			}else {
				focusBtn[btnIndex].style.backgroundImage = 'url(images/collect1.png)';
			}
			break;
		case 2:
			focusBtn[btnIndex].isMove = !focusBtn[btnIndex].isMove;
			if (focusBtn[btnIndex].isMove == true) {
				focusBtn[btnIndex].style.backgroundImage = 'url(images/move.png)';
			}else {
				focusBtn[btnIndex].style.backgroundImage = 'url(images/move1.png)';
			}
			break;
		default:
			// statements_def
			break;
	}

};

//改变频道的顺序
chanList.prototype.changeChanNo = function () {
	
}
//选择操作按钮
chanList.prototype.choiceBtn = function(){
	var currentItem = this.div.getElementsByClassName('chan-item')[index];
	var operate = currentItem.getElementsByClassName('operate-btn');
	//alert(operate.length)
	for(var i = 0;i < operate.length;i++) {
		operate[i].style.border = '';
	}
	operate[btnIndex].style.border = '1px solid red';
};

chanList.prototype.onKeyDown = function(key){
	var sel = this.selected;
	var channelCount = this.items.length;
	var focusChan = this.div.getElementsByClassName('chan-item');
	switch (key) {
		case 37:
			btnIndex --;

			if (btnIndex <0) {
				btnIndex = 0;
			}
			this.choiceBtn();
			break;
		case 39:
			btnIndex ++;
			if (btnIndex > 2) {
				btnIndex = 2;
			}
			this.choiceBtn();
			break;
		case 38:
			
			if (channelCount > 0) {
				sel --;
				index = sel;
				if (index < 0) {
					index = 0
				}else {
					index = sel;
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
			if (btnIndex != -1) {
				focusChan[index + 1].getElementsByClassName('operate-btn')[btnIndex].style.border = '';		
			}
			btnIndex = -1;
			return false;
		case 40:
			
			if (channelCount > 0) {
				sel ++;
				index = sel;
				if (index == this.items.length) {
					index = this.items.length -1
				}else {
					index = sel;
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
			if (btnIndex != -1) {
				focusChan[index -1].getElementsByClassName('operate-btn')[btnIndex].style.border = '';		
			}
			btnIndex = -1;
			return false;
		case 13:
			this.onEnterPress();
			break;
		default:
			// statements_def
			break;
	}
};

channels = new chanList(document.getElementById('chan_list'),DVBPlayer.getChannelList('tv','skip'));

var operBtn = document.getElementsByClassName('chan-oper')[0];
operBtn.style.display = 'block';
document.onkeydown = handlekey;

function handlekey (event) {

	var keyCode = event.keyCode;
	try {
		// statements
		channels.onKeyDown(keyCode);
	} catch(e) {
		// statements
		alert(e +'==');
	}
	
}
