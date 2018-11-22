//1-模板引擎渲染和分页设置功能
$(function () {
  //先把当前页和页码定义在全局
  var currentPage = 1;
  var pageSize = 5;

  //已进入页面就调用一次渲染
  render();
  //封装起来
  function render() {

    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },

      success: function (info) {
        console.log(info);
        var htmlStr = template("tmp", info);
        $(".lt_content tbody").html(htmlStr);


        //配置分页
        $(".pagination").bootstrapPaginator({
          //指定的版本号
          bootstrapMajorVersion: 3,
          //当前页
          currentPage: info.page,
          //总的页数
          totalPages: Math.ceil(info.total / info.size),
          //当页面被点击时触发的
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }
  
  
  //2-禁用和启用的点击事件，来操作模态框
  //因为是动态渲染的数据所以要用事件委托来进行注册
  
  $(".lt_content tbody").on("click", ".btn", function () {
    //弹出模态框
    $("#userModal").modal("show");
  
    //获取用户id
    currentId = $(this).parent().data("id");
    // 获取需要修改的状态, 根据按钮的类名来判断具体传什么
    // 禁用按钮 ? 0 : 1;
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
  });
  
  //3-点击模态框确认按钮, 完成用户的启用禁用
  $("#submitBtn").click(function () {
  
    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: {
        id: currentId, //用户id
        isDelete: isDelete //将用户改成什么状态, 1启用, 0禁用
      },
      dataType: "json",
      success: function (info) {
        // console.log(info);
        if (info.success) {
          //如果成功就关闭模态框
          $("#userModal").modal("hide");
          //重新渲染页面
          render();
        }
      }
  
    })
  })
});
