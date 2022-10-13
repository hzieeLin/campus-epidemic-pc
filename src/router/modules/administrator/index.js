const administrator = [
  {
    path: '/schoolManage',
    name: '在校学生管理',
    children: [
      {
        path: '/schoolManage/studentManage',
        name: '学生管理',
        component: () => import('../../../views/administrator/schoolManage/studentManage/index.vue')
      },
      {
        path: '/schoolManage/facultyManage',
        name: '教职工管理',
        component: () => import('../../../views/administrator/schoolManage/facultyManage/index.vue')
      }
    ]
  },
  {
    path: '/riskAreaManage',
    name: '风险地区管理',
    component: () => import('../../../views/administrator/riskAreaManage/index.vue')
  },
  {
    path: '/isolationManage',
    name: '隔离人员查询',
    component: () => import('../../../views/administrator/isolationManage/index.vue')
  },
  {
    path: '/epidemicFacultyManage',
    name: '防疫人员管理',
    component: () => import('../../../views/administrator/epidemicManage/index.vue')
  },
  {
    path: '/feedbackProcess',
    name: '反馈意见受理',
    component: () => import('../../../views/administrator/feedbackProcess/index.vue')
  },
  {
    path: '/statisticalAnalysis',
    name: '疫情统计分析',
    component: () => import('../../../views/administrator/statisticalAnalysis/index.vue')
  },
  {
    path: '/studentLeaveApproval',
    name: '学生请假审批',
    component: () => import('../../../views/administrator/studentLeaveApproval/index.vue')
  },
  {
    path: '/myInfo',
    name: '个人中心',
    component: () => import('../../../views/common/myInfo/index.vue')
  }
]

export default administrator
