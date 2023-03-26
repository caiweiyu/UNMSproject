<template>
  <div class="f-dialog" v-if="visible" @click.stop="close()">
    <div class="dialog" @click.stop="">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      msg: 0
    }
  },
  methods: {
    close (e) {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped>
.f-dialog {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
}

.dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
