<template>
    <div>
      <div class="itemContent">
          <div :class="['itemContent-box']" v-for="(item,index) in myCollectList" v-if="item.isCollect" :key="index">
            <div class="box-pic">
              <div class="itemContent-box-button" @click="hanlder(item,index)">
                  <img :src="!item.isCollect ? require('../assets/images/home/false.png') : require('../assets/images/home/true.png')" alt="">
              </div>
              <img :class="['itemContent-box-img']" :src="'https://wand.mypinata.cloud/ipfs/QmUzeXJiSu8tBAejX5EHBG9jFHDibpXwETdDDiSLE6U6SB/'+item.tokenId+'.png'" alt="">
              <!-- {{item.name}} -->
              <div class="itemContent-box-icon">
                <img src="../assets/images/home/author.png" :class="['itemContent-box-icon-img']" alt="">
                <span class="text">{{ item.seller.replace(/(.{8}).*(.{8})/, '$1...$2') }}</span>
              </div>
              <!--{{ 描述 }}-->
              <div class="itemContent-box-title">
                This commodity is gold palace art, superior quality, worthy of collection
              </div>
              <div class="itemContent-box-bottom">
                <div class="box-left">
                  <div class="box-left-top">BNB</div>
                  <div class="box-left-bottom">{{item.price >= 100000000000000000 ? (Number(item.price)/Math.pow(10,18)) : "less than 0.1"}}</div>
                </div>
                <div class="box-right" @click="buyDetail(item)">
                  {{ $tc(`searchNftMarket.buyNow`) }}
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="mobile-itemContent">
        <li class="mobile-itemContent-li" v-for="(item,index) in myCollectList" v-if="item.isCollect" :key="index" @click="buyDetail(item)">
          <div class="mobile-itemContent-li-img">
            <img :class="['mobile-itemContent-li-img-img']" :src="'https://wand.mypinata.cloud/ipfs/QmUzeXJiSu8tBAejX5EHBG9jFHDibpXwETdDDiSLE6U6SB/'+item.tokenId+'.png'" alt="">
              <!-- <div class="mobile-itemContent-li-img-span">
                <div>17</div>
                时
                <div>45</div>
                分
                <div>54</div>
                秒后结束
              </div> -->
          </div>
          <div class="mobile-itemContent-li-text">
            This commodity is gold palace art...
          </div>
          <div class="mobile-itemContent-li-left">
            <div class="mobile-itemContent-li-left-top">BNB</div>
            <div class="mobile-itemContent-li-left-bottom">{{item.price >= 100000000000000000 ? (Number(item.price)/Math.pow(10,18)) : "less than 0.1"}}</div>
          </div>
        </li>
      </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
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
    data(){
        return {

        }
    },
    computed:{
      ...mapState({
        myCollectList:(state) => state.user.myCollectList
      })
    },
    methods:{
      buyDetail(data){
        this.$router.push({ path: "buyDetail", query: {name:JSON.stringify(data)} });
      },
      hanlder(item,index){
        item.isCollect = !item.isCollect;
        this.myCollectList[index].isCollect = item.isCollect;
        this.$store.commit('user/commitmyCollectList',this.myCollectList)
      },
    },
    mounted(){
        console.log(this.list);
        console.log('myCollectList=',this.myCollectList)
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
        width: pxttrem(284.5454545454545);
        height: pxttrem(252.72727272727272);
        background: #EEDBAA;
        margin: pxttrem(12) auto 0;
        position: relative;
        &-img{
          width: pxttrem(278.51239669421483);
          height: pxttrem(278.51239669421483);
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
          color:rgba(51, 51, 51, 1)
          div{
            width: pxttrem(34);
            height: pxttrem(34);
            line-height: pxttrem(34);
            color: #fff;
            text-align: center;
            background: #333333;
            border-radius: 2px 2px 2px 2px;
            opacity: 1;
          }
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
  .itemContent{
    display: none;
  }
}
@media only screen and (min-width: 780px) {
  .mobile-itemContent{
    display: none;
  }
  .itemContent{
    width: 1200px;
    margin: 0 auto;
    height: auto;
    display: flex;
    flex-flow: wrap;
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
        position: relative;
      }
      &-button{
        position: absolute;
        top: 20px;
        right: 20px;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        cursor: pointer;
        background: rgba(256,256,256,0.46);
        img{
          width: 20px;
          height: 20px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
        }
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
      }
    }
  }
}
</style>