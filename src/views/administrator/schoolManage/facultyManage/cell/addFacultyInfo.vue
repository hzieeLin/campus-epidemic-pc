<template>
  <el-dialog
      v-model="props.addShowVisible"
      :before-close="onClose"
      style="color:#000;"
      width="30%"
  >
    <template #header="{ close, titleId, titleClass }">
      <h4 class="titleClass">新增</h4>
    </template>
    <el-form v-model="form" :rules="rules">
      <div class="form-box">
          <div class="item-cow">
            <el-form-item label="工号" name="code" prop="code">
              <el-input v-model.trim="form.code" placeholder="请输入工号" />
            </el-form-item>
          </div>
          <div class="item-cow">
            <el-form-item label="姓名" name="name" prop="name">
              <el-input v-model.trim="form.name" placeholder="请输入姓名" />
            </el-form-item>
          </div>
          <div class="item-cow">
            <el-form-item label="联系方式" name="phone" prop="phone">
              <el-input v-model.trim="form.phone" placeholder="请输入联系方式" />
            </el-form-item>
          </div>
          <div class="item-cow">
            <el-form-item label="性别" name="sex" prop="sex">
              <el-radio-group v-model="form.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="item-cow">
            <el-form-item label="身份证" name="idCard" prop="idCard">
              <el-input v-model.trim="form.idCard" />
            </el-form-item>
          </div>
          <div class="item-cow">
            <el-form-item label="居住地址" name="address">
              <el-input v-model.trim="form.address"/>
            </el-form-item>
          </div>
          <div class="item-cow">
            <el-form-item label="所属学院" name="deptCode">
              <el-select v-model="form.deptCode" >
                <el-option :value="item.label" v-for="(item, index) in props.DeptList" :key="index">{{item.label}}</el-option>
              </el-select>
            </el-form-item>
          </div>
      </div>
    </el-form>
    <template #footer>
      <div class="edit-footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="addFacultyInfo">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import {reactive, ref} from "vue";
import {AddFacultyInfo} from "../../../../../api/administrator/insert";

const props = defineProps(['addShowVisible', 'DeptList'])
const emit = defineEmits(['onClose'])
const form = reactive({
  code: '',
  name: '',
  deptCode: '',
  phone: '',
  sex: null,
  idCard: '',
  address: ''
})
const rules = ref(
  { code: [{ required: true, message: '请输入工号', trigger: 'blur' },
          { min: 4, max: 5, message: '长度在 4个字符', trigger: 'blur' }],
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    deptCode: [{ required: true, message: '请选择所属学院', trigger: 'change' }],
    phone: [{ type: 'phone', required: true, message: '请输入正确的手机号', trigger: 'blur' }],
    sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
    idCard: [{ required: true, message: '请输入正确的手机号', trigger: 'blur' }]
})
const onClose = () => {
  emit('addClose', false)
}
const addFacultyInfo = () => {
  props.DeptList.forEach((item) => {
    if (item.label === form.deptCode) {
      form.deptCode = item.code
    }
  })
  AddFacultyInfo(form).then(() => {
    onClose()
  })
}
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
