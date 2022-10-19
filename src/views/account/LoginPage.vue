<template>
  <div class="page-container flex-center-center">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="login-container">
      <h1 class="title">校园疫情防控系统</h1>
      <div class="right-form flex-end-center">
        <div class="form-box">
          <div class="top-switch flex-align-center"><div>登录</div></div>
          <div class="form">
            <el-form v-if="loginType">
              <el-form-item>
                <el-input placeholder="请输入工号/手机号" v-model="loginInfo.username"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="请输入密码" :type="pwdType" v-model="loginInfo.password">
                  <template #suffix>
                    <el-icon class="el-input__icon cursor" @click="changeView(false)" v-if="view"><View /></el-icon>
                    <el-icon class="el-input__icon cursor" @click="changeView(true)" v-else><Hide /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <!--              <el-form-item style="display: flex; justify-content: space-between">-->
              <!--                <div style="flex-basis: 60%"><el-input></el-input></div>-->
              <!--                <img src="../../assets/images/account_left.png" width="80" height="40" alt="">-->
              <!--              </el-form-item>-->
              <el-form-item>
                <el-button @click="login" style="background: #3588F0; font-size: 16px">登 录</el-button>
              </el-form-item>
              <div class="phone" @click="changeLoginType(false)">手机号登录</div>
            </el-form>
            <el-form v-else>
              <el-form-item>
                <el-input placeholder="请输入手机号码" v-model="loginInfo1.phone">
                  <template #prepend>+86</template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="请输入验证码" :type="pwdType" v-model="loginInfo1.code">
                  <template #append>
                    <div v-if="timeType" style="cursor: pointer" @click="TimeClick">获取验证码</div>
                    <div v-else style="cursor: pointer">重新发送{{Times}}s</div>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
              </el-form-item>
              <el-form-item>
                <el-button @click="loginByPhone" style="background: #3588F0; font-size: 16px">登录</el-button>
              </el-form-item>
              <div class="phone" @click="changeLoginType(true)">账号登录</div>
            </el-form>
          </div>
        </div>
      </div>
      <div class="mid-img flex-center-center">
        <img src="../../../src/assets/images/协同工作.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { reactive, ref} from "vue";
const view = ref(true)
const pwdType = ref('password')
const changeView = (state) => {
  view.value = state
  pwdType.value = state === true ? 'text': 'password'
}
const loginInfo = reactive({
  // username: '0422',
  username: 'adminjisuanji',
  password: '123456',
  code: ''
})
const router = useRouter()
import { useUserStore, useMenuStore } from '../../stores/index.js'


import {AccountLogin} from "../../api/account";
import util from "../../util";
import {GetMenus} from "../../api/system/menu";
const login = () => {
  const list = {
    account: loginInfo.username,
    password: loginInfo.password
  }
  AccountLogin(list).then(res => {
    util.cookies.set('token', res.token)
    GetMenus().then((res) => {
      const menu = useMenuStore()
      menu.setMenus(res)
    })
    const user = useUserStore()
    user.setInfo(res.information)
    if (res.userType === '管理员') {
      router.replace('/statisticalAnalysis')
    } else {
      router.replace('/isolationFeedbackProcess')
    }
    })

}
const loginInfo1 = reactive({
  phone: '',
  code: ''
})
const loginByPhone = () => {
}

const timeType = ref(true)
const TimeClick = () => {
  timeType.value = false
}
const loginType = ref(true)
const Times = ref(60)
const changeLoginType = (state) => {
  loginType.value = state
  // 调用手机验证码的接口
  let times = setInterval(() => {
    Times.value--
    if (Times.value === 0) {
      clearInterval(times)
      timeType.value = true
    }
  },1000)
}


</script>

<style lang="less" scoped>
.page-container {
  width: 100vw;
  height: 100vh;
  background: #F6FAFF;
  position: relative;
  .circle {
    width: 600px;
    height: 600px;
    background: #98B5ED;
    border-radius: 100% 40% 100% 10%;
    position: absolute;
    bottom: -40%;
    left: 10%;
    transform: translate(-50%, -50%);
  }
  .circle:nth-child(1) {
    position: absolute;
    top: 10%;
    left: 90%;
    transform: translate(-50%, -50%);
  }

  .login-container {
    border: 5px solid #155B9D;
    border-radius: 40px;
    width: 70%;
    height: 80%;
    display: flex;
    position: relative;
    background: #F6FAFF;
    .title {
      position: absolute;
      transform: translate(-50%, -50%);
      top: 10%;
      left: 16%;
      font-weight: bolder;
      font-size: 40px;
      color: #4F5C74;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }
    .mid-img {
      flex-basis: 70%;
      img {
        width: 70%;
      }
    }
    .right-form {
      flex: 1;
      .form-box {
        width: 80%;
        height: 80%;
        margin-top: 200px;
        .top-switch {
          height: 20%;
          padding: 0 10%;
          font-weight: bolder;
          div {
            font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
            width: 100%;
            color: #58687D;
            text-align: right;
            font-size: 20px;
            position: relative;
          }
        }
        .form {
          height: 50%;
          padding: 5% 10% 0;
          :deep(.el-button) {
            width: 100%;
            color: #f7f7f7;
            background: #333333;
            height: 44px;
          }
        }
        .phone {
          user-select: none;
          font-size: 14px;
          text-align: right;
          cursor: pointer;
        }
      }
    }
  }
}
:deep(.el-input__inner) {
  --el-input-inner-height: 44px;
  font-size: 16px;
}
:deep(.el-form-item__content) {
  justify-content: space-between;
}
</style>
