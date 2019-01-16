const line = function(xAxis, series) {
    return {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxis || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: {
                lineStyle: { type: 'dashed' }
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: '{b}：{c}起'
        },
        grid: {
            left: '20',
            top: '30',
            right: '50',
            bottom: '20',
            containLabel: true
        },
        series: [{
            data: series || [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            itemStyle: { color: '#0752c9' },
            lineStyle: { color: '#338bff' },
            areaStyle: { color: '#87c1ff' },
            markLine: {
                lineStyle: { type: 'dashed' }
            }
        }]
    }
}

const map = function(data) {
    return {
        tooltip: {
            trigger: 'item',
            // formatter: '{b}<br/>投诉量：{c}起'
            formatter: function(params) {
                if(params.value) {
                    return `${params.name}<br>投诉量：${params.value}起`
                }
            }
        },
        visualMap: {
            left: 'right',
            text:['高','低'],
            realtime: false,
            itemWidth: 10,
            itemHeight: 60,
            inRange: {
                color: ['lightskyblue','yellow', 'orangered']
            }
        },
        series: [
            {
                type: 'map',
                mapType: 'yunnan', // 云南地图JSON
                aspectScale: 0.88,
                zoom: 1.2,
                itemStyle:{
                    areaColor: 'lightskyblue'
                },
                label: {
                    show: true,
                    color: '#000',
                    emphasis: {
                        show: true
                    }
                },
                data: data || [{name: '昆明', value: 20057.34}],
                // 自定义名称映射
                nameMap: {
                    '迪庆藏族自治州': '迪庆',
                    '丽江市': '丽江',
                    '昭通市': '昭通',
                    '怒江傈僳族自治州': '怒江',
                    '大理白族自治州': '大理',
                    '曲靖市': '曲靖',
                    '保山市': '保山',
                    '德宏傣族景颇族自治州': '德宏',
                    '临沧市': '临沧',
                    '昆明市': '昆明',
                    '楚雄彝族自治州': '楚雄',
                    '玉溪市': '玉溪',
                    '红河哈尼族彝族自治州': '红河',
                    '文山壮族苗族自治州': '文山',
                    '普洱市': '普洱',
                    '西双版纳傣族自治州': '西双版纳'
                }
            }
        ]
    }
}

const timeBar = function(name, list) {
    let option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                if (!list) return '';
                const arr = list.filter(item => item.name == params.name)
                const obj = arr[0] || {};
                if (params.componentType == 'markLine') {
                    const data = params.data;
                    return `${params.name}<br/>
                    ${parseInt(data.value)}分钟`
                } else {
                    // switch (params.seriesIndex) {
                    //     case 0:
                    //         return `地区：${params.name}<br/>
                    //         ${params.seriesName}：${params.value}分钟<br/>`
                    //     case 1:
                    //         return `地区：${params.name}<br/>
                    //         ${params.seriesName}：${params.value}<br/>`
                    //     default:
                    //         break;
                    // }
                    return `地区：${params.name}<br/>
                    ${params.seriesName}：${params.value}分钟<br/>
                    投诉量：${obj.value}`
                }
            }
        },
        legend: {
            data: [name, '投诉量'],
            bottom: 1,
        },
        grid: {
            left: 'left',
            top: '30',
            right: '66',
            bottom: '40',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: list ? list.map((item) => item.name) : [],
            axisLabel: {
                interval: 0,
                rotate:40
            }
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { formatter: '{value}分钟' },
            splitLine: {
                lineStyle: { type: 'dashed' }
            }
        },
        series: [{
            name: name,
            data: list ? list.map((item) => item.doneMin || item.resMin) : [],
            type: 'bar',
            barWidth: 15,
            itemStyle: {
                color: '#338BFF'
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ],
                label: {
                    formatter: '{b}'
                },
                lineStyle: { type: 'solid' }
            }
        }, 
        // {
        //     name: '投诉量',
        //     data: list ? list.map((item) => item.value) : [],
        //     type: 'bar',
        //     barWidth: 10,
        //     itemStyle: {
        //         color: '#2FC3D2'
        //     }
        // }
        ]
    };
    return option;
}

