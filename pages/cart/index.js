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
  },

  handlecal(e){
    const {index,num}=e.currentTarget.dataset
    this.data.goods[index].number+=num
    if(this.data.goods[index].number==0){
      wx.showModal({
        title: '提示',
        content: '是否要删除宝贝',
        success:(res)=> {
          if (res.confirm) {
            this.data.goods.splice(index,1)
          } else if(res.cancel){
            this.data.goods[index].number+=1
          }
          this.setData({
            goods:this.data.goods
          })
          this.allPrice()
        }
      })
    }
    this.setData({
      goods:this.data.goods
    })
    this.allPrice()
  }

  
})