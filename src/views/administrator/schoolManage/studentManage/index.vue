<template>
  <div class="school-stu-main">
      <el-card shadow="never" style="border: 0">
        <SearchCard @add="add" inputType="stu" @keyQuery="keyQueryStuInfo"/>
      </el-card>
    <div class="table-box">
      <el-table style="width: 100%" :data="stuInfo" size="large" :header-cell-style="tableStyle.header" :row-style="tableStyle.row">
        <template  v-for="(item,index) in stuColumns" :key="index">
          <el-table-column :prop="item.prop" :label="item.label" :width="item.width" />
        </template>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <div class="table-operations cursor">
              <span @click="handleStuInfoQuery(scope.row)">查看</span>
              <span @click="handleStuInfoEdit(scope.row)">编辑</span>
              <span @click="handleStuInfoDelete(scope.row.code)">删除</span>
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
  </div>
  <EditStuInfo :editShowVisible="editShowVisible"
               @editClose="editStuClose"
               :editStuInfo="editStuInfo"
               :DeptList="DeptList"
               @emitDeptCode="getMajorListByCode"
               :majorList="majorList"
               @emitMajorCode="getClassListByCode"
               :classList="classList">
  </EditStuInfo>
  <AddStuDrawer :addShowVisible="addShowVisible"
                @addClose="addStuClose"
                :DeptList="DeptList"
                @emitDeptCode="getMajorListByCode"
                :majorList="majorList"
                @emitMajorCode="getClassListByCode"
                :classList="classList">
  </AddStuDrawer>
  <QueryStuInfo :queryStuInfo="queryStuInfo"
                :queryShowVisible="queryShowVisible"
                @queryClose="queryStuClose">
  </QueryStuInfo>
  <MessageDialog :warn-show-visible="warnShowVisible"
                 warnMessage="确定删除该学生吗？"
                 @warnClose="warnShowVisible = false"
                 @onDelStu="delStu"
                 msgType="stu">
  </MessageDialog>
</template>

<script setup>
import { stuColumns, tableStyle } from '../table.js'
import {ref, onMounted} from "vue";
import {
  GetClassListByMajorCode,
  GetDeptList,
  GetMajorListByDeptCode,
  GetStuInfoList
} from "../../../../api/administrator/query";
import {DeleteStudentByCode} from "../../../../api/administrator/delete";
import SearchCard from "../../../../components/searchBox/index.vue"
import AddStuDrawer from "./cell/addStuInfo.vue";
import QueryStuInfo from "./cell/queryStuInfo.vue";
import EditStuInfo from "./cell/editStuInfo.vue";
import MessageDialog from '../../../../components/messageDialog/index.vue'
import { ElMessage } from "element-plus";
const stuInfo = ref([])
const queryInfo = ref({
  pageNum: 1,
  pageSize: 10,
  keyword: '',
  wordType: 0
})
const DeptList = ref([])
onMounted(() => {
  getStuList()
  getDeptList()
})
// 获取全部的院系
const getDeptList = () => {
  GetDeptList().then(res => {
    DeptList.value = res.data
  })
}
// 获取学生基本信息
const total = ref()
const getStuList = () => {
  GetStuInfoList(queryInfo.value).then(res => {
    stuInfo.value = res.data.data
    total.value = res.data.total
    for (const key in stuInfo.value) {
      stuInfo.value[key].sex = stuInfo.value[key].sex === 1 ? '男' : '女'
    }
  })
}
const keyQueryStuInfo = (e) =>{
  queryInfo.value.keyword = e.keyWord
  queryInfo.value.wordType = e.wordType
  getStuList()
}
const handlePageSize = (size) => {
  queryInfo.value.pageSize = size
  getStuList()
}
const handlePageNum = (num) => {
  queryInfo.value.pageNum = num
  getStuList()
}
// 新增抽屉的开关设置
const addShowVisible = ref(false)
const add = () => {
  addShowVisible.value = true
}
const addStuClose = () => {
  addShowVisible.value = false
}
// 查看对话框的开关设置
const queryShowVisible = ref(false)
const queryStuInfo = ref({})
const handleStuInfoQuery = (data) => {
  queryShowVisible.value = true
  queryStuInfo.value = data
}
const queryStuClose = () => {
  queryShowVisible.value = false
}

const editShowVisible = ref(false)
const editStuInfo = ref({})
const handleStuInfoEdit = (data) => {
  editShowVisible.value = true
  editStuInfo.value = data
  editStuInfo.value.sex = editStuInfo.value.sex === '男' ? 1 : 2
}
const editStuClose = () => {
  editShowVisible.value = false
}
const warnShowVisible = ref(false)
const delCodeData = ref({code: null})
const handleStuInfoDelete = (code) => {
  delCodeData.value.code = code
  warnShowVisible.value = true
}
const delStu = () => {
  DeleteStudentByCode(delCodeData.value).then(() => {
    warnShowVisible.value = false
    getStuList()
  })
}
// 通过院系获取专业
const majorList = ref([])
const getMajorListByCode = (data) => {
  GetMajorListByDeptCode(data).then((res) => {
    majorList.value = res.data
    console.log('MajorList')
  })
}
// 通过专业名获取班级号
const classList = ref([])
const getClassListByCode = (data) => {
  GetClassListByMajorCode(data).then((res) => {
    classList.value = res.data
  })
}
</script>

<style lang="less" scoped>
.school-stu-main {
  background: #FFFFFF;
  width: 97%;
  margin: 20px auto auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .table-box {
    flex: 1;
    padding: 16px;
    .table-operations {
      display: flex;
      justify-content: space-between;
      color: #409EFF;
      .btn {
        margin-right: 15px;
      }
    }
  }
}
.tb-row-btn {
  color: #4A7EFE;
}
</style>
