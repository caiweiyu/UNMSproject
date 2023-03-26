<template>
    <div class="box1">
      <Header :title="$tc('home.myInvitation')"></Header>
      <div class="bg">
          <ul class="bg-card">
              <li class="">
                  <div class="left">{{ $tc(`home.InvitationLink`) }}</div>
                  <div class="right"></div>
              </li>
              <li class="otherCard">
                  <!-- <div class="text"> -->
                    {{ MyAddress }}
                  <!-- </div> -->
              </li>
              <li class="btn_g" v-copy="MyAddress">{{ $tc(`home.copy`) }}</li>
          </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from "vuex";
  import Header from "../../components/header.vue"
  export default {
      name:"invite",
      data(){
          return {
            //  address_code:"JGFAGAFDGAFDG#T¥#TWFFGADT¥TFASDGF4583458’FDGREFG%"
          }
      },
      methods:{
  
      },
      computed:{
        ...mapState({
            address:(state) => state.user.address
        }),
        MyAddress(){
            console.log('location.hostname',location.hostname);
            // return location.hostname+":"+location.port+"?ref="+this.address
            return window.location.protocol+"//"+window.location.host+"/?ref="+this.address;
        }
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
              &-card{
                width: pxttrem(670);
                min-height: pxttrem(388);
                background: #322267;
                border-radius: pxttrem(16);
                margin: pxttrem(40) auto 0;
                .otherCard{
                    width: pxttrem(590);
                    min-height: pxttrem(116);
                    background: rgba(256,256,256,0.1);
                    border-radius: pxttrem(8);
                    // .text{
                    //     width: pxttrem(570);
                    font-size: pxttrem(28);
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #FFFFFF;
                    margin: pxttrem(10) auto;
                    padding: pxttrem(5);
                    display: flex;
                    flex-wrap: wrap;
                    overflow: auto;
                    word-break:break-all;
                    // }
                }
                .btn_g{
                    width: pxttrem(480);
                    height: pxttrem(84);
                    line-height: pxttrem(84);
                    text-align: center;
                    background: linear-gradient(135deg, #593FFB 0%, #BF14F4 100%);
                    border-radius: pxttrem(42);
                    font-size: pxttrem(32);
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #FFFFFF;
                    margin: pxttrem(50) auto;
                    display: flex;
                    justify-content: center;
                }
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