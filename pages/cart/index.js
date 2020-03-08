// pages/cart/index.js
Page({
  data:{
    address:{},
    goods:[],
    allprice:0,
    allstatus:true
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
      if(v.status){
        price+=v.price*v.number
      }
    })
    this.setData({
      allprice:price
    })
   wx.setStorageSync('goods', this.data.goods)
  },

  handlecal(e){
    // console.log(e)
    const {index,num}=e.currentTarget.dataset;
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
  },

  handleinput(e){
    // console.log(e)
    const {index}=e.currentTarget.dataset;
    let {value}=e.detail;
    value=Math.floor(Number(value));
    if(value<1){
      value=1;
    }
    this.data.goods[index].number=value;
    this.setData({
      goods:this.data.goods
    })
    this.allPrice()
  },

  handlestatus(e){
    // console.log(e)
    const { index } = e.currentTarget.dataset;
    this.data.goods[index].status = !this.data.goods[index].status
    this.setData({
      goods:this.data.goods
    })
    this.allPrice()
    this.handleall()
  },

  handleall(){
    const status=this.data.goods.some(v=>{
      return !v.status
    })
    // console.log(!status)
    // if(!status==false){
    //   this.data.allstatus=false
    // }else{
    //   this.data.allstatus=true
    // }
    this.setData({
      // allstatus:this.data.allstatus
      allstatus:!status
    })
  },

  handleallstatus(){
    this.data.goods.forEach(v=>{
      v.status=!this.data.allstatus
    })
    this.setData({
      goods:this.data.goods,
      allstatus:!this.data.allstatus
    })
    this.allPrice()
  },

  handletopay(){
    if(!this.data.address.userName){
      wx.showToast({
        title: '亲，请填写收货信息',
        image:'/images/icon_me_active@3x.png'
      })
    }else if(this.data.allprice!=0){
          const token=wx.getStorageSync('token')
          if(!token){
            wx.navigateTo({
              url: '/pages/gettoken/index',
            })
          }
    }
  }

})