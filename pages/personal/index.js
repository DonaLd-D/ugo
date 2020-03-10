// pages/personal/index.js
Page({

  data: {
    collect: ['收藏的店铺', '收藏的商品', '关注的商品', '我的足迹'],
    order: [{
        icon: 'daifukuan',
        text: '待付款'
      },
      {
        icon: 'icon3',
        text: '待收货'
      },
      {
        icon: 'icon5',
        text: '退款退货'
      },
      {
        icon: 'icon_order',
        text: '全部订单'
      }
    ],

  },

  handleaddress(){
    wx.chooseAddress()
  },

  handlecall(){
    wx.makePhoneCall({
      phoneNumber: '400-618-4000' 
    })
  }
})