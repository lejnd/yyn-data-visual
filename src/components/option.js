module.exports.line = function(xAxis, series) {
    return {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxis || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false
            },
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

module.exports.map = function() {
    return {
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c} (p / km2)'
        },
        visualMap: {
            left: 'right',
            text:['高','低'],
            realtime: false,
            itemWidth: 10,
            itemHeight: 80,
            inRange: {
                color: ['lightskyblue','yellow', 'orangered']
            }
        },
        series: [
            {
                type: 'map',
                mapType: 'yunnan', // 自定义扩展图表类型
                aspectScale: 0.9,
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
                data:[
                    {name: '昆明', value: 20057.34},
                    {name: '大理', value: 15477.48},
                ],
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