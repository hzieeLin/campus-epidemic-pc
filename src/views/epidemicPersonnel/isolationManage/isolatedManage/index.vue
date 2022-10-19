<template>
  <div class="page-container">
    <el-card class="statistics-list" shadow="never">
      <div v-for="(item, index) in awaitList" :key="index" class="text-box cursor">
        <p>{{item.title}}</p>
        <h2>{{item.num+'人'}}</h2>
      </div>
    </el-card>
    <el-card class="margin-top" shadow="never">
      <SearchBox inputType="isolated" @keyQuery="queryKeyIsolated"></SearchBox>
    </el-card>
    <el-card class="margin-top" shadow="never">
      <el-table style="width: 100%"
                :data="list"
                size="large"
                ref="stuTable"
                :header-cell-style="{background:'#F5F5F5', color: '#000'}"
                :row-style="{height:'48px'}"
      >
        <el-table-column prop="code" label="学号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="className" label="班级"></el-table-column>
        <el-table-column prop="quarantineLocation" label="隔离地点"></el-table-column>
        <el-table-column prop="startTime" label="开始隔离时间"></el-table-column>
        <el-table-column prop="endTime" label="结束隔离时间"></el-table-column>
        <el-table-column label="最近一次体温">
          <template #default="scope">
            <div style="display: flex; align-items: center; justify-content: start;"> <div :style="scope.row.temperature <= 37.3 ? 'background:#19be6b':'background:#fa3534'" class="circle"></div> <div style="margin-left: 10px">{{scope.row.temperature <= 37.3 ? '正常': '异常'}}</div></div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <div style="display: flex; justify-content: start">
              <div class="cursor" @click="handleOpenDetail(scope.row)">
                详情
              </div>
              <div style="margin-left: 20px" class="cursor" @click="handleRelieve(scope.row.id)">
                解除
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination flex-end-center">
        <el-pagination
            v-model:currentPage="queryInfo.pageNum"
            v-model:page-size="queryInfo.pageSize"
            :page-sizes="[10, 15, 30, 50]"
            background
            layout="prev, pager, next, sizes"
            :total="total"
            @size-change="handlePageSize"
            @current-change="handlePageNum"/>
      </div>
    </el-card>
    <DetailModal :showDetailVisible="showDetailVisible" :basic="basicData" @handleClose="handleClose"></DetailModal>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import SearchBox from '../../../../components/searchBox/index.vue'
import {GetIsolatedList, StatisticsAllData} from "../../../../api/epidemicPersonnel/query";
import DetailModal from "./cell/detailModal.vue";
import {ReleaseStu} from "../../../../api/epidemicPersonnel/update";
import {ElMessage} from "element-plus";
const showDetailVisible = ref(false)
const handleClose = () => {
  showDetailVisible.value = false
  for (const Key in basicData.value) {
    basicData.value[Key] = ''
  }
}
const basicData = ref({
  id: '',
  name: '',
  startTime: '',
  endTime: ''
})
const handleOpenDetail = (row) => {
  basicData.value.id = row.id
  basicData.value.name = row.name
  basicData.value.startTime = row.startTime
  basicData.value.endTime = row.endTime
  console.log(basicData.value)
  showDetailVisible.value = true
}
const handleRelieve = (id) => {
  const data = ref({
    id: id
  })
  ReleaseStu(data).then(()=> {
    ElMessage.success('解除隔离成功！')
    getIsolatedList()
    statisticsAllData()
  })
}
const awaitList = ref([
  {title: '待隔离', num: 1},
  {title: '已隔离', num: 2},
  {title: '治疗中', num: 3},
  {title: '隔离结束', num: 4}
])
const statisticsAllData = () => {
  StatisticsAllData().then((res) => {
    awaitList.value[0].num = res.notificationNotQuarantined
    awaitList.value[1].num = res.isolated
    awaitList.value[2].num = res.treat
    awaitList.value[3].num = res.end
  })
}
const queryInfo = ref({
  pageNum: 1,
  pageSize: 10,
  wordType: 1,
  keyword: ''
})
let total = ref(0)
let list = ref([])
onMounted(() => {
  getIsolatedList()
  statisticsAllData()
})
const getIsolatedList = () => {
  GetIsolatedList(queryInfo.value).then((res) => {
    list.value = res.data
    total.value = res.total
    list.value = [
      { id: '001',code: '001', name: '张三', className: '1909', quarantineLocation: '小行星', startTime: '2022-09-09 12:12:12', endTime: '2022-09-09 12:12:12', temperature: 37.3 },
      { id: '2',code: '001', name: '张三', className: '1909', quarantineLocation: '小行星', startTime: '2022-09-09 12:12:12', endTime: '2022-09-09 12:12:12', temperature: 37.3 },
      { id: '3',code: '001', name: '张三', className: '1909', quarantineLocation: '小行星', startTime: '2022-09-09 12:12:12', endTime: '2022-09-09 12:12:12', temperature: 39.3 },
      { id: '4',code: '001', name: '张三', className: '1909', quarantineLocation: '小行星', startTime: '2022-09-09 12:12:12', endTime: '2022-09-09 12:12:12', temperature: 37.3 },
      { id: '5',code: '001', name: '张三', className: '1909', quarantineLocation: '小行星', startTime: '2022-09-09 12:12:12', endTime: '2022-09-09 12:12:12', temperature: 39.3 },
      { id: '6',code: '001', name: '张三', className: '1909', quarantineLocation: '小行星', startTime: '2022-09-09 12:12:12', endTime: '2022-09-09 12:12:12', temperature: 37.3 },
    ]
  })
}
const queryKeyIsolated = (e) => {
  queryInfo.value.keyword = e.keyWord
  queryInfo.value.wordType = e.wordType
  getIsolatedList()
}
const handlePageSize = (size) => {
  queryInfo.value.pageSize = size
  getIsolatedList()
}
const handlePageNum = (num) => {
  queryInfo.value.pageNum = num
  getIsolatedList()
}
</script>

<style lang="less" scoped>
.page-container {
  margin: 25px auto auto;
  width: 97%;
  height: 100%;
  background: transparent;
  .statistics-list {
    width: 100%;
    height: 150px;
    :deep(.el-card__body) {
      display: flex;
      justify-content: space-around;
      flex-basis: 33.3%;
      height: 100%;
      .text-box {
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-right: 1px solid #e0e0e0;
        &:last-child {
          border-right: 0 solid #e0e0e0;
        }
        p {
          font-size: 1rem;
          color: rgba(0,0,0,.45);
        }
        h2 {
          font-size: 24px;
        }
      }
    }
  }
}
.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
