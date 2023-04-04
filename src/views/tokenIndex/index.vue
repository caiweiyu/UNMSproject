<template>
    <div class="mobile">
        
        <!--下拉展开-->
        <div :class="['export',active ? 'active' :'']">
            <div class="avter"></div>
            <ul class="expande">
                <li :class="[index != more.length-1 ? 'expande-li' : '']" @click="goRouter(item.router)"  v-for="(item,index) in more" :key="index">{{ item.name }}</li>
            </ul>
        </div>
        <!--切换语言-->
        <div :class="['export1',active1 ? 'active1' :'']">
            <div class="avter1"></div>
            <ul class="expande1">
                <li :class="[index != 1 ? 'expande1-li' : '']" @click="changeLanguage(index)" v-for="(item,index) in lang" :key="index">{{ item }}</li>
            </ul>
        </div>
        <!--关闭层-->
        <div class="fix_bg" v-if="active1 || active" @click="closeFn"></div>
        <!--头部-->
        <div class="home">
            <div class="home-top">
                <div class="language" @click="change"></div>
                <div :class="['dengduo']" @click="More"></div>
            </div>
            <div class="home-bottom">
                <div class="address" v-if="address != ''">
                    <div v-copy="address">{{  $t('home.linkyes')+" : " }}{{address && address.replace(/(.{4}).*(.{3})/, '$1...$2') }}</div>
                    <!-- <div class="copy" v-copy="address">{{ $tc(`home.copy`) }}</div> -->
                </div>
                <div class="address" v-if="address == ''" @click="LoginQb()">
                    <!-- 链接钱包 -->
                    {{ $t('home.Link')+" : ******"}}
                </div>
                <div class="icon" v-if="address == ''"  @click="LoginQb()"></div>
            </div>
        </div>
        <!--中间账户信息-->
        <div class="info">
            <div class="infoline info-acount">
                <div>{{ $tc(`home.yue`) }}</div>
                <div class="col">{{ UNMSBalance }} UNMS</div>
            </div>
            <div class="line"></div>
            <div class="infoline info-id">
                <div>{{ $tc(`home.id`) }}</div>
                <div class="col">{{ $tc(`home.member`) }}
                        {{ userinfo.levelRate && getNum(userinfo.levelRate) }}
                </div>
                <div class="button" style="height:30px;width:100px;line-height:30px;margin:0" @click="upgradeLevel()" v-if="showUpgradeButton">立即升级</div>
            </div>
            <div class="line"></div>
            <div class="infoline info-invite">
                <div>{{ $tc(`home.invite`) }}</div>
                <div class="con">
                    <div class="text">
                        <div>{{ MyAddress && MyAddress.replace(/(.{15}).*(.{6})/, '$1...$2') }}</div>
                    </div>
                    <div class="copy" v-copy="MyAddress">{{ $tc(`home.copy`) }}</div>
                </div>
            </div>
            <!-- <div class="infoline info-acount">
                <div>{{ $tc('home.InvestmentIncome') }} : {{ generate.avaliableAmount && generate.avaliableAmount }}UNMS</div>
                <div class="col">
                    <div class="btn-class" @click="claimMint">{{ $tc('home.DrawDown') }}</div>
                </div>
            </div>
            <div class="infoline info-acount">
                <div>{{ $tc('home.InvitationtoReward') }}</div>
                <div class="col">
                    <div class="btn-class" @click="claimMint2">{{ $tc('home.DrawDown') }}</div>
                </div>
            </div> -->
        </div>
        <!--投入卡片区-->
        <div :class="['info','info1',index==list.length-1 ? 'info2' : '']" v-for="(item,index) in list" :key="index">
            <div class="card">
                <div class="card-info"></div>
                <div class="card-price">{{ item+'USDT'}}</div>
            </div>
            <div class="content">
                <div>{{ $tc(`home.Dailyoutput`) }}2%</div>
                <div>{{ $tc(`home.production`) }}</div>
            </div>
            <div class="button" @click="input(item)">{{ $tc(`home.purchasenow`) }}</div>
        </div>
    
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name:'tokenIndex',
    data(){
        return {
            list:[100,500,1000],
            active:false,
            active1:false,
            isShow:false,
            showUpgradeButton:false,
            newLevel:0,
            lang:[this.$tc(`home.chinese`),this.$tc(`home.english`)],
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
    computed:{
      ...mapState({
            address:(state) => state.user.address,
            userinfo:(state) => state.user.userinfo,
            generate:(state) => state.user.generate,
            UNMSBalance:(state) => state.user.UNMSBalance
      }),
      MyAddress(){
        console.log('location.hostname',location.hostname);
        console.log('generate=',this.generate)
        return window.location.protocol+"//"+window.location.host+"/?ref="+this.address;
      }
    },
    async created(){
        this.LoginQb();
        this.getValue();
        this.newLevel = await this.queryLevelRate(this.address);
        
        setTimeout(()=>{
            this.showUpgradeButton = parseInt(this.newLevel) > parseInt(this.userinfo.levelRate)
            console.log('showUpgradeButton',parseInt(this.newLevel),parseInt(this.userinfo.levelRate),this.showUpgradeButton)
        },3000)
        
    },
    mounted(){
    },
    methods:{
        //关闭
        closeFn(){
            this.active = false;
            this.active1 = false;
        },
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
        upgradeLevel(){
            this.upgradeMyLevel();
        },
        getValue(){
            let data = this.GetUrlParam('ref');
            console.log('参数=',data)
            if(data != ""){
                this.$store.commit('user/commitmyUpaddress',data)
            }
        },
        
        input(data){
            if(this.userinfo.orders.length > 0){
                this.$store.commit('user/committip',{
                    status:true,
                    content:this.$tc('home.Cantbuyagain')
                });
                return;
            }
            this.getDapp(data)
        },
        goRouter(data){
            this.active = false;
            this.active1 = false;
            if(data == "") {
                this.$store.commit('user/committip',{
                    status:true,
                    content:this.$tc('home.development')
                });
                return
            }
            let ref=this.GetUrlParam('ref')

            console.log('goRouter',data, 'ref',ref)
            if (ref && ref.length>0){
                this.$router.push({ path: data + '?ref='+ref})
            }else{
                this.$router.push({ path: data })
            }
        },
        changeLanguage(index){
            let data = index == 1 ? "en_US" : "zh_CN";
            localStorage.setItem('lang',data);
            location.reload()
            this.active = false;
            this.active1 = false;
        },
        LoginQb(){
            this.LinkBNB()
        },
        //getUnms
        getUnmsfn(){
            this.getUnms()
        },
        More(){
            this.active = !this.active;
            this.active1 = false;
        },
        change(){
            this.active1 = !this.active1;
            this.active = false;
        }
    },
}
</script>

<style scoped lang="scss">
// @media only screen and (max-width: 780px) {
  $design-width:750; //设计稿width
  @function pxttrem($px) {
    @return $px/$design-width*20.06817+rem;//23.4375
  }
  .mobile{
    width: 100vw;
    min-height: 100vh;
    background: rgba(3, 14, 33, 1);
    position: relative;
  }
  .active{
    height: pxttrem(860) !important;
    // height: pxttrem(948) !important;
    // height: pxttrem(1036) !important;
    // overflow: none !important;
    // overflow: auto !important;
    z-index: 999 !important;
  }
  .active1{
    height: pxttrem(236) !important;
    z-index: 999 !important;
  }
  .fix_bg{
    background: transparent;
    min-height: 100vh;
    width: 100vw;
    position: fixed;
    // display: none;
    top: 0;
    z-index: 2;
  }
  .export1{
    transition: all .3s ease-in;
    position: absolute;
    top: pxttrem(76);
    right: pxttrem(40);
    z-index: 1;
    height: pxttrem(0);
    overflow: hidden;
    .avter1{
        width:pxttrem(0);
        height:pxttrem(0);
        border:pxttrem(22) solid transparent;/*以下四个样式对应四种三角形，任选其一即可实现*/
        /* border-top-color:lightseagreen; */
        /* border-left-color:lightseagreen; */
        /* border-right-color:lightseagreen; */
        border-bottom-color:rgba(23, 2, 31, 1);
        z-index: 2;
        margin-left: pxttrem(110);
    }
    .expande1{
        width: pxttrem(240);
        height: pxttrem(186);
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
        li:active{
            color:rgba(256,256,256,0.5) !important;
        }
        &-li{
            border-bottom: pxttrem(2) solid rgba(255, 255, 255, 0.2);
        }
    }
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
  .home{
    width: pxttrem(750);
    height: pxttrem(412);
    background: url("../../assets/images/banner.png") no-repeat center;
    background-size: 100% 100%;
    margin: 0 auto;
    position: relative;
    &-top{
        display: flex;
        padding: pxttrem(24) 0 0 0;
        .language{
            width: pxttrem(50);
            height: pxttrem(50);
            background: url("../../assets/images/language.png") no-repeat center;
            background-size: 100% 100%;
            margin-left:pxttrem(574);
        }
        .dengduo{
            width: pxttrem(50);
            height: pxttrem(50);
            background: url("../../assets/images/gengduo.png") no-repeat center;
            background-size: 100% 100%;
            margin-left:pxttrem(40);
        }
    }
    &-bottom{
        position: absolute;
        right: pxttrem(40);
        bottom: pxttrem(44);
        // width: pxttrem(325);
        padding: 0 pxttrem(10);
        height: pxttrem(84);
        background: #560AA0;
        border-radius: pxttrem(16);
        border: pxttrem(2) solid;
        border-image: linear-gradient(135deg, rgba(110, 25, 194, 1), rgba(110, 25, 194, 1)) pxttrem(2) pxttrem(2);
        display: flex;
        justify-content: space-around;
        align-items: center;
        .icon{
            width: pxttrem(64);
            height: pxttrem(66);
            background: url("../../assets/images/right.png") no-repeat center;
            background-size: 100% 100%;
        }
    }
  }
  .copy{
        font-size: pxttrem(28);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #C000FF;
        line-height: pxttrem(40);
        margin-left: pxttrem(24);
        cursor: pointer;
    }
  .address{
    font-size: pxttrem(28);
  }
  .info{
    width: pxttrem(670);
    // height: pxttrem(268);


    background: #322267;
    border-radius: pxttrem(16);
    margin: pxttrem(20) auto;
    font-size: pxttrem(28);
    .card{
        display: flex;
        align-items: center;
        padding: pxttrem(34) 0 0 pxttrem(40);
        &-info{
            width: pxttrem(48);
            height: pxttrem(50);
            background: url('../../assets/images/usdt.png') no-repeat center;
            background-size: 100% 100%;
        }
        &-price{
            margin-left: pxttrem(10);
            font-size: pxttrem(40);
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
            line-height: pxttrem(56);
        }
    }
    .content{
        // width: pxttrem(480);
        width:pxttrem(580);
        margin: pxttrem(26) auto 0;
        display: flex;
        justify-content: space-between;
        font-size: pxttrem(28);
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ddd;
    }
    .button{
        width: pxttrem(480);
        height: pxttrem(84);
        text-align: center;
        margin: pxttrem(30) auto 0;
        background: linear-gradient(135deg, #593FFB 0%, #BF14F4 100%);
        border-radius: pxttrem(42);
        font-size: pxttrem(32);
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: pxttrem(84);
        cursor: pointer;
    }
    .button:active{
        background: linear-gradient(135deg, #593FFB 0%, #BF14F4 100%) !important;
        opacity: 0.6 !important;
    }
    .line{
        width: pxttrem(589);
        height: pxttrem(2);
        background: #FFFFFF;
        opacity: 0.08;
        margin: 0 auto;
    }
    .btn-class{
        height: pxttrem(50);
        // width: pxttrem(100);
        padding: 0 pxttrem(10);
        text-align: center;
        line-height: pxttrem(50);
        font-size: pxttrem(28);
        color: #fff;
        background: linear-gradient(135deg, #593FFB 0%, #BF14F4 100%);
    }
    .infoline{
        width: pxttrem(589);
        height: pxttrem(88);
        // font-size: pxttrem(28);
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: pxttrem(28);
        color: RGBA(132, 122, 163, 1);
        .col{
            color: #FFFFFF;
        }
       .con{
            display: flex;
            align-items: center;
            .text{
                width: pxttrem(344);
                height: pxttrem(52);
                background: rgba(256,256,256,0.1);
                border-radius: pxttrem(4);
                div{
                    font-size: pxttrem(24);
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: rgba(256,256,256,0.1);
                    line-height: pxttrem(52);
                    text-align: center;
                }
            }
       }
    }
  }
  .info1{
    height: pxttrem(296);
  }
//   .info2{
//     margin-bottom: pxttrem(20);
//   }
// }
// @media only screen and (min-width: 780px){
    
// }
</style>