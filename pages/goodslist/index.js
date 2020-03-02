import request from '../../utils/request.js';

Page({

  data:{
    tab:['综合','销量','价格'],
    current:0,
    keyword:'曲面电视',
    goods:[],
  },

  tabClick(e){
    const {index}=e.currentTarget.dataset
    this.setData({
      current:index
    })
  },

  onLoad:function(options){
    // this.setData({
    //   keyword:options.keyword
    // })

    request({
      url:'/goods/search',
      data:{
        query:this.data.keyword,
        pagenum:1,
        pagesize:10
      }
    }).then(res=>{
      console.log(res)
      this.setData({
        goods:res.data.message.goods
      })
    })

  }
})