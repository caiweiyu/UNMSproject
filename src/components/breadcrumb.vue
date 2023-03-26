<template>
  <div>
    <div class="box">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{name.path}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="box-mobile">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{name.path}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
    props:{
      name:{
        type:Object,
        default:{
            path:'test'
        }
      }
    },
    data(){
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 780px) {
  $design-width:750; //设计稿width
  @function pxttrem($px) {
    @return $px/$design-width*23.4375+rem;//23.4375
  }
  .box{
    display: none;
  }
  .box-mobile{
    display: block;
    width: pxttrem(700);
    margin: pxttrem(30) auto pxttrem(20);
  }
}
@media only screen and (min-width: 780px) {
  .box{
    display: block;
    width: 1150px;
    margin: 30px auto 20px;
    text-align: left;
  }
  .box-mobile{
    display: none;
  } 
}
</style>