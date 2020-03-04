import request from '../../utils/request.js'
Page({
  data: {
    goodsmessage:{},
    current:0,

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

  taptap(e){
    const {index}=e.currentTarget.dataset
    this.setData({
      current:index
    })
  }
})