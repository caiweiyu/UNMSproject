<template>
  <div class="box1">
    <img class="img1" src="../assets/images/laba.png" alt="">
    <div class="box1-aj">通知:</div>
    <div class="box1-ad">
        <div class="box1-ad-position">邀请有奖参与多多获奖多多赚钱多多</div>
    </div>
  </div>
</template>

<script>
export default {
    name:'',
    data(){
        return {

        }
    },
    methods:{

    }

}
</script>

<style scoped lang="scss">
  $design-width:750; //设计稿width
  @function pxttrem($px) {
    @return $px/$design-width*20.06817+rem;//23.4375
  }
  .box1{
    width: 100vw;
    font-size: pxttrem(28);
    height: pxttrem(48);
    background: rgba(0,0,0,0.4);
    color:#D8B36E;
    overflow: hidden;
    display: flex;
    align-items: center;
    margin: pxttrem(10) 0 pxttrem(10) pxttrem(10);
    .img1{
        width: pxttrem(32);
        height: pxttrem(32);
    }
    &-aj{
        margin-left: pxttrem(5);
    }
    &-ad{
        margin-left: pxttrem(10);
        width: pxttrem(600);
        height: pxttrem(48);
        position: relative;
        overflow: hidden;
        &-position{
            position: absolute;
            height: pxttrem(48);
            margin: pxttrem(5);
            top: pxttrem(0);
            animation-name: example;
            animation-duration: 11s;
            animation-iteration-count: infinite;
            transform: translateX(pxttrem(0));
        }
    }
    @keyframes example {
        0%   {transform: translateX(pxttrem(-600));}
        100% {transform: translateX(pxttrem(600));}
    }
  }
</style>