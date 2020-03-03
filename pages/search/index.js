import request from '../../utils/request.js';

Page({

  data:{
    inputvalue:'',
    recommendlist:[],
    loading:true,
    history:[]
  } ,

  onLoad(options){
    console.log(options)
    let arr=wx.getStorageSync("history")
    if(!Array.isArray(arr)){
      arr=[]
    }
    this.setData({
      history:arr
    })
  },

  handleinput(e){
    const {value}=e.detail;
    this.setData({
      inputvalue:value
    })
    this.recommend()
    
  },

  recommend(){
    if(!this.data.inputvalue)return;
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

  handleclear(){
    this.setData({
      history:[]
    })
    wx.setStorageSync('history', [])
  },

  handleenter(){
    let arr=wx.getStorageSync('history');
    if(!Array.isArray(arr)){
      arr=[];
    };

    arr.unshift(this.data.inputvalue);
    arr=[...new Set(arr)]

    wx.setStorageSync('history', arr)
    wx.redirectTo({
      url: '/pages/goodslist/index?keyword='+this.data.inputvalue,
    })
  }

})