<template>
  <el-dialog
      v-model="props.warnShowVisible"
      title="提示"
      width="30%"
      :before-close="onClose"
  >
    <span>{{props.warnMessage}}</span>
    <div v-show="props.msgType === 'area'">修改风险等级</div>
    <el-radio-group v-model="optionValue" v-show="props.msgType === 'area'">
      <el-radio :label="0">低风险</el-radio>
      <el-radio :label="1">中风险</el-radio>
      <el-radio :label="2">高风险</el-radio>
    </el-radio-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onClose">取消</el-button>
        <el-button v-if="props.msgType === 'area'" type="primary" @click="editLevel">确定</el-button>
        <el-button v-else-if="props.msgType === 'leave'" type="primary" @click="approval">确定</el-button>
        <el-button v-else-if="props.msgType === 'faculty'" type="primary" @click="onSure">确定</el-button>
        <el-button v-else-if="props.msgType === 'stu'" type="primary" @click="onDelStu">确定</el-button>
        <el-button v-else-if="props.msgType === 'del-faculty'" type="primary" @click="onDelFaculty">确定</el-button>
        <el-button v-else-if="props.msgType === 'feedbackAccess'||props.msgType === 'feedbackReject'||props.msgType === 'feedbackUnable'" type="primary" @click="onProcess">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref} from "vue";

const emit = defineEmits(['onClose','onSure', 'editLevel','approval', 'onDelStu','onDelFaculty', 'onProcess'])
const props = defineProps(['warnShowVisible','warnMessage', 'msgType'])
const optionValue = ref(undefined)
const onClose = () => {
  emit('warnClose', {is: false})
}
const onSure = () => {
  emit('onSure', {is: true})
}
const editLevel = () => {
  emit('editLevel', {level: optionValue})
}
const approval = () => {
  if (props.warnMessage === '确定通过该学生的请假审批！') {
    emit('approval', {agree: true})
  } else if (props.warnMessage === '确定拒绝该学生的请假审批！') {
    emit('approval', {agree: false})
  }
}
const onProcess = () => {
  if (props.msgType === 'feedbackAccess') {
    emit('onProcess', {agree: 1})
  } else if (props.msgType === 'feedbackAccess'){
    emit('onProcess', {agree: 2})
  } else if (props.msgType === 'feedbackUnable') {
    emit('onProcess', {agree: 3})
  }
}
const onDelStu = () => {
  emit('onDelStu', {})
}
const onDelFaculty = () => {
  emit('onDelFaculty', {})
}
</script>

<style lang="less" scoped>

</style>
