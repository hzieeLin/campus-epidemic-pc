import request from "../../plugins/request/index.js"

export function UpdateStuInfo(data) {
  return request({
    url: `/student/updateStudent`,
    method: 'post',
    data
  })
}
// 设置防疫人员标识
export function UpdateFacultyEpidemicStatus(data) {
  return request({
    url: `/teacher/setTeacherToEpidemicPerson`,
    method: 'get',
    params: {...data}
  })
}
// 修改风险等级
export function EditRiskAreaLevel(data) {
  return request({
    url: `/street/batchModifyStreetRiskLevel`,
    method: 'post',
    data
  })
}
// 学生请假同意审批
export function AgreeLeave(data) {
  return request({
    url: `/leave/agreeLeave`,
    method: 'get',
    params: {...data}
  })
}

// 学生请假拒绝审批
export function RejectLeave(data) {
  return request({
    url: `/leave/rejectLeave`,
    method: 'get',
    params: {...data}
  })
}

// 同意反馈受理
export function AgreeFeedback(data) {
  return request({
    url: `/feedbackAcceptance/agreeAdminFeedbackAcceptance`,
    method: 'get',
    params: {...data}
  })
}

// 拒绝反馈受理
export function RejectFeedback(data) {
  return request({
    url: `/feedbackAcceptance/rejectAdminFeedbackAcceptance`,
    method: 'get',
    params: {...data}
  })
}

// 修改教职工信息
export function UpdateFacultyInfo(data) {
  return request({
    url: `/teacher/updateTeacher`,
    method: 'post',
    data
  })
}
