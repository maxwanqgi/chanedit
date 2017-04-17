init_listview();

function init_listview() {
	
	//var listview = new ListView(document.getElementById("chan_list"), itemArr,MenuItemView,FocusView,null);
	var listview = new ListView(document.getElementById("chan_list"), itemArr,null,null,null);
	//console.log(listview)
	listview.setNeedDescendKeyEvent(true);

	listview.onItemClicked = function() {
		// for play	or open page
	};
	
	listview.onItemSelected = function(listview, MenuItemView_now, postion_now, MenuItemView_old, postion_old) {
		// for play	or open page
		
		MenuItemView_now.setFocus(true);
		MenuItemView_old.setFocus(false);
		
		if(MenuItemView_old.moveDiv && MenuItemView_old.moveDiv.isMove)
		{
			var temp = this.data[postion_now];
			this.data[postion_now] = this.data[postion_old];
			this.data[postion_old] = temp;
			
			MenuItemView_now.moveDiv.isMove = true;
			MenuItemView_old.moveDiv.isMove = false;
				
			this.render();

		}
	};
	
	listview.show();

	listview.setFocus(true);

	document.onkeydown = function(e) {
		var key = e.keyCode;
		listview.onKeyEvent(key);
	}
}


function MenuItemView(listview, data) {
	ItemView.call(this);

	var div = listview.getDiv(); 
	var skip = data.skip;
	var favor = data.favor;

	var chanDiv = document.createElement('div');
	chanDiv.className = 'chan-item';
	
	if (data.no) {
		var numDiv = document.createElement('div');
		numDiv.className = 'chan-num';
		if (data.no < 10) {
			data.no = "00" + data.no;
		} else if (data.no > 9 && data.no < 100) {
			data.no = "0" + data.no;
		}
		numDiv.innerHTML = skip ? "..." : data.no;
		
		chanDiv.appendChild(numDiv);
	}
	
	if (data.name) {
		var nameDiv = document.createElement('div');
		nameDiv.className = 'chan-name';
		nameDiv.innerHTML = data.name;
		chanDiv.appendChild(nameDiv);
	}
	
	if (data.skip != undefined && data.favor != undefined) {
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
	
		chanDiv.appendChild(operDiv);
	}
	
	this.div = chanDiv;
	this.numDiv = numDiv;
	this.nameDiv = nameDiv;
	this.operDiv = operDiv;
	this.skipDiv = skipDiv;
	this.favorDiv = favorDiv;
	this.moveDiv = moveDiv;
	if (this.moveDiv) {
		this.moveDiv.isMove = false;
	}
	this.listview = listview;
	this.operBtns = [skipDiv, favorDiv, moveDiv];
	this.btnIndex = -1;
	div.appendChild(chanDiv);
}

MenuItemView.prototype = new ItemView();

MenuItemView.prototype.choiceBtn = function() { 
	var operate = this.operBtns;
	var i;
	for (i = 0; i < operate.length; i++) {
		operate[i].style.border = '';
	}
	operate[this.btnIndex].style.border = "1px solid red";
}

MenuItemView.prototype.setFocus = function(focus) {
	if (this.operDiv) {
		this.operDiv.style.display = focus ? "block" : "none";
		if (!focus && this.btnIndex != -1) {
			this.operBtns[this.btnIndex].style.border = "";
			this.btnIndex = -1;
		}
	}	
}

MenuItemView.prototype.onEnterDown = function(data) {
	var btnindex = this.btnIndex;
	switch (btnindex) {
		case 0:
			data.skip = !data.skip;
			break;
		case 1:
			data.favor = !data.favor;
			break;
		case 2:
			this.moveDiv.isMove = !this.moveDiv.isMove;
			this.moveDiv.style.backgroundImage = this.moveDiv.isMove ? "url(images/move.png)" : "url(images/move1.png)";
			break;
		default:
			break;
	}
}

MenuItemView.prototype.onKeyEvent = function(keycode, index) {
	switch (keycode) {
		case 37:
			if (this.operDiv) {
				this.btnIndex--;
				if (this.btnIndex < 0) {
					this.btnIndex = 0;
				}
				this.choiceBtn();
			} else {
				return false;
			}	
			break;
		case 39:
			if (this.operDiv) {
				this.btnIndex++;
				if (this.btnIndex > this.operBtns.length - 1) {
					this.btnIndex = this.operBtns.length - 1;
				}
				this.choiceBtn();
			} else {
				return false;
			}
			
			break;
		case 13:
			if (this.operDiv) {
				this.onEnterDown(itemArr[index]);
				this.update(itemArr[index]);
			} else if (itemArr[index].url) {
				window.location.href = itemArr[index].url;
			}
			break;
		default:
			break;
	}
}

MenuItemView.prototype.update = function(data) {
	if (this.nameDiv) {
		this.nameDiv.innerHTML = data.name;
	}
	if (this.numDiv) {
		this.numDiv.innerHTML = data.skip ? "..." : data.no;
	}
	if (this.operDiv) {
		this.skipDiv.style.backgroundImage = data.skip ? "url(images/hide.png)" : "url(images/hide1.png)";
		this.favorDiv.style.backgroundImage = data.favor ? "url(images/collect.png)" : "url(images/collect1.png)";
		this.moveDiv.style.backgroundImage = this.moveDiv.isMove ? "url(images/move.png)" : "url(images/move1.png)";
	}
}


