
const agency_map = function(data) {
    return {
        tooltip: {
            trigger: 'item',
            // formatter: '{b}<br/>：{c}'
            formatter: function(params) {
                if(params.value) {
                    return `${params.name}<br>投诉量：${params.value}起`
                }
            }
        },
        visualMap: {
            show: false,
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

const guide_map = function(data) {
    return {
        tooltip: {
            trigger: 'item',
            // formatter: '{b}<br/>：{c}'
            formatter: function(params) {
                if(params.value) {
                    return `${params.name}<br>${params.value}名导游`
                }
            }
        },
        visualMap: {
            show: false,
            left: 'right',
            text: ['高', '低'],
            realtime: false,
            itemWidth: 8,
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

// 旅行社数量、导游数量
const bar = function(name, list) {
    let option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                if (!list) return '';
                const arr = list.filter(item => item.name == params.name)
                const obj = arr[0] || {};
                // if (params.componentType == 'markLine') {
                //     const data = params.data;
                //     return `${params.name}<br/>
                //     ${data.value}`
                // } else {
                    return `地区：${params.name}<br/>
                    ${params.seriesName}：${params.value}名<br/>
                    占比：${obj.ratio}%`
                // }
            }
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
            // axisLabel: { formatter: '{value}%' },
            splitLine: {
                lineStyle: { type: 'dashed' }
            }
        },
        series: [{
            name: name,
            data: list ? list.map((item) => item.value) : [],
            type: 'bar',
            barWidth: 15,
            itemStyle: {
                color: '#338BFF'
            },
            // markLine: {
            //     data: [
            //         {type: 'average', name: '平均值'}
            //     ],
            //     label: {
            //         formatter: '{b}'
            //     },
            //     lineStyle: { type: 'solid' }
            // }
        }]
    };
    return option;
}

const score_bar = function(name, list) {
    let option = {
        title : {
            text: name,
            x:'center',
            textStyle: {
                color: '#333333',
                fontSize: 14
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                if (!list) return '';
                const arr = list.filter(item => item.name == params.name)
                const obj = arr[0] || {};
                // if (params.componentType == 'markLine') {
                //     const data = params.data;
                //     return `${params.name}<br/>
                //     ${data.value}`
                // } else {
                    return `地区：${params.name}<br/>
                    ${params.seriesName}：${params.value}分<br/>`
                // }
            }
        },
        grid: {
            left: 'left',
            top: '50',
            right: '30',
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
            axisLabel: { formatter: '{value}分' },
            splitLine: {
                lineStyle: { type: 'dashed' }
            }
        },
        series: [{
            name: '平均分',
            data: list ? list.map((item) => item.average) : [],
            type: 'bar',
            barWidth: 15,
            itemStyle: {
                color: '#338BFF'
            },
            // markLine: {
            //     data: [
            //         {type: 'average', name: '平均值'}
            //     ],
            //     label: {
            //         formatter: '{b}'
            //     },
            //     lineStyle: { type: 'solid' }
            // }
        }]
    };
    return option;
}

const agencyCompBar = function(list) {
    let option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br>{c}'
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
            // axisLabel: { formatter: '{value}%' },
            splitLine: {
                lineStyle: { type: 'dashed' }
            }
        },
        series: [{
            name: '旅行社电子行程单填报数量',
            data: list ? list.map((item) => item.value) : [],
            type: 'bar',
            barWidth: 15,
            itemStyle: {
                color: '#338BFF'
            },
            // markLine: {
            //     data: [
            //         {type: 'average', name: '平均值'}
            //     ],
            //     label: {
            //         formatter: '{b}'
            //     },
            //     lineStyle: { type: 'solid' }
            // }
        }]
    };
    return option;
}

const langBar = function(name, list) {
    if (name == '导游语种分布') {
        const obj = list[0]
        list = Object.keys(obj).map(item => ({ name: item, value: obj[item] }))
    }
    let option = {
        title : {
            text: name,
            x:'center',
            textStyle: {
                color: '#333333',
                fontSize: 14
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br>{c}'
        },
        grid: {
            left: 'left',
            top: '50',
            right: '30',
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
            // axisLabel: { formatter: '{value}' },
            splitLine: {
                lineStyle: { type: 'dashed' }
            }
        },
        series: [{
            name: name,
            data: list ? list.map((item) => item.value) : [],
            type: 'bar',
            barWidth: 15,
            itemStyle: {
                color: '#338BFF'
            },
            // markLine: {
            //     data: [
            //         {type: 'average', name: '平均值'}
            //     ],
            //     label: {
            //         formatter: '{b}'
            //     },
            //     lineStyle: { type: 'solid' }
            // }
        }]
    };
    return option;
}

const pie = function(title, list, radius) {
    let data = list;
    const option = {
        title : {
            text: title,
            x:'center',
            top: '10',
            textStyle: {
                color: '#333333',
                fontSize: 14
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        color:['#4C6293', '#FF7656', '#5AD5E0', '#338BFF', '#29CC85'],
        series: [
            {
                name:'导游',
                type:'pie',
                radius: radius,
                center: ['50%', '50%'],
                minAngle: 5,           　　 //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
                avoidLabelOverlap: true,   //是否启用防止标签重叠策略
                hoverAnimation: false,
                label: {
                    normal: {
                        formatter: '{per|{b}}\n{a|{d}%}\n{hr|}',
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
                        show: false,
                        length: 5
                    }
                },
                data: data
            }
        ]
    }
    return option
}

export default {
    agency_map,
    guide_map,
    bar,
    score_bar,
    pie,
    langBar,
    agencyCompBar
};