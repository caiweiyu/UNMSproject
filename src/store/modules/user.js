const user = {
    namespaced: true,
    state:{
        isPc:true,
        isConnected:false,
        setNetwork:"",
        setWallet:"***",
        setBalance:0,
        setConnected:false,
        setMessage:"Connect Wallet",
        userAddress:null,
        getTickets:0,
        balances:0,
        cbbbalance:0,
        address:null,
        buyNumber:0,
        bnbBalance:0,  //bnb余额
        usdtBalance:0,  //usdt余额
        wandBalance:0,  //stf_token余额
        myCollectList:"",  //我的下级数量
        inviteOrdernum:0,
        viper:0,  //获取vip等级
        userinfo:{
            inviteBonusAmount:0,
            claimedInviteBonusAmount:0
        }, //用户信息
        generate:{

        },//产生收益
        isSwitch:true, //全局关闭窗口
        myUpaddress:"",
        UNMSBalance:0, //unms余额
        UNMS_price:0,  //unms币价
        teamUsdt:0,  //团队投入的u
        tip:{ //提示
            status:false,
            content:""
        },
        teamMemberCount:0,
        getTodayLimitAmount:0,//今日可销售量
        daySoldAmount:0//当天已销售量
    },
    mutations:{
        committeamMemberCount: (state, teamMemberCount) => {
            state.teamMemberCount = teamMemberCount;
        },
        commitisConnected: (state, isConnected) => {
            state.isConnected = isConnected;
        },
        commitsetNetwork: (state, setNetwork) => {
            state.setNetwork = setNetwork;
        },
        commitsetWallet: (state, setWallet) => {
            state.setWallet = setWallet;
        },
        commitsetBalance: (state, setBalance) => {
            state.setBalance = setBalance;
        },
        commitsetConnected: (state, setConnected) => {
            state.setConnected = setConnected;
        },
        commitsetMessage: (state, setMessage) => {
            state.setMessage = setMessage;
        },
        commitUserAddress: (state, userAddress) => {
            state.userAddress = userAddress;
        },
        commitGetTickets: (state, getTickets) =>{
            state.getTickets = getTickets;
        },
        commitBalance: (state,balances) =>{
            state.balances = balances;
        },
        commitCbbbalance: (state,cbbbalance) =>{
            state.cbbbalance = cbbbalance;
        },
        commitAdress:(state,address)=>{
            state.address = address;
        },
        commitbuyNumber:(state,buyNumber)=>{
            state.buyNumber = buyNumber;
        },
        commitbnbBalance:(state,bnbBalance)=>{
            state.bnbBalance = bnbBalance;
        },
        commitusdtBalance:(state,usdtBalance)=>{
            state.usdtBalance = usdtBalance;
        },
        commitmyCollectList:(state,myCollectList)=>{
            state.myCollectList = myCollectList;
        },
        commitwandBalance:(state,wandBalance)=>{
            state.wandBalance = wandBalance;
        },
        commitinviteOrdernum:(state,inviteOrdernum)=>{
            state.inviteOrdernum = inviteOrdernum;
        },
        commitViper:(state,viper)=>{
            state.viper = viper;
        },
        commitUserinfo:(state,userinfo)=>{
            state.userinfo = userinfo;
        },
        commitisSwitch:(state,isSwitch)=>{
            state.isSwitch = isSwitch;
        },
        commitmyUpaddress:(state,myUpaddress)=>{
            state.myUpaddress = myUpaddress;
        },
        commitGenerate:(state,generate)=>{
            state.generate = generate;
        },
        commitUNMSBalance:(state,UNMSBalance)=>{
            state.UNMSBalance = UNMSBalance;
        },
        commitUNMS_price:(state,UNMS_price)=>{
            state.UNMS_price = UNMS_price;
        },
        committeamUsdt:(state,teamUsdt)=>{
            state.teamUsdt = teamUsdt;
        },
        committip:(state,tip)=>{
            state.tip = tip;
        },
        commitgetTodayLimitAmount:(state,getTodayLimitAmount)=>{
            state.getTodayLimitAmount = getTodayLimitAmount;
        },
        commitdaySoldAmount:(state,daySoldAmount)=>{
            state.daySoldAmount = daySoldAmount;
        },

    },
    actions:{

    }
}
export default user;