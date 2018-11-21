//功能-登录拦截，对于未登录的用户拦截到登录页
// 在一进入页面进行登录状态获取
// 如果后端响应头中设置了 Content-Type: application/json
// jquery 会自动识别, 将返回数据类型, 当成json字符串解析成对象
if ( location.href.indexOf("login.html") === -1 ) {
  $.ajax({
    url: "/employee/checkRootLogin",
    type: "get",
    success: function( info ) {
      console.log( info )
      if ( info.success ) {
        console.log( "登陆了" );
        // 啥也不用干
      }

      if ( info.error === 400 ) {
        // 进行拦截, 拦截到登录页
        location.href = "login.html";
      }
    }
  })
}