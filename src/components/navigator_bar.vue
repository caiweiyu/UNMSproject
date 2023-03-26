<template>
  <div>
    <slot name="header">
    </slot>
    <slot name="goBack">

    </slot>
    <div class="title">
        {{ title }}
    </div>
  </div>
</template>

<script>
export default {
    name:'navigator_bar',
    props:{
        title:{
            type:String,
            default:'首页'
        }
    },
    data(){
        return {
            MyAddress:''
        }
    },
    methods:{
        // loginSuccessful (e) {
        //     this.MyAddress = e
        //     console.log('登录成功回来了')
        // },
        // LoginQb () {
        //     this.LinkBNB()
        // }
    }
}
</script>

<style lang="scss" scoped>
$design-width:750; //设计稿width
@function pxttrem($px) {
    @return $px/$design-width*20.06817+rem;//23.4375
}
.title{
    text-align: center;
    line-height: pxttrem(75);
    font-size: pxttrem(36);
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
}
.kou{
    width: pxttrem(70);
    height: pxttrem(70);
    position: absolute;
    top: 0;
    left: 0;
    font-size: pxttrem(70);
    font-weight: 200;
    color: #fff;
    z-index: 0;
}
.home{
    width: pxttrem(694);
    height: pxttrem(240);
    margin: 0 auto;
    background: url('../assets/images/index/logo.png')no-repeat center;
    background-size: 100% 100%;
}
.leftBox{
    position: fixed;
    display: flex;
    top: 0;
    z-index: 1;
    width: pxttrem(0);
    min-height: 100vh;
    // background: red;
    transition: all .3s ease-in;
    overflow: hidden;
    &-left{
        width: 75%;
        min-height: 100vh;
        background: #000000;
        &-header{
            width: pxttrem(514);
            height: pxttrem(257);
            margin:pxttrem(100) 0 pxttrem(30) pxttrem(28);
            background: linear-gradient(134deg, #DDAF62 0%, #F4E1B6 100%);
            box-shadow: pxttrem(11) pxttrem(14) pxttrem(13) pxttrem(1) rgba(236,208,153,0.41);
            border-radius: pxttrem(8) pxttrem(8) pxttrem(8) pxttrem(8);
            opacity: 1;
            &-top{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                &-left{
                    margin: pxttrem(31) 0 0 pxttrem(32);
                    font-size: pxttrem(56);
                    font-family: PingFang SC-Heavy, PingFang SC;
                    font-weight: 800;
                    color: #783D0D;
                }
                &-right{
                    margin: pxttrem(31) 0 0 pxttrem(32);
                    font-size: pxttrem(28);
                    font-family: PingFang SC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #783D0D;
                }
            }
        }
        &-ul{
            display: flex;
            flex-direction: column;
            height: calc(100vh - 10.35518rem );
            // height: pxttrem(387);
            overflow: auto;
            &-li{
                display: flex;
                align-items: center;
                padding: pxttrem(35) 0;
                cursor: pointer;
                // margin-top: pxttrem(25);
                // height: pxttrem(80);
                // line-height: pxttrem(80);
                img{
                    margin: pxttrem(0) pxttrem(20) 0 pxttrem(32);
                    width: pxttrem(32);
                    height: pxttrem(32);
                }
                div{    
                    font-size: pxttrem(28);
                    font-family: PingFang SC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #FFFFFF;
                }
            }
        }
    }
    &-right{
        width: 25%;
        min-height: 100vh;
        background: rgba(0, 0, 0, 0.1);
    }
  }
  .activeFocus{
    width: 100vw;
  }
</style>