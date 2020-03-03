import request from '../../utils/request.js';

Page({

  data:{
    inputvalue:'',
    recommendlist:[],
    loading:true,

  } ,

  handleinput(e){
    const {value}=e.detail;
    this.setData({
      inputvalue:value
    })
    this.recommend()
    
  },

  recommend(){
    if(this.data.loading==false){
      this.setData({
        loading:true
      })
    }
    request({
      url: '/goods/qsearch',
      data: {
        query: this.data.inputvalue
      }
    }).then(res => {
      console.log(res)
      const { message } = res.data;
      this.setData({
        recommendlist: message,
        loading:false
      })
    })
  },

  handlecancel(){
    this.setData({
      inputvalue:'',
      recommendlist:[]
    })
  },

  handleblur(){
    this.setData({
      recommendlist:[]
    })
  },

  handlefocus(){
    if(this.data.inputvalue){
      this.recommend()
    }
  },

})