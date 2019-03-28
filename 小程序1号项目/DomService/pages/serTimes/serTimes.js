Page({
	data: {
		date1 : '点击选择',
		show1 : true,
		date2: '点击选择',
		show2: true,
	},
	showDate1 : function(){
		this.setData({ show1 : false});
	},
	showDate2: function () {
		this.setData({ show2 : false });
	},
	changeDate1 : function(e){
		this.setData({ date1 : e.detail.date, show1 : true});
	},
	changeDate2: function (e) {
		this.setData({ date2: e.detail.date, show2: true });
	}
})