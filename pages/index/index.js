import request from "../../utils/request.js";

Page({
    data:{
      banners:[],

    },

    onLoad(){
      request({
        url:'/home/swiperdata'
      }).then(res=>{
        const {message}=res.data;
        this.setData({
          banners:message
        })
      })
    }
})
