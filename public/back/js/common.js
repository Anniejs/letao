//公共部分的js 
//公共进度条的js部分

$(function() {
  //// 开启进度条
  //NProgress.start();
  //
  //setTimeout(function() {
  //  // 结束进度条
  //  NProgress.done();
  //}, 1000)


  // ajax全局事件
  // 需求: 1. 在第一个ajax发送的时候, 开启进度条
  //      2.  在全部的ajax请求完成时, 关闭进度条

  // ajaxComplete()  在每个ajax完成时调用(成功或失败都调用)
  // ajaxSuccess()   在每个ajax如果成功时调用
  // ajaxError()     在每个ajax如果失败时调用
  // ajaxSend()      在每个ajax即将要发送时调用

  // ajaxStart()     在第一个ajax请求发送时调用
  // ajaxStop()      在所有的ajax请求完成时调用

  $(document).ajaxStart(function() {
    // 开启进度条
    NProgress.start();
  })

  $(document).ajaxStop(function() {
    // 模拟网络延迟
    setTimeout(function() {
      // 关闭进度条
      NProgress.done();
    }, 1000)
  });
})
