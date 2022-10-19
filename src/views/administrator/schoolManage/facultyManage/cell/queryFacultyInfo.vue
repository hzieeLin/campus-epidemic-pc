<template>
  <el-dialog @close="onClose" v-model="props.queryShowVisible" title="查看">
    <div v-if="!showCard">
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
      <el-descriptions title="教职工日常打卡">
        <el-descriptions-item>
          <el-button @click="showCard = true">查看详情</el-button>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div v-else>
      <left-outlined class="cursor" @click="showCard = false"/>
      <a-calendar v-model:value="value" :locale="locale">
        <template #dateCellRender="{ current }">
          <ul class="events">
            <li v-for="item in getListData(current)" :key="item.content">
              <a-badge :status="item.type" :text="item.content" />
            </li>
          </ul>
        </template>
        <template #monthCellRender="{ current }">
          <div v-if="getMonthData(current)" class="notes-month">
            <section>{{ getMonthData(current) }}</section>
            <span>Backlog number</span>
          </div>
        </template>
      </a-calendar>
    </div>
    <template #footer>
      <el-button @click="onClose">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {locale} from '../../locale'
import { Dayjs } from 'dayjs';
import {ref, watch} from "vue";
import {GetFacultyDaily} from "../../../../../api/administrator/query";
const emit = defineEmits(['onClose'])
const props = defineProps(['queryShowVisible','queryFacultyInfo'])
const showCard = ref(false)
const onClose = () => {
  emit('queryClose', false)
}
const  value = ref<Dayjs>()
const getListData = (value: Dayjs) => {
  let listData;
  switch (value.month() === 9 && value.date()) {
    case 8:
      listData = [
        { type: 'success', content: '健康码正常' },
        { type: 'success', content: '今日已打卡' },
      ];
      break;
    case 9:
      listData = [
        { type: 'success', content: '健康码正常' },
        { type: 'success', content: '今日未打卡' },
      ];
      break;
    case 10:
      listData = [
        { type: 'success', content: '健康码异常' },
        { type: 'success', content: '今日已打卡' },
      ];
      break;
    default:
  }
  return listData || [];
};
watch(() => showCard.value, (newVal) => {
  if (newVal) {
    getFacultyDaily()
  }
})
const getFacultyDaily = () => {
  const data = {
    code: props.queryFacultyInfo.code
  }
  GetFacultyDaily(data).then(res => {
    console.log(res)
  })
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
