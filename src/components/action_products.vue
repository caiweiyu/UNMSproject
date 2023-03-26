<template>
  <div>
    <div class="itemContent1">
      <div class="itemContent" v-if="list.length>0">
        <div :class="['itemContent-box','itemContent-box2']" v-for="(item,index) in list" :key="index">
          <div class="box-pic">
              <div class="item-auction">
              <img :src="item.pic" class="item-auction-pic" alt="">
              <div class="item-auction-text">{{ !item.isOver || !status ? $tc(`home.auctionNing`) : $tc(`home.auctionEnd`)}}</div>
              <div class="item-auction-time">
                <!-- <div>6</div>
                时
                <div>4</div>
                分
                <div>15</div>
                秒后结束 Number(item.startTime-item.time)-->
                <Time @isOverTime="getTimeOver" :isOver="item.isOver" :seconds="item.countdown"></Time>
              </div>
            </div>
            <img :class="['itemContent-box-img']" :src="'https://wand.mypinata.cloud/ipfs/QmUzeXJiSu8tBAejX5EHBG9jFHDibpXwETdDDiSLE6U6SB/'+item.nftId+'.png'" alt="">
            <!-- {{item.name}} -->
            <div class="itemContent-box-icon">
              <img src="../assets/images/home/author.png" :class="['itemContent-box-icon-img']" alt="">
              <span class="text">{{ item.bidder.replace(/(.{8}).*(.{8})/, '$1...$2') }}</span>
            </div>
            <!---->
            <div class="itemContent-box-title">
              This commodity is gold palace art, superior quality, worthy of collection
            </div>
            <!-- <div class="itemContent-box-content">
              哎呀，好忧愁啊！小企鹅已经3岁了，却迟迟不能脱掉蛋壳，这
              可怎么办才好呢？哎鸭可不想被人嘲笑；为了隐藏这个.....
            </div> -->
            <div class="itemContent-box-bottom">
              <div class="box-left">
                <div class="box-left-top">USDT</div>
                <div class="box-left-bottom">{{item.bidAmount}}</div>
              </div>
              <div :class="['box-right',item.isOver ? 'box-right-active' : '']"  @click="buyDetail(item)">
                {{$tc('home.auctionNow')}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="itemContent" v-else>
        <div class="noData">
            <img src="../assets/images/home/noData.png" alt="">
            <div class="noData_text">{{ $tc(`searchNftMarket.noData`) }}</div>
        </div>
      </div>
    </div>
    <div class="mobile-itemContent1">
        <div class="mobile-itemContent" v-if="list.length > 0">
          <li class="mobile-itemContent-li" v-for="(item,index) in list" :key="index" @click="buyDetail(item)">
            <div class="mobile-itemContent-li-img">
                <img  :src="'https://wand.mypinata.cloud/ipfs/QmUzeXJiSu8tBAejX5EHBG9jFHDibpXwETdDDiSLE6U6SB/'+item.nftId+'.png'" alt="">
                <div class="mobile-itemContent-li-img-span">
                  <Time @isOverTime="getTimeOver" :isOver="item.isOver" :seconds="item.countdown"></Time>
                </div>
            </div>
            <div class="mobile-itemContent-li-text">
              This commodity is gold palace art...
            </div>
            <div class="mobile-itemContent-li-left">
              <div class="mobile-itemContent-li-left-top">usdt</div>
              <div class="mobile-itemContent-li-left-bottom">{{item.bidAmount}}</div>
            </div>
          </li>
        </div>
        <div class="mobile-itemContent" v-else>
          <div class="noData">
              <img src="../assets/images/home/noData.png" alt="">
              <div class="noData_text">{{ $tc(`searchNftMarket.noData`) }}</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Time from "../components/time.vue"
export default {
    name:'product_list',
    props:{
        list:{
            type:Array,
            default:()=>[
                  {name:'Gold court art',img: require("../assets/images/home/pic1.png"),icon:require("../assets/images/home/test.png")},
                  {name:'Gold court art',img: require("../assets/images/home/pic2.png"),icon:require("../assets/images/home/test.png")},
                  {name:'Gold court art',img: require("../assets/images/home/pic3.png"),icon:require("../assets/images/home/test.png")},
                  {name:'Gold court art',img: require("../assets/images/home/pic4.png"),icon:require("../assets/images/home/test.png")},
                  {name:'Gold court art',img: require("../assets/images/home/pic5.png"),icon:require("../assets/images/home/test.png")},
                  {name:'Gold court art',img: require("../assets/images/home/pic6.png"),icon:require("../assets/images/home/test.png")},
                ],
        }
    },
    components:{
      Time
    },
    data(){
        return {
          status:false,
          arr:[]
        }
    },
    methods:{
      buyDetail(data){
        if(data.isOver){
          this.$message.error(this.$tc(`home.auctionEnd`))
          return false;
        }
        this.$router.push({ path: "auctionDetail", query: { name: JSON.stringify(data) } });
      },
      getTimeOver(data){
        this.status = data
        console.log('获取状态',data)
      }
    },
    mounted(){
        console.log('this.list=',this.list)
    }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 780px) {
  $design-width:750; //设计稿width
  @function pxttrem($px) {
    @return $px/$design-width*23.4375+rem;//23.4375
  }
  .mobile-itemContent{
    display: flex;
    flex-wrap: wrap;
    margin: pxttrem(30) 0 pxttrem(30) pxttrem(20);
    .noData{
        width: 100vw;
        height: calc(100vh - 20rem);
        margin: pxttrem(30) auto pxttrem(20);
        // position: relative;
        img{
            // position: absolute;
            // left: 50%;
            // top: 50%;
            // transform: translate(-50%,-50%);
            width: pxttrem(300);
            height: pxttrem(300);
            margin: 0 auto;
        }
        &_text{
            font-size: pxttrem(16);
            font-family: Segoe UI-Regular, Segoe UI;
            font-weight: 400;
            color: #000000;
            text-align: center;
            margin: auto;
        }
    }
    // justify-content: center;
    // width:100vw;
    &-li{
      width: pxttrem(278.51239669421483);
      height: pxttrem(446.2809917355371);
      margin: pxttrem(10);
      background: rgba(242,242,242,0.91);
      box-shadow: 0px 3px 15px 1px rgba(0,0,0,0.1);
      border-radius: 2px 2px 2px 2px;
      opacity: 1;
      border: 2px solid #D8BE7A;
      &-img{
        width: pxttrem(278.51239669421483);
        height: pxttrem(252.72727272727272);
        background: #EEDBAA;
        margin: pxttrem(12) auto 0;
        position: relative;
        display: flex;
        img{
          width: pxttrem(278.51239669421483);
          height: pxttrem(278.51239669421483);
          // position: relative;
        }
        &-span{
          position: absolute;
          bottom: pxttrem(-23);
          width: 100%;
          height: pxttrem(46);
          line-height: pxttrem(46);
          text-align: center;
          background: rgba(216, 190, 122, 0.8);
          border-radius: 0px 0px 0px 0px;
          color:rgba(51, 51, 51, 1);
          display:flex;
          align-items: center;
          justify-content: center;
          font-size: pxttrem(22);
          // div{
          //   width: pxttrem(34);
          //   height: pxttrem(34);
          //   line-height: pxttrem(34);
          //   color: #fff;
          //   text-align: center;
          //   background: #333333;
          //   border-radius: 2px 2px 2px 2px;
          //   opacity: 1;
          // }
        }
      }
      &-text{
        margin: pxttrem(24) 0 0 pxttrem(12);
        font-size: pxttrem(28);
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
      }
      &-left{
        display: flex;
        justify-content: space-between;
        &-top{
          font-size: pxttrem(24);
          margin: pxttrem(24) 0 0 pxttrem(12);
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
        }
        &-bottom{
          margin: pxttrem(16) 0 0 pxttrem(12);
          font-size: pxttrem(32);
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #333333;
        }
      }
    }
  }
  .line{
       width: pxttrem(34);
       height: pxttrem(34);
       line-height: pxttrem(34);
       color: #fff;
       text-align: center;
       background: #333333;
       border-radius: 2px 2px 2px 2px;
       opacity: 1;
    
  }
  .itemContent1{
    display: none;
  }
}
@media only screen and (min-width: 780px) {
  .mobile-itemContent1{
    display: none;
  }
.itemContent{
  width: 1200px;
  margin: 0 auto;
  height: auto;
  display: flex;
  flex-flow: wrap;
  z-index: 99;
  .noData{
        width: 1200px;
        // height: calc(100vh - 324px);
        margin: 0 auto;
        // position: relative;
        img{
            // position: absolute;
            // left: 50%;
            // top: 50%;
            // transform: translate(-50%,-50%);
            width: 350px;
            height: 350px;
            margin: 0 auto;
        }
        &_text{
            font-size: 20px;
            font-family: Segoe UI-Regular, Segoe UI;
            font-weight: 400;
            color: #000000;
            text-align: center;
            // margin: 50px auto;
        }
    }
  &-box{
    width: 368px;
    height: 506px;
    margin: 10px 15px;
    background:url("../assets/images/home/reduce_bg.png")center no-repeat;
    background-size: 100% 100%;
    opacity: 1;
    .box-pic{
      width: 328px;
      height: 442px;
      margin: 32px 20px;
      background: #fff;
    }
    &-img{
      width: 328px;
      height: 262px;
    }
    &-icon{
      display: flex;
      align-items: center;
      margin: 9px 0 0 20px;
      &-img{
        border-radius: 50%;
        width: 24px;
        height: 24px;
        background: #FFFFFF;
        opacity: 1;
        border: 1px solid #707070;
      }
      .text{
        margin-left: 6px;
        // width: 50px;
        height: 16px;
        font-size: 12px;
        font-family: Segoe UI-Regular, Segoe UI;
        font-weight: 400;
        color: #666666;
      }
    }
    &-title{
      margin: 16px 0 0 20px;
      font-size: 14px;
      font-family: Segoe UI-Bold, Segoe UI;
      font-weight: bold;
      color: #333333;
    }
    &-content{
      margin: 12px 0 0 20px;
      font-size: 12px;
      font-family: Segoe UI-Regular, Segoe UI;
      font-weight: 400;
      color: #333333;
    }
    &-bottom{
      display: flex;
      justify-content: space-between;
      .box-left{
        margin: 24px 0 0 20px;
        &-top{
          font-size: 12px;
          font-family: Segoe UI-Regular, Segoe UI;
          font-weight: 400;
          color: #D8BE7A;
        }
        &-bottom{
          font-size: 20px;
          font-family: Segoe UI-Bold, Segoe UI;
          font-weight: bold;
          color: #D8BE7A;
        }
      }
      .box-right{
        margin: 39px 24px 0 0;
        width: 98px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background: #D8BE7A;
        box-shadow: 0px 3px 15px 1px rgba(216,190,122,0.4);
        border-radius: 2px 2px 2px 2px;
        opacity: 1;
        font-size: 16px;
        font-family: Segoe UI-Bold, Segoe UI;
        font-weight: bold;
        color: #333333;
        cursor: pointer;
      }
      .box-right-active{
        color: #fff !important;
        background: #999 !important;
      }
    }
  }
}
.itemContent-box2{
  position: relative;
}
.item-auction{
  width: 327px;
  height: 28px;
  background: #D8BE7A;
  border-radius: 0px 0px 0px 0px;
  opacity: 0.8;
  position: absolute;
  top: 265px;
  left: 20px;
  display: flex;
  align-items: center;
  &-pic{
    width: 18px;
    height: 18px;
    margin-left: 8px;
  }
  &-text{
    font-size: 12px;
    font-family: Segoe UI-Regular, Segoe UI;
    font-weight: 400;
    color: #333333;
    margin-left: 8px;
  }
  &-time{
    font-size: 12px;
    font-family: Segoe UI-Regular, Segoe UI;
    font-weight: 400;
    color: #333333;
    display: flex;
    align-items: center;
    margin-left: 67px;
    // // div{
    // //   width: 18px;
    // //   height: 18px;
    // //   line-height: 18px;
    // //   text-align: center;
    // //   font-size: 12px;
    // //   color: #ffffff;
    // //   background: #333333;
    // // }
  }
}
}
</style>