import request from "../../utils/request.js";

Page({
    data:{
      banners:[],
      navi:[],
      floor:[]
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
        console.log(res)
        const {message}=res.data;
        this.setData({
          floor:message
        })
      })
    }
})
