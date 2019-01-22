
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

export default {
    map,
};