<template>
  <el-dialog
      v-model="props.showDetailVisible"
      title="详情"
      width="50%"
      @close="handleClose"
  >
    <el-descriptions title="基本信息">
      <el-descriptions-item label="姓名">{{props.basic.name}}</el-descriptions-item>
      <el-descriptions-item label="开始隔离时间">{{props.basic.startTime}}</el-descriptions-item>
      <el-descriptions-item label="结束隔离时间">{{props.basic.endTime}}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="历史隔离记录" class="history">
      <el-descriptions-item style="display: none"></el-descriptions-item>

    </el-descriptions>
    <el-table :data="historyList" style="width: 100%">
      <el-table-column type="index" width="130" />
      <el-table-column label="时间" prop="time"></el-table-column>
      <el-table-column label="体温" align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center; justify-content: center;"> <div :style="scope.row.temperature <= 37.3 ? 'background:#19be6b':'background:#fa3534'" class="circle"></div> <div style="margin-left: 10px">{{scope.row.temperature <= 37.3 ? '正常': '异常'}}</div></div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <div class="cursor" @click="handleEditRecordById(scope.row)">修改</div>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
      </span>
    </template>
    <el-dialog
      v-model="showEditVisiable" title="修改体温记录" width="20%">
      <div>
        <el-radio-group v-model="editData.temperature">
          <el-radio :label="37.3">正常</el-radio>
          <el-radio :label="38">异常</el-radio>
        </el-radio-group>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="showEditVisiable = false; editData.temperature = ''">取消</el-button>
        <el-button @click="updateStuRecord" type="primary" :disabled="editDisabled">确定</el-button>
      </span>
      </template>
    </el-dialog>
  </el-dialog>
</template>

<script setup>
import {GetStuRecordListById} from "../../../../../api/epidemicPersonnel/query";
import {ref, watch} from "vue";
import {UpdateStuRecord} from "../../../../../api/epidemicPersonnel/update";

const props = defineProps(['showDetailVisible','basic'])
const emit = defineEmits(['handleClose'])
const handleClose = () => {
  emit('handleClose',false)
}
const historyList = ref([
  {id: '111', time: '2022-09-01 00:00:00', temperature: '37.3'},
  {id: '222', time: '2022-09-01 00:00:00', temperature: '37.3'},
  {id: '333', time: '2022-09-01 00:00:00', temperature: '37.3'},
  {id: '444', time: '2022-09-01 00:00:00', temperature: '37.3'},
  {id: '555', time: '2022-09-01 00:00:00', temperature: '37.3'},
  {id: '666', time: '2022-09-01 00:00:00', temperature: '37.3'},
  {id: '111', time: '2022-09-01 00:00:00', temperature: '37.3'},
  {id: '111', time: '2022-09-01 00:00:00', temperature: '37.3'},
  {id: '111', time: '2022-09-01 00:00:00', temperature: '37.3'},
  {id: '111', time: '2022-09-01 00:00:00', temperature: '37.3'},
])
watch(() => props.basic.id, (newVal, oldVal) => {
  if (newVal !== '' && newVal !== null && newVal !== undefined) {
    getStuRecordListById()
  }
})
const getStuRecordListById = () => {
  const data = {
    id: props.basic.id
  }
  GetStuRecordListById(data).then((res) => {

  })
}
const showEditVisiable = ref(false)
const editData = ref({
  id: '',
  temperature: ''
})
const editDisabled = ref(true)
watch(() => editData.value.temperature, (newVal, oldValue) => {
  console.log(newVal)
  if (newVal !== '') {
    editDisabled.value = false
  } else {
    editDisabled.value = true
  }
})
const handleEditRecordById = (row) => {
  editData.value.id = row.id

  showEditVisiable.value = true
}
const updateStuRecord = () => {
  UpdateStuRecord(editData.value).then(() => {
    showEditVisiable.value = false
    for (const key in editData.value) {
      editData.value[key] = ''
    }
    getStuRecordListById()
  })
}
</script>

<style lang="less" scoped>
.history {
  :deep(.el-descriptions__body .el-descriptions__table:not(.is-bordered) .el-descriptions__cell) {
    display: none;
  }
}

.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
