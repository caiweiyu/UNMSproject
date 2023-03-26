<template>
  <div id="app">
    <router-view/>
    <toastTip />
  </div>
</template>
<script>
import toastTip from "./components/toast_tip.vue"
export default {
  name:'app',
  data(){
    return {

    }
  },
  components:{
    toastTip
  }
}
</script>
<style>
html,body {
  background-color: #eee;
  font-size: 16px;
  min-height: 100vh;
  background: #030e21;
}
 li{

list-style: none;

}
input{  
	background:none;  
	outline:none;  
	border:0px solid #ccc;
}
input:focus{   
	border:none;
}
.Chidui_Input input{
  height: 36px !important;
  border: 0px solid #DCDFE6;
}
</style>
