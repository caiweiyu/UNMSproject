<template>
  <div>
    <el-dialog
        title="请务必填写上级地址"
        :visible.sync="isSwitch"
        :center="true"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        top="50%"
        width="90%">
        <el-input v-model="val3" placeholder="请务必填写上级地址"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="enter">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    props:{
        info:{
            type:Object,
            default:{}//0x0000000000000000000000000000000000000000
        }
    },
    name:"popover",
    data(){
        return {
            val3:""
        }
    },
    methods:{
        enter(){
            let isMatch = this.val3.match(/^(0x)?[0-9a-fA-F]{40}$/);
            if(isMatch == null){
                this.$message.error("请检查账户是否正确")
                return;
            }
            this.closeWindow(this.val3)
        }
    },
    computed:{
      ...mapState({
            isSwitch:(state) => state.user.isSwitch
      })
    }
}
</script>

<style>

</style>