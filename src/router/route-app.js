export default function init() {
  return [
     // 智能看板
     {
      path: '/mock-nav',
      name: 'mockNav',
      meta: { title: 'mock-nav', icon: 'ai-view', leaf: true },
      component: () => import('../views/mock-nav/index.vue')
    },
    // 智能看板
    {
      path: '/ai-view',
      name: 'aiView',
      meta: { title: '智能看板', icon: 'ai-view' },
      redirect: '/ai-view/config',
      children: []
    },
    // 设备监控
    {
      path: '/device-monitor',
      name: 'deviceMonitor',
      meta: { title: '设备监控', icon: 'device-monitor', name: 'deviceMonitor', leaf: true },
      redirect: '/device-monitor/list',
      children: [
        {
          path: 'list',
          name: 'deviceMonitorList',
          meta: { title: '设备监控' },
          component: () => import('../views/device-monitor/list/device-monitor-list.vue')
        },
        {
          path: ':id/panorama',
          name: 'deviceMonitorListPanorama',
          meta: { title: '设备全景' },
          component: () => import('../views/device-monitor/panorama/panorama.vue')
        },
        {
          path: ':id/history',
          name: 'deviceMonitorListHistory',
          meta: { title: '历史数据' },
          component: () => import('../views/device-monitor/history/history.vue')
        },
        {
          path: ':id/report',
          name: 'deviceMonitorListReport',
          meta: { title: '智能报表' },
          component: () => import('../views/device-monitor/report/report.vue')
        },
        {
          path: ':id/report/:rid',
          name: 'deviceMonitorListReportDetail',
          meta: { title: '报表详情' },
          component: () => import('../views/device-monitor/report-detail/report-detail.vue')
        }
      ]
    },
    // 健康管理
    {
      path: '/health-manage',
      name: 'healthManger',
      meta: { title: '健康管理', icon: 'health-manage' },
      redirect: '/health-manage/config',
      children: []
    },
    // 报表管理
    {
      path: '/report-manage',
      name: 'reportManger',
      meta: { title: '报表管理', icon: 'report-manage' },
      redirect: '/report-manage/config',
      children: []
    },
    // 设备管理
    {
      path: '/device-manage',
      name: 'deviceManger',
      meta: { title: '设备管理', icon: 'device-manage' },
      redirect: '/device-manage/config',
      children: [
        {
          path: 'config',
          name: 'deviceConfig',
          meta: { title: '设备配置', name: 'deviceConfig', leaf: true },
          redirect: '/device-manage/config/list',
          children: [
            {
              path: 'list',
              meta: { title: '设备配置' },
              name: 'deviceConfigList',
              component: () =>
                import(
                  /* webpackChunkName: "device"*/ '../views/device-manage/divice-config/device-config.vue'
                )
            },
            {
              path: 'insert',
              name: 'deviceConfigInsert',
              meta: { title: '设备配置新增' },
              component: () =>
                import(
                  /* webpackChunkName: "device"*/ '../views/device-manage/divice-config/insert/insert.vue'
                )
            }
          ]
        },

        {
          path: 'type',
          name: 'deviceType',
          meta: { title: '设备类型', name: 'deviceType', leaf: true },
          redirect: '/device-manage/type/list',
          children: [
            {
              path: 'list',
              meta: { title: '设备类型' },
              name: 'deviceTypeList',
              component: () =>
                import(
                  /* webpackChunkName: "device"*/ '../views/device-manage/device-type/device-type.vue'
                )
            },
            {
              path: 'insert',
              name: 'deviceTypeInsert',
              meta: { title: '设备类型新增' },
              component: () =>
                import(
                  /* webpackChunkName: "device"*/ '../views/device-manage/device-type/insert/insert.vue'
                )
            }
          ]
        }
      ]
    },
    // 数据源管理
    {
      path: '/data-manage',
      name: 'dataManger',
      meta: { title: '数据源管理', icon: 'data-manage' },
      redirect: '/data-manage/map',
      children: [
        {
          path: 'map',
          name: 'dataMap',
          meta: { title: '数据源映射' },
          component: () =>
            import(/* webpackChunkName: "device"*/ '../views/data-manage/data-map/data-map.vue')
        }
      ]
    },
    // 账户管理
    {
      path: '/account-manage',
      name: 'accountManger',
      meta: { title: '账户管理', icon: 'account-manage' },
      redirect: '/account-manage/config',
      children: []
    }
  ];
}
