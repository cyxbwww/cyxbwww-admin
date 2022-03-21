<!--
 * @Description 登录背景
 * @Author luomingfeng
 * @Date 2022/3/21 23:35
-->
<template>
  <div class="login-bg">
    <div class="login-bg-top">
      <corner-top />
    </div>
    <div class="login-bg-bottom">
      <corner-bottom />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CornerTop, CornerBottom } from './components'
</script>

<style lang="scss" scoped>
.login-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .login-bg-top {
    position: absolute;
    top: -900px;
    right: -300px;
  }

  .login-bg-bottom {
    position: absolute;
    bottom: -400px;
    left: -200px;
  }
}
</style>
