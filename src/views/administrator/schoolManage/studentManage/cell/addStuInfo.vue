<template>
  <el-drawer
      v-model="props.addShowVisible"
      @close="onClose"
      style="color:#000;"
      size="38%"
  >
    <template #header="{ close, titleId, titleClass }">
      <h4 class="titleClass">修改学生信息</h4>
    </template>
    <el-form>
      <div class="form-box">
        <div class="item-row">
          <div class="item-cow">
            <el-form-item label="学号" name="code">
              <el-input v-model="form.code" placeholder="请输入学号" />
            </el-form-item>
          </div>
          <div class="item-cow">
            <el-form-item label="姓名" name="name">
              <el-input v-model="form.name" placeholder="请输入姓名" />
            </el-form-item>
          </div>
        </div>
        <div class="item-row">
          <div class="item-cow">
            <el-form-item label="联系方式" name="phone">
              <el-input v-model="form.phone" placeholder="请输入联系方式" />
            </el-form-item>
          </div>
          <div class="item-cow">
            <el-form-item label="性别" name="sex">
              <el-radio-group v-model="form.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <div class="item-row">
          <div class="item-cow">
            <el-form-item label="身份证" name="idCard">
              <el-input v-model="form.idCard" />
            </el-form-item>
          </div>
          <div class="item-cow">
            <el-form-item label="居住地址" name="address">
              <el-input v-model="form.address"/>
            </el-form-item>
          </div>
        </div>
        <div class="item-row">
          <div class="item-cow">
            <el-form-item label="所属学院" name="deptCode">
              <el-select v-model="form.deptCode" @change="getMajorListByCode(form.deptCode)">
                <el-option :value="item.label" v-for="(item, index) in DeptList" :key="index">{{item.label}}</el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item-cow">
            <el-form-item label="所属专业" name="majorCode">
              <el-select v-model="form.majorCode"  @change="getMajorListByCode(form.majorCode)">
                <el-option :value="item.label" v-for="(item, index) in majorList" :key="index" >{{item.label}}</el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="item-row">
          <div class="item-cow">
            <el-form-item label="所在班级" name="classCode">
              <el-select v-model="form.classCode" placeholder="请选择对应的班级号" >
                <el-option :value="item.label" v-for="(item, index) in classList" :key="index">{{item.label}}</el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item-cow">
            <el-form-item label="紧急联系人" name="emergencyContact">
              <el-input v-model="form.emergencyContact" />
            </el-form-item>
          </div>
        </div>
        <div class="item-row">
          <div class="item-cow">
            <el-form-item label="紧急联系人联系方式" name="emergencyPhone">
              <el-input v-model="form.emergencyPhone"/>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <template #footer>
      <div class="edit-footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="addStudent">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import {ref, watch} from "vue";
import {GetClassListByMajorCode, GetDeptList, GetMajorListByDeptCode} from "../../../../../api/administrator/query";
import {AddStuInfo} from "../../../../../api/administrator/insert";
const props = defineProps(['addShowVisible', 'DeptList', 'majorList', 'classList'])
const form = ref({
  code:"",
  name:"",
  deptCode:"",
  majorCode:"",
  classCode:"",
  phone:"",
  emergencyContact:"",
  emergencyPhone:"",
  sex: null,
  idCard:"",
  address:""
})
// const formRules = ref({
//   code: [{ required: 'true', message: '学号不能为空！'}],
//   name:[{ required: 'true', message: '姓名不能为空！'}],
//   deptCode:[{ required: 'true', message: '所属院系不能为空！'}],
//   majorCode:[{ required: 'true', message: '所属专业不能为空！'}],
//   classCode:[{ required: 'true', message: '所在班级号不能为空！'}],
//   phone:[{ required: 'true', message: '手机号不能为空！'}],
//   emergencyContact:[{ required: 'true', message: '紧急联系人不能为空！'}],
//   emergencyPhone:[{ required: 'true', message: '紧急联系人手机号不能为空！'}],
//   sex:[{ required: 'true', message: '性别不能为空！'}],
//   idCard:[{ required: 'true', message: '身份证不能为空！'}],
//   address:[{ required: 'true', message: '家庭地址不能为空！'}]
// })
watch(() => props.addShowVisible, (newVal) => {
  if (newVal) {
    getDeptList()
  }
})

const DeptList = ref([])
// 获取全部的院系
const getDeptList = () => {
  GetDeptList().then(res => {
    DeptList.value = res.data
    getMajorListByCode(res.data[0].code)
  })
}
const majorList = ref([])
const getMajorListByCode = (code) => {
  const data = {
    deptCode: code
  }
  GetMajorListByDeptCode(data).then((res) => {
    majorList.value = res.data
    getClassListByCode(res.data[0].code)
  })
}

// 通过专业名获取班级号
const classList = ref([])
const getClassListByCode = (code) => {
  const data = {
    majorCode: code
  }
  GetClassListByMajorCode(data).then((res) => {
    classList.value = res.data
  })
}
const emit = defineEmits(['addClose'])

const addStudent = () => {
  AddStuInfo(form.value).then(res => {
    console.log(res)
    onClose()
  })
}
// 关闭窗口
const onClose = () => {
  emit('addClose', false)
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
  justify-content: space-around;
  align-items: center;
  .item-row {
    display: flex;
    height: 100px;
    width: 100%;
    .item-cow {
      margin-left: 20px;
      flex-basis: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .el-form-item {
        display: flex !important;
        flex-direction: column;
        :deep(.el-form-item__label) {
          justify-content: flex-start !important;
          font-size: 16px;
          color: #000;
          line-height: 0;
          margin-left: 10px;
        }
        :deep(.el-form-item__content) {
          height: 44px;
          .el-input {
            height: 36px;
            width: 280px;
          }
        }
      }
    }
  }
}
.edit-footer {
  height: 70px;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 16px;
  .el-button {
    height: 40px;
    width: 70px;
  }
}
:deep(.el-drawer__body) {
  overflow: hidden !important;
  background: #4A7EFE !important;
}
</style>
