<template>
  <div class="page-container">
    <el-card class="margin-top" shadow="never">
      <SearchBox inputType="waitIsolation" @keyQuery="queryKeyWaitIsolation"></SearchBox>
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
          <el-table-column prop="area" label="隔离地点"></el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="socpe">
              <div class="cursor" @click="handleIsolation(scope.row.id)" style="color: #20a7f1">进行隔离</div>
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
  </div>
</template>

<script setup>
import SearchBox from '../../../../components/searchBox/index.vue'
import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
// import {GetIsolationList} from "../../../../api/epidemicPersonnel/query";
const queryInfo = ref({
  pageNum: 1,
  pageSize: 10,
  wordType: 1,
  keyword: ''
})
let total = ref(0)
let list = ref([])
onMounted(() => {
  getToBeIsolationPerson()
})
const getToBeIsolationPerson = () => {
  // GetIsolationList(queryInfo.value).then((res) => {
  //   list.value = res.data
  //   total.value = res.total
  // })
  list.value = [
    {code: '001', name: '张三', className: '1909', area: '小行星', message: 1},
    {code: '001', name: '张三', className: '1909', area: '小行星', message: 0},
    {code: '001', name: '张三', className: '1909', area: '小行星', message: 1},
    {code: '001', name: '张三', className: '1909', area: '小行星', message: 0},
    {code: '001', name: '张三', className: '1909', area: '小行星', message: 1},
  ]
}
const queryKeyWaitIsolation = (e) => {
  console.log(e)
  queryInfo.value.keyword = e.keyWord
  queryInfo.value.wordType = e.wordType + 1
  getToBeIsolationPerson()
}
const handlePageSize = (size) => {
  queryInfo.value.pageSize = size
  getToBeIsolationPerson()
}
const handlePageNum = (num) => {
  queryInfo.value.pageNum = num
  getToBeIsolationPerson()
}
const handleIsolation = (id) => {
  // const data = {
  //   id: id
  // }
  // HandleIsolation(data).then(() => {
  //   ElMessage.success('已将该学生进行隔离！')
  //   getToBeIsolationPerson()
  // })
}
</script>

<style lang="less" scoped>
.page-container {
  margin: 25px auto auto;
  width: 97%;
  height: 100%;
  background: transparent;
}
</style>
