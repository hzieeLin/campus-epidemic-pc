<template>
  <el-drawer
      v-model="props.editShowVisible"
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
                    <el-input v-model:value="props.editStuInfo.code" placeholder="请输入学号" />
                  </el-form-item>
                </div>
                <div class="item-cow">
                  <el-form-item label="姓名" name="name">
                    <el-input v-model:value="props.editStuInfo.name" placeholder="请输入学号" />
                  </el-form-item>
                </div>
              </div>
              <div class="item-row">
                <div class="item-cow">
                  <el-form-item label="联系方式" name="phone">
                    <el-input v-model:value="props.editStuInfo.phone" placeholder="请输入联系方式" />
                  </el-form-item>
                </div>
                <div class="item-cow">
                  <el-form-item label="性别" name="sex">
                    <el-radio-group v-model="props.editStuInfo.sex">
                      <el-radio :label="1">男</el-radio>
                      <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
              </div>
              <div class="item-row">
                <div class="item-cow">
                  <el-form-item label="身份证" name="idCard">
                    <el-input v-model="props.editStuInfo.idCard" />
                  </el-form-item>
                </div>
                <div class="item-cow">
                  <el-form-item label="居住地址" name="address">
                    <el-input v-model="props.editStuInfo.address"/>
                  </el-form-item>
                </div>
              </div>
              <div class="item-row">
                <div class="item-cow">
                  <el-form-item label="所属学院" name="deptCode">
                    <el-select v-model="props.editStuInfo.deptName" @change="emitDeptCode(props.editStuInfo.deptCode)">
                      <el-option :value="item.code" v-for="(item, index) in props.DeptList" :key="index">{{item.label}}</el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="item-cow">
                  <el-form-item label="所属专业" name="majorCode">
                    <el-select v-model="props.editStuInfo.majorName"  @change="emitMajorCode(props.editStuInfo.majorCode)">
                      <el-option :value="item.code" v-for="(item, index) in props.majorList" :key="index" >{{item.label}}</el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="item-row">
                <div class="item-cow">
                  <el-form-item label="所在班级" name="classCode">
                    <el-select v-model="props.editStuInfo.className" placeholder="请选择对应的班级号" >
                      <el-option :value="item.code" v-for="(item, index) in props.classList" :key="index">{{item.label}}</el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="item-cow">
                  <el-form-item label="紧急联系人" name="emergencyContact">
                    <el-input v-model:value="props.editStuInfo.emergencyContact" />
                  </el-form-item>
                </div>
              </div>
              <div class="item-row">
                <div class="item-cow">
                  <el-form-item label="紧急联系人联系方式" name="emergencyPhone">
                    <el-input v-model:value="props.editStuInfo.emergencyPhone"/>
                  </el-form-item>
                </div>
              </div>
            </div>
    </el-form>
    <template #footer>
      <div class="edit-footer">
        <el-button>取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
const props = defineProps(['editShowVisible','editStuInfo', 'DeptList', 'majorList', 'classList'])
const sexOptions = [
  { label: '男' , value: 1 },
  { label: '女', value:  2}
]
const emit = defineEmits(['Close', 'emitDeptCode', 'emitMajorCode'])
const onClose = () => {
  emit('editClose', false)
}
const emitDeptCode = (code) => {
  const data = {
    deptCode: code
  }
  console.log('emit', code)
  emit('emitDeptCode', data)
}
const emitMajorCode = (code) => {
  const data = {
    majorCode: code
  }
  console.log(data)
  emit('emitMajorCode', data)
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
/deep/.el-drawer__body {
  overflow: hidden !important;
  background: #4A7EFE !important;
}
</style>
