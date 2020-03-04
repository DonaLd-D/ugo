import request from '../../utils/request.js';

Page({

  data:{
    tab:['综合','销量','价格'],
    current:0,
    keyword:'曲面电视',
    pagenum:1,
    goods:[],
    hasMore:true
  },

  tabClick(e){
    const {index}=e.currentTarget.dataset
    this.setData({
      current:index
    })
  },

  onLoad:function(options){
    this.setData({
      keyword:options.keyword
    })
    this.getData()

  },

  getData(){
    if(this.data.hasMore==false){
      return
    }
    request({
      url: '/goods/search',
      data: {
        query: this.data.keyword,
        pagenum: this.data.pagenum,
        pagesize: 10
      }
    }).then(res => {
      const {message}=res.data;
      const goods=message.goods.map(v=>{
        v.goods_price=Number(v.goods_price).toFixed(2)
        return v
      })
      this.setData({
        goods:[...this.data.goods,...goods]
      })
      if(this.data.goods.length>=message.total){
        this.setData({
          hasMore:false
        })
      }
      
    })
  },

  onReachBottom(){
    setTimeout(()=>{
      this.setData({
        pagenum: this.data.pagenum + 1
      })
      this.getData()
    },1900)
    
  }
})