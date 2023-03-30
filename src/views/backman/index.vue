<template>
    <div class="box1">
      <Header :title="$tc('home.Directpushlist')"></Header>
      <div style="padding-bottom: 100px; height: 100%; background: #FFFFFF; font-size:12px">
    提币到账地址： {{ releaseAddress }}
    <hr>
    参与人数：{{ addressList.length }}
    <br> 合约余额：{{ (balance/1e18).toFixed(2) }} UNMS 
    <br> 已提走金额：{{ (releasedBalance).toFixed(2) }} UNMS 
    <br> 今日池子参考价格：{{ unmsPrice }}
    <br>
    <input type="number" style="width:90px;border: 1px solid;" placeholder="输入今日价格" v-model="todayPrice"/> 
    <button type="button" style="border: 1px solid;background-color: skyblue;margin-left:10px" @click="setPrice">设置价格</button>
    <hr>    
    
    <input type="text" style="width:270px;border: 1px solid;" placeholder="输入用户地址" v-model="queryAddress"/>  
    <button type="button" style="border: 1px solid;background-color: skyblue;margin-left:10px" @click="getUserLevelRate">查询用户等级 </button> {{ queryAddressLevelRate }}
    <input type="text" style="width:90px;border: 1px solid;" placeholder="设置上面地址的等级" v-model="newLevelRate"/>  
    <button type="button" style="border: 1px solid;background-color: skyblue;margin-left:10px" @click="setUserNewLevelRate">设置用户等级 </button>
    
    <hr> 
    <input style="width:100%" type="text" placeholder="输入密码查询数据" v-model="password"/>
    <hr>
    <div v-if="password==='889899'">
      <table width="100%" border="1" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <!-- 循环出表头，用英文的逗号拆分字串 -->
            <th v-for="(tbheader,index) in tableHeader" :key="index">{{tbheader}}</th>
          </tr>
        </thead>
        <tbody>
          <!-- 循环出有多少行数据，即 list 中有多少条数据，得到 list 中的每个元素 -->
          <tr v-for="(userInfo,index) in allUserInfo" :key="index">
            <td>{{$sliceAddress(userInfo.address)}}</td>
            <td>{{getNum(userInfo.info.levelRate)}}</td>
            <td>{{userInfo.usdtAmount}}</td>
            <td>{{userInfo.info.invited.length}}</td>
            <td>{{userInfo.teamMemberCount}}</td>
            <td>{{userInfo.info.zhituiUsdtAmount/1e18}}</td>
            <td>{{userInfo.info.jintuiUsdtAmount/1e18}}</td>
            <td>{{userInfo.teamUsdtAmount/1e18}}</td>
            <td>{{$sliceAddress(userInfo.info.parent)}}</td>
          </tr>
        </tbody>
      </table>

    </div>

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
            tableHeader: ['地址','等级','投资额U','直推人数','社区人数','直推U','间推U','团队U','上级'],
            balance:0,
            releaseableBalance:0,
            releasedBalance:0,
            unmsPrice:0,
            todayPrice:'',
            releaseAddress:'',
            queryAddress:'',
            queryAddressLevelRate:'',
            newLevelRate:'',
            addressList:[],
            password:'',
            allUserInfo:[],
          }
      },
    async mounted(){
        await this.LinkBNB()
        this.balance = await this.getUnmsBalance('unms')
        this.releasedBalance = 50000000-this.balance/1e18;
        this.releaseAddress = await this.getReleaseAddress()
        let tmpAddressList = await this.getUserList(0,10)
        console.log('tmpAddressList',tmpAddressList)
        this.allUserInfo = []
        this.addressList = []
        for(let i=0;i<tmpAddressList.length;i++){
            if(tmpAddressList[i]=='0x0000000000000000000000000000000000000000') break;
            this.addressList.push(tmpAddressList[i])
            let userDetail = await this.getUserDetail(tmpAddressList[i])
            let usdtAmount = 0
            for(let j=0;j<userDetail.orders.length;j++){
              usdtAmount += userDetail.orders[j].usdtAmount/1e18
            }
            let teamMemberCount = await this.queryTeamMemberCount(tmpAddressList[i]);
            let teamUsdtAmount = await this.queryTeamUsdtAmount(tmpAddressList[i]);
            this.allUserInfo.push({info:userDetail,usdtAmount:usdtAmount,address:tmpAddressList[i],
              teamMemberCount:teamMemberCount, teamUsdtAmount:teamUsdtAmount})
            console.log('userDetail',this.allUserInfo[i])
        }
        console.log('this.allUserInfo', this.allUserInfo.length, this.releasedBalance)
        
        
        let usdtBalance = await this.getUsdtBalance('pair')
        let unmsBalance = await this.getUnmsBalance('pair')
        this.unmsPrice = (usdtBalance/unmsBalance).toFixed(7)
        
        console.log('price', usdtBalance, unmsBalance, this.unmsPrice)
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
            //会员等级
            getLevelRate(data){
                let result = null;
                switch(data.toString()){
                    case "1":
                        result ="1"
                    break;
                    case "2":
                        result ="3"
                    break;
                    case "3":
                        result = "5"
                    break;
                    case "4":
                        result = "7"
                    break;
                    case "5":
                        result = "10"
                    break;
                    default:
                        result = "0"
                }
                return result
            },
            setPrice(){
              if(!this.todayPrice||this.todayPrice==''||this.todayPrice/1==0) return
              this.setTodayPrice(this.todayPrice*1e18)
            },
            async getUserLevelRate(){
              console.log('getUserLevelRate', this.queryAddress)
              if(this.queryAddress == '') return;
              let userDetail = await this.getUserDetail(this.queryAddress)
              this.queryAddressLevelRate = this.getNum(userDetail.levelRate);
            },
            async setUserNewLevelRate(){
              if(this.queryAddress == '') return;              
              let userDetail = await this.getUserDetail(this.queryAddress)
              this.updateUserLevelRate(this.queryAddress, userDetail, this.getLevelRate(this.newLevelRate))
            }
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
              &-tip{
                margin: pxttrem(40) 0 pxttrem(20) pxttrem(40);
                font-size: pxttrem(28);
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: rgba(256,256,256,0.6);
              }
              .center{
                    text-align: center;
                    font-size: pxttrem(32);
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #FFFFFF;
                    // border-left: pxttrem(2) solid rgba(256,256,256,0.12);
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                }
              &-card{
                width: pxttrem(670);
                min-height: pxttrem(388);
                background: #322267;
                border-radius: pxttrem(16);
                margin: pxttrem(40) auto 0;
                position: relative;
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