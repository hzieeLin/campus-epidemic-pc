import request from "../../plugins/request";

// 分页查询待隔离人员
export function GetIsolationList(data) {
  return request({
    url: `/isolationPerson/queryPageToBeIsolationPerson`,
    method: 'get',
    params: {...data}
  })
}

// 分页查询已隔离人员
export function GetIsolatedList(data) {
  return request({
    url: `/isolationPerson/queryPageIsolationPerson`,
    method: 'get',
    params: {...data}
  })
}

// 根据隔离人员Id查询隔离记录
export function GetStuRecordListById(data) {
  return request({
    url: `/isolationDetail/queryIsolationDetailById`,
    method: 'get',
    params: {...data}
  })
}

// 防疫人员查看与自己相关的反馈受理
export function QueryPageEpidemicFeedbackAcceptance(data) {
  return request({
    url: `/feedbackAcceptance/queryPageEpidemicFeedbackAcceptance`,
    method: 'get',
    params: {...data}
  })
}

// 防疫人员查看自己提出的反馈受理
export function QueryPageEpidemicMyselfFeedbackAcceptance(data) {
  return request({
    url: `/feedbackAcceptance/queryPageEpidemicMyselfFeedbackAcceptance`,
    method: 'get',
    params: {...data}
  })
}

// 统计隔离人员的数据
export function StatisticsAllData() {
  return request({
    url: '/isolationPerson/queryEpidemicIsolationPersonAnalysis',
    method: 'get'
  })
}
// 统计反馈
export function AnalyzeEpidemicFeedbackAcceptance() {
  return request({
    url: '/feedbackAcceptance/analyzeEpidemicFeedbackAcceptance',
    method: 'get'
  })
}
