<template>
  <div class="page-container">
    <div class="login-container">
      <div class="null"></div>
      <div class="mid-img">
<!--        <img src="../../assets/images/account_left.png" alt="">-->
      </div>
      <div class="right-form">
        <div class="form-box">
          <div class="top-switch"><span>登录</span></div>
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
              <el-form-item style="display: flex; justify-content: space-between">
                <div style="flex-basis: 60%"><el-input></el-input></div>
<!--                <img src="../../assets/images/account_left.png" width="80" height="40" alt="">-->
              </el-form-item>
              <el-form-item>
                <el-button @click="login">登录</el-button>
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
                <el-button @click="loginByPhone">登录</el-button>
              </el-form-item>
              <div class="phone" @click="changeLoginType(true)">账号登录</div>
            </el-form>
          </div>
        </div>
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
  username: 'adminjisuanji',
  password: '123456',
  code: ''
})
const router = useRouter()
import { useUserStore, useMenuStore } from '../../stores/index.js'
import {AccountLogin} from "../../api/account";
import util from "../../util";

const login = () => {
  const list = {
    account: loginInfo.username,
    password: loginInfo.password
  }
  AccountLogin(list).then(res => {
    util.cookies.set('token', res.token)
    const menu = useMenuStore()
    const user = useUserStore()
    menu.getMenus()
    user.setInfo(res.information)
    if (res.userType === '管理员') {
      router.replace('/statisticalAnalysis')
    } else {
      router.replace('/isolationFeedbackProcess')
    }
    }).catch(err => {
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
  background: #ECECEC;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-container {
    width: 65%;
    height: 70%;
    background: #FFFFFF;
    display: flex;
    box-shadow: 5px 5px 20px rgba(0,0,0,0.2);
    .null {
      flex-basis: 8%;
    }
    .mid-img {
      flex-basis: 42%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right-form {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .form-box {
        width: 70%;
        height: 80%;
        //border: #e0e0e0 1px solid;
        .top-switch {
          height: 20%;
          display: flex;
          align-items: center;
          padding: 0 10%;
          span {
            font-size: 22px;
            position: relative;
            //&:after {
            //  content: "";
            //  position: absolute;
            //  width: 44px;
            //  height: 4px;
            //  background: #000;
            //  left: 0;
            //  bottom: -20%;
            //}
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
