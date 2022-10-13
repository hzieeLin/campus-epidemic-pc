<template>
  <div class="page-container">
    <el-card shadow="never">
      <SearchBox inputType="isolation" @keyQuery="keyQueryIsolation"></SearchBox>
    </el-card>
    <el-card style="margin-top: 20px" shadow="never">
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
        <el-table-column label="隔离进度">
            <template #default="scope">
              <el-progress :percentage="getDaysBetween(dateFormat(null, 0), scope.row.endTime).toFixed(0)" />
            </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
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
import SearchBox from '../../../components/searchBox/index.vue'
import {onMounted, ref} from "vue";
import {GetIsolationList} from "../../../api/administrator/query";
import {dateFormat, getDaysBetween} from "../../../util/date.js";

const list = ref([])
const total = ref(0)
const queryInfo = ref({
  pageNum: 1,
  pageSize: 10,
  keyword: '',
  wordType: 0,
  state: -1
})
onMounted(() => {
  getIsolationList()
})
const getIsolationList = () => {
  GetIsolationList(queryInfo.value).then((res) => {
    // list.value = res.data
    res.data = [
        { className: "计算机科学与技术1903",
          code: "1902010301",
          deptName:"计算机学院",
          endTime: '2022-10-14 00:00:00',
          id:"1565742071703244801",
          majorName: "计算机科学与技术",
          name: "测试1",
          preventionPersonnelCode: null,
          preventionPersonnelName: null,
          quarantineLocation: "校园集中隔离点A",
          startTime: '2022-09-30 00:00:00',
          state: 0}]
    list.value = res.data
    console.log(res.data)
    console.log(res.data)
    // getDaysBetween(dateFormat(null, 0), item.endTime)
    total.value = res.total
  })
}
const keyQueryIsolation = (e) => {
  queryInfo.value.keyword = e.keyWord
  queryInfo.value.wordType = e.wordType
  getIsolationList()
}
//修改页数
const handlePageSize = (size) => {
  queryInfo.value.pageSize = size
  getIsolationList()
}
// 修改条数
const handlePageNum = (num) => {
  queryInfo.value.pageNum = num
  getIsolationList()
}
</script>

<style lang="less" scoped>
.page-container {
  margin: 25px auto auto;
  width: 97%;
  height: 100%;
  background: transparent;
  .pagination {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: end;
    align-items: center;
  }
}
</style>
