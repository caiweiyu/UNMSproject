<template>
    <div class="box1">
      <Header :title="$tc('home.onSaleUNMS')"></Header>
      <div class="bg">
          <ul class="bg-card">
              <li class="bg-card-li">
                  <div class="left">{{ $tc(`home.Salesvolumetoday`) }}</div>
                  <div class="right">{{ (getTodayLimitAmount/1e18).toFixed(2) }} UNMS</div>
              </li>
              <li class="bg-card-li">
                  <div class="left">{{ $tc('home.sold')}}</div>
                  <div class="right">{{ (daySoldAmount/1e18).toFixed(2) }} UNMS</div>
              </li>
              <li class="bg-card-li">
                  <div class="left">{{ $tc('home.surplus') }}</div>
                  <div class="right">{{ ((getTodayLimitAmount-daySoldAmount)/1e18).toFixed(2) }} UNMS</div>
              </li>
              <li class="">
                <div class="left">{{ $tc('home.CurrentCurrency') }}</div>
                <div class="right"></div>
              </li>
              <li class="jj">
                1 UNMS = {{ unmsPrice }} USDT
              </li>
              <li class="jj2">
                {{ $tc('home.remark') }}
              </li>
          </ul>
      </div>
    </div>
  </template>
  
  <script>
  import Header from "../../components/header.vue"
  import { mapState } from "vuex";
  export default {
      name:"onSale",
      data(){
          return {
            unmsPrice:'-'
          }
      },
      methods:{
  
      },
      created(){
        this.LinkBNB()
      },
      async mounted(){
        // 池子地址0x49F35a6A1e7770B98C69f6BA36F150c0f1a1A2dF
        let usdtBalance = await this.getUsdtBalance('0x49F35a6A1e7770B98C69f6BA36F150c0f1a1A2dF')
        let unmsBalance = await this.getUnmsBalance('0x49F35a6A1e7770B98C69f6BA36F150c0f1a1A2dF')
        this.unmsPrice = (usdtBalance/unmsBalance).toFixed(7)
      },    
      components:{
          Header 
      },
      computed:{
        ...mapState({
            UNMS_price:(state) => state.user.UNMS_price,
            UNMSBalance:(state) => state.user.UNMSBalance,
            userinfo:(state) => state.user.userinfo,
            getTodayLimitAmount:(state) => state.user.getTodayLimitAmount,
            daySoldAmount:(state) => state.user.daySoldAmount,
        }),
        //总投资额
        total_investment(){
            if(this.userinfo.orders && this.userinfo.orders.length > 0){
                let num = 0;
                for(let i= 0;i< this.userinfo.orders.length;i++){
                num +=this.userinfo.orders[i]['2']/Math.pow(10,18)
                };
                console.log('总投资额=',Number(num).toFixed(2))
                return Number(num).toFixed(2)
            }else{
                return '0.00'
            }
        },
        //正在投资
        comingSoon_investment(){
            if(this.userinfo.orders && this.userinfo.orders.length > 0){
                let num = 0;
                for(let i= 0;i< this.userinfo.orders.length;i++){
                    if(i == this.userinfo.orders.length-1){
                        num =this.userinfo.orders[i]['2']/Math.pow(10,18)
                    }
                };
                console.log('投资中=',Number(num).toFixed(2))
                return Number(num).toFixed(2)
            }else{
                return '0.00'
            }
        }
      }
  }
  </script>
  
  <style lang="scss" scoped>
//   @media only screen and (max-width: 780px) {
    $design-width:750; //设计稿width
    @function pxttrem($px) {
      @return $px/$design-width*20.06817+rem;//23.4375
    }
    .box1{
      // height: 100vh;
      background: rgba(3, 14, 33, 1);
          .bg{
              z-index: 10;
              min-height: calc(100vh - 2.56873rem);
              // min-height: 100vh;
              background: rgba(3, 14, 33, 1);
              padding-bottom: pxttrem(20);
              &-tip{
                margin: pxttrem(40) 0 pxttrem(20) pxttrem(40);
                font-size: pxttrem(28);
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: rgba(256,256,256,0.6);
              }
              &-card{
                width: pxttrem(670);
                min-height: pxttrem(388);
                background: #322267;
                border-radius: pxttrem(16);
                margin: pxttrem(40) auto 0;
                .click_more{
                    color: #FFFFFF;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                }
                &-tip1{
                    &-title{
                        font-size: pxttrem(36);
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                        color: #FFFFFF;
                        text-align: center;
                        padding-top: pxttrem(60);
                        // margin: pxttrem(60) auto 0;
                    }
                    &-btn{
                        width: pxttrem(480);
                        height: pxttrem(84);
                        line-height: pxttrem(84);
                        background: linear-gradient(135deg, #593FFB 0%, #BF14F4 100%);
                        border-radius: pxttrem(42);
                        font-size: pxttrem(32);
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                        color: #FFFFFF;
                        text-align: center;
                        margin: pxttrem(40) auto 0;
                    }
                }
                &-bold{
                    display: flex !important;
                    justify-content: space-between !important;
                    width: pxttrem(670) !important;
                    height:pxttrem(194) !important;
                    margin: pxttrem(10px) auto !important;
                    .div{
                        // width: pxttrem(335);
                        text-align: center;
                        width: 50%;                  
                        background: #322267;
                        // border-radius: pxttrem(16);
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        .top1{
                            font-size: pxttrem(32);
                            font-family: PingFangSC-Medium, PingFang SC;
                            font-weight: 500;
                            color: #FFFFFF;
                        }
                        .top2{
                            font-size: pxttrem(28);
                            font-family: PingFangSC-Regular, PingFang SC;
                            font-weight: 400;
                            color: rgba(256,256,256,0.6);
                            margin-top: pxttrem(12);
                        }
                    }
                }
                li{
                    font-size: pxttrem(28);
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #FFFFFF;
                    height: pxttrem(88);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: pxttrem(589);
                    margin: 0 auto;
                }
                .jj{
                    font-size: pxttrem(40);
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #FFFFFF;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                }
                .jj2{
                    font-size: pxttrem(24);
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(256,256,256,0.6);
                    text-align: center;
                    display: flex;
                    justify-content: center;
                }
                .left2{
                    font-size: pxttrem(28);
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #FFFFFF;
                }
                .left{
                    font-size: pxttrem(28);
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(256,256,256,0.6);
                }
                .right{
                    font-size: pxttrem(28);
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #FFFFFF;
                    border-left: pxttrem(2) solid rgba(256,256,256,0.12);
                }
                &-li{
                    width: pxttrem(589);
                    height: pxttrem(2);
                    border-bottom: pxttrem(2) solid rgba(256,256,256,0.08);
                }
              }
          }
      }
//   }
  
  </style>