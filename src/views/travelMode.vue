<template>
<div class="travel-mode">
    <search-bar ref="searchBar" :title="title" @getQuery="getList"></search-bar>
    <div class="content-box">
        <div class="chart">
            <div class="pie_chart" id="pie_chart"></div>
            <div class="sign">{{region}}&nbsp;&nbsp;&nbsp;{{dateText}}</div>
        </div>
        <div class="flex1">
            <Table
            highlight-row
            stripe
            :columns="columns"
            :data="tableData"
            style="width:100%">
            </Table>
        </div>
    </div>
</div>
</template>

<script>
import SearchBar from '@/components/search.vue'
import dayjs from 'dayjs'
export default {
    name: 'TravelMode',
    components: { SearchBar },
    props: {
    },
    data() {
        let conf = this.conf;
        return {
            // conf
            title: '投诉人旅行方式',
            // self
            columns: [{
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
                title: '投诉总量'
            }],
            tableData: [],
            region: '',
            dateText: '',
        }
    },
    methods: {
        getList(query) {
            let searchBar = this.$refs.searchBar;
            if (searchBar) searchBar.searchLoading();
            this.$fly.post('/dataVisualization/display', {
                data: {
                    userid: userid,
                    statisticalType: 'ways',
                    date: query.date || [],
                    city: query.city || '',
                    county: query.county || ''
                }
            })
            .then((res) => {
                let data = res.data;
                if (data) {
                    const reduce = data.list.reduce((value, item) => value + item.value, 0)
                    this.tableData = data.list;
                    this.tableData = this.tableData.concat([{ name: '合计', value: reduce }])                    
                    this.region = data.region;
                    this.dateText = data.date;
                    this.initChart(data.list);
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
        initChart(list) {
            let echarts = this.$echarts;
            let myChart = echarts.init(document.getElementById('pie_chart'));
            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                color:['#4C6293', '#FF7656', '#5AD5E0', '#338BFF', '#29CC85'],
                series: [
                    {
                        name:'投诉人旅行方式',
                        type:'pie',
                        radius: ['40%', '60%'],
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
            })
        }
    },
    mounted() {
        console.log('userid:', userid);
        // this.getList({});
        this.$refs.searchBar.onSubmit();
    }
}
</script>

<style lang="less">
.travel-mode {
    padding: 15px;
    // min-width: 1000px;
    .content-box {
        display: flex;
        align-items: center;
        padding: 15px;
        border: 1px solid #D8EDFD;
        .flex1 {
            flex: 1;
        }
        .chart {
            width: 55%;
        }
        .pie_chart {
            width: 100%;
            min-height: 300px;
        }
        .sign {
            text-align: center;
        }
    }
}
</style>