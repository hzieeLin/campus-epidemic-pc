<template>
  <div>
    <el-dialog @close="onClose" v-model="props.queryShowVisible" title="查看" top="5%">
      <div v-if="!showCard">
        <el-descriptions title="学生基本信息" >
          <el-descriptions-item label="学号">{{props.queryStuInfo.code}}</el-descriptions-item>
          <el-descriptions-item label="姓名">{{props.queryStuInfo.name}}</el-descriptions-item>
          <el-descriptions-item label="性别">{{props.queryStuInfo.sex}}</el-descriptions-item>
          <el-descriptions-item label="学院">{{props.queryStuInfo.deptName}}</el-descriptions-item>
          <el-descriptions-item label="专业">{{props.queryStuInfo.majorName}}</el-descriptions-item>
          <el-descriptions-item label="班级">{{props.queryStuInfo.className}}</el-descriptions-item>
          <el-descriptions-item label="身份证">{{props.queryStuInfo.idCard}}</el-descriptions-item>
          <el-descriptions-item label="联系方式">{{props.queryStuInfo.phone}}</el-descriptions-item>
          <el-descriptions-item label="紧急联系人">{{props.queryStuInfo.emergencyContact}}</el-descriptions-item>
          <el-descriptions-item label="紧急联系人联系方式">{{props.queryStuInfo.emergencyPhone}}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="学生日常打卡">
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
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, watch} from "vue";
const props = defineProps(['queryStuInfo','queryShowVisible'])
const emit = defineEmits(['onClose'])
import { GetStuDaily} from '../../../../../api/administrator/query'
import {locale} from '../../locale'
import { Dayjs } from 'dayjs';
import { dateFormat} from '../../../../../util/date.js'
import { getHealthyCode} from '../../../../../util/Enums.js'
const showCard = ref(false)
const onClose = () => {
  emit('queryClose', false)
}
const  value = ref<Dayjs>()
const dataList = ref([])
const getListData = (value: Dayjs) => {
  let listData;
  dataList.value.forEach((item) => {
    console.log(value.date())
    console.log(item)
    if(value.date() == item.day) {
      console.log('exist')
      listData = [
        { type: 'success', content: '今日已打卡' },
        { type: 'success', content: `健康码${getHealthyCode(item.healthCode)}` }
      ]
    } else  {
      listData = [
        { type: 'warning', content: '今日未打卡' }
      ]
    }
  })
  return listData || [];
};
watch(() => showCard.value, (newVal) => {
  if (newVal) {
    getStuDaily()
  }
})
const getStuDaily = () => {
  const data = {
    id: props.queryStuInfo.id,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  }
  GetStuDaily(data).then(res => {
    dataList.value = res.data
    res.data.forEach((item) => {
      dataList.value.push({
        day: dateFormat(item.createTime, 4),
        has: item.promise,
        healthCode: item.healthCode
      })
    })
    // console.log(dateF)dataList.value[0].createTime
  })
}
</script>

<style lang="less" scoped>
:deep(.el-dialog__title) {
  font-size: 1.3rem;
}
:deep(.el-descriptions__title) {
  font-size: 1rem;
}
:deep(.el-descriptions__body .el-descriptions__table .el-descriptions__cell) {
  font-size: 16px;
}
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
</style>
