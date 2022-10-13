<template>
  <div class="page-container">
    <el-card shadow="never" class="top-card">
      <div v-for="(item, index) in awaitList" :key="index" class="text-box cursor" @click="queryRiskLevel(index)">
        <p :style="{color: item.color}">{{item.title}}</p>
        <h2>{{item.num}}</h2>
      </div>
    </el-card>
    <el-card shadow="never" style="height: 80px;margin-top: 1.3rem; display: flex; align-items: center;">
      <SearchBox inputType="area" @editLevel="warnShowVisible = true" @changeAreaCode="selectInput" @reset="reset"></SearchBox>
    </el-card>
    <div class="table-box" >
      <el-table :data="areaList"
                :row-style="{height:'44px'}"
                :header-cell-style="{background:'#F5F5F5', color: '#000'}"
                size="default"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="70"></el-table-column>
        <el-table-column prop="code" label="地区编号"></el-table-column>
        <el-table-column prop="fullName" label="地区名称"></el-table-column>
        <el-table-column prop="riskLevel" label="风险等级">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.riskLevel === 0">低风险</el-tag>
            <el-tag type="warning" v-else-if="scope.row.riskLevel === 1">中风险</el-tag>
            <el-tag type="danger" v-else-if="scope.row.riskLevel === 2">高风险</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="最近更新时间"></el-table-column>
        <el-table-column #default="scope"  label="操作" align="center">
          <div>
            <span @click="openEditDialog(scope.row.code)" style="color: #4A7EFE">修改</span>
          </div>
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
    </div>
  </div>
  <MessageDialog msgType="area" :warnShowVisible="warnShowVisible" @editLevel="handleEditLevel" @warnClose="warnShowVisible = false"></MessageDialog>
</template>

<script setup>
import SearchBox from '../../../components/searchBox/index.vue'
import {onMounted, ref} from "vue";
import {GetRiskAreaList, GetStatisticsStreet} from "../../../api/administrator/query";
import { useOtherStore } from '../../../stores/index.js'
import {EditRiskAreaLevel} from "../../../api/administrator/update";
import MessageDialog from "../../../components/messageDialog/index.vue"
import {ElMessage} from "element-plus";
const other = useOtherStore()
const awaitList = ref([
  {title: '低风险', num: 41356, color: '#67c23a'},
  {title: '中风险', num: 101, color: '#E6A23C'},
  {title: '高风险', num: 22, color: '#F56C6C'}
])
const queryInfo = ref({
  pageNum: 1,
  pageSize: 10,
  code: '',
  riskLevel: 0
})
onMounted(() => {
  getRiskAreaList()
  getRiskAreaStatistics()
  other.emptyRiskAreaNum()
})
const areaList = ref([])
const total = ref(0)
const getRiskAreaList = () => {
  GetRiskAreaList(queryInfo.value).then((res) => {
    areaList.value = res.data
    total.value = res.total
  })
}
const handlePageSize = (size) => {
  queryInfo.value.pageSize = size
  getRiskAreaList()
}
const handlePageNum = (num) => {
  queryInfo.value.pageNum = num
  getRiskAreaList()
}
const reset = () => {
  queryInfo.value.code = ''
  getRiskAreaList()
}
const selectInput = (e) => {
  queryInfo.value.code = e.value
  getRiskAreaList()
}
const batchList = ref([])
const handleSelectionChange = (val) => {
  other.editRiskAreaNum(val.length)
  batchList.value = []
  val.forEach((item,index) => {
    batchList.value.push({
      streetCode:val[index].code,
      riskLevel: 3
    })
  })
}
const getRiskAreaStatistics = () => {
  GetStatisticsStreet().then((res) => {
    console.log(res);
    awaitList.value[0].num = res.normalNum
    awaitList.value[1].num = res.midNum
    awaitList.value[2].num = res.highNum
  })
}
const queryRiskLevel = (level) => {
  queryInfo.value.riskLevel = level
  getRiskAreaList()
}
const warnShowVisible = ref(false)
const openEditDialog = (code) => {
  batchList.value = []
  batchList.value[0] = {
    streetCode: String(code),
    riskLevel: null
  }
  warnShowVisible.value = true
}
const handleEditLevel = (e) => {
  console.log(e)
  batchList.value.forEach((item) => {
    item.riskLevel = e.level.value
  })
  const data = {list:[...batchList.value]}


  EditRiskAreaLevel(JSON.parse(JSON.stringify(data))).then(() => {
    ElMessage.success(`修改风险地区等级成功！`)
    warnShowVisible.value = false
    other.emptyRiskAreaNum()
    getRiskAreaList()
    getRiskAreaStatistics()
  }).catch(() => {
    JSON.parse(JSON.stringify(data))
  })
}
</script>

<style lang="less" scoped>
.page-container {
  margin: 20px auto auto;
  width: 97%;
  height: 100%;
  background: transparent;
  .top-card {
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
          border-right: 0px solid #e0e0e0;
        }
        p {
          margin: 0;
          font-size: 1rem;
          color: rgba(0,0,0,.45);
        }
        h2 {
          font-size: 24px;
        }
      }
    }
  }
  .table-box {
    margin-top: 1.3rem;
    background: #FFFFFF;
    flex: 1;
    padding: 16px;
    .table-operations {
      margin-bottom: 1rem;
      .btn {
        margin-right: 15px;
      }
    }
    .pagination {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: end;
      align-items: center;
    }
  }
}
</style>
