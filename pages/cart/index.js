// pages/cart/index.js
Page({
  data:{
    address:{},
    goods:[],
    allprice:0
  },

  onLoad:function(){
    this.setData({
      address:wx.getStorageSync('address')||{}
    })
  },

  onShow(){
    const goods = wx.getStorageSync('goods') || [];
    this.setData({
      goods
    })
    this.allPrice()
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
  },

  allPrice(){
    let price=0;
    this.data.goods.forEach(v=>{
      price+=v.price*v.number
    })
    this.setData({
      allprice:price
    })
    wx.setStorageSync('goods', this.data.goods)
  }

  
})