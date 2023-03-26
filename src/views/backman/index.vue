<template>
    <div class="box1">
      <Header :title="$tc('home.Directpushlist')"></Header>
      <div style="padding-bottom: 100px; height: 100%; background: #FFFFFF; font-size:12px">
    合约所以权地址 {{ ownerAddress }}
    <hr>
    参与人数：{{ addressList.length }}
    <br> 合约余额：{{ (balance/1e18).toFixed(2) }} UNMS 
    <br> 可解锁余额：{{ (releaseableBalance/1e18).toFixed(2) }} UNMS 
    <br>
    <input type="number" style="width:90px;border: 1px solid;" placeholder="输入提币金额" v-model="withdrawAmount"/> 
    <button type="button" style="border: 1px solid;background-color: bisque;" @click="releaseToken">解锁UNMS</button>
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
            <td>{{userInfo.usdtAmount/1e18}}</td>
            <td>{{userInfo.info.invited.length}}</td>
            <td>{{userInfo.teamMemberCount}}</td>
            <td>{{userInfo.info.zhituiUsdtAmount/1e18}}</td>
            <td>{{userInfo.info.inviteHashrateAmount}}</td>
            <!-- <td>{{userInfo.hashrateMintAmount}}</td>
            <td>{{userInfo.info.teamHashrateBonusClaimed}}</td>
            <td>{{userInfo.info.inviteHashrateClaimedAmount}}</td> -->
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
            tableHeader: ['地址','投资额U','直推数','社区数','直推额U','邀请算力','上级'],
            balance:0,
            releaseableBalance:0,
            withdrawAmount:0,
            ownerAddress:'',
            addressList:[],
            password:'',
            allUserInfo:[],
          }
      },
    async mounted(){
        this.addressList = await this.getUserList()
        console.log('this.addressList',this.addressList)
        this.allUserInfo = []
        for(let i=0;i<this.addressList.length;i++){
            let userDetail = await this.getUserDetail(this.addressList[i])
            this.allUserInfo.push(userDetail)
            console.log('userDetail',this.addressList[i],userDetail)
        }
        console.log('this.allUserInfo', this.allUserInfo.length)
        this.balance = await this.getUnmsBalance('dapp')
        this.releaseableBalance = await this.getRelaseableUnmsBalance()
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
            releaseToken(){

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