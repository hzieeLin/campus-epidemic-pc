import request from "../../plugins/request";

// 隔离该学生
export function UpdateStuState(data) {
  return request({
    url: `/isolationPerson/isolation`,
    method: 'get',
    params: {...data}
  })
}

// 修改某一条隔离体温记录
export function UpdateStuRecord(data) {
  return request({
    url: `/isolationDetail/reviseIsolationDetail`,
    method: 'get',
    params: {...data}
  })
}

// 解除隔离/pc
export function ReleaseStu(data) {
  return request({
    url: `/isolationPerson/releaseQuarantine`,
    method: 'get',
    params: {...data}
  })
}
// 防疫人员同意该条受理 /pc
export function AgreeEpidemicFeedbackAcceptance(data) {
  return request({
    url: `/feedbackAcceptance/agreeEpidemicFeedbackAcceptance`,
    method: 'get',
    params: {...data}
  })
}

// 防疫人员拒绝该条受理 /pc
export function RejectEpidemicFeedbackAcceptance(data) {
  return request({
    url: `/feedbackAcceptance/rejectEpidemicFeedbackAcceptance`,
    method: 'get',
    params: {...data}
  })
}

// 防疫人员无法处理该条受理 /pc
export function UnableDealEpidemicFeedbackAcceptance(data) {
  return request({
    url: `/feedbackAcceptance/unableDealEpidemicFeedbackAcceptance`,
    method: 'get',
    params: {...data}
  })
}

// 隔离该学生 /pc/isolationPerson/isolation
export function IsolationStu(data) {
  return request({
    url: '/isolationPerson/isolation',
    method: 'get',
    params: {...data}
  })
}
