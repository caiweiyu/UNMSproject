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
                    <div class="top2">{{ $tc('home.achievement')}}</div>
                  </div>
                  <div class="div right">
                    <div class="top1">{{ teamMemberCount }}</div>
                    <div class="top2">{{ $tc('home.community')}}</div>
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
                    <div class="top2">
                      <!-- {{ $tc('home.DirectReferrals') }} -->
                      U
                    </div>
                  </div>
                  <div class="div right">
                    <div class="top1">{{ userinfo.jintuiBonusAmount | fixedValue }} UNMS</div>
                    <div class="top2">
                      <!-- {{ $tc('home.IndirectRecommendation') }} -->
                      N
                    </div>
                  </div>
              </li>
              <li class="bg-card-bold">
                  <div class="div left">
                    <div class="top1">{{ userinfo.gedaiBonusAmount | fixedValue }} UNMS</div>
                    <div class="top2">
                      <!-- {{ $tc('home.Intergenerationalrecommendation') }} -->
                      M
                    </div>
                  </div>
                  <div class="div right">
                    <div class="top1">{{  userinfo.jiedianBonusAmount | fixedValue }} UNMS</div>
                    <div class="top2">
                      S
                      <!-- {{ $tc('home.Node') }} -->
                    </div>
                  </div>
              </li>
          </ul>
          <div class="bg-tip">{{ $tc('home.earnings') }}</div>
          <ul class="bg-card">
            <div class="bg-card-tip1">
                <div class="bg-card-tip1-title">{{ $tc('home.personal') }} {{ generate.avaliableAmount | fixedValue }} UNMS</div>
                <div class="bg-card-tip1-btn" @click="claimMint">{{ $tc('home.DrawDown') }}</div>
            </div>
            <div class="bg-card-tip1">
                <div class="bg-card-tip1-title">{{ $tc('home.Marketing') }} {{ (userinfo.inviteBonusAmount/1 - userinfo.claimedInviteBonusAmount/1) | fixedValue }} UNMS</div>
                <div class="bg-card-tip1-btn" @click="claimMint2">{{ $tc('home.Basicclaim') }}</div>
            </div>
            <li class="bg-card-bold">
                  <div class="div left">
                    <div class="top1">{{ comingSoonMint | fixedValue }} UNMS</div>
                    <div class="top2">{{ $tc('home.OutputToday') }}</div>
                  </div>
                  <div class="div right">
                    <div class="top1">{{ (generate.mintToken/1>0?generate.mintToken:realtimeMintToken) | fixedValue }} UNMS</div>
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
                    <div class="top2">{{ $tc('home.Marketingsum') }}</div>
                  </div>
              </li>
              <div class="line-border"></div>
              <div class="bg-card-tip1">
                  <div class="bg-card-tip1-title">{{ $tc('home.Marketing') }} {{advancedReward|fixedValue}} UNMS</div>
                  <div class="bg-card-tip1-btn" @click="claimMint3">{{ $tc('home.Advancedclaim') }}</div>
              </div>
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
            active:false,
            comingSoonMint:0,
            realtimeMintToken:0,
            advancedReward:0,
            waitForClaimChilds:[],
          }
      },
      async created(){
          this.LinkBNB();
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
                  return (value/1e18).toFixed(2)
                 }
                 else {
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
        // 进阶奖励
        claimMint3(){
          console.log('claimMint3() advancedReward', this.advancedReward, 'waitForClaimChilds',this.waitForClaimChilds)
            if(this.advancedReward > 0){
                this.unmsClaimTeamBonus(0, this.waitForClaimChilds)
            }else{
              this.$message.error('可领取数为 0')
            }
        },
        // arr是原数组，N是想分成多少个
        async fenge(arr, N){
          var result = [];
          for (var i = 0; i < arr.length; i += N) {
            result.push(arr.slice(i, i + N));
          }
          return result
        },
        // 查询可以领取多少进阶奖励
        async getReward(){
            let tmpAddressList = await this.getUserList(1,10000)     
            let accountList =  new Array();   
            for(let i=0;i<tmpAddressList.length;i++){
              if(tmpAddressList[i]=='0x0000000000000000000000000000000000000000'){
                break;
              }
              accountList.push(tmpAddressList[i])
            }
               
            let batchAccountList = await this.fenge(accountList, 20)
            console.log('原始数组',accountList,'长度',accountList.length,'分割后的数组', batchAccountList)
            let totalReward=0;
            for(let i=0;i<batchAccountList.length;i++){
              totalReward += await this.unmsQueryTeamBonus(this.address,0,batchAccountList[i])/1e18
              if(totalReward>0 && this.waitForClaimChilds.length==0) this.waitForClaimChilds=batchAccountList[i];
              console.log('totalReward', totalReward);
            }
            this.advancedReward=totalReward
        },
        //
        async init(){
          let tmpTodayPrice = await this.getDayPrice(parseInt(new Date().getTime()/1000/86400))
          let todayPrice = tmpTodayPrice
          let userInfo = await this.getUserDetail('this')
          if(tmpTodayPrice == 0){ // 管理员还没有设置价格
            let usdtBalance = await this.getUsdtBalance('pair')
            let unmsBalance = await this.getUnmsBalance('pair')
            // 为了不显示正在产出为0，根据池子里实际的USDT和UNMS计算价格
            todayPrice = (usdtBalance/unmsBalance).toFixed(7) 
            console.log('todayPrice=0, 实时计算价格=',todayPrice)
          }
          if(userInfo && userInfo.orders && userInfo.orders.length > 0){
              let usdtAmount = userInfo.orders[userInfo.orders.length-1].usdtAmount
              console.log('实时计算产出=',usdtAmount, todayPrice,usdtAmount*0.02/todayPrice)
              this.comingSoonMint = usdtAmount*0.02/todayPrice

              if(tmpTodayPrice == 0){
                let order = userInfo.orders[userInfo.orders.length-1];
                let dayCount = parseInt((parseInt(new Date().getTime()/1000)-order.investTime)/86400);
                if(dayCount>=100) {
                    dayCount = 100; 
                }
                dayCount -= order.claimDayCount; // 可以领的天数=订单有效天数-领过的天数
                let today = parseInt(new Date().getTime()/86400000);  
                let avaliableAmount = order.usdtAmount/50/todayPrice   
                for(let i=1;i<dayCount;++i){
                    avaliableAmount += order.usdtAmount*1e18/50/(await this.getDayPrice(today-i)); // 2%U对应的UNMS个数，以某天的价格计算某天的收益
                }
                this.realtimeMintToken = avaliableAmount + (order.claimedAmount/1)
              }
          }        
          console.log('mounted this.generate=',this.generate, 'todayPrice=',todayPrice,'this.realtimeMintToken',this.realtimeMintToken, 'userInfo',userInfo)
          
          await this.getReward()
        },

        //展开
        More(){
          this.active = !this.active
        }
      },
      computed:{
        ...mapState({
              address:(state) => state.user.address,
              UNMSBalance:(state) => state.user.UNMSBalance,
              userinfo:(state) => state.user.userinfo,
              teamUsdt:(state) => state.user.teamUsdt,
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
          console.log('comingSoon_investment',this.userinfo.orders)
            if(this.userinfo && this.userinfo.orders && this.userinfo.orders.length > 0){
                let num = this.userinfo.orders[this.userinfo.orders.length-1].usdtAmount/1e18
                return num
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
        // let getUserList = await this.getUserList(0,300);
        // console.log('getUserList=',getUserList)
        // let getAdvancedClaim = await this.getAdvancedClaim(this.address,getUserList,0);
        // console.log('getAdvancedClaim=',getAdvancedClaim)
        setTimeout(this.init, 1000);
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
          .line-border{
            height: pxttrem(2);
            width: pxttrem(400);
            background: #FFFFFF;
            opacity: 0.08;
            margin: pxttrem(20) auto 0;
          }
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