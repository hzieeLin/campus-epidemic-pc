import request from "../../plugins/request/index.js";

// 新增单条学生
export function AddStuInfo(data) {
  return request({
    url: `/student/addStudent`,
    method: 'post',
    data
  })
}

// 新增单条教职工
export function AddFacultyInfo(data) {
  return request({
    url: `/teacher/addTeacher`,
    method: 'post',
    data
  })
}

// 回复消息
export function DealReturnLeave(data) {
  return request({
    url: '/leave/dealReturnLeave',
    method: 'post',
    data
  })
}
