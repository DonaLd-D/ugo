import request from '../../utils/request.js';

Page({

  data:{
    inputvalue:'',
    recommendlist:[],

  } ,

  handleinput(e){
    const {value}=e.detail;
    this.setData({
      inputvalue:value
    })

    request({
      url:'/goods/qsearch',
      data:{
        query:this.data.inputvalue
      }
    }).then(res=>{
      console.log(res)
      const {message}=res.data;
      this.setData({
        recommendlist:message
      })
    })
  }
})