
/*
var channels = null;

function chanList (div,items) {
	this.isFocus = true;
	this.startY = 0;
	this.div = div;
	this.items = items;
	this.maxCount = 7;

	this.divFocus = document.getElementById('itemFocus');
	
 	var i;
 	this.chanDiv = null;
 	this.numDiv = null;
 	this.nameDiv = null;
 	this.operDiv = null;
 	this.delBtn = null;
 	this.collBtn = null;
 	this.moveBtn = null;
 	this.lockBtn = null;

 	for(i = 0;i < this.items.length;i++) {
 		chanDiv = document.createElement('div');
 		chanDiv.className = "chan-item";
 		chanDiv.style.top = 52 * i + 'px';

 		numDiv = document.createElement('div');
 		numDiv.className = 'chan-num';
 		numDiv.innerHTML = DVBPlayer.getChannelAttr(this.items[i],'no');

 		nameDiv = document.createElement('div');
 		nameDiv.className = 'chan-name';
 		nameDiv.innerHTML = DVBPlayer.getChannelAttr(this.items[i],'name')

 		operDiv = document.createElement('div');
 		operDiv.className = 'chan-oper';
 		
 		delBtn = document.createElement('div');
 		delBtn.className = 'remove operate-btn';

 		collBtn = document.createElement('div');
		collBtn.className = 'collect operate-btn';

		moveBtn = document.createElement('div');
		moveBtn.className = 'move operate-btn';	

		lockBtn = document.createElement('div');
		lockBtn.className = 'lock operate-btn';	

		operDiv.appendChild(delBtn);
		operDiv.appendChild(collBtn);
		operDiv.appendChild(moveBtn);
		operDiv.appendChild(lockBtn);

		chanDiv.appendChild(numDiv);
		chanDiv.appendChild(nameDiv);
		chanDiv.appendChild(operDiv);

		div.appendChild(chanDiv);
 	}
 	this.operDiv[0].style.display = 'block'
}
channels = new chanList(document.getElementById('chan_list'),DVBPlayer.getChannelList('tv','skip+'));
*/
//获取所有的频道

var maxCount = 7; //页面最多显示7个频道

function getAllChans () {
	var allChan = DVBPlayer.getChannelList('tv','skip');
	console.log(allChan);
	console.log(1)
	var oFrag = document.createDocumentFragment();
	var i;
	var chanItem;
	var chanNum;
	var chanName;
	var chanOper;
	var removeBtn;
	var moveBtn;
	var collBtn;
	for (i = 0;i < allChan.length;i ++) {

		chanItem = document.createElement('div');
		chanItem.className = 'chan-item';
		chanItem.style.top = 50 *i +'px';
		
		chanNum = document.createElement('div');
		chanNum.className = 'chan-num';
		chanNum.innerHTML = DVBPlayer.getChannelAttr(allChan[i],'no');

		chanName = document.createElement('div');
		chanName.className = 'chan-name';
		chanName.innerHTML = DVBPlayer.getChannelAttr(allChan[i],'name');

		chanOper = document.createElement('div');
		chanOper.className = 'chan-oper';

		removeBtn = document.createElement('div');
		removeBtn.className = 'skip operate-btn';

		moveBtn = document.createElement('div');
		moveBtn.className = 'move operate-btn';

		collBtn = document.createElement('div');
		collBtn.className = 'favor operate-btn';	

		chanOper.appendChild(removeBtn);
		chanOper.appendChild(collBtn);
		chanOper.appendChild(moveBtn);

		chanItem.appendChild(chanNum);
		chanItem.appendChild(chanName);
		chanItem.appendChild(chanOper);

		oFrag.appendChild(chanItem);
	}
	document.getElementById('chan_list').appendChild(oFrag);
}
getAllChans();

var operBtn = document.getElementsByClassName('chan-oper')[0];
operBtn.style.display = 'block';


var index = 0;    //获得焦点的节目的索引
var items = document.getElementsByClassName('chan-item');
var len = items.length;
var focus = document.getElementById('itemFocus');
var btnIndex = -1;        //获得焦点的操作按钮的索引
var isSkip = false;  //是否删除的标记
var isMove = false; //是够移动的标记
var isColl = false; //是否收藏的标记
var moveBtn = document.getElementsByClassName('move');

document.onkeydown = function (event) {
	var key = event.keyCode;
	switch (key) {
		case 38:
			if(index> 0 && moveBtn[index].isMove == true){
				
			}else {			
				index --;
				if (index < 0) {
					index = 0;
				};
				focusMove();
				btnShow();
				if (btnIndex != -1) {
					items[index + 1].getElementsByClassName('operate-btn')[btnIndex].style.border = '';		
				}
				btnIndex = -1;	
			}
			break;
		case 40:
		
			if(moveBtn[index].isMove == true &&index< len){
				
				changeChanPosDown();
				
				
			}else {		
				index ++;
				if (index > len - 1) {
					index = len -1;
				};
				focusMove();
				btnShow();
				if (btnIndex != -1) {
					items[index - 1].getElementsByClassName('operate-btn')[btnIndex].style.border = '';				
				}
				btnIndex = -1;	
			}		
			break;
		case 37:
			btnIndex --;
			if (btnIndex <0) {
				btnIndex = 0;
			}
			choiceOper();
			break;
		case 39:
			btnIndex ++;
			if (btnIndex > 2) {
				btnIndex = 2;
			}
			choiceOper();
			break;
		case 13:
			sureOper();
			break;
		default:
			break;
	}
}

//焦点移动
function focusMove () {
	focus.style.webkitTransition = 'top 0.3s';
	focus.style.top = index * 50 + 'px';
}

function btnShow () {
	var btns = document.getElementsByClassName('chan-oper');
	for(var i = 0;i < btns.length; i++) {
		btns[i].style.display = 'none';
	}
	setTimeout (function () {
		btns[index].style.display = 'block';
	},150)
	
}

//选择操作按钮函数
function choiceOper () {
	var operate = items[index].getElementsByClassName('operate-btn');
	for(var i = 0;i < operate.length;i++) {
		operate[i].style.border = '';
	}
	operate[btnIndex].style.border = '1px solid red';
}

//确认操作
function sureOper () {
	var operate = items[index].getElementsByClassName('operate-btn');
	switch (btnIndex){
		case 0:
			operate[btnIndex].isSkip = !operate[btnIndex].isSkip;
			if (operate[btnIndex].isSkip == true) {
				operate[btnIndex].style.backgroundImage = 'url(images/hide.png)';
				items[index].firstElementChild.innerHTML = '...'
			}else{
				operate[btnIndex].style.backgroundImage = 'url(images/hide1.png)';
				items[index].firstElementChild.innerHTML = DVBPlayer.getChannelAttr(DVBPlayer.getChannelList('tv','skip+')[index],'no');
			}
			break;
		case 2:
			operate[btnIndex].isMove = !operate[btnIndex].isMove;
			if (operate[btnIndex].isMove == true) {
				operate[btnIndex].style.backgroundImage = 'url(images/move.png)';
			}else{
				operate[btnIndex].style.backgroundImage = 'url(images/move1.png)'
			}
			break;
		case 1:
			operate[btnIndex].isColl = !operate[btnIndex].isColl;
			if (operate[btnIndex].isColl == true) {
				operate[btnIndex].style.backgroundImage = 'url(images/collect.png)';

			}else{
				operate[btnIndex].style.backgroundImage = 'url(images/collect1.png)'
			}
			break;
		default:
			break;
	}
}



//改变频道的顺序
function changeChanPosUp () {
	
}

function changeChanPosDown () {
	/*var item = {};

	item.id;
	item.name;
	item.skip;
	item.favor;

	var chs = [];	*/

	/*var focusChan =  DVBPlayer.getChannelList('tv','skip+')[index];
	var item = {};
	item.no = DVBPlayer.getChannelAttr(focusChan,'no');
	item.name = DVBPlayer.getChannelAttr(focusChan,'name');
	item.skip = DVBPlayer.getChannelAttr(focusChan,'skip');
	item.favor = DVBPlayer.getChannelAttr(focusChan,'favor');

	var chs = [];
*/
	var itemTemp;
	var a = items[index-1];
	var b = items[index];
	itemTemp = a;
	a = b;
	b = itemTemp;
	items[index-1].style.top = items[index-1].offsetTop + 52 + 'px';
	items[index].style.top = items[index].offsetTop - 52 + 'px';
}


var a = DVBPlayer.getTVChannels();
console.log(a);