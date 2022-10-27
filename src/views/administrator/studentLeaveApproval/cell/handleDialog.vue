<template>
  <el-dialog
      v-if="props.handleShowVisible"
      v-model="showVisible"
      id="dialog"
      title="请假处理"
      top="10vh"
      width="50%"
      @close="onClose">
    <el-descriptions title="基本信息" :column="3" border v-if="!showReason">
      <el-descriptions-item
          label="学号"
          label-align="center"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
          width="150px">{{stuInfo.code}}</el-descriptions-item>
      <el-descriptions-item label="姓名" label-align="center" align="center">{{stuInfo.name}}</el-descriptions-item>
      <el-descriptions-item label="目的地" label-align="center" align="center">{{stuInfo.target}}</el-descriptions-item>
      <el-descriptions-item label="请假类型" label-align="center" align="center">
        <el-tag size="small">{{stuInfo.type=== 0 ? '事假': '病假'}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="信誉等级" label-align="center" align="center">{{stuInfo.reputation}}</el-descriptions-item>
      <el-descriptions-item label="请假理由" label-align="center" align="center">{{stuInfo.reason}}</el-descriptions-item>
      <el-descriptions-item label="时间类型" label-align="center" align="center">
        <el-tag class="ml-2" type="warning" v-if="stuInfo.isStrideCounty===1">跨市</el-tag>
        <el-tag class="ml-2" type="success" v-else>非跨市</el-tag>
        <el-tag class="ml-2" type="danger" v-if="stuInfo.isStrideDay === 1">跨天</el-tag>
        <el-tag class="ml-2" type="success" v-else>非跨天</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="出校时间" label-align="center" align="center">{{stuInfo.estimateStartTime}}</el-descriptions-item>
      <el-descriptions-item label="返校时间" label-align="center" align="center">{{stuInfo.estimateEndTime}}</el-descriptions-item>
    </el-descriptions>
    <div class="reason-box" v-else>
      <div class="header-box">
        <img src="../../../../assets/images/touxiang.png" style="height: 40px;width: 40px; margin-top: 3px" alt="">
        <div class="right-box">
          <div class="name">{{stuInfo.name}}</div>
          <div>请假理由：{{stuInfo.reason}}</div>
          <el-button class="reputation" v-if="stuInfo.reputation === '优秀'" type="success">信誉{{stuInfo.reputation}}</el-button>
          <el-button class="reputation" v-else-if="stuInfo.reputation === '一般'" type="primary">信誉{{stuInfo.reputation}}</el-button>
          <el-button class="reputation" v-else-if="stuInfo.reputation === '及格'" type="warning">信誉{{stuInfo.reputation}}</el-button>
          <el-button class="reputation" v-else type="danger">信誉{{stuInfo.reputation}}</el-button>
        </div>
      </div>
      <div class="char-box" id="box" ref="box">
        <div v-for="(item, index) in charList" :key="item.id">
          <div v-if="item.type === 1|| item.type === 3" style="text-align: center">
            {{item.createTime}}
          </div>
          <div class="chat-item"  :style="item.type === 1|| item.type === 3 ? 'flex-direction: row;':'flex-direction: row-reverse;'">
            <img src="../../../../assets/images/touxiang.png" style="height: 40px;width: 40px; margin-top: 3px" alt="">
            <div class="msg" :style="item.type === 1|| item.type === 3 ? 'margin-left: 10px;':'margin-right: 10px;'">{{item.message}}</div>
          </div>
        </div>
        <div style="height: 30px;">
        </div>
      </div>
      <div class="footer-box">
        <el-input type="textarea" v-model="reason" rows="6"></el-input>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer" v-if="!footerShow">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="onComment(0)">回复</el-button>
         <el-button type="danger" @click="onComment(1)">拒绝</el-button>
        <el-button type="success" @click="onComment(2)">同意</el-button>
      </span>
      <span class="dialog-footer" v-else>
<!--        <el-button @click="onClose">取消</el-button>-->
<!--        <el-button type="primary" @click="onSure">确定</el-button>-->
        <el-button type="primary" @click="dealReturnLeave" style="width: 60px; height: 30px;" :disabled="reasonDisable">发送</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {onMounted, onUpdated, ref, watch, getCurrentInstance, reactive} from "vue";
import {DealReturnLeave} from "../../../../api/administrator/insert";
import {GetPageLeaveList, QueryLeaveDetail} from "../../../../api/administrator/query.js"
const props = defineProps(['handleShowVisible','stuInfo'])
const stuInfo = ref({})
// eslint-disable-next-line vue/no-setup-props-destructure
stuInfo.value = props.stuInfo
const emit = defineEmits(['onSure', 'onClose'])
const showVisible = ref(true)
const footerShow = ref(false)
let { ctx: proxy } = getCurrentInstance()
watch(()=> props.handleShowVisible ,(newVal) => {
  console.log(newVal)
  if (newVal === false) {
    footerShow.value = false
  } else {
    stuInfo.value = props.stuInfo
    getLeaveDetailById(stuInfo.value.id)
  }
},{immediate: true})
const getLeaveDetailById = (id) => {
  const data = { id: id}
  QueryLeaveDetail(data).then(res => {
    charList.value = res.data
  })
}
const showReason = ref(false)
const reason = ref('')
const reasonDisable = ref(true)
const box = ref(null)
box.value = proxy.$refs.box
onMounted(() => {
})
watch(() => reason.value, (newVal) => {
  reasonDisable.value = newVal === '';
}, {immediate: true})
const dealReturnLeave = () => {
  const data = {
    id: stuInfo.value.id,
    message: reason.value
  }
  DealReturnLeave(data).then(() => {
    proxy.$forceUpdate();
    box.value.scrollTop = box.value.scrollHeight + '60'
    console.log(box.value.scrollHeight)
    getLeaveDetailById(stuInfo.value.id)
    reason.value = ''
  })
}
watch(() => stuInfo.value, (newVal) => {
  stuInfo.value = newVal
})
const onComment = (state) => {
  switch (state) {
    case 0:
      showReason.value = true
      footerShow.value = true
      break
    case 1:
      onSure(1, stuInfo.value.id, '拒绝')
      break
    case 2:
      onSure(2, stuInfo.value.id,'同意')
  }
}
const onClose = () => {
  emit('onClose', false)
  footerShow.value = true
  showReason.value = false
}
const onSure = (state, id, reason) => {
  emit('onSure', {type: state, id: id, commit: reason})
}
// watch(() => stuInfo.value, (newVal) => {
//   newVal.complex.shift()
//   charList.value = newVal.complex
// })
watch(() => box.value, (newVal) => {
  console.log(newVal)
  if (newVal === undefined) {
    return
  }
  console.log(box.value.scrollHeight)
  box.value.scrollTop = box.value.scrollHeight
})
const charList = ref([])
</script>

<style lang="less" scoped>
.title {
  margin-top: 15px;
  color: #000;
  font-weight: 600;
  font-size: 16px;
}
.steps {
  margin: 15px auto;
  width: 90%;
  height: 100px;
}
.reason-box {
  width: 100%;
  border: 1px solid #e0e0e0;
  height: 600px;
  display: flex;
  flex-direction: column;
  .header-box {
    height: 10%;
    margin: 0 10px;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    position: relative;
    .right-box {
      margin-left: 10px;
      .name {
        font-size: 20px;
        color: #000000;
      }
      .reputation {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .char-box {
    height: 400px;
    padding: 16px 16px 0;
    background: #fafafa;
    overflow: auto;
    .chat-item {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
    }
    .msg {
      border: 1px solid #e0e0e0;
      font-size: 16px;
      padding: 5px;
    }
  }
  .footer-box {
    flex: 1;
    border-top: 1px solid #000;

  }
}
</style>
