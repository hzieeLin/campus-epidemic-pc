<template>
  <div class="page-container">
    <el-card shadow="never" class="top-card">
      <div v-for="(item, index) in awaitList" :key="index" class="text-box cursor">
        <p>{{item.title}}</p>
        <h2>{{item.num+'条审批'}}</h2>
      </div>
    </el-card>
    <el-card class="search-input-card margin-top" shadow="never">
      <div class="search-box">
        <div>
          <el-radio-group v-model="radioCheck" size="large" @change="handleRadio">
            <el-radio-button label="0">隔离人员</el-radio-button>
            <el-radio-button label="1">防疫人员</el-radio-button>
            <el-radio-button label="2">全部</el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </el-card>
    <div class="card-list margin-top">
      <div class="card-list-item" v-for="item in dataList" :key="item.id">
        <el-card shadow="never" class="card-list-item-content" style="position: relative">
          <template #header>
            <div class="card-header">
              <h2>{{item.type === 1 ? '物质请求': '意见受理'}}</h2>
              <div class="content">
                {{item.message}}
              </div>
            </div>
          </template>
         <div>
         </div>
          <div class="card-footer cursor" v-if="item.result === 0 ||item.result === 3">
            <span style="color: #13ce66" @click="accessOpen(item.id, item.type)">同意</span>
            <span style="color: #e70c0c" @click="rejectOpen(item.id, item.type)">拒绝</span>
          </div>
          <div class="card-footer" v-else>
            <span style="color: #13ce66">已处理</span>
          </div>
          <div style="position: absolute; top: 20%; left: 90%; transform: translate(-50%, -50%)">
            <AskBox :type="item.result"></AskBox>
          </div>
        </el-card>
      </div>
    </div>
    <div class="pagination flex-end-center">
      <el-pagination  v-model:currentPage="queryInfo.pageNum"
                      v-model:page-size="queryInfo.pageSize"
                      background layout="prev, pager, next" :total="total" @size-change="handlePageSize" @current-change="handlePageNum"/>
    </div>
  </div>
  <MessageDialog :warnShowVisible="warnShowVisible"
                 :warnMessage="warnMessage"
                 @onProcess="handleProcess"
                 @warnClose="warnShowVisible = false"
                 :msgType="msgType" ></MessageDialog>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {GetFeedbackList, GetStatisticsFeedback} from "../../../api/administrator/query";
import {AgreeFeedback, RejectFeedback } from "../../../api/administrator/update.js"
import MessageDialog from '../../../components/messageDialog/index.vue'
import AskBox from '../../../components/theLogo/askBox.vue'
const dataList = ref([])
const total = ref(0)
const queryInfo = ref({
  pageNum: 1,
  pageSize: 8,
  queryType: 1,
  feedbackType: 0,
})
onMounted(() => {
  getFeedbackList()
  getStatisticsFeedback()
})
const getFeedbackList = () => {
  GetFeedbackList(queryInfo.value).then((res) => {
    dataList.value = res.data.data
    total.value = res.data.total
  })
}
const getStatisticsFeedback = () => {
  GetStatisticsFeedback().then((res) => {
    awaitList.value[0].num = res.data.undoneCount
    awaitList.value[1].num = res.data.solvedCount
    awaitList.value[2].num = res.data.allCount
  })
}
const handlePageSize = (size) => {
  queryInfo.value.pageSize = size
  getFeedbackList()
}
const handlePageNum = (num) => {
  queryInfo.value.pageNum = num
  getFeedbackList()
}
const awaitList = ref([
  {title: '我的待办', num: 0},
  {title: '已通过', num: 0},
  {title: '全部', num: 0}
])
const radioCheck = ref(0)
const handleRadio = (index) => {
  switch (index) {
    case '0':
      queryInfo.value.queryType = 1
      break
    case '1':
      queryInfo.value.queryType = 2
      break
    case '2':
      queryInfo.value.queryType = 3
      break
  }
  getFeedbackList()
}
const warnShowVisible = ref(false)
const approvalIdInfo = ref({
  id: '',
  messageReturn: ''
})
const msgType = ref('')
const warnMessage = ref('')
const accessOpen = (id, type) => {
  const types = type === 1 ? '物质请求' : '意见反馈'
  msgType.value = 'feedbackAccess'
  approvalIdInfo.value.id = id
  approvalIdInfo.value.messageReturn = '同意'
  warnShowVisible.value = true
  warnMessage.value = `确定同意该学生的${types}审批！`
}
const rejectOpen = (id,type) => {
  const types = type === 1 ? '物质请求' : '意见反馈'
  msgType.value = 'feedbackReject'
  approvalIdInfo.value.id = id
  approvalIdInfo.value.messageReturn = '拒绝'
  warnShowVisible.value = true
  warnMessage.value = `确定拒绝该学生的${types}审批！`
}
const handleProcess = (e) => {
  if (e.agree === 1) {
    AgreeFeedback(approvalIdInfo.value).then(() => {
      warnShowVisible.value = false
      getFeedbackList()
    })
  } else if (e.agree === 2) {
    RejectFeedback(approvalIdInfo.value).then(() => {
      warnShowVisible.value = false
      getFeedbackList()
    })
  }
}
</script>

<style lang="less" scoped>
.page-container {
  margin: 20px auto auto;
  width: 97%;
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
  .search-input-card {
    width: 100%;
    height: 80px;
    :deep(.el-card__body) {
      display: flex;
      .type-radio {
        flex-basis: 11%;
      }
      .search-box {
        flex: 1;
        display: flex;
        justify-content: end;
        .input {
          :deep(.ant-input-group .ant-input) {
            height: 50px!important;
          }
          :deep(.ant-btn-icon-only) {
            height: 50px;
            width: 43px;
          }
        }
      }
    }
  }
  .card-list {
    width: 101%;
    display: flex;
    flex-flow:wrap;
    .card-list-item {
      height: 240px;
      flex-basis: 25%;
      .card-list-item-content {
        height: 96%;
        width: 96%;
        //margin: 0 auto 20px 0;
        display: flex;
        flex-direction: column;
        :deep(.el-card__body) {
          padding: 0;
        }
        .card-header {
          height: 140px;
          display: flex;
          flex-direction: column;
          h2 {
            text-align: center;
            font-weight: 600;
          }
          .content {
            flex: 1;
            padding: 20px 20px 0 20px;
            text-align: center;
          }
        }
        .card-footer {
          display: flex;
          justify-content:space-around;
          align-items: center;
          height: 50px;
        }
      }
    }
  }
}
</style>
