<template>
     <div>
        <div v-if="seconds > 0">
            <div class="ready1">
                <div class="div">{{d}}</div>
                <div>天</div>
                <div class="div">{{h}}</div>
                <div>时</div>
                <div class="div">{{m}}</div>
                <div>分</div>
                <div class="div">{{s}}</div>
                <div>秒后结束</div>
            </div>
        </div>
        <div v-else>
            <div class="ready">
                <div class="left">拍卖结束</div>
            </div>
        </div>
     </div>
</template>
<script>
export default {
    props:{
        isOver:{
            type:Boolean,
            default:false
        },
        seconds:{
            type:Number,
            default:()=>10
        }
    },
    data() {
        return {
            count: '', //倒计时
            // seconds: 81912, // 10天的秒数
            d:"",
            h:'',
            m:'',
            s:"",
            timer:null,
            status:true,
            time_num:null
        }
    },
    watch:{
        seconds:{
            handler(newVal,oldVal){
                console.log('新旧=',newVal,oldVal)
                this.time_num = newVal
            },
            deep:true,
            immediate:true
        }
    },
    mounted() {
        console.log('se',this.seconds,this.isOver)
        // this.time_num = this.seconds;
        this.Time() //调用定时器
    },
    methods: {
        // 天 时 分 秒 格式化函数
        countDown() {
            let d = parseInt(this.time_num / (24 * 60 * 60))
            this.d = d < 10 ? "0" + d : d
            let h = parseInt(this.time_num / (60 * 60) % 24);
            this.h = h < 10 ? "0" + h : h
            let m = parseInt(this.time_num / 60 % 60);
            this.m = m < 10 ? "0" + m : m
            let s = parseInt(this.time_num % 60);
            this.s = s < 10 ? "0" + s : s;
            // console.log('ddd=',d,h,m,s);
            if(this.d==0 && this.h==0 && this.m==0 && this.s==0){
                // console.log('结束');
                clearInterval(this.timer)
                this.status = false;
                this.$emit("isOverTime",true)
            }
            // this.count = d + '天' + h + '时' + m + '分' + s + '秒'
        },
        //定时器没过1秒参数减1
        Time() {
            this.timer = setInterval(() => {
                this.time_num -= 1
                this.countDown()
            }, 1000)
        },
    }
}
   </script>
   <style lang="scss" scoped>
    // width: 327px;
    // margin-left: 67px;
    .ready{
        background: #D8BE7A;
        font-size: 12px;
        font-family: Segoe UI-Regular, Segoe UI;
        font-weight: 400;
        color: #333333 !important;
        display: flex;
        align-items: center;
    .div{
        width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        font-size: 12px;
        color: #ffffff;
        background: #333333;
    }
    .left{
        margin-left: 87px;
    }
    }
    .ready1{
        background: #D8BE7A;
        font-size: 12px;
        font-family: Segoe UI-Regular, Segoe UI;
        font-weight: 400;
        color: #333333 !important;
        display: flex;
        align-items: center;
        // width: 178px;
    .div{
        width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        font-size: 12px;
        color: #ffffff;
        background: #333333;
    }
    .left{
        margin-left: 87px;
    }
}
    </style>