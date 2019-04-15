var com = {
   tips:{
     OPERATING_SUCCESS:'操作成功'
   }
}
// 获取品牌列表
export const tipWarning = (vm,msg,desc) => {
  vm.$Notice.warning({
    title: msg,
    desc: "" === desc ? "" : desc,
    duration: 3
  });
}
export const tipSuccess = (vm,msg,desc) => {
  vm.$Notice.success({
    title: com.tips.OPERATING_SUCCESS,
    desc: "" === desc ? "" : desc,
    duration: 3
  });
}
