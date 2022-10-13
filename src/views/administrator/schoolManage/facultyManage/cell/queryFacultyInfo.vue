<template>
  <el-dialog @close="onClose" v-model="props.queryShowVisible" title="查看">
    <el-descriptions title="教职工基本信息">
      <el-descriptions-item label="工号">{{props.queryFacultyInfo.code}}</el-descriptions-item>
      <el-descriptions-item label="姓名">{{props.queryFacultyInfo.name}}</el-descriptions-item>
      <el-descriptions-item label="性别">{{props.queryFacultyInfo.sex}}</el-descriptions-item>
      <el-descriptions-item label="所属学院">{{props.queryFacultyInfo.deptName}}</el-descriptions-item>
      <el-descriptions-item label="联系方式">{{props.queryFacultyInfo.phone}}</el-descriptions-item>
      <el-descriptions-item label="是否为防疫人员">{{props.queryFacultyInfo.epidemicMark === 1 ? '是' : '否'}}</el-descriptions-item>
      <el-descriptions-item label="身份证">{{props.queryFacultyInfo.idCard}}</el-descriptions-item>
      <el-descriptions-item label="详细地址">{{props.queryFacultyInfo.address}}</el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <el-button @click="onClose">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
const emit = defineEmits(['onClose'])
const props = defineProps(['queryShowVisible','queryFacultyInfo'])
const onClose = () => {
  emit('queryClose', false)
}
</script>

<style scoped>
:deep(.el-dialog__title) {
  font-size: 1.3rem;
}
:deep(.el-descriptions__title) {
  font-size: 1rem;
}
:deep(.el-descriptions__body .el-descriptions__table .el-descriptions__cell) {
  font-size: 16px;
}
</style>
