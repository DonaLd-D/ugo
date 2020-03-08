import request from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getuserinfo(e){
    const { encryptedData,iv,rawData,signature}=e.detail;
    wx.login({
      success(res) {
        if (res.code) {
          const data={
            encryptedData, 
            iv, 
            rawData, 
            signature,
            code:res.code
          }
          request({
            url: '/users/wxlogin',
            data,
            method:"post"
          }).then(res=>{
            console.log(res)
            const {token}=res.data.message;
            wx.setStorageSync("token", token);
            wx.navigateBack()
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})