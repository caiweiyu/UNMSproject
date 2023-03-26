import Web3 from "web3";
import Vue from 'vue';

// import stf_abi3 from "@/abi/stf_abi3.json"
import unms_abi from '@/abi/Unms.json'
import Dapp_abi from '@/abi/Dapp.json'
import Usdt_abi from '@/abi/Usdt.json'

import { Toast } from 'vant';
Vue.use(Toast);
export default {
  install(Vue, options) {

    var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    var WalletAddress = '';//我的地址
    //  正式链
    // var FishToken='0x5d049cfa912d63086385f61f44ea9de7A552e2f3';// 代币
    // var ReleaseToken='0x8503F0006d1D5E6Eb0Bb71f72B4187F04238FfEb';//私募合约

    //  主网UNMS
    var unms_Coins = '0xC409fd85c0e849Fa9a593989f03D616a353B47eA';
    var dapp_addr = '0x1603e4726A8e2Db4634C1AE9302745a1d18678B0';
    // 测试usdt
    var usdt_addr = '0x7848EC33D21561b0755c423C7cf03f5018e18613';

    //methods
    var unms = new web3.eth.Contract(unms_abi,unms_Coins);
    var dapp = new web3.eth.Contract(Dapp_abi,dapp_addr);
    var usdt = new web3.eth.Contract(Usdt_abi,usdt_addr);

    // 链接钱包
    Vue.prototype.LinkBNB = function (e) {
      console.log("进入了链接")
      if (typeof window.ethereum !== 'undefined') {
        ethereum.request({ method: 'net_version' }).then(chain => {
          console.log("当前链ID" + chain)
          // alert(chain) 56主网  97ceshiwang  5Goerli测试网
          console.log(web3.utils.toHex('56'))
          if (chain != 56) {
            const data = [{
              chainId: '0x38',
              chainName: 'Binance Smart Chain Mainnet',
              nativeCurrency:
              {
                name: 'Binance',
                symbol: 'BNB',
                decimals: 18
              },
              rpcUrls: ['https://bsc-dataseed.binance.org'],
              blockExplorerUrls: ['https://bscscan.com/']
            }]
            ethereum.request({ method: "wallet_addEthereumChain", params: data, }).then((result) => {
              console.log('result1=',result)
              ethereum.enable().then(res => {
                console.log('钱包地址=',res[0])
                WalletAddress = res[0]
                this.$store.commit("user/commitAdress",res[0]);
                //获取钱包余额
                web3.eth.getBalance(res[0]).then(res=>{
                  console.log('钱包余额1=',res)
                  this.$store.commit('user/commitbnbBalance',(Number(res)/Math.pow(10,18)).toFixed(2))
                });
                this.getUnms()
                this.getInfo()
                if (e != 1) {
                  // this.loginSuccessful(res[0]); 
                }
              }).catch((error) => {
                this.$message.error(this.$tc('home.PleaseConnectWallet'));
              })
            }).catch((error) => {
              this.$message.error(this.$tc('home.PleaseConnectWallet'));
            })
          } else {
            ethereum.enable().then(res => {
              console.log('钱包地址2=',res[0])
              WalletAddress = res[0]
              //钱包地址
              this.$store.commit("user/commitAdress",res[0]);
              //获取钱包余额
              web3.eth.getBalance(res[0]).then(res=>{
                console.log('钱包余额2=',res)
                this.$store.commit('user/commitbnbBalance',(Number(res)/Math.pow(10,18)).toFixed(2))
              });
              this.getUnms()
              this.getInfo()
              //   this.ProductListABI(res[0])
              if (e != 1) {
                // this.loginSuccessful(res[0])
              }

            }).catch((error) => {
              this.$message.error(this.$tc('home.PleaseConnectWallet'));
              console.log('error111=',error)
            })
          }
        })
      } else {
        this.$message.error(this.$tc('home.PleaseConnectWallet'));
      }
    };
    // UNMS
    Vue.prototype.getUnms = function(){
      console.log('WalletAddress=',WalletAddress)
      unms.methods.getTodayLimitAmount(WalletAddress).call().then((res)=>{
        console.log('买的数量-限购总量=',res)
      }).catch((error)=>{
        console.log('error=',error)
      })
      unms.methods.getReleaseableAmount().call().then((res)=>{
        var param = (res/Math.pow(10,18)).toString();
        console.log('查某个地址今天可以买的数量，还顺便返回当天限购总量=',param)
      }).catch((error)=>{
        console.log('error=',error)
      })
      //unms余额
      unms.methods.balanceOf(WalletAddress).call().then((res)=>{
        console.log('数量===',res)
        this.$store.commit("user/commitUNMSBalance",(Number(res)/Math.pow(10,18)).toFixed(2));
      }).catch((error)=>{
        console.log('error=',error)
      })
    }
    // DAPP
    Vue.prototype.getDapp = async function(data){
      var param = data.toString()+"000000000000000000";
      var upadress = this.$store.state.user.myUpaddress;//获取上级地址
      console.log('参数',data,param)
      console.log('upadress',upadress)
      if(!upadress || upadress==undefined) {
        this.$message.error(this.$tc('home.Pleasepurchasethroughtheinvitationlink'));
        upadress = '0x0000000000000000000000000000000000000000'; // 设置一个默认值
        // return; // 如果需要通过邀请链接才能购买，把这个注释打开
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      let allowanceUsdtAmount = Number(await usdt.methods.allowance(WalletAddress, dapp_addr).call())/1e18;
      console.log('allowanceUsdtAmount', allowanceUsdtAmount);
      if(allowanceUsdtAmount<data){
        // 授权的额度不足，需要再授权
        const txDetail = await usdt.methods.approve(dapp_addr, param)
          .send({from:WalletAddress})
          .catch((error) => {
              loading.close();
              console.log("call usdtContract.approve() error", error);
              if(error.message == "Invalid parameters: must provide an Ethereum address."){
                this.$message.error(this.$tc('home.Whethertoconnecttotheactiveaddress'));
              }else{
                this.$message.error(this.$tc('home.Cancellationofauthorization'));
              }
          });
        loading.close();
        console.log("usdt.methods.approve txDetail",txDetail);
        if(undefined != txDetail && txDetail.status == true){
          this.$message.success(this.$tc('home.AuthorizationSucceeds'));
        }  
        return;
      }

      const txDetail = await dapp.methods.invest(param,upadress)
        .send({ from : WalletAddress })
        .catch((error) => {
            loading.close()
            console.log("call dapp.methods.invest error", error)
            if(error.message == "Invalid parameters: must provide an Ethereum address."){
              this.$message.error(this.$tc('home.Shouldconnecttoaactiveaddress'));
            }else{
              this.$message.error(this.$tc('home.Cancelbeingtraded'));
            }
        });
      
      loading.close();
      console.log("dapp.methods.invest txDetail",txDetail)
      if(undefined != txDetail && txDetail.status == true){
        this.$message.success(this.$tc('home.Investmentsuccess'));
        window.location.reload()
      }  
    }
    //获取用户最新等级，如果可以升级，显示升级按钮
    Vue.prototype.queryLevelRate = async function(data){
        let level = await dapp.methods.queryLevelRate(data).call();
        return level
    }
    // 获取用户信息
    Vue.prototype.getInfo =async function(){
      //查询用户信息
      await dapp.methods.getUserInfo(WalletAddress).call().then((res)=>{
        this.$store.commit("user/commitUserinfo",res);
        console.log('用户信息=',res)
      }).catch((error)=>{
        console.log('error=',error)
      })
      //查询已产出的收益
      dapp.methods.queryMintToken(WalletAddress).call().then((res)=>{
        this.$store.commit("user/commitGenerate",res);
        console.log('产出收益=',res)
      }).catch((error)=>{
        console.log('error=',error)
      })
      //查询所有的投资用户地址列表
      dapp.methods.getUserList().call().then((res)=>{
        // this.$store.commit("user/commitGenerate",res);
        // console.log('查询所有的投资用户地址列表=',res)
      }).catch((error)=>{
        console.log('error=',error)
      })
      //查询当前币价
      dapp.methods.getNowPrice().call().then((res)=>{
        console.log('查询当前币价=',res);
        this.$store.commit("user/commitUNMS_price",(res/Math.pow(10,18)).toFixed(6));
      }).catch((error)=>{
        console.log('error=',error)
      })
      //查询团队投入的U
      dapp.methods.queryTeamUsdtAmount(WalletAddress).call().then((res)=>{
        console.log('查询团队投入的usdt=',res);
        this.$store.commit("user/committeamUsdt",(res/Math.pow(10,18)));
      }).catch((error)=>{
        console.log('error=',error)
      })
      //查询团队人数
      dapp.methods.queryTeamMemberCount(WalletAddress).call().then((res)=>{
        console.log('团队人数=',res);
        this.$store.commit("user/committeamMemberCount",res);
      }).catch((error)=>{
        console.log('error=',error)
      })
    }
    //领取收益
    Vue.prototype.claimMintFn = async function(){
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
        await dapp.methods.claimMintToken().send({from:WalletAddress}).then((res)=>{
            console.log('领取res=',res)
            this.$message.success(this.$tc('home.Receivesuccessfully'));
            loading.close()
            window.location.reload()
          }).catch((error)=>{
            console.log('领取error=',error)
            loading.close()
        })
    },
    //领取奖励
    Vue.prototype.claimMintFn2 = async function(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
          await dapp.methods.claimInviteBonus().send({from:WalletAddress}).then((res)=>{
              console.log('领取成功res=',res)
              this.$message.success("领取成功");
              loading.close()
              window.location.reload()
            }).catch((error)=>{
              console.log('领取error=',error)
              loading.close()
          })
      },
      
    //升级
    Vue.prototype.upgradeMyLevel = async function(){
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
        await dapp.methods.upgradeLevelRate().send({from:WalletAddress}).then((res)=>{
            console.log('升级成功res=',res)
            this.$message.success(this.$tc('home.updatesuccessfully'));
            loading.close()
            window.location.reload()
          }).catch((error)=>{
            console.log('升级error=',error)
            loading.close()
        })
    }
  }
}