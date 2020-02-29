import request from "../../utils/request.js"
Page({

  data:{
    list:[],
    current:0,
  },

  onLoad(){
      request({
        url:'/categories'
      }).then(res=>{
        console.log(res)
        const {message}=res.data
        this.setData({
          list:message
        })
      })
  },

  leftClick(e){
    const {index}=e.currentTarget.dataset
    this.setData({
      current:index
    })
  }
})