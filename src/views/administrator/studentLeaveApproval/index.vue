<template>
  <div class="page-container">
    <el-card class="box-card" shadow="never">
    <div v-for="(item, index) in awaitList" :key="index" class="text-box cursor">
      <p>{{item.title}}</p>
      <h2>{{item.num+'条审批'}}</h2>
    </div>
    </el-card>
    <el-card class="table-card" shadow="never">
      <div class="search-box">
        <div>
          <el-radio-group v-model="radioCheck" size="large" @change="changeTypeFilter">
            <el-radio-button label="1">待处理</el-radio-button>
            <el-radio-button label="2">已处理</el-radio-button>
            <el-radio-button label="0">全部</el-radio-button>
          </el-radio-group>
        </div>
        <div style="margin-left: 16px" class="input">
          <a-input-search
              v-model:value="inputValue"
              placeholder="请输入学号"
              style="width: 200px; height: 44px;"
              @search="keyQuery"
          />
        </div>
      </div>
      <div class="table-list">
        <div class="list-item" v-for="(item, index) in leaveList" :key="index">
          <div class="name-item">
            <img src="../../../assets/images/touxiang.png" style="height: 48px;width: 48px; margin-right: 12px" alt="">
            <div>
              <div style="font-size: 16px; color: #000">{{item.name}}</div>
              <div class="font">请假理由:{{item.reason}}</div>
            </div>
          </div>
          <div class="code-item">
            <div class="font">学号：</div>
            <div class="font">{{item.code}}</div>
          </div>
          <div class="target-item">
            <div class="font">目的地：</div>
            <div class="font">{{item.target}}</div>
          </div>
          <div class="type-item">
            <h2 class="font">{{item.type === 0 ? '事假': '病假'}}</h2>
          </div>
          <div class="is-item">
            <el-tag class="ml-2" type="warning" v-if="item.isStrideCounty===1">跨市</el-tag>
            <el-tag class="ml-2" type="success" v-else>非跨市</el-tag>
            <el-tag class="ml-2" type="danger" v-if="item.isStrideDay === 1">跨天</el-tag>
            <el-tag class="ml-2" type="success" v-else>非跨天</el-tag>
          </div>
          <div class="leave-item">
            <div class="font">预计出校时间：</div>
            <div class="font">{{item.estimateStartTime}}</div>
          </div>
          <div class="back-item">
            <div class="">预计回校时间：</div>
            <div class="font">{{item.estimateEndTime}}</div>
          </div>
          <div class="operational-item cursor" v-if="item.approvalResult === 0">
            <span class="font" style="color: #20a7f1" @click="handle(item)">处理</span>
          </div>
          <div class="operational-item cursor" v-else-if="item.approvalResult === 1">
            <span class="font" style="color: #13ce66">审批通过</span>
          </div>
          <div class="operational-item cursor" v-else-if="item.approvalResult === 2">
            <span class="font" style="color: #e70c0c">审批失败</span>
          </div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination  v-model:currentPage="queryInfo.pageNum"
                        v-model:page-size="queryInfo.pageSize"
                        background layout="prev, pager, next" :total="total"
                       @size-change="handlePageSize"
                       @current-change="handlePageNum"/>
      </div>
    </el-card>
    <HandleDialog :handleShowVisible="handleShowVisible"
                  :stuInfo="stuInfo"
                  @onSure="onSure"
                  @onClose="handleShowVisible = false"></HandleDialog>
    <MessageDialog :warnShowVisible="warnShowVisible" :warnMessage="warnMessage" msgType="leave" @approval="handleApproval" @warnClose="warnShowVisible = false">
    </MessageDialog>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {GetPageLeaveList, GetStatisticsLeave} from "../../../api/administrator/query";
import MessageDialog from '../../../components/messageDialog/index.vue'
// import {AgreeLeave, RejectLeave} from "../../../api/administrator/update";
import HandleDialog from "./cell/handleDialog.vue";
import {AgreeLeave, RejectLeave} from "../../../api/administrator/update";
const awaitList = ref([
  {title: '我的待办', num: 0},
  {title: '已通过', num: 0},
  {title: '全部', num: 0}
])
const getStatisticsLeave = () => {
  GetStatisticsLeave().then((res) => {
    awaitList.value[0].num = res.undoneCount
    awaitList.value[1].num = res.solvedCount
    awaitList.value[2].num = res.allCount
  })
}
const radioCheck = ref(1)
const changeTypeFilter = () => {
  queryInfo.value.typeFilter = radioCheck.value
  getLeaveList()
}
const leaveList = ref([])
const queryInfo = ref({
  typeFilter: 0,
  wordType: 1,
  keyword: '',
  isStrideCounty: -1,
  isStrideDay: -1,
  isReturn: -1,
  pageNum: 1,
  pageSize: 5
})
onMounted(() => {
  getLeaveList()
  getStatisticsLeave()
})
const total = ref(0)
const getLeaveList = () => {
  GetPageLeaveList(queryInfo.value).then((res) => {
    leaveList.value = res.data
    total.value = res.total
  })
}
const handlePageSize = (size) => {
  queryInfo.value.pageSize = size
  getLeaveList()
}
const handlePageNum = (num) => {
  queryInfo.value.pageNum = num
  getLeaveList()
}
const inputValue = ref(undefined)
const keyQuery = () => {
  queryInfo.value.keyword = inputValue
  getLeaveList()
}
const handleShowVisible = ref(false)
const warnShowVisible = ref(false)
const warnMessage = ref('')
const stuInfo = ref(undefined)
const handle = (info) => {
  handleShowVisible.value = true
  stuInfo.value = info
}
const onSure = (e) => {
  const data = {
    id: e.id,
    message: e.commit
  }
  switch (e.type) {
    case 1:
  //    拒绝
        RejectLeave(data).then(() => {
          handleShowVisible.value = false
          getLeaveList()
          getStatisticsLeave()
        })
      break
    case 2:
  //    同意
        AgreeLeave(data).then(() => {
          handleShowVisible.value = false
          getLeaveList()
          getStatisticsLeave()
        })
  }
}
</script>

<style lang="less" scoped>
.page-container {
  margin: 20px auto auto;
  width: 97%;
  .box-card {
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
          font-size: 1rem;
          color: rgba(0,0,0,.45);
        }
        h2 {
          font-size: 24px;
        }
      }
    }
  }
  .table-card {
    margin-top: 20px;
    height: 80px;
    min-height: 700px;
    .search-box {
      display: flex;
      justify-content: end;
      .input {
        :deep(.ant-input-group .ant-input) {
          height: 40px;
        }
        :deep(.ant-btn-icon-only) {
          height: 40px;
          width: 40px;
        }
      }
    }
    .table-list {
      margin-top: 20px;
      .list-item {
        height: 90px;
        width: 100%;
        padding: 16px 24px;
        display: flex;
        color: rgba(0,0,0,.45);
        border-bottom: 1px solid #e0e0e0;
        .name-item {
          flex: 1;
          display: flex;
          font-size: 14px;
        }
        .code-item {
          font-size: 14px;
        }
        .target-item {
          font-size: 14px;
          margin-left: 40px;
          flex-basis: 9%;
        }
        .type-item {
          font-size: 14px;
          margin-left: 40px;
          line-height: 48px;
          color: #000;
          flex-basis: 3%;
        }
        .is-item {
          margin-left: 40px;
          flex-basis: 8%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .leave-item {
          margin-left: 40px;
          font-size: 14px;
          flex-basis: 12%;
        }
        .back-item {
          margin-left: 40px;
          font-size: 14px;
          flex-basis: 12%;
        }
        .operational-item {
          margin-left: 40px;
          flex-basis: 10%;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
      }
    }
    .pagination {
      width: 100%;
      display: flex;
      justify-content: end;
      align-items: center;
      height: 100px;
    }
  }
}
</style>
