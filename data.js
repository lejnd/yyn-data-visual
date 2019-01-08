/*
** 投诉区域分析
*/
module.exports = [
    // 投诉趋势图
    // 请求体
    {
        data: {
            userid: '',
            date: ['', ''],
            city: '',
            type: ''
        }
    },
    // 返回值
    {
        data: {
            date: ['2018-08-01', '2018-08-02', '2018-08-03', '2018-08-04'],      // 日期
            value: [31, 23, 23, 332, 11, 22, 33],          // 投诉量
        }
    },

    // 区域投诉数据
    // 请求体
    {
        data: {
            userid: '',
            date: ['', ''],
            city: '',
            type: ''
        }
    },
    // 返回值
    {
        data: {
            // 区域投诉数据 - 投诉状态
            complainState: {
                total: 2323,    // 投诉总量
                opened: 212,    // 拆单件数
                revoke: 233,    // 游客撤销
                refuse: 424,    // 不予受理
                normal: 123,    // 正常办结
                overtime: 434,  // 超时办结
                handling: 323,  // 处理中
            },
            list: [{
                name: '昆明市',    // 地区
                value: 324,   // 投诉量
                ratio: '32.22%',   // 投诉占比
            }]
        }
    },

    // 平均响应时长
    // 请求体
    {
        data: {
            userid: '',
            date: ['', ''],
            city: '',
            type: '',
            department: '1'    // 部门（指挥中心1、横向部门2、企业3）
        }
    },
    // 返回值
    {
        data: {
            tenRes: 213,        // 十分钟内响应
            twentyRes: 232,     // 二十分钟内响应
            twentyNoRes: 323,    // 二十分钟未响应
            list: [{
                name: '昆明市',    // 地区
                value: 324,   // 投诉量
                resMin: 50,   // 平均响应时间（分钟）
                resSec: 12,    // 平均响应时间（秒）
            }]
        }
    },

    // 平均办结时长
    // 请求体
    {
        data: {
            userid: '',
            date: ['', ''],
            city: '',
            type: '',
        }
    },
    // 返回值
    {
        data: {
            list: [{
                name: '昆明市',    // 地区
                value: 324,   // 投诉量
                doneMin: 50,   // 平均响应时间（分钟）
                doneSec: 12,    // 平均响应时间（秒）
            }]
        }
    },

    // 24小时办结率
    // 请求体
    {
        data: {
            userid: '',
            date: ['', ''],
            city: '',
            type: '',
        }
    },
    // 返回值
    {
        data: {
            list: [{
                name: '昆明市',    // 地区
                value: 324,       // 投诉量
                rate: '99.99%',   // 24小时办结率
                overtime: '',     // 超时量
            }]
        }
    },

    // 账号开通数
    // 请求体
    {
        data: {
            userid: '',
            date: ['', ''],
            city: '',
            type: '',
        }
    },
    // 返回值
    {
        data: {
            gov: '323',      // 政府账号
            center: '2323',     // 指挥中心账号
            centerRate: '12%',   // 指挥中心账号占比
            department: '2323',  //  横行部门账号
            departmentRate: '43%',   // 横行部门账号占比
            list: [{
                id: '',
                name: '',    // 旅行社、景区、酒店、餐饮、其他
                onlineActive: 323,      // 线上企业使用中
                onlineNoActive: 123,     // 线上企业待激活
                offlineActive: 323,      // 线下企业使用中
                offlineNoActive: 323,     // 线下企业待激活
            }]
        }
    },

    // 游客评价情况
    // 请求体
    {
        data: {
            userid: '',
            date: ['', ''],
            city: '',
            type: '',
            assessType: 0      // 筛选条件： 全部0，游客评价1
        }
    },
    // 返回值
    {
        data: {
            list: [{
                name: '5星（非常满意）',
                value: 350
            }]
        }
    },

    // 投诉对象分类
    // 请求体
    {
        data: {
            userid: '',
            date: ['', ''],
            city: '',
            type: ''
        }
    },
    // 返回值
    {
        data: {
            total: 2324,    // 投诉总量
            list: [{
                id: '',
                name: '旅行社',
                value: 350
            }]
        }
    },
]

/*
** 投诉来源分析
*/
module.exports = [
    // 请求体
    {
        data: {
            userid: '',
            date: ['', ''],
            city: ''
        }
    },
    // 返回值
    {
        data: {
            list: [{
                id: '',
                name: '电话投诉',      // 投诉渠道
                value: 350,           // 投诉量
                ratio: '20%'          // 占比
            }]
        }
    },
]

/*
** 投诉时段分析
*/
module.exports = [
    // 请求体
    {
        data: {
            userid: '',
            date: ['', ''],
            city: ''
        }
    },
    // 返回值
    {
        data: {
            list: [{
                id: '',
                name: '0-1',         // 时段
                value: 30,           // 投诉量
            }, {
                id: '',
                name: '1-2',         // 时段
                value: 30,           // 投诉量
            }]
        }
    },
]

/*
** 投诉对象分析
*/
module.exports = [
    // 请求体
    {
        data: {
            userid: '',
            date: ['', ''],
            city: ''
        }
    },
    // 返回值
    {
        data: {
            // 投诉分类数据列表
            dataList: [{
                id: '',
                name: '旅行社',         // 投诉分类分类
                value: 305,           // 投诉总量
                absolute: 232,        // 绝对值
                ratio: '30%',         // 占比
                rate: '+1.23%'        // 环比增长
            }, {
                id: '',
                name: '交通',         // 投诉分类分类
                value: 307,           // 投诉总量
                absolute: 232,        // 绝对值
                ratio: '30%',         // 占比
                rate: '-1.23%'        // 环比下降
            }],
            // 投诉分类占比列表
            ratioList: [{
                name: '公共服务',       // 投诉渠道
                value: 232,            // 投诉总量
                ratio: '23%',           // 占比
            }]
        }
    },
]