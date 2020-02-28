import request from "./utils/request.js";

App({
  onLaunch: function () {
    request.default.baseURL
    ="https://api-hmugo-web.itheima.net/api/public/v1";
    
  }
  
})