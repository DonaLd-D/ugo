// pages/cart/index.js
Page({
  data:{
    address:{},

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