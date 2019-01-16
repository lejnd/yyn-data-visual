<template>
<div class="object-type">
    <search-bar ref="searchBar" @getQuery="request"></search-bar>
    <div class="module">
        <div class="content-box">
            <div class="chart">
                <h3 class="box-title">投诉分类数据</h3>

                <div class="value-chart" id="type_value"></div>
                <div class="sign">{{sign.region}}&nbsp;&nbsp;&nbsp;{{sign.dateText}}</div>
            </div>
            <div class="table-box">
                <div class="total"><i>• </i>投诉总量：{{total}}</div>
                <Table
                highlight-row
                stripe
                :columns="valueCol"
                :data="valueData"
                size="small"
                style="width:100%">
                    <template slot-scope="{ row }" slot="rate">
                        <span class="rateRise" :class="{ rateFall: row.rate && row.rate[0] == '-' }">
                            {{formRate(row.rate)}}<Icon type="md-arrow-down" v-if="row.rate && row.rate[0] == '-'" /><Icon type="md-arrow-up" v-else />
                        </span>
                    </template>
                </Table>
            </div>
        </div>
    </div>
    <div class="module">
        <h3 class="box-title">投诉分类占比</h3>
        <div class="content-box items-center">
            <div class="chart">
                <div class="ratio-chart" id="type_ratio"></div>
                <div class="sign">{{sign.region}}&nbsp;&nbsp;&nbsp;{{sign.dateText}}</div>
            </div>
            <div class="table-box">
                <Table
                highlight-row
                stripe
                :columns="ratioCol"
                :data="ratioData"
                size="small"
                style="width:100%">
                </Table>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import SearchBar from '@/components/search.vue'
export default {
    name: 'ObjectType',
    components: { SearchBar },
    data() {
        return {
            myChart: null,
            valueCol: [{
                type: 'index',
                width: 60,
                align: 'center',
                title: '排序',
            }, {
                align: 'center',
                key: 'name',
                title: '投诉分类'
            }, {
                align: 'center',
                key: 'absolute',
                title: '绝对值'
            }, {
                align: 'center',
                key: 'ratio',
                title: '占比'
            }, {
                align: 'center',
                key: 'rate',
                title: '环比',
                slot: 'rate'
            }],
            valueData: [],
            ratioCol: [{
                type: 'index',
                width: 60,
                align: 'center',
                title: '排序',
                indexMethod: (row) => row.name == '合计' ? ' ' : row._index + 1
            }, {
                align: 'center',
                key: 'name',
                title: '投诉渠道'
            }, {
                align: 'center',
                key: 'ratio',
                title: '占比'
            }, {
                align: 'center',
                key: 'value',
                title: '投诉量'
            }],
            ratioData: [],
            sign: {},
            total: null
        }
    },
    methods: {
        request(query) {
            let searchBar = this.$refs.searchBar;
            if (searchBar) searchBar.searchLoading();
            this.$fly.post('/dataVisualization/display', {
                data: {
                    userid: userid,
                    statisticalType: 'classify',
                    date: query.date || [],
                    city: query.city || '',
                    county: query.county || ''
                }
            })
            .then((res) => {
                let data = res.data;
                if (data) {
                    // 列表2
                    const reduce = data.ratioList.reduce((value, item) => value + item.value, 0)
                    this.ratioData = data.ratioList;
                    this.ratioData = this.ratioData.concat([{ name: '合计', value: reduce }])
                    // 列表1
                    this.valueData = data.dataList;
                    this.total = data.total;
                    this.sign = {
                        region: data.region,
                        dateText: data.date
                    }
                    const xBar = data.dataList ? data.dataList.map(item => item.name) : [];
                    const yBar = data.dataList ? data.dataList.map(item => item.absolute) : [];
                    this.initBar(xBar, yBar);
                    this.initPie(data.ratioList)
                } else {
                    console.log('数据为空！', res.msg);
                }
                if (searchBar) searchBar.searchLoading();
            })
            .catch((err) => {
                console.log('请求失败：', err);
                if (searchBar) searchBar.searchLoading();
            })
        },
        initPie(list) {
            const echarts = this.$echarts;
            const dom = document.getElementById('type_ratio')
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                color:['#4C6293', '#FF7656', '#5AD5E0', '#338BFF', '#29CC85'],
                series: [
                    {
                        name:'投诉分类占比',
                        type:'pie',
                        radius: ['50%', '70%'],
                        minAngle: 5,
                        avoidLabelOverlap: true,
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
                            },
                            emphasis: {
                                show: true,
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: list || []
                    }
                ]
            }
            this.myChart = echarts.init(dom)
            this.myChart.setOption(option)
        },
        initBar(xBar, yBar) {
            const echarts = this.$echarts;
            const dom = document.getElementById('type_value')
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}：{c}起'
                },
                legend: {
                    data:['投诉分类数据'],
                    bottom: 1,
                },
                grid: {
                    left: 'left',
                    top: '10',
                    right: '66',
                    bottom: '40',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: xBar,
                    axisLabel: {
                        interval: 0,
                        rotate: 66
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
                    name: '投诉分类数据',
                    data: yBar,
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
            this.myChart = echarts.init(dom)
            this.myChart.setOption(option)
        },
        formRate(str) {
            if (str && str[0] == '-') {
                return str.substring(1)
            } else {
                return str
            }
        }
    },
    mounted () {
        this.$refs.searchBar.onSubmit();
    },
    destroyed () {
        if(this.myChart) this.myChart.dispose()
    }
}
</script>

<style lang="less">
.object-type {
    padding: 15px;
    // min-width: 1000px;
    .module {
        padding: 15px;
        margin-bottom: 15px;
        border: 1px solid #D8EDFD;
        .box-title {
            width: 100%;
            margin-bottom: 20px;
            font-size: 15px;
        }
        .content-box {
            display: flex;
            // align-items: center;
            justify-content: space-between;
            &.items-center {
                align-items: center;
            }
            .table-box {
                width: 40%;
                td {
                    height: 25px;
                }
                .rateRise {
                    color: #D42C26;
                    &.rateFall {
                        color: #38B571;
                    }
                    i {
                        font-size: 16px;
                        vertical-align: top;
                    }
                }
                .total {
                    padding-bottom: 12px;
                    text-align: center;
                    font-size: 15px;
                    font-weight: 500;
                    i {
                        margin-right: 5px;
                        font-style: normal;
                        font-weight: bolder;
                    }
                }
            }
            .chart {
                width: 59%;
                height: 100%;
                .value-chart {
                    width: 100%;
                    min-height: 600px;
                }
                .ratio-chart {
                    width: 100%;
                    min-height: 300px;
                }
                .sign {
                    text-align: center;
                    padding: 20px 0;
                }
            }
        }
    }
}
</style>