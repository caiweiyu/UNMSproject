<template>
    <div class="box1">
      <Header :title="$tc('home.Swap')"></Header>
      <div class="bg">
          <div class="bg-card" v-if="isBuy">
                <div class="title">
                    转出
                </div>
                <div class="input">
                    <div class="input_f">
                        <div class="usdt"></div>
                        <div class="usdt_f">USDT</div>
                    </div>
                    <input class="input_r" v-model="input1Value" />
                </div>
                <div class="tip">
                    <div class="tip_left">余额：{{ usdtBalance|fixedValue }} USDT</div>
                </div>
                <div class="line">
                    <div class="img" @click="isBuy=false"></div>
                </div>
                <div class="title1">
                    获得
                </div>
                <div class="input">
                    <div class="input_f">
                        <div class="usdt1"></div>
                        <div class="usdt_f">UNMS</div>
                    </div>
                    <div class="input_r" style="color:white">{{ input1Value*exchangeUsdt2Unms/1e18 }}</div>
                </div>
                <div class="tip">
                    <div class="tip_left">余额：{{ unmsBalance/1e18|fixedValue }} UNMS</div>
                    <div class="tip_right">${{ unmsBalance*exchangeUnms2Usdt/1e18 |fixedValue  }}</div>
                    <div class="tip_right"></div>
                </div>
                <div class="tip2">USDT汇率：1 USDT ≈ {{ exchangeUsdt2Unms|fixedValue }} UNMS</div>
                <div class="tip2" style="margin-top: 8px">UNMS汇率：1 UNMS ≈ {{ exchangeUnms2Usdt.toFixed(5) }} USDT</div>
                <div class="tip3">手续费：7%</div>
                <div class="btn" @click="swapUsdt2Unms">立即兑换</div>
          </div>

          <div class="bg-card" v-else>
                <div class="title">
                    转出
                </div>
                <div class="input">
                    <div class="input_f">
                        <div class="usdt1"></div>
                        <div class="usdt_f">UNMS</div>
                    </div>
                    <input class="input_r" v-model="input1Value" />
                </div>
                <div class="tip">
                    <div class="tip_left">余额：{{ unmsBalance/1e18|fixedValue }} UNMS</div>
                    <div class="tip_right">${{ unmsBalance*exchangeUnms2Usdt/1e18 |fixedValue  }}</div>
                </div>
                <div class="line">
                    <div :class="['img2']" @click="isBuy=true"></div>
                </div>
                <div class="title1">
                    获得
                </div>
                <div class="input">
                    <div class="input_f">
                        <div class="usdt"></div>
                        <div class="usdt_f">USDT</div>
                    </div>
                    <div class="input_r" style="color:white">{{ (input1Value*exchangeUnms2Usdt).toFixed(8) }}</div>
                </div>
                <div class="tip">
                    <div class="tip_left">余额：{{ usdtBalance/1e18|fixedValue }} USDT</div>
                    <div class="tip_right"></div>
                </div>
                <div class="tip2">USDT汇率：1 USDT ≈ {{ exchangeUsdt2Unms|fixedValue }} UNMS</div>
                <div class="tip2" style="margin-top: 8px">UNMS汇率：1 UNMS ≈ {{ exchangeUnms2Usdt.toFixed(5) }} USDT</div>
                <div class="tip3">手续费：7%</div>
                <div class="btn" @click="swapUsdt2Unms">立即兑换</div>
          </div>
      </div>
    </div>
  </template>
  
  <script>
  import Header from "../../components/header.vue"
  import { mapState } from "vuex";
  export default {
      name:"swap",
      data(){
          return {
            input1Value:'',
            input2Value:'',
            exchangeUsdt2Unms:0,
            exchangeUnms2Usdt:0,
            usdtBalance:0,
            unmsBalance:0,
            isBuy:true

          }
      },

      filters: {
          fixedValue(value){
              if(value == undefined || value == 0) {
                return value
              }
              else{
                value = value.toString().toLowerCase()
                 if(value.split('.')[0].length>=18 ||  // 数长度大于18
                  (value.indexOf('e+')>0 && parseInt(value.split('e+')[1])>=18)){  // 数大于1e18
                  return (value/1e18).toFixed(6)
                 }
                 else {
                  return (value/1).toFixed(6)
                 }
              }
          },
      },
      methods:{
            // 查询价格
            async getUnmsPrice(){
                this.usdtBalance = await this.getUsdtBalance(this.address)
                this.unmsBalance = await this.getUnmsBalance(this.address)
                let pairUsdtBalance = await this.getUsdtBalance('pair')
                let pairUnmsBalance = await this.getUnmsBalance('pair')
                this.exchangeUsdt2Unms = pairUnmsBalance*1e18/pairUsdtBalance
                this.exchangeUnms2Usdt = pairUsdtBalance/pairUnmsBalance
                console.log('pair usdtBalance', pairUsdtBalance)
                console.log('pair unmsBalance', pairUnmsBalance)
            },
            async swapUsdt2Unms(){
                this.swapToken(this.input1Value/1,this.isBuy)
            }
      },
      async created(){
        this.LinkBNB();
        await this.getUnmsPrice()
      },
      computed:{
        ...mapState({
            address:(state) => state.user.address,
            userinfo:(state) => state.user.userinfo,
        })
      },
      components:{
          Header 
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
              &-card{
                width: pxttrem(670);
                min-height: pxttrem(1076);
                background: #322267;
                border-radius: pxttrem(16);
                margin: pxttrem(40) auto 0;
                position: relative;
                .title{
                    padding: pxttrem(60) 0 0 pxttrem(40);
                    font-size: pxttrem(28);
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(256,256,256,0.6);
                }
                .title1{
                    padding: 0 0 0 pxttrem(40);
                    font-size: pxttrem(28);
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(256,256,256,0.6);
                }
                .line{
                    width: 100%;
                    height: pxttrem(8);
                    background: #271956;
                    margin: pxttrem(84) auto;
                    position: relative;
                    .img{
                        position: absolute;
                        width: pxttrem(66);
                        height: pxttrem(64);
                        background: url("../../assets/images/xxx.png")no-repeat center;
                        background-size: 100% 100%;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                    }
                    .img2{
                        position: absolute;
                        width: pxttrem(66);
                        height: pxttrem(64);
                        background: url("../../assets/images/xxx.png")no-repeat center;
                        background-size: 100% 100%;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%) rotate(180deg);
                    }
                }
                .input{
                    margin: pxttrem(20) auto 0;
                    width: pxttrem(590);
                    height: pxttrem(112);
                    background: #1F1345;
                    border-radius: pxttrem(16);
                    position: relative;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .input_f{
                        display: flex;
                        align-items: center;
                    }
                    .input_r{
                        margin-right: pxttrem(10);
                    }
                    .usdt1{
                        width: pxttrem(48);
                        height: pxttrem(48);
                        background: url("../../assets/images/unms.png")no-repeat center;
                        background-size: 100% 100%;
                        margin-left: pxttrem(20);
                    }
                    .usdt{
                        width: pxttrem(48);
                        height: pxttrem(48);
                        background: url("../../assets/images/usdt.png")no-repeat center;
                        background-size: 100% 100%;
                        margin-left: pxttrem(20);
                    }
                    .usdt_f{
                        font-size: pxttrem(28);
                        font-family: Helvetica-Bold, Helvetica;
                        font-weight: bold;
                        color: #FEFEFE;
                        margin-left: pxttrem(10);
                    }
                    input{
                        width: pxttrem(300);
                        height: pxttrem(112);
                        font-size: pxttrem(36);
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 500;
                        color: #FFFFFF;
                        text-align: right;
                    }
                }
                .tip{
                    margin: pxttrem(10) auto 0;
                    font-size: pxttrem(24);
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(256,256,256,0.6);
                    display: flex;
                    justify-content: space-between;
                    width: pxttrem(590);

                }
                .tip2{
                    margin: pxttrem(80) 0 0 pxttrem(60);
                    font-size: pxttrem(24);
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #FFFFFF;
                }
                .tip3{
                    margin: pxttrem(10) 0 0 pxttrem(60);
                    font-size: pxttrem(24);
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #FFFFFF;
                }
                .btn{
                    margin: pxttrem(40) auto;
                    width: pxttrem(590);
                    height: pxttrem(96);
                    line-height: pxttrem(96);
                    font-size: pxttrem(32);
                    font-weight: bold;
                    text-align: center;
                    background: linear-gradient(135deg, #593FFB 0%, #BF14F4 100%);
                    border-radius: pxttrem(48);
                    color: #FFFFFF;
                }
              }
          }
      }
//   }
  
  </style>