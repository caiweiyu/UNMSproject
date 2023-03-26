<template>
  <div>
      <div class="box">
        <div class="box-top">
            <div class="box-top-left"></div>
            <div class="box-top-right"></div>
            <div class="box-top-content">
              <div class="box-top-content-li box-top-content-box">
                  <img class="img1" src="../assets/images/home/logo1.png" alt="">
                  <div class="box2">
                      <img class="img2" src="../assets/images/home/logo2.png" alt="">
                      <div class="box3">收藏最好的NFT黄金艺术品</div>
                  </div>
              </div>
              <div class="box-top-content-li box-top-content-box">
                  <div class="line">|</div>
                  <div class="box2">
                      <div>快速导航</div>
                      <div class="box3">NFT market</div>
                  </div>
              </div>
              <div class="box-top-content-li" @click="linkRouter(item.path)" v-for="(item,index) in list" :key="index">
                {{item.name}}
              </div>
            </div>
        </div>
        <div class="box-bottom"></div>
      </div>
      <div>
        <div class="mobile-box">
            <li v-for="(item,index) in list"  @click="linkRouter(item.path)" :key="index">{{item.name}}</li>
        </div>
        <div class="box-bottom"></div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list:[
        {name:this.$tc('header.nftAuction'),path:"/farms"},
        {name:this.$tc('foot.participate'),path:"/myParticipation"},
        {name:this.$tc('foot.myNFT'),path:"/personalInfo"},
        {name:this.$tc('foot.myCollection'),path:"/myCollection"},
        {name:this.$tc('foot.aboutUs'),path:"/myCommunity"},
      ]
    }
  },
  methods:{
    linkRouter(data){
      this.$router.push({ path: data });
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width:780px){
  $design-width:750; //设计稿width
  @function pxttrem($px) {
    @return $px/$design-width*23.4375+rem;//23.4375
  }
  .box{
    display: none;
  }
  .mobile-box{
    width: 100vw;
    // height: pxttrem(334);
    background: #D8BE7A;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    li{
      padding: pxttrem(30) pxttrem(35);
      font-size: pxttrem(28);
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
    }
  }
  .box-bottom{
    height: pxttrem(120);
    // width: 750px;
    background: #333333;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
  }

}
@media screen and (min-width: 780px){
  .mobile-box{
    display: none;
  }
  .box{
    display: block;
        &-top{
            width: 100%;
            height: 194px;
            background: #D8BE7A;
            border-radius: 0px 0px 0px 0px;
            opacity: 1;
            position: relative;
            &-left{
              width: 256px;
              height: 256px;
              background: url("../assets/images/home/leftbox.png") center no-repeat;
              background-size: 100% 100%;
              position: absolute;
              left: 0;
              top: -59px;
            }
            &-right{
              width: 343px;
              height: 343px;
              background: url("../assets/images/home/rightbox.png") center no-repeat;
              background-size: 100% 100%;
              position: absolute;
              right: 0;
              top: -147px;
            }
            &-content{
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 82px 0 0 0;
              &-box{
                display: flex;
                align-items: center;
              }
              &-li{
                cursor: pointer;
                padding: 0 30px;
                font-size: 12px;
                font-family: Segoe UI-Regular, Segoe UI;
                font-weight: 400;
                color: #666666;
                cursor: pointer;
                .img1{
                  width: 42px;
                  height: 42px;
                  margin-right: 8px;
                }
                .box2{
                  display: flex;
                  flex-direction: column;
                  .box3{
                    margin-top: 8px;
                  }
                }
                .img2{
                  width: 77.23px;
                  height: 26.01px;
                }
                .line{
                  padding: 0 30px 0 0;
                }
              }
            }
        }
        &-bottom{
            width: 100%;
            height: 66px;
            background: #333333;
            border-radius: 0px 0px 0px 0px;
            opacity: 1;
        }
    }
}
</style>