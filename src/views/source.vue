<template>
<div class="source-range">
    <div class="module">
        <search-bar ref="sourceRequest" title="投诉来源分析" @getQuery="sourceRequest"></search-bar>
        <div class="content-box">
            <div class="chart source-chart">
                <div class="chart-dom" id="source_pie"></div>
                <div class="sign">{{sourceSign.region}}&nbsp;&nbsp;&nbsp;{{sourceSign.dateText}}</div>
            </div>
            <div class="source-table">
                <Table
                highlight-row
                stripe
                :columns="sourceCol"
                :data="sourceData"
                size="small"
                style="width:100%">
                </Table>
            </div>
        </div>
    </div>
    <div class="module">
        <search-bar ref="rangeRequest" title="投诉时段分析" @getQuery="rangeRequest"></search-bar>
        <div class="content-box">
            <div class="chart range-chart">
                <div class="chart-dom" id="range_line"></div>
                <div class="sign">{{rangeSign.region}}&nbsp;&nbsp;&nbsp;{{rangeSign.dateText}}</div>
            </div>
            <div class="range-table">
                <Table
                highlight-row
                stripe
                :columns="rangeCol"
                :data="rangeData"
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
import chartOption from '@/components/option.js'
export default {
    name: 'Source',
    components: { SearchBar },
    data() {
        return {
            maChart: null,
            sourceCol: [{
                type: 'index',
                width: 60,
                align: 'center',
                title: '排序'
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
            sourceData: [],
            sourceSign: {},
            rangeCol: [{
                align: 'center',
                key: 'name',
                title: '时段'
            }, {
                align: 'center',
                key: 'value',
                title: '投诉量'
            }],
            rangeData: [],
            rangeSign: {}
        }
    },
    methods: {
        sourceRequest(query) {
            const searchBar = this.$refs.sourceRequest;
            if(searchBar) searchBar.searchLoading();
            this.getList(query, 'source')
            .then((data) => {
                if(searchBar) searchBar.searchLoading();
                this.sourceData = data.list;
                this.sourceSign = {
                    region: data.region,
                    dateText: data.date
                }
                this.initPie(data.list)
            })
            .catch((err) => {
                if(searchBar) searchBar.searchLoading();
                this.$Message.warning(err ? err.msg || err : '请求失败');
            })
        },
        rangeRequest(query) {
            const searchBar = this.$refs.rangeRequest;
            if(searchBar) searchBar.searchLoading();
            this.getList(query, 'complainTime')
            .then((data) => {
                if(searchBar) searchBar.searchLoading();
                this.rangeData = data.list;
                this.rangeSign = {
                    region: data.region,
                    dateText: data.date
                }
                // const xAxis = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
                const xAxis = data.list ? data.list.map(item => item.name) : []
                const series = data.list ? data.list.map(item => item.value) : []
                this.initLine(xAxis, series)
            })
            .catch((err) => {
                if(searchBar) searchBar.searchLoading();
                this.$Message.warning(err ? err.msg || err : '请求失败');
            })
        },
        getList(query, statisticalType) {
            const data = Object.assign({}, query, {
                userid: userid,
                statisticalType: statisticalType,
                date: query.date || [],
                city: query.city || '',
                county: query.county || '',
            })
            return this.$fly.post('/dataVisualization/display', { data: data })
            .then((res) => {
                let data = res.data;
                if (data && data !== '') {
                    return Promise.resolve(data)
                } else {
                    return Promise.reject('模块 ' + statisticalType + ' ' + (res.msg || res || '请求错误'))
                }
            })
        },
        initPie(list) {
            const echarts = this.$echarts;
            const dom = document.getElementById('source_pie')
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                color:['#4C6293', '#FF7656', '#5AD5E0', '#338BFF', '#29CC85'],
                series: [
                    {
                        name:'投诉来源',
                        type:'pie',
                        radius: ['50%', '70%'],
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
        initLine(xAxis, series) {
            const echarts = this.$echarts;
            const dom = document.getElementById('range_line')
            const option = chartOption.line(xAxis, series)
            this.myChart = echarts.init(dom)
            this.myChart.setOption(option)
        }
    },
    mounted () {
        this.$refs.sourceRequest.onSubmit();
        this.$refs.rangeRequest.onSubmit();
    },
    destroyed () {
        if(this.myChart) this.myChart.dispose()
    }
}
</script>

<style lang="less">
.source-range {
    padding: 15px;
    // min-width: 1000px;
    .module {
        padding: 15px;
        margin-bottom: 15px;
        border: 1px solid #D8EDFD;
        .content-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .source-chart {
                width: 59%;
            }
            .source-table {
                width: 40%;
                td {
                    height: 25px;
                }
            }
            .range-chart {
                width: 74%
            }
            .range-table {
                width: 25%;
                td {
                    height: 25px;
                }
            }
            .chart {
                .chart-dom {
                    width: 100%;
                    min-height: 300px;
                }
                .sign {
                    text-align: center;
                }
            }
        }
    }
}
    
</style>