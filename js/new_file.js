function View()
{
	this.div = null;
	
	getDiv = function()
	{
		return this.div;
	}
	
	move = function(t,b,r,l)
	{
			
	}
}


function getView(listview,itemView,postion)
{
	var view =  listview.div;
	
	if(!itemView)
	{
		var data = listview.data[postion];
		var divName = document.createElement("div");
		var item = new View;
		view.appendChild(divName);
		item.div = divName;
	
		itemView =  item;
	}
	

	divName.innerHTML = data.name;

	
	return itemView;
}



function ListView(div,data)
{
	
	View.call(this);
	
	this.data = data;
	
	this.items = [];
	//初始化背景div
		this.div =;;
		//setBg
		//
		var i;	
		for(i =0; i < data.length; i++)
		{
			var t,b,r,l;//calc by wangqi
			var item = getView(this,this.items[i],i);
			this.items[i] =  item;
			
			item.move(t,b,r,l);
			
			this.items[i] = item;
		}

			//
			
}
