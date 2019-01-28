export default [
    /*
    ** 旅行社管理-图表查询
    */
    // 请求体
    {
        data: {
            startDate: '',
            endDate: '',
            region: '',    // 拆为city和county
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
    ** 旅行社管理-违规列表查询
    */
    // 请求体
    {
        data: {
            startDate: '',
            endDate: '',
            region: '',
        }
    },
    // 返回值
    {
        data: {
            violateList: [{
                id: '',
                name: '昆明A旅行社',    // 旅行社名称
                deduction: '23',       // 累计扣分
                department: '昆明市旅发委',   // 扣分部门
                area: '云南省昆明市五华区',   // 所属区域
            }],
            deductionList: [{
                id: '',
                name: '昆明A旅行社',    // 旅行社名称
                department: '昆明市旅发委',   // 扣分部门
                reason: '',         // 扣分原因
                while: '',          // 累计时间（字符串或时间戳）
                deduction: '23',       // 累计扣分
            }]
        }
    },

    /*
    ** 旅行社管理-新增一家扣分旅行社
    */
    // 请求体
    {
        data: {
            startDate: '',
            endDate: '',
            region: '',
        }
    },
    // 返回值
    {
        data: {
            id: '',   // 新增id
            name: '',  // 新增name
        }
    },

    /*
    ** 导游管理-图表查询
    */
    // 请求体
    {
        data: {
            startDate: '',
            endDate: '',
            region: '',
            level: ''
        }
    },
    // 返回值
    {
        data: {
            // 按地区分布列表
            areaList: {
                region: '',
                total: 3434,
                list: [{
                    name: '昆明',    // 地区
                    code: '',       // 地区code
                    value: 324,   // 导游数量
                    ratio: '32.22%',   // 导游占比
                    average: 78,    // 导游打分平均分
                }]
            },
            // 按性别分布列表
            sexList: [{
                name: '男',
                value: 312
            }],
            // 按年龄分布列表
            ageList: [{
                name: '20-30',
                value: 212
            }],
            // 按语种分布列表
            languageList: [{
                name: '英语',
                value: 121
            }],
            // 按名族分布列表
            nationList: [{
                name: '汉族',
                value: 234
            }],
        }
    },

    // 云南省导游打分/扣分排名（TOP100）
    // 请求体
    {
        type: 'score'   // score、deduction
    },
    // 返回体
    {
        data: {
            list: [{
                id: '',
                name: '',
                value: 34,
                agency: '',   // 所属旅行社
                area: ''    // 所属区域
            }]
        }
    }
]