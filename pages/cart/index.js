// pages/cart/index.js
Page({
  data:{
    address:{},
    goods:[]
  },

  onLoad:function(){
    
  },

  onShow(){
    const goods = wx.getStorageSync('goods') || [];
    this.setData({
      goods
    })
  },

  getAddress(){
    wx.chooseAddress({
      success:(res)=> {
        this.setData({
          address:{
            userName:res.userName,
            telNumber:res.telNumber,
            detail:res.provinceName+res.cityName+res.countyName+res.detailInfo
          }
        })
        wx.setStorageSync('address', this.data.address)
      }
    })
  }

  
})