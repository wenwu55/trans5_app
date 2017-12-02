var serverUrl = "https://2.trans5.cn/trans5/";





function ajax(url,param, sendFun, compFun, callBack) {
	var userinfo = $api.getStorage("userinfo");
   var params = {};
   params.url = serverUrl+url;
   if(param.headers)
       params.headers = param.headers
   else   
       params.headers = {"from":"rest","Content-Type":"application/x-www-form-urlencoded"};
       
    params.headers.session_id = guid();
   //params.headers = {"session_id":guid()};
   if(userinfo)
      params.headers.fcr = userinfo.fcr;
   if(param.method)
     params.method = param.method;
   else
        params.method="post";
   sendFun && sendFun();
   if(param.data)
      params.data = param.data;
   else{
      params.data = {"body":param}
   }
   api.alert({msg:JSON.stringify(params)});
   api.ajax(params,function(ret,err){
   	   if(ret){
   	       if(ret.data.retCode && ret.data.retCode=="-2"){
   	          error_msg(ret.data.errMsg , function(){
   	              api.openWin({
				        name: 'applogin',
				        url: 'html/login/login.html'
			        });
   	          
   	          })
   	       }
   	       else
   	          callBack(ret)
   	   }else{
   	       api.alert({ msg: JSON.stringify(err) });
   	   }
   });   

}

function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
function guid() {
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}