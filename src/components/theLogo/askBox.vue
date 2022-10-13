<template>
  <div class="logo-box" v-if="props.type=== 1">
    <div class="inner-box">
      <span class="inner-text">已通过</span>
    </div>
  </div>
  <div class="logo-box2" v-else-if="props.type === 2">
    <div class="inner-box2">
      <span class="inner-text2">未通过</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['type'])
</script>

<style lang="less" scoped>
.logo-box {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 4px solid #13ce66;
  position: relative;
  .inner-box {
    width: 50px;
    height: 50px;
    border: 2px solid #13ce66;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .inner-text {
      width: 60px;
      height: 20px;
      line-height: 20px;
      position: absolute;
      background: #fff;
      color: #13ce66;
      border-radius: 10px;
      left: 50%;
      top: 46%;
      font-size: 17px;
      display: block;
      text-align: center;
      //transform: ;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
}
.logo-box2 {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 4px solid #ff0000;
  position: relative;
  .inner-box2 {
    width: 50px;
    height: 50px;
    border: 2px solid  #ff0000;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .inner-text2 {
      width: 60px;
      height: 20px;
      line-height: 20px;
      position: absolute;
      background: #fff;
      color:  #ff0000;
      border-radius: 10px;
      left: 50%;
      top: 46%;
      font-size: 17px;
      display: block;
      text-align: center;
      //transform: ;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
}
</style>
