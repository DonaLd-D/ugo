import request from "../../utils/request.js";

Page({
    data:{
      banners:[],
      navi:[],
      floor:[],
      isShowTop:false
    },

    onLoad(){
      request({
        url:'/home/swiperdata'
      }).then(res=>{
        const {message}=res.data;
        this.setData({
          banners:message
        })
      });

      request({
        url:"/home/catitems"
      }).then(res=>{
        const {message}=res.data;
        this.setData({
            navi:message
        })
      });

      request({
        url:"/home/floordata"
      }).then(res=>{
        const {message}=res.data;
        this.setData({
          floor:message
        })
      })
    },

    toTop(){
      wx.pageScrollTo({
        scrollTop: 0,
        duration:330
      })
    },

    onPageScroll(e){
      const {scrollTop}=e;
      let isShow=this.data.isShowTop;
      if(scrollTop>100){
        isShow=true
      }else{
        isShow=false
      }
      if(isShow==this.data.isShowTop)return;
      this.setData({
        isShowTop:isShow
      })

    }
})
