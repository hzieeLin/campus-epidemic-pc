<template>
  <el-dialog
      v-model="props.editShowVisible"
      @close="onClose"
      style="color:#000;"
      width="30%"
  >
    <template #header="{ close, titleId, titleClass }">
      <h4 class="titleClass">编辑</h4>
    </template>
    <el-form>
      <div class="form-box">
        <div class="item-row">
          <div class="item-cow">
            <el-form-item label="工号" name="code">
              <el-input v-model.trim="editForm.code" />
            </el-form-item>
          </div>
          <div class="item-cow">
            <el-form-item label="姓名" name="name">
              <el-input v-model.trim="editForm.name"  />
            </el-form-item>
          </div>
        </div>
        <div class="item-row">
          <div class="item-cow">
            <el-form-item label="联系方式" name="phone">
              <el-input v-model.trim="editForm.phone" />
            </el-form-item>
          </div>
          <div class="item-cow">
            <el-form-item label="性别" name="sex">
              <el-radio-group v-model.trim="editForm.sex">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <div class="item-row">
          <div class="item-cow">
            <el-form-item label="身份证" name="idCard">
              <el-input v-model.trim="editForm.idCard" />
            </el-form-item>
          </div>
          <div class="item-cow">
            <el-form-item label="居住地址" name="address">
              <el-input v-model.trim="editForm.address"/>
            </el-form-item>
          </div>
        </div>
        <div class="item-row">
          <div class="item-cow">
            <el-form-item label="所属学院" name="deptCode">
              <el-select v-model="editForm.deptName">
                <el-option :value="item.label" v-for="(item, index) in props.DeptList" :key="index">{{item.label}}</el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <template #footer>
      <div class="edit-footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="editFormInfo">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch} from "vue";
import {UpdateFacultyInfo} from "../../../../../api/administrator/update";
import {ElMessage} from "element-plus";

const props = defineProps(['editShowVisible','editFacultyInfo','DeptList'])
const emit = defineEmits(['onClose','updateInfo'])
const onClose = () => {
  emit('editClose', false)
}
const editForm = ref({})
const editFormInfo = () => {
  let dept = props.DeptList.find(i => i.label === editForm.value.deptName)
  console.log(dept)
  const data = {
    id:editForm.value.id,
    name:editForm.value.name,
    deptCode:dept.code,
    phone:editForm.value.phone,
    sex:editForm.value.sex === '男' ? 1:2,
    idCard:editForm.value.idCard,
    address:editForm.value.address,
  }
  UpdateFacultyInfo(data).then(res => {
    if (res.success === true) {
      ElMessage.success("修改信息成功！")
      emit('updateInfo', false)
    }
  })
}
watch(() => props.editFacultyInfo, (newVal) => {
  editForm.value = JSON.parse(JSON.stringify(newVal))
},{
  immediate: true
} )
</script>

<style lang="less" scoped>
.titleClass {
  color: #000000;
  font-size: 23px;
}
.form-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .item-cow {
    width: 100%;
    height: 70px;
    display: flex;
    .el-form-item {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      :deep(.el-form-item__label) {
        width: 25%;
        font-size: 16px;
        color: #000;
        line-height: 35px;
        margin-left: 10px;
      }
      :deep(.el-form-item__content) {
        height: 44px;
        .el-input {
          height: 36px;
          width: 320px;
        }
      }
    }
  }
}
</style>
