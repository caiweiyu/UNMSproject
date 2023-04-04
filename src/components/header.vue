<template>
    <div>
        <!--下拉展开-->
        <div :class="['export',active ? 'active' :'']">
            <div class="avter"></div>
            <ul class="expande">
                <li :class="[index != more.length-1 ? 'expande-li' : '']" @click="goRouter(item.router)"  v-for="(item,index) in more" :key="index">{{ item.name }}</li>
            </ul>
        </div>
        <div class="box">
            <div class="left" @click="refuse"></div>
            <div class="title">{{ title }}</div>
            <div class="right" @click="hanlder"></div>
        </div>
        <div class="fix_bg" v-if="active" @click="closeFn"></div>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:""
        }
    },
    data(){
        return {
            active:false,
            isShow:false,
            more:[
                {name:this.$tc(`home.home`),router:"/"},
                {name:this.$tc(`home.gonggao`),router:"announcement"},
                {name:this.$tc(`home.about`),router:"aboutPage"},
                {name:this.$tc(`home.myUNMS`),router:"myUnms"},
                // {name:this.$tc(`home.onSaleUNMS`),router:"onSale"},
                {name:this.$tc(`home.Directpushlist`),router:"transductive"},
                {name:this.$tc(`home.myInvitation`),router:"invite"},
                {name:this.$tc(`home.OneclickCoin`),router:""},
                {name:this.$tc(`home.Tools`),router:""},
                // {name:this.$tc(`home.Swap`),router:"swap"},
                {name:this.$tc(`home.DAO`),router:""},
            ],
            msg:""
        }
    },
    methods:{
        //关闭
        closeFn(){
            this.active = false;
        },
        refuse(){
            this.$router.push({ path: "/" });
        },
        hanlder(){
            console.log('hanlder')
            this.active = !this.active;
        },
        goRouter(data){
            this.active = false;
            this.active1 = false;
            if(data == "") {
                // console.log(data,data == "",111)
                this.$store.commit('user/committip',{
                    status:true,
                    content:this.$tc('home.development')
                });
                return
            }
            // this.$router.push({ path: data });
            let ref=this.GetUrlParam('ref')

            console.log('goRouter',data, 'ref',ref)
            if (ref && ref.length>0){
                this.$router.push({ path: data + '?ref='+ref})
            }else{
                this.$router.push({ path: data })
            }
        },

    }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 780px) {
  $design-width:750; //设计稿width
  @function pxttrem($px) {
    @return $px/$design-width*20.06817+rem;//23.4375
  }
  .box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    height: pxttrem(96);
    background: #322267;
    .left{
        width: pxttrem(48);
        height: pxttrem(48);
        background: url('../assets/images/go.png')center no-repeat;
        background-size: 100% 100%;
        margin-left: pxttrem(40);
    }
    .left:active{
        opacity: .6;
    }
    .title{
        font-size: pxttrem(32);
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
    }
    .right{
        width: pxttrem(48);
        height: pxttrem(48);
        background: url('../assets/images/gengduo.png')center no-repeat;
        background-size: 100% 100%;
        margin-right: pxttrem(40);
    }
    .right:active{
        opacity: 0.6;
    }
  }
  .active{
    height: pxttrem(860) !important;
    // height: pxttrem(948) !important;
    // height: pxttrem(1036) !important;
    // overflow: none !important;
    // overflow: auto !important;
    z-index: 999 !important;
  }
  .fix_bg{
    background: transparent;
    height: 100vh;
    width: 100vw;
    position: fixed;
    // display: none;
    top: 0;
    z-index: 1;
  }
  .export{
    transition: all .3s ease-in;
    position: absolute;
    top: pxttrem(76);
    right: pxttrem(40);
    z-index: 1;
    height: pxttrem(0);
    overflow: hidden;
    .avter{
        width:pxttrem(0);
        height:pxttrem(0);
        border:pxttrem(22) solid transparent;/*以下四个样式对应四种三角形，任选其一即可实现*/
        /* border-top-color:lightseagreen; */
        /* border-left-color:lightseagreen; */
        /* border-right-color:lightseagreen; */
        border-bottom-color:rgba(23, 2, 31, 1);
        z-index: 2;
        margin-left: pxttrem(185);
    }
    .expande{
        width: pxttrem(240);
        // height: pxttrem(898);
        height: pxttrem(986);
        background: rgba(23, 2, 31, 1);
        border-radius: pxttrem(16);
        display: flex;
        flex-direction: column;
        z-index: 1;
        li{
            font-size: pxttrem(28);
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            line-height: pxttrem(88);
            // width: pxttrem(140);
            text-align: center;
            margin: 0 auto;
            cursor: pointer;
        }
        &-li{
            font-size: pxttrem(28);
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            line-height: pxttrem(88);
            // width: pxttrem(140);
            text-align: center;
            margin: 0 auto;
            cursor: pointer;
            border-bottom: pxttrem(2) solid rgba(255, 255, 255, 0.2);
        }
    }
  }
}
</style>