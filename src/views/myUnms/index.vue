<template>
    <div class="box1">
      <Header :title="$tc('home.myUNMS')"></Header>
      <div class="bg">
          <ul class="bg-card">
              <li class="bg-card-li">
                  <div class="left">{{ $tc(`home.yue`) }}</div>
                  <div class="right">{{ UNMSBalance }} UNMS</div>
              </li>
              <li class="bg-card-li">
                  <div class="left">{{ $tc(`home.Mytotalinvestment`) }}</div>
                  <div class="right">{{ total_investment }} USDT</div>
              </li>
              <li class="bg-card-li">
                  <div class="left">{{ $tc(`home.Workinginvestment`) }}</div>
                  <div class="right">{{ comingSoon_investment | fixedValue }} USDT</div>
              </li>
              <li class="bg-card-li">
                  <div class="left">{{ $tc(`home.Daysworked`) }}</div>
                  <div class="right">{{ getWork_date }} {{ $tc(`home.day`) }}</div>
              </li>
              <li class="">
                <div class="left">{{ $tc('home.remainingDays')}}</div>
                <div class="right">{{ last_day }} {{ $tc(`home.day`) }}</div>
              </li>
          </ul>
          <div class="bg-tip">{{ $tc('home.teamManagement')}}</div>
          <ul :class="['bg-card','bg-card2','bg-card3']">
              <li class="bg-card-bold">
                  <div class="div left">
                    <div class="top1">{{ teamUsdt }} USDT</div>
                    <div class="top2">{{ $tc('home.CommunityPerformance')}}</div>
                  </div>
                  <div class="div right">
                    <div class="top1">{{ teamMemberCount }}</div>
                    <div class="top2">{{ $tc('home.CommunitySize')}}</div>
                  </div>
              </li>
              <!-- <li class="bg-card-li">
                  <div class="left2">{{ $tc('home.directListDatabase')}}</div>
                  <div class="right"></div>
              </li>
              <li class="bg-card-li"  v-for="(item,index) in userinfo.invited" :key="index"  v-if="userinfo.invited && userinfo.invited.length > 0">
                  <div class="left">{{ this.$tc('home.member')+getNum(getsingleInfo(item)) }}</div>
                  <div class="left">{{ item.replace(/(.{6}).*(.{8})/, '$1...$2') }}</div>
              </li>
              <li class="click_more" v-if="userinfo.invited.length > 0" @click="More">
                {{ $tc('home.ClickForMore') }}
              </li> -->
          </ul>
          <div class="bg-tip">{{ $tc('home.MyRward') }}</div>
          <ul class="bg-card">
            <li class="bg-card-bold">
                  <div class="div left">
                    <div class="top1">{{  userinfo.zhituiBonusAmount | fixedValue }} UNMS</div>
                    <div class="top2">{{ $tc('home.DirectReferrals') }}</div>
                  </div>
                  <div class="div right">
                    <div class="top1">{{ userinfo.jintuiBonusAmount | fixedValue }} UNMS</div>
                    <div class="top2">{{ $tc('home.IndirectRecommendation') }}</div>
                  </div>
              </li>
              <li class="bg-card-bold">
                  <div class="div left">
                    <div class="top1">{{ userinfo.gedaiBonusAmount | fixedValue }} UNMS</div>
                    <div class="top2">{{ $tc('home.Intergenerationalrecommendation') }}</div>
                  </div>
                  <div class="div right">
                    <div class="top1">{{  userinfo.jiedianBonusAmount | fixedValue }} UNMS</div>
                    <div class="top2">{{ $tc('home.Node') }}</div>
                  </div>
              </li>
          </ul>
          <div class="bg-tip">{{ $tc('home.earnings') }}</div>
          <ul class="bg-card">
            <div class="bg-card-tip1">
                <div class="bg-card-tip1-title">{{ $tc('home.promotion') }} {{ (userinfo.inviteBonusAmount/1 - userinfo.claimedInviteBonusAmount/1) | fixedValue }} UNMS</div>
                <div class="bg-card-tip1-btn" @click="claimMint2">{{ $tc('home.DrawDown') }}</div>
            </div>
            <div class="bg-card-tip1">
                <div class="bg-card-tip1-title">{{ $tc('home.output') }} {{ generate.avaliableAmount | fixedValue }} UNMS</div>
                <div class="bg-card-tip1-btn" @click="claimMint">{{ $tc('home.DrawDown') }}</div>
            </div>
            <li class="bg-card-bold">
                  <div class="div left">
                    <div class="top1">{{ comingSoon_investment | fixedValue }} UNMS</div>
                    <div class="top2">{{ $tc('home.OutputToday') }}</div>
                  </div>
                  <div class="div right">
                    <div class="top1">{{ generate.mintToken | fixedValue }} UNMS</div>
                    <div class="top2">{{ $tc('home.CurrentOutput') }}</div>
                  </div>
              </li>
              <li class="bg-card-bold">
                  <div class="div left">
                    <div class="top1">{{ (userinfo.claimedInviteBonusAmount/1e18 + claimedMintAmount/1) | fixedValue }} UNMS</div>
                    <div class="top2">{{ $tc('home.SumReceived') }}</div>
                  </div>
                  <div class="div right">
                    <div class="top1">{{ userinfo.inviteBonusAmount | fixedValue }} UNMS</div>
                    <div class="top2">{{ $tc('home.SumRewards') }}</div>
                  </div>
              </li>
          </ul>
      </div>
    </div>
  </template>
  
  <script>
  import Header from "../../components/header.vue"
  import { mapState } from "vuex";
  export default {
      name:"myUnms",
      // 每个order有个investTime字段，上整数时间戳，用当前时间
      // 减去，再除以86400就是已经投资的天数，结束时间就是investTime加上100天
      // 100*86400
      data(){
          return {
            active:false
          }
      },
      async created(){
          this.LinkBNB();
      },
      filters: {
          fixedValue(value){
              if(value == undefined || value == 0) {
                console.log('fixedValue', value, value)
                return value
              }
              else{
                value = value.toString().toLowerCase()
                 if(value.split('.')[0].length>=18 ||  // 数长度大于18
                  (value.indexOf('e+')>0 && parseInt(value.split('e+')[1])>=18)){  // 数大于1e18
                  console.log('fixedValue', value, (value/1e18).toFixed(2))
                  return (value/1e18).toFixed(2)
                 }
                 else {
                  console.log('fixedValue', value, (value/1).toFixed(2))
                  return (value/1).toFixed(2)
                 }
              }
          },
      },
      methods:{
          //会员等级
          getNum(data){
            let result = null;
            switch(data.toString()){
                case "1":
                    result ="V1"
                break;
                case "3":
                    result ="V2"
                break;
                case "5":
                    result = "V3"
                break;
                case "7":
                    result = "V4"
                break;
                case "10":
                    result = "V5"
                break;
                default:
                    result = "V0"
            }
            return result
        },
        //收益
        claimMint(){
          
            if(this.generate.avaliableAmount/1 > 0){              
              this.claimMintFn()
            }else{
              this.$message.error('可领取数为 0')
            }
        },
        // 推广奖励
        claimMint2(){
            if(this.userinfo.inviteBonusAmount/1 > this.userinfo.claimedInviteBonusAmount/1){
                this.claimMintFn2()
            }else{
              this.$message.error('可领取数为 0')
            }
        },
        //展开
        More(){
          this.active = !this.active
        }
      },
      computed:{
        ...mapState({
              UNMSBalance:(state) => state.user.UNMSBalance,
              userinfo:(state) => state.user.userinfo,
              teamUsdt:(state) => state.user.teamUsdt,
              UNMS_price:(state) => state.user.UNMS_price,
              teamMemberCount:(state) => state.user.teamMemberCount,
              generate:(state) => state.user.generate
        }),
        //总投资额
        total_investment(){
          if(this.userinfo.orders && this.userinfo.orders.length > 0){
            let num = 0;
            for(let i= 0;i< this.userinfo.orders.length;i++){
              num +=this.userinfo.orders[i].usdtAmount/Math.pow(10,18)
            };
            console.log('总投资额=',Number(num).toFixed(2))
            return Number(num).toFixed(2)
          }else{
            return '0.00'
          }
        },
        //正在投资
        comingSoon_investment(){
          console.log('comingSoon_investment',this.userinfo.orders, this.UNMS_price)
            if(this.userinfo && this.userinfo.orders && this.userinfo.orders.length > 0){
                let num = this.userinfo.orders[this.userinfo.orders.length-1].usdtAmount/1e18
                if(this.UNMS_price==0) return 0
                console.log('投资中=',num, this.UNMS_price,num*0.02/this.UNMS_price)
                return num*0.02/this.UNMS_price
            }else{
                return 0
            }
        },
        // 已领取投资总额
        claimedMintAmount(){
            if(this.userinfo.orders && this.userinfo.orders.length > 0){
                let num = 0;
                for(let i= 0;i< this.userinfo.orders.length;i++){
                      num += this.userinfo.orders[i].claimedAmount/1e18
                }
                console.log('投资中=',num)
                return num
            }else{
                return 0
            }
        },
        //已经工作天数
        getWork_date(){
          if(this.userinfo.orders && this.userinfo.orders.length > 0){
                let res = null;
                for(let i= 0;i< this.userinfo.orders.length;i++){
                    if(i == this.userinfo.orders.length-1){
                        res = new Date().getTime() - this.userinfo.orders[i].investTime*1000;
                    }
                };
                console.log('已经工作天数=',res)
                return (res/86400000).toFixed(0)
            }else{
                return '0'
            }
        },
        //剩余天数
        last_day(){
          return Number(100 - this.getWork_date)
        }
      },
      components:{
          Header 
      },
      async mounted(){
        console.log('this.generate=',this.generate)
      }
  }
  </script>
  
  <style lang="scss" scoped>
  // @media only screen and (max-width: 780px) {
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
              &-card2{
                transition: height .3s ease-in;
                overflow: hidden;
                z-index: 1;
              }
              &-card3{
                min-height: pxttrem(194) !important;
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
  // }
  
  </style>