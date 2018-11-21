//防止全局变量污染
$(function() {

  // 1. 进行表单校验
  //    校验要求: (1) 用户名不能为空
  //              (2) 密码不能为空, 且必须是 6-12 位
  $("#form").bootstrapValidator({

    // 配置图标
      feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 对字段进行校验
    fields: {
      username: {
        // 校验的规则
        validators: {
          // 非空校验
          notEmpty: {
            // 为空时显示的提示信息
            message: "用户名不能为空"
          },
          // 长度要求 2-6 位
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须是 2-6 位"
          },
          //回调提示
          callback: {
            message: "用户名不存在"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          // 长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须是6-12位"
          },
          // 专门用于配置回调提示信息的校验规则
          callback: {
            message: "密码错误"
          }
        }
      }
    }
  })
});


//2-通过ajax进行表单请求的发送
$("#form").on("success.form.bv", function(e){
  //阻止表单的默认提交
  e.preventDefault();
  //使用ajax进行提交
  $.ajax({
    type:"post",
    url:"/employee/employeeLogin",
    data:$("#form").serialize(),
    dataType:"json",
    success:function(info){
      // console.log(info);
      //判断发送是否成功
      if(info.success){
        location.href = "index.html";
      }
      if(info.error === 1000){
        //错误码为1000时说明用户名不存在
          // 用户名不存在
          // 参数1: 字段名称
          // 参数2: 校验状态
          // 参数3: 配置规则, 用于提示
        // alert("用户名不存在");
        $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
      }
      if(info.error ===1001){
        //错误码为1001时说明密码错误
        // alert("密码错误");
        $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
      }
    }
  });
})

//重置按钮注册事件
$('[type = "reset"]').click(function(){
  // console.log(111);
  // 重置内容和样式
  $("form").data("bootstrapValidator").resetForm();
})