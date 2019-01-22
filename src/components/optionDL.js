
const map = function(data) {
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
        // visualMap: {
        //     left: 'right',
        //     text:['高','低'],
        //     realtime: false,
        //     itemWidth: 10,
        //     itemHeight: 60,
        //     inRange: {
        //         color: ['lightskyblue','yellow', 'orangered']
        //     }
        // },
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

const bar = function(list) {
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
            // axisLabel: { formatter: '{value}%' },
            splitLine: {
                lineStyle: { type: 'dashed' }
            }
        },
        series: [{
            name: '旅行社',
            data: list ? list.map((item) => item.value) : [],
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
        }]
    };
    return option;
}

export default {
    map,
    bar,
};