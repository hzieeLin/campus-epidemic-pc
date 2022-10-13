<template>
  <div class="search-container">
    <div class="top">
      <div v-if="props.inputType === 'stu'
                ||props.inputType === 'isolation'
                ||props.inputType === 'waitIsolation'
                ||props.inputType === 'isolated'
                ||props.inputType === 'epidemic'">
        <el-input
          style="width: 280px; margin-right: 22px;"
          v-model.trim="inputValue"
          :placeholder="changeInputPlaceholder"
          class="input-with-select"
        >
          <template #prepend>
            <el-select
              v-model="inputSearchValue"
              placeholder="学号"
              style="width: 94px; height: 32px"
              @change="handleSelect"
            >
              <template
                v-for="(item, index) in inputSelectOptions"
                :key="index"
              >
                <el-option :label="item.label" :value="item.value" />
              </template>
            </el-select>
          </template>
        </el-input>
      </div>
      <div v-else-if="props.inputType === 'faculty'">
        <el-input
          style="width: 280px; margin-right: 22px;"
          v-model.trim="inputValue"
          :placeholder="changeInputPlaceholder"
          class="input-with-select"
        >
          <template #prepend>
            <el-select
              v-model="inputSearchValue"
              placeholder="工号"
              style="width: 94px; height: 32px"
              @change="handleSelect"
            >
              <template
                v-for="(item, index) in inputSearchFacultyOption"
                :key="index"
              >
                <el-option :label="item.label" :value="item.value" />
              </template>
            </el-select>
          </template>
        </el-input>
      </div>
      <div v-else-if="props.inputType === 'area'" style="display: flex">
        <el-cascader
          v-model="inputSearchValue"
          placeholder="请选择省/市/区(县)"
          ref="cascaderData"
          class="cascader-input"
          :options="regionData"
          @change="handleChange"
        />
        <el-button class="btn" style="height: 32px; margin-left: 20px" plain type="primary" :disabled="areaEditDisabled" @click="edit">批量修改 {{other.riskAreaNum}}</el-button>
        <el-button class="btn" style="height: 32px; margin-left: 20px" @click="reset">重置</el-button>
      </div>
      <el-button type="primary" style="height: 32px" class="btn" @click="keyQuery" v-show="props.inputType!=='area'">搜索</el-button>
    </div>
    <div class="table-operations" v-show="props.inputType !=='area'&&props.inputType !=='epidemic'&&props.inputType !== 'isolation'&&props.inputType !== 'isolated'&&props.inputType !== 'waitIsolation'">
      <el-button class="btn" v-if="props.inputType === 'stu'" style="height: 32px" type="primary" @click="add">添加学生</el-button>
      <el-button class="btn" v-else-if="props.inputType === 'faculty'" style="height: 32px" type="primary" @click="add">添加教职工</el-button>
<!--      <el-button class="btn" style="height: 32px" plain type="danger" :disabled="facultyDeleteDisabled" v-show="props.inputType=== 'faculty'" @click="del">批量删除 {{other.facultyDeleteNum}}</el-button>-->
<!--      <el-button class="btn" style="height: 32px" plain type="danger" :disabled="stuDeleteDisabled" v-show="props.inputType=== 'stu'" @click="del">批量删除 {{other.stuDeleteNum}}</el-button>-->
      <el-button class="btn"  v-show="props.inputType === 'stu'|| props.inputType === 'faculty'" style="height: 32px" plain type="success">一键导入</el-button>
    </div>
    <div class="batch-box" v-show="false"></div>
  </div>
</template>

<script setup>
import { ref, watch} from "vue";
import { useOtherStore } from '../../stores/index.js'
const other = useOtherStore()
import { regionData } from "element-china-area-data";
const props = defineProps(["inputType"]);
const emit = defineEmits(["add","keyQuery", "editLevel", "changeAreaCode","reset"])
const edit = () => {
  emit('editLevel', false)
}
const areaEditDisabled = ref(true)
watch(() => other.riskAreaNum, (newVal) => {
  areaEditDisabled.value = newVal === 0
},{immediate: true})
const add = () => {
  emit("add", true);
};
// 关键字查询
const keyQuery = () => {
  emit('keyQuery',{keyWord: inputValue.value, wordType: inputSearchValue.value})
  console.log(1)
}
const reset = () => {
  inputSearchValue.value = 0
  emit('reset', false)
}
const inputSearchStuOption = ref([
  { value: 0, label: "学号" },
  { value: 1, label: "姓名" },
  { value: 2, label: "班级号" },
  { value: 3, label: "专业号" },
  { value: 4, label: "院系名" }
]);
const inputSearchFacultyOption = ref([
  { value: 0, label: "工号" },
  { value: 1, label: "姓名" },
  { value: 2, label: "院系名" }
]);
const inputSearchWaitIsolationOption = ref([
  { value: 0, label: "专业" },
  { value: 1, label: "班级" }
])
const inputSearchIsolatedOption = ref([
  { value: 0, label: "学号" },
  { value: 1, label: "姓名" },
  { value: 2, label: "班级" },
  { value: 3, label: "专业" },
])
const inputSearchIsolationOption = ref([
  { value: 0, label: "姓名" },
  { value: 1, label: "学号" },
  { value: 2, label: "班级" }
])
const inputSearchEpidemicOption = ref([
  { value: 0, label: "姓名" },
  { value: 1, label: "工号" },
])
const inputValue = ref(undefined);
const inputSearchValue = ref(0);
const inputSelectOptions = ref([])
const changeInputPlaceholder = ref("搜索学号");
watch(() => props.inputType, (newVal) => {
  if(newVal === 'stu') {
      inputSelectOptions.value = [...inputSearchStuOption.value]
      changeInputPlaceholder.value = "搜索学号"
  } else if (newVal === 'faculty') {
    inputSelectOptions.value = [...inputSearchFacultyOption.value]
    changeInputPlaceholder.value = "搜索工号"
  } else if(props.inputType === 'waitIsolation') {
    changeInputPlaceholder.value = "搜索专业"
    inputSelectOptions.value = [...inputSearchWaitIsolationOption.value]
  } else if(props.inputType === 'isolated') {
    inputSelectOptions.value = [...inputSearchIsolatedOption.value]
  } else if (props.inputType === 'isolation') {
    changeInputPlaceholder.value = "搜索姓名"
    inputSelectOptions.value = [...inputSearchIsolationOption.value]
  } else if (props.inputType === 'epidemic') {
    inputSelectOptions.value = [...inputSearchEpidemicOption.value]
    changeInputPlaceholder.value = "搜索姓名"
  }
},{immediate: true})
const handleSelect = (value) => {
  if(props.inputType === 'stu') {
    changeInputPlaceholder.value = "搜索" + inputSearchStuOption.value[value].label;
  } else if (props.inputType === 'faculty') {
    changeInputPlaceholder.value = "搜索" + inputSearchFacultyOption.value[value].label;
  } else if(props.inputType === 'waitIsolation') {
    changeInputPlaceholder.value = "搜索" + inputSearchWaitIsolationOption.value[value].label;
  } else if(props.inputType === 'isolated') {
    changeInputPlaceholder.value = "搜索" + inputSearchIsolatedOption.value[value].label;
  } else if (props.inputType === 'isolation') {
    changeInputPlaceholder.value = "搜索" + inputSearchIsolationOption.value[value].label;
  } else if (props.inputType === 'epidemic') {
    changeInputPlaceholder.value = "搜索" + inputSearchEpidemicOption.value[value].label;
  }
};
const handleChange = (val) => {
  emit('changeAreaCode', {value: val[2]})
};
</script>
<style lang="less" scoped>
.search-container {
  //padding: 16px 0 16px 16px;
  display: flex;
  flex-direction: column;
  .top {
    height: 48px;
    display: flex;
    align-items: center;
    .search-group {
      width: 300px;
      height: 35px;
      display: flex;
      align-items: center;
    }
  }
  .table-operations {
    //flex: 1;
    margin-top: 20px;
    display: flex;
    .btn {
      :deep(.el-button) {
        height: 32px;
        margin-right: 16px;
      }
    }
  }
  .batch-box {
    height: 30%;
    margin-top: 20px;
  }
}
:deep(.el-input-group__prepend .select-trigger .el-input__wrapper) {
  height: 2rem;
}
:deep(.el-input-group__prepend .el-select .el-input__inner) {
  // height: 32px;
  display: block;
  text-align: center;
  font-size: 14px;
  color: #000000;
}
.btn {
  height: 32px;
  :deep(.el-button) {
        height: 32px;
        margin-right: 16px;
      }
}
:deep(.el-cascader) {
  height: 40px;
  .el-input {
    height: 40px;
  }
}
.cascader-input {
  width: 220px;
  height: 40px;

}
</style>

