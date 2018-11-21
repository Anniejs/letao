
//1-设置分页功能
function setPage(pageCurrent, pageSum) {
  $(".pagination").bootstrapPaginator({
      //设置版本号
      bootstrapMajorVersion: 3,
      // 显示第几页
      currentPage:pageCurrent,
      // 总页数
      totalPages: pageSum,
      // //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
      // onPageClicked: function (event,originalEvent,type,page) {
      //     // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
      //     currentPage = page
      //     callback && callback()
      // }
  })
}
setPage(1,10)