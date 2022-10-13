import request from "../../plugins/request/index.js";

// 根据学号删除学生
export function DeleteStudentByCode(data) {
  return request({
    url: `/student/deleteStudent`,
    method: 'get',
    params: {
      ...data
    }
  })
}

// 根据工号删除教职工
export function DeleteFacultyByCode(data) {
  return request({
    url: `/teacher/deleteTeacher`,
    method: 'get',
    params: {
      ...data
    }
  })
}
