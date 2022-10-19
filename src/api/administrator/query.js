import request from "../../plugins/request/index.js"

// 获取院系列表
export function GetDeptList() {
  return request({
    url: `/dept/getDeptList`,
    method: 'get'
  })
}

// 根据院系编号获取对应的专业列表
export function GetMajorListByDeptCode(data) {
  return request({
    url: `/major/getMajorListByDept`,
    method: 'get',
    params: {...data}
  })
}

// 根据专业编号获取班级列表

export function GetClassListByMajorCode(data) {
  return request({
    url: `/class/getClassListByMajorCode`,
    method: 'get',
    params: {...data}
  })
}
// 获得学生列表
export function GetStuInfoList(data) {
  return request({
    url: `/student/queryStudentByKeyword`,
    method: 'get',
    params: {...data}
  })
}

export function GetStuDaily(data) {
  return request({
    url: `/studentDaily/queryStudentDaily`,
    methods: 'get',
    params: {...data}
  })
}
// 获得职工列表
export function GetFacultyInfoList(data) {
  return request({
    url: `/teacher/queryTeacherPage`,
    method: 'get',
    params: {...data}
  })
}

export function GetFacultyDaily(data) {
  return request({
    url: `/teacherDaily/queryTeacherDailyHistory`,
    methods: 'get',
    params: {...data}
  })
}

// 获取省份列表
export function GetProvinceList() {
  return request({
    url: `/province/getProvinceList`,
    method: 'get',
  })
}

// 根据省份编号获得城市列表
export function GetCityListByCode(data) {
  return request({
    url: `/city/getCityList`,
    method: 'get',
    params: {...data}
  })
}

// 根据城市编号获得区县列表
export function GetCountyListByCode(data) {
  return request({
    url: `/county/getCountyList`,
    method: 'get',
    params: {...data}
  })
}
// 获得风险地区列表
export function GetRiskAreaList(data) {
  return request({
    url: `/street/queryPageStreet`,
    method: 'get',
    params: {...data}
  })
}
// 统计各风险地区数量

export function GetStatisticsStreet() {
  return request({
    url: `/street/queryStatisticsStreet`,
    method: 'get'
  })
}
export function GetFeedbackList(data) {
  return request({
    url: `/feedbackAcceptance/queryPageAdminFeedbackAcceptance`,
    method: 'get',
    params: {...data}
  })
}

// 获得请假本院系的请假列表
export function GetPageLeaveList(data) {
  return request({
    url: `/leave/queryPageLeaveList`,
    method: 'get',
    params: {...data}
  })
}

// 获得防疫人员信息
export function GetEpidemicList(data) {
  return request({
    url: `/teacher/queryEpidemicPerson`,
    method: 'get',
    params: {...data}
  })
}

// 统计分析管理员对应的反馈受理
export function GetStatisticsFeedback() {
  return request({
    url: `/feedbackAcceptance/analyzeAdminFeedbackAcceptance`,
    method: 'get'
  })
}

// 统计管理员对应的请假审批
export function GetStatisticsLeave() {
  return request({
    url: `/leave/analyzeAdminLeave`,
    method: 'get'
  })
}

// 查询本院的隔离人员
export function GetIsolationList(data) {
  return request({
    url: `/isolationPerson/queryPageAdminIsolationPerson`,
    method: 'get',
    params: {...data}
  })
}
