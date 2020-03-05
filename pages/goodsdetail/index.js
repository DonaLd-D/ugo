import request from '../../utils/request.js'
Page({
  data: {
    goodsmessage:{},
    current:0,
    urls:[]
  },

  onLoad: function (options) {
      request({
        url:'/goods/detail',
        data:{
          goods_id:options.id
        }
      }).then(res=>{
        console.log(res)
        const {message}=res.data
        const urls=message.pics.map(v=>{
          return v.pics_big
        })
        this.setData({
          goodsmessage:message,
          urls
        })
      })
  },

  taptap(e){
    const {index}=e.currentTarget.dataset
    this.setData({
      current:index
    })
  },

  preview(e){
    const {index}=e.currentTarget.dataset
    wx.previewImage({
      current: this.data.urls[index], 
      urls: this.data.urls 
    })
  },

  handletocart(){
    wx.switchTab({
      url: '/pages/cart/index'
    })
  }
})