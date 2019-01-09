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
        tooltip: { trigger: 'axis' },
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
            formatter: '{b}<br/>投诉量：{c}起'
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

const objOfList = function(list, name) {
    let obj = {};
    for (let v of list) {
        if (v.name == name) {
            obj = v;
        }
    }
    return obj
}

const timeBar = function(name, xAxis, series, list) {
    let option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                if (!list) return '';
                let obj = objOfList(list, params.name);
                if (params.componentType == 'markLine') {
                    let data = params.data;
                    return `${params.name}<br/>
                    ${parseInt(data.value)}分钟`
                } else {
                    return `${params.name}<br/>
                    ${params.seriesName}：${obj.doneMin}分钟${obj.doneSec}秒<br/>
                    投诉量：${obj.value}`
                }
            }
        },
        legend: {
            data:[name || ''],
            bottom: 1,
        },
        grid: {
            left: 'left',
            top: '30',
            right: '55',
            bottom: '40',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: xAxis || []
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
            name: name || '',
            data: series || [],
            type: 'bar',
            barWidth: 10,
            itemStyle: {
                color: '#0D6BE3'
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
        }]
    };
    return option;
}

export default {
    line,
    map,
    timeBar
};