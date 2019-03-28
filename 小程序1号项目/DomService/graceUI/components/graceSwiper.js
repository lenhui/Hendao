// graceUI/components/graceSwiper.js
Component({
  properties: {
		swiperHeight:{
			type:Number,
			value:100
		},
		swiperId :{
			type : String,
			value: ""
		},
		items : {
			type : Object,
			value : []
		},
		indicatorDots:{
			type:Boolean,
			value:true
		},
		interval : {
			type:Number,
			value : 5000
		}
  },
  data: {
		runCount : 0
	},
  methods: {
		imgLoad: function (e) {
			if(this.data.runCount > 0){return ;}
			this.setData({ runCount : 1});
			var id = '#' + this.data.swiperId + '-item-1';
			var query = wx.createSelectorQuery().in(this);
			var _self = this;
			query.select(id).fields({
				id: true,
				size: true,
			}, function (res){
				_self.setData({ swiperHeight: res.height });
			}).exec();
		}
  }
});