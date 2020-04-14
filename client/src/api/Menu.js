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
                            { name: '内部PO', sub: '接口数据', index: 'menu2' },
                            { name: '市场排单', sub: '接口数据', index: 'menu4' },
                            { name: '菜单三', index: 'menu3' },
                            { name: '菜单五', group: '分组二', index: 'menu5' },
                        ],
                        status: 200
                    }
                }
            })
    }
}