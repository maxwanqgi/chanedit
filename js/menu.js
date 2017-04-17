init_listview();

function init_listview() {
	
	//var listview = new ListView(document.getElementById("chan_list"), itemArr,MenuItemView,FocusView,null);
	var listview = new ListView(document.getElementById("chan_list"), itemArr,null,null,null);
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
			
			//this.painterList(isMoving);
			
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

function MenuFocusView () {
	FocusView.call(this);
	
	this.focusDiv = document.getElementById("itemFocus");
}

FocusView.prototype = new FocusView();
	

