import request from '../../utils/request.js';
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
    }else if(this.data.allprice==0){
      wx.showToast({
        title: '亲，请选择商品',
        image: '/images/icon_me_active@3x.png'
      })
    }else{
          const token=wx.getStorageSync('token')
          if(!token){
            wx.navigateTo({
              url: '/pages/gettoken/index',
            })
          }else{
            const {address}=this.data;
            const goods=this.data.goods.map(v=>{
              return {
                goods_id:v.id,
                goods_number:v.number,
                goods_price:v.price
              }
            })
            request({
              url:'/my/orders/create',
              method:'post',
              header:{
                Authorization:token
              },
              data:{
                goods,
                order_price:this.data.allprice,
                consignee_addr:address.userName+address.telNumber+address.detail
              }
            }).then(res=>{
              // console.log(res)
              wx.showToast({
                title: '订单创建成功',
                type: "success"
              })

              request({
                url:'/my/orders/req_unifiedorder',
                method:'post',
                header:{
                  Authorization:token
                },
                data:{
                  order_number:res.data.message.order_number
                }
              }).then(res=>{
                console.log(res)
                const {pay}=res.data.message
                setTimeout(v=>{
                  wx.requestPayment(pay)
                },1000)
                
              })
            })
          }
    }
  }

})