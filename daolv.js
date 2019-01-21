export default [
    /*
    ** 旅行社管理-图表查询
    */
    // 请求体
    {
        data: {
            date: ['2018-01-01', '2019-01-01'],
            region: '',
            level: ''
        }
    },
    // 返回值
    {
        data: {
            list: [{
                name: '昆明',    // 地区
                code: '',       // 地区code
                value: 324,   // 旅行社数量
                ratio: '32.22%',   // 旅行社占比
                completed: 122,    // 电子行程单填报数量
            }]
        }
    },

    /*
    ** 旅行社管理-列表查询
    */
    // 请求体
    {
        data: {
            date: ['2018-01-01', '2019-01-01'],
            region: '',
        }
    },
    // 返回值
    {
        data: {
            list: [{
                name: '昆明',    // 地区
                code: '',       // 地区code
                value: 324,   // 旅行社数量
                ratio: '32.22%',   // 旅行社占比
                completed: 122,    // 电子行程单填报数量
            }]
        }
    },
]