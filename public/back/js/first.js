$(function () {

//1-发送ajax请求利用模板引擎渲染页面和设置分页功能
var currentPage = 1;
var pageSize = 5;
//已进入页面就直接渲染一次
render();
//封装渲染的函数
function render() {

  $.ajax({
    type: "get",
    url: "/category/queryTopCategoryPaging",
    data: {
      page: currentPage,
      pageSize: pageSize
    },
    dataType: "json",
    success: function (info) {
      console.log(info);
      var htmlStr = template("firstTmp", info);
      $(".lt_content tbody").html(htmlStr);

      //设置分页功能

      $(".pagination").bootstrapPaginator({
        //版本号
        bootstrapMajorVersion: 3,
        //当前页面
        currentPage: info.page,
        //总页数
        totalPages: Math.ceil(info.total / info.size),
        onPageClicked: function (a, b, c, page) {
          currentPage = page;
          render();
        }
      })
    }
  })
}


//2-给添加分类按钮注册点击事件
$("#addBtn").click(function () {
  $("#addModal").modal("show");
})

// 3. 通过校验插件, 添加校验功能
$("#form").bootstrapValidator({
  // 配置图标
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  // 校验的字段
  fields: {
    categoryName: {
      // 校验规则
      validators: {
        // 非空检验
        notEmpty: {
          // 提示信息
          message: "请输入一级分类名称"
        }
      }
    }
  }
});

  // 4. 注册表单校验成功事件
  //    表单校验插件, 会在表单提交时, 进行校验
  //    如果通过校验, 默认会进行提交, 需要阻止, 通过 ajax 进行提交

  // (使用form="form", 通过了校验, 也不会提交了, 可以省去 e.preventDefault() )

  $("#form").on("success.form.bv",function(e){
    e.preventDefault();

    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$("#form").serialize(),
      success:function(info){
        // console.log(info);
        if( info. success){
          $("#addModal").modal("hide");
          //添加成功之后就渲染到第一页
          currentPage = 1;
          //重新渲染
          render();

           // 重置表单校验状态和 表单内容
          // 传 true 不仅可以重置 状态, 还可以重置内容
          $("#form").data("bootstrapValidator").resetForm(true);
        }
      }
    })

  })


});