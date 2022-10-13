<template>
  <div class="page-container">
    <el-card shadow="never">
      <SearchBox inputType="epidemic" @keyQuery="keyQueryEpidemic"></SearchBox>
    </el-card>
    <el-card style="margin-top: 20px" shadow="never">
      <el-table style="width: 100%"
                :data="epidemicList"
                size="large"
                ref="stuTable"
                :header-cell-style="{background:'#F5F5F5', color: '#000'}"
                :row-style="{height:'48px'}"
      >
        <el-table-column prop="code" label="工号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="phone" label="联系方式"></el-table-column>
        <el-table-column prop="idCard" label="身份证"></el-table-column>
        <el-table-column prop="address" label="详细地址"></el-table-column>
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
import {GetEpidemicList} from "../../../api/administrator/query";
const epidemicList = ref([])
const total = ref(0)
onMounted(() => {
  getEpidemicList()
})
const queryInfo = ref({
  wordType: 1,
  keyword: '',
  pageNum: 1,
  pageSize: 10
})
const getEpidemicList =() => {
  GetEpidemicList(queryInfo.value).then((res) => {
    epidemicList.value = res.data
    for (const key in epidemicList.value) {
      epidemicList.value[key].sex =epidemicList.value[key].sex === 1 ? '男' : '女'
    }
    total.value = res.total
  })
}
const keyQueryEpidemic = (e) => {
  queryInfo.value.keyword = e.keyWord
  queryInfo.value.wordType = e.wordType+ 1
  getEpidemicList()
}
//修改页数
const handlePageSize = (size) => {
  queryInfo.value.pageSize = size
  getEpidemicList()
}
// 修改条数
const handlePageNum = (num) => {
  queryInfo.value.pageNum = num
  getEpidemicList()
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