const rateBar = function(list) {
    let option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                if (!list) return '';
                const arr = list.filter(item => item.name == params.name)
                const obj = arr[0] || {};
                if (params.componentType == 'markLine') {
                    const data = params.data;
                    return `${params.name}<br/>
                    ${data.value}%`
                } else {
                    // switch (params.seriesIndex) {
                    //     case 0:
                    //         return `地区：${params.name}<br/>
                    //         ${params.seriesName}：${params.value}%<br/>`
                    //     case 1:
                    //         return `地区：${params.name}<br/>
                    //         ${params.seriesName}：${params.value}<br/>`
                    //     default:
                    //         break;
                    // }
                    return `地区：${params.name}<br/>
                    ${params.seriesName}：${params.value}%<br/>
                    投诉量：${obj.value}`
                }
            }
        },
        legend: {
            data:['24小时办结率', '投诉量'],
            bottom: 1,
        },
        grid: {
            left: 'left',
            top: '30',
            right: '66',
            bottom: '40',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: list ? list.map((item) => item.name) : [],
            axisLabel: {
                interval: 0,
                rotate:40
            }
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { formatter: '{value}%' },
            splitLine: {
                lineStyle: { type: 'dashed' }
            }
        },
        series: [{
            name: '24小时办结率',
            data: list ? list.map((item) => item.rate.replace('%', '')) : [],
            type: 'bar',
            barWidth: 15,
            itemStyle: {
                color: '#338BFF'
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ],
                label: {
                    formatter: '{b}'
                },
                lineStyle: { type: 'solid' }
            }
        },
        // {
        //     name: '投诉量',
        //     data: list ? list.map((item) => item.value) : [],
        //     type: 'bar',
        //     barWidth: 10,
        //     itemStyle: {
        //         color: '#2FC3D2'
        //     }
        // }
        ]
    };
    return option;
}

const accountBar = function(list) {
    let option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{a}<br/>{c}'
        },
        legend: {
            data: ['使用中', '待激活'],
            bottom: 1,
        },
        grid: {
            left: 'left',
            top: '30',
            right: '30',
            bottom: '40',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: list ? list.name : [],
            axisLabel: {
                interval: 0,
                // rotate:40
            }
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: {
                lineStyle: { type: 'dashed' }
            }
        },
        series: [{
            name: '使用中',
            data: list ? list.onlineActive : [],
            type: 'bar',
            barWidth: 10,
            itemStyle: {
                color: '#0D6BE3'
            }
        }, {
            name: '待激活',
            data: list ? list.onlineNoActive : [],
            type: 'bar',
            barWidth: 10,
            itemStyle: {
                color: '#2FC3D2'
            }
        }]
    };
    return option;
}

const assessPie = function(list, redis) {
    const data = list ? list.map(item => Object.assign({}, item, {
        name: item.name.replace('（','(').replace('）',')'),
        url: `dataDisplayList?method=initEvaluationList&level=${item.name[0]}`
    })) : [];
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        // legend: {
        //     data: list ? list.map(item => item.name) : []
        // },
        color:['#4C6293', '#FF7656', '#5AD5E0', '#338BFF', '#29CC85'],
        series: [
            {
                name:'游客评价情况',
                type:'pie',
                radius: redis,
                center: ['50%', '50%'],
                minAngle: 3,           　　 //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
                avoidLabelOverlap: true,   //是否启用防止标签重叠策略
                hoverAnimation: false,
                label: {
                    normal: {
                        formatter: '{per|{c}起{d}%}\n{a|{b}}\n{hr|}',
                        rich: {
                            a: {
                                color: '#999999',
                                fontSize: 11,
                                lineHeight: 20,
                                align: 'center'
                            },
                            hr: {
                                width: '100%',
                                height: 0,
                                alien:'center'
                            },
                            per: {
                                // color: '#000000',
                                align: 'center',
                                fontSize: 13,
                                fontWeight: 600,
                            }
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: data
            }
        ]
    }
    return option
}

const radar = function(data, redis) {
    const list = data.list || [];
    const max = Math.max.apply(null, list.map(item => item.value)) * 1.3
    const option = {
        tooltip: {
            trigger: 'item',
            // formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        radar: [
            {
                indicator: list ? list.map(item => Object.assign({}, item, {
                    text: item.name,
                    max: max > data.total ? data.total : max
                })) : [],
                radius: redis,
                center: ['50%','60%'],
                splitNumber: 3,
                name: {
                    formatter: function(a, b) {
                        return `${b.value}\n${a}`
                    }
                }
            }
        ],
        series: [
            {
                type: 'radar',
                name: `投诉总量：${data.total}`,
                radarIndex: 0,
                data: [
                    {
                        value: list ? list.map(item => item.value) : [],
                    }
                ],
                itemStyle: {
                    normal: {
                        color: '#5AD5E0'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.4
                    }
                }
            }
        ]
    };
    return option
}

export default {
    line,
    map,
    timeBar,
    rateBar,
    accountBar,
    assessPie,
    radar
};