import request from '../../utils/request.js'
Page({
  data: {
    goodsmessage:{},

  },

  onLoad: function (options) {
      request({
        url:'/goods/detail',
        data:{
          goods_id:options.id
        }
      }).then(res=>{
        console.log(res)
        const {message}=res.data
        this.setData({
          goodsmessage:message
        })
      })
  },

  
})