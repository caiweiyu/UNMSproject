<template>
    <div class="PrivateEquityBox">
      <div class="box">
        <div class="box-item">
          <div :class="['box-item-li',index==crrent ? 'active' : '']" @click.stop="hanlder(index)" v-for="(item,index) in navigator_list" :key="index">
            {{item}}
          </div>
        </div>
        <!-- <div class="sort">
          排序<i class="el-icon-d-caret"></i>
        </div> -->
      </div>
      <ul class="mobile-box">
        <li :class="['mobile-box-li',index==crrent2 ? ' ' : 'active2' ]" v-for="(item,index) in list" :key="index" @click="hanlderList(index)">{{ item }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: "navigator_list",
    props:{
      crrent2:{
        type:Number,
        default:0
      }
    },
    data() {
      return {
        navigator_list:[
          this.$tc('Privateplacement.all'),this.$tc('Privateplacement.art')
          // 'All','Art','Collectibles','Photography','Sport','Trading card','Utility','Virtual worlds'
        ],
        list:[this.$tc('header.nftMarket'),this.$tc('header.nftAuction')],
        crrent:0,
        loading:null
      };
    },
  
    mounted() {
      // console.log("查询全部私募");
      // this.networkInfoABI();
      // 查询我的释放了 领取
      // this.ReceivereleaseAbi();
    },
    methods: {
      //
      hanlder(index){
        this.crrent = index;
        this.loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(()=>{
          this.loading.close();
        },500);
      },
      hanlderList(index){
        console.log('this.crrent2',this.crrent2,index)
        index == 1 ? this.$router.push({ name: "farms" },()=>{}) : this.$router.push({ name: "Privateplacement"},()=>{ });
      },
      // 领取释放
      receiveSf() {
        if (this.AvailableForRelease == 0) {
          this.$message.error("没有可领取的释放");
          return;
        }
        this.receiveSfABI();
      },
    },
  };
  </script>
  
  <style scoped lang="scss">
    .PrivateEquityBox{
      @media only screen and (max-width: 780px) {
        $design-width:750; //设计稿width
        @function pxttrem($px) {
          @return $px/$design-width*23.4375+rem;//23.4375
        }
        .box{
          display: none;
        }
        .mobile-box{
          display: block;
          display: flex;
          &-li{
            margin: pxttrem(40) 0 0 pxttrem(40);
            // width: pxttrem(160);
            padding: pxttrem(5) pxttrem(10);
            height: pxttrem(64);
            line-height: pxttrem(64);
            background: #DDDDDD;
            color: #000000;
            border-radius: 2px 2px 2px 2px;
            opacity: 1;
            text-align: center;
          }
          .active2{
            background: #D8BE7A;
            color: #fff;
          }
        }
      }
      @media only screen and (min-width: 780px) {
        .mobile-box{
          display: none;
        }
        .box{
          display: block;
          width: 1200px;
          margin: 40px auto 0;
          &-item{
            display: flex;
            &-li{
              cursor: pointer;
              width: 102px;
              height: 28px;
              line-height: 28px;
              text-align: center;
              font-size: 14px;
              font-family: Segoe UI-Regular, Segoe UI;
              font-weight: 400;
              color: #999999;
              border: 1px solid #666666;
            }
            &-li:not(first-child){
              margin-left:40px;
            }
            .active{
              background: #D8BE7A;
              box-shadow: 0px 3px 16px 1px rgba(0,0,0,0.08);
              border-radius: 0px 0px 0px 0px;
              color: #000000;
              border: 1px solid transparent;
            }
          }
          .sort{
            margin: 24px 0 20px 38px;
            cursor: pointer;
          }
        }
      }

    }
  </style>
  