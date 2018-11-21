//入口函数
$(function(){
// 配置禁用小圆环
NProgress.configure({ showSpinner: false });

//// 开启进度条
//NProgress.start();
//
//setTimeout(function() {
//  // 关闭进度条
//  NProgress.done();
//}, 500)


// ajaxStart 所有的 ajax 开始调用
$(document).ajaxStart(function() {
  NProgress.start();
});


// ajaxStop 所有的 ajax 结束调用
$(document).ajaxStop(function() {
  // 模拟网络延迟
  setTimeout(function() {
    NProgress.done();
  }, 500)
});



//功能1-进行二级分类切换
$(".category").click(function(){
  $(this).next().stop().slideToggle();
});


//功能2-顶部菜单栏切换显示
$(".icon_menu").click(function(){
  
  $(".lt_aside").toggleClass("hidemenu");
  $(".lt_main").toggleClass("hidemenu");
  $(".lt_topbar").toggleClass("hidemenu");
});


//功能3-点击图标退出模态框

//3-1 点击图标显示模态框
$(".icon_logout").click(function(){
  $("#logoutModal").modal("show");
})


//3-2 点击退出按钮，让整个用户管理退出，直接跳转到登录页面
$(".logout").click(function(){
  //调用接口，让后台销毁当前用户的登录状态
  $.ajax({
    url:"/employee/employeeLogout",
    type:"get",
    dataType:"json",
    success:function(info){
      //判断如果成功就直接跳转到登录页面
      location.href = "login.html";
    }
  })
})
})
