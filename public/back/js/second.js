$(function () {
  //1-利用模板发送ajax请求，向后台请求数据，然后渲染到页面，设置分页
  var currentPage = 1;
  var pageSize = 5;
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        var htmlStr = template("secondTmp", info);
        $(".lt_content tbody").html(htmlStr);


        //设置分页
        $(".pagination").bootstrapPaginator({
          //配置版本号
          bootstrapMajorVersion: 3,
          //当前页面
          currentPage: info.page,
          //总页数
          totalPages: Math.ceil(info.total / info.size),
          //注册每个页码的点击事件
          onPageClicked: function (a, b, c, page) {

            currentPage = page,
              render();
          }
        })
      }
    })
  }

  //2-点击添加分类按钮，显示模态框
  $("#addBtn").click(function () {
    $("#addModal").modal("show");
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        console.log(info);
        var htmlStr = template("dropdownTmp", info);
        $(".dropdown-menu").html(htmlStr);

      }
    })
  })

  // 3. 通过注册委托事件, 给 a 添加点击事件

  $(".dropdown-menu").on("click", "a", function () {
    var txt = $(this).text();
    // 拿到 categoryId
    var id = $(this).data('id');
    // 修改文本内容
    $(".dropdownText").text(txt);

    // 将选中的 id 设置到 input 表单元素中
    $('[name="categoryId"]').val(id);

    // 需要将校验状态置成 VALID
    // 参数1: 字段
    // 参数2: 校验状态
    // 参数3: 配置规则, 来配置我们的提示文本
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");

  })


  //4-配置图片上传
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data);
      // 获取上传成功的图片地址
      var picAddr = data.result.picAddr;
      // 设置图片地址
      $("#imgBox img").attr("src", picAddr);
      // 将图片地址存在隐藏域中
      $('[name="brandLogo"]').val(picAddr);

      // 重置校验状态
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")



    }
  });

  //5-配置表单验证
  $("#form").bootstrapValidator({
    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 校验的字段
    fields: {
      // 品牌名称
      brandName: {
        //校验规则
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      // 一级分类的id
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      // 图片的地址
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  });

  // 6. 注册校验成功事件, 通过 ajax 进行添加
  //阻止submit按钮的默认提交，通过ajax来进行提交
  $("#form").on("success.form.bv", function (e) {
    // 阻止默认的提交
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $("#form").serialize(),
      success: function (info) {
        console.log(info);
        //关闭模态框
        $("#addModal").modal("hide");
        //重置表单里的内容和样式
        $('#form').data("bootstrapValidator").resetForm(true);
        currentPage = 1;
        render();

        // 找到下拉菜单文本重置
        $('.dropdownText').text("请选择1级分类")

        // 找到图片重置
        $('#imgBox img').attr("src", "images/none.png")

      }
    })

  })

})