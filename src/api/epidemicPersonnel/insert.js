import request from "../../plugins/request";

// 添加隔离人员体温监测
export function AddIsolationDetail(data) {
  return request({
    url: `/isolationDetail/addIsolationDetail`,
    method: 'get',
    params: {...data}
  })
}

// 防疫人员发起反馈受理 /pc
export function AddEpidemicFeedbackAcceptance(data) {
  return request({
    url: `/feedbackAcceptance/addEpidemicFeedbackAcceptance`,
    method: 'post',
    data
  })
}
