<template>
  <div class="page-container">
    <el-card shadow="never" style="border: 0px">
      <SearchBox inputType="faculty" @add="addFaculty" @keyQuery="keyQueryFaculty"></SearchBox>
    </el-card>
    <div class="table-box">
      <el-table style="width: 100%"
                :data="facultyList"
                size="large"
                ref="stuTable"
                :header-cell-style="tableStyle.header"
                :row-style="tableStyle.row"
      >
        <template  v-for="(item,index) in facultyColumns" :key="index">
          <el-table-column :prop="item.prop" :label="item.label" :width="item.width" />
        </template>
        <el-table-column prop="epidemicMark" label="是否为防疫人员">
          <template #default="scope">
            <el-switch
                @change="updateFacultyEpidemicStatus(scope.row.code)"
                v-model="scope.row.epidemicMark"
                class="ml-2"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <div class="table-operations cursor">
            <span @click="handleFacultyQuery(scope.row)">查看</span>
            <span @click="handleFacultyEdit(scope.row)">编辑</span>
            <span @click="handleFacultyDelete(scope.row.code)">删除</span>
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
    </div>
    <QueryFacultyInfo :queryShowVisible="queryShowVisible"
                      :queryFacultyInfo="queryFacultyInfo"
                      @queryClose="queryClose">
    </QueryFacultyInfo>
    <AddFacultyInfo :addShowVisible="addShowVisible"
                    @addClose="addClose"
                    :DeptList="DeptList">
    </AddFacultyInfo>
    <EditFacultyInfo :editShowVisible="editShowVisible"
                     :editFacultyInfo="editFacultyInfo"
                     @editClose="editClose"
                     :DeptList="DeptList"
    >

    </EditFacultyInfo>
    <MessageDialog
        :warnShowVisible="warnShowVisible"
        :warnMessage="warnMessage"
        @warnClose="warnClose"
        @onSure="handleFacultyEpidemicStatus"
        @onDelFaculty="DelFaculty"
        :msgType="msgType"
      >
    </MessageDialog>
  </div>
</template>

<script setup>
import QueryFacultyInfo from './cell/queryFacultyInfo.vue'
import AddFacultyInfo from "./cell/addFacultyInfo.vue";
import MessageDialog from "../../../../components/messageDialog/index.vue"
import SearchBox from '../../../../components/searchBox/index.vue'
import {ref, onMounted} from "vue";
import { facultyColumns, tableStyle } from "../table.js";
import {GetDeptList, GetFacultyInfoList} from "../../../../api/administrator/query";
import { UpdateFacultyEpidemicStatus } from "../../../../api/administrator/update";
import {DeleteFacultyByCode} from "../../../../api/administrator/delete";
import EditFacultyInfo from "./cell/editFacultyInfo.vue";
import {ElMessage} from "element-plus";
onMounted(() => {
  getFacultyInfo()
  getDeptList()
})
const DeptList = ref([])
// 获取全部的院系
const getDeptList = () => {
  GetDeptList().then(res => {
    DeptList.value = res
  })
}
const queryInfo = ref({
  pageNum: 1,
  pageSize: 10,
  keyword: '',
  wordType: 0
})
const total = ref(null)
const facultyList = ref([])
const getFacultyInfo = () => {
  GetFacultyInfoList(queryInfo.value).then((res) => {
    total.value = res.total
    facultyList.value = res.data
    for (const key in facultyList.value) {
      facultyList.value[key].sex = facultyList.value[key].sex === 1 ? '男' : '女'
      facultyList.value[key].epidemicMark = facultyList.value[key].epidemicMark === 1
    }
  })
}
//修改页数
const handlePageSize = (size) => {
  queryInfo.value.pageSize = size
  getFacultyInfo()
}
// 修改条数
const handlePageNum = (num) => {
  queryInfo.value.pageNum = num
  getFacultyInfo()
}
const keyQueryFaculty = (e) => {
  queryInfo.value.keyword = e.keyWord
  queryInfo.value.wordType = e.wordType
  getFacultyInfo()
}
const queryFacultyInfo = ref({})
const queryShowVisible = ref(false)
const handleFacultyQuery = (row) => {
  queryFacultyInfo.value = row
  queryShowVisible.value = true
}
const queryClose = () => {
  queryShowVisible.value = false
}
// 单条删除教职工
const msgType = ref(undefined)
const delCodeData = ref({
  code: null
})
const handleFacultyDelete = (code) => {
  delCodeData.value.code = code
  warnShowVisible.value = true
  warnMessage.value = '确定删除该教职工？'
  msgType.value = 'del-faculty'

}
const DelFaculty = () => {
  DeleteFacultyByCode(delCodeData.value).then(()=> {
    ElMessage.success('删除教职工成功！')
    warnShowVisible.value = false
    getFacultyInfo()
  })
}
const editShowVisible = ref(false)
const editFacultyInfo = ref({})
const handleFacultyEdit = (info) => {
  editShowVisible.value = true
  editFacultyInfo.value = info
}
const editClose = () => {
  editShowVisible.value = false
}
// 添加教职工
const addShowVisible = ref(false)
const addFaculty = () => {
    addShowVisible.value = true
}
const addClose = () => {
  addShowVisible.value = false
}
// 修改防疫人员标识
const warnShowVisible = ref(false)
const warnMessage = ref('确定切换教职工的防疫人员标识?')
const codeList = ref({})
const updateFacultyEpidemicStatus = (code) => {
  codeList.value = {code: code}
  warnShowVisible.value = true
  msgType.value = 'faculty'
}
const warnClose = () => {
  warnShowVisible.value = false
  getFacultyInfo()
}
const handleFacultyEpidemicStatus = () => {
    UpdateFacultyEpidemicStatus(codeList.value).then(() => {
      getFacultyInfo()
      warnShowVisible.value = false
    })
  }
</script>
<style lang="less" scoped>
.page-container {
  margin: 20px auto auto;
  width: 97%;
  height: 90%;
  background: #FFFFFF;
  .table-box {
    padding: 16px;
    .table-operations {
      display: flex;
      justify-content: space-between;
      color: #409EFF;
    }
  }
}
</style>
