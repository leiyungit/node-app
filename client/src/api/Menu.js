import Http from './http'
export default {
    getMenu() {
        return Http
            .get('/menu', {
                adapter: async (config) => {
                    return {
                        data: [
                            { name: '数据字典', sub: '基础信息',  index: 'menu11' },
                            { name: '节假日', sub: '基础信息', index: 'menu12', componentPath: 'components/UserManager.vue' },
                            { name: 'MI', sub: '基础信息',  index: 'menu13' },
                            { name: '公式', sub: '基础信息',  index: 'menu14' },
                            { name: '市场-内部PO', sub: '接口数据',  index: 'menu21', componentPath:'views/inputdata/sodata.vue'},
                            { name: '接收-内部PO', sub: '接口数据',  index: 'menu22' },
                            { name: '生成排单', sub: '计划排单',  index: 'menu31' },
                            { name: '排单列表', sub: '计划排单',  index: 'menu32' },
                            { name: '排班', sub: '计划排单',  index: 'menu33' },
                            { name: '排程', sub: '计划排单',  index: 'menu34' },
                            { name: '用户管理', sub: '系统',  index: 'menu34' },
                          
                        ],
                        status: 200
                    }
                }
            })
    }
}