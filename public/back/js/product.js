//1-发送ajax请求往后台拿数据，利用模板引擎进行渲染到前端，进行分页设置
$(function () {

  //先定义一个当前页和页数
  var currentPage = 1;
  var pageSize = 3;
  var picArr=[];
  //一进入页面先渲染一次
  render();

  //封装一个渲染页面的函数
  function render() {
    //发送ajax请求
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        var htmlStr = template("tmp", info);
        $(".lt_content tbody").html(htmlStr);


        //设置分页功能
        $(".pagination").bootstrapPaginator({
          //版本号
          bootstrapMajorVersion: 3,
          //当前页
          currentPage: info.page,
          //总页数
          totalPages: Math.ceil(info.total / info.size),
          //点击事件的回调函数
          onPageClicked: function (a, b, c, page) {
            //设置当前页重新渲染
            currentPage = page;
            render();

          }

        })
      }
    })
  }



  //2-注册点击添加商品的点击事件，显示模态框，

  $("#addBtn").click(function () {
    $("#productModal").modal("show");
    //一显示模态框就渲染二级分类里面的数据

    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function (info) {
        var htmlStr = template("dropdownTmp", info);
        $(".dropdown-menu").html(htmlStr);
      }
    })
  });


  //3.注册事件委托, 给 a 注册点击事件
  $(".dropdown-menu").on("click", "a", function () {
    //获取当前的文本内容
    var txt = $(this).text();
    //获取自定义的属性id
    var id = $(this).data("id");
    //赋值给btn的文本
    $(".dropdownText").text(txt);
    //把id赋值给隐藏域里面的value值
    //用属性选择器进行赋值 ，外单内双
    $('[name="brandId"]').val(id);
  });


  // 4. 配置上传图片回调函数
  $("#fileupload").fileupload({
    //返回的数据类型
    dataType:"json",
    // 上传完图片, 响应的回调函数配置
    // 每一张图片上传, 都会响应一次
    //e：事件对象
    //data：图片上传后的对象，
    done:function( e, data ){
      console.log(data);
      //通过data.result.picAddr可以获取上传后的图片地址
      // 获取图片地址对象
      var picObj = data.result;
      // 获取图片地址
      var picAddr = picObj.picAddr;
      // 新得到的图片对象, 应该推到数组的最前面
      // push pop shift unshift
      picArr.unshift(picObj);
      // 新的图片, 应该添加到 imgBox 最前面去
      $("#imgBox").prepend('<img src= "'+picAddr +'" width="100">');
      // 如果上传的图片个数大于 3个, 需要将最旧的那个(最后面的哪项), 要删除
      if(picArr.lenght > 3 ){
        //删除数组的最后一项
        picArr.pop();
        // 除了删除数组的最后一项, 还需要将页面中渲染的最后一张图片删除掉
        // 通过 last-of-type 找到imgBox盒子中最后一个 img 类型的标签, 让他自杀   
        $("#imgBox img:last-of-type").remove();
      }
      // 如果处理后, 图片数组的长度为 3, 说明已经选择了三张图片, 可以进行提交
      // 需要将表单 picStatus 的校验状态, 置成 VALID
      if ( picArr.length === 3 ) {
        $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID")
        }
    }
  });
 
  
  
  // 5. 配置表单校验
  $("#form").bootstrapValidator({
    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 配置校验字段
    fields: {
      // 二级分类id, 归属品牌
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      // 商品名称
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 32-40'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品价格"
          }
        }
      },
      // 商品原价
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      // 标记图片是否上传满三张
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }

    }
  });

  //6-注册校验成功事件
  $("#form").on("success.form.bv",function(e){
    //阻止submit的默认提交
    e.preventDefault();
    var params = $('#form').serialize();

    console.log(picArr);
    params += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    params += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    params += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;

    console.log(params);



    $.ajax({
      type:"post",
      url:"/product/addProduct",
      data:params,
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          $("#productModal").modal("hide");
          currentPage = 1;
          render();
          $("#form").data("bootstrapValidator").resetForm(true);
          $(".dropdownText").text("请输入二级分类");
          $("#imgBox img").remove();
          picArr = [];
        }
      }
    })
  })

  




})