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
  },

  addgoods(){
    const goods=wx.getStorageSync('goods')||[];
    const exit=goods.some(v=>{
      const isExit = v.id === this.data.goodsmessage.goods_id;
      if(isExit){
        v.number+=1;
        wx.showToast({
          title: '数量+1',
          icon: 'success'
        })
      }
      return isExit
    })

    if(!exit){
      goods.unshift({
        image: this.data.goodsmessage.goods_small_logo,
        name: this.data.goodsmessage.goods_name,
        price: this.data.goodsmessage.goods_price,
        id: this.data.goodsmessage.goods_id,
        number:1,
        status:true
      })
      wx.showToast({
        title: '加入成功',
        icon: 'success'
      })
    }
    wx.setStorageSync('goods', goods)
  },

  addcargo(){
    this.addgoods();
    setTimeout(v=>{
      wx.switchTab({
        url: '/pages/cart/index'
      })
    },1000)
  }
})