const epidemicPersonnel = [
  {
    path: '/isolationPreManage',
    name: '隔离人员管理',
    children: [
      {
        path: '/isolationPreManage/waitIsolationManage',
        name: '待隔离管理',
        component: () => import('../../../views/epidemicPersonnel/isolationManage/waitIsolationManage/index.vue')
      },
      {
        path: '/isolationPreManage/isolatedManage',
        name: '已隔离管理',
        component: () => import('../../../views/epidemicPersonnel/isolationManage/isolatedManage/index.vue')
      }
    ]
  },
  {
    path: '/isolationFeedbackProcess',
    name: '反馈受理',
    component: () => import('../../../views/epidemicPersonnel/FeedbackProcess/index.vue')
  }
]
export default epidemicPersonnel
