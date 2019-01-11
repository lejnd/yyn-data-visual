<template>
<div class="travel-mode">
    <search-bar ref="searchBar" :title="title" @getQuery="getList"></search-bar>
    <div class="content-box">
        <div class="flex1">
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
                title: ' '
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
            this.$refs.searchBar.searchLoading();
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
                    this.tableData = data.list;
                    this.region = data.region;
                    this.dateText = data.date;
                    this.initChart();
                } else {
                    console.log('数据为空！', res.msg);
                }
                this.$refs.searchBar.searchLoading();
            })
            .catch((err) => {
                console.log('请求失败：', err);
                this.$refs.searchBar.searchLoading();
            })
        },
        initChart() {
            let echarts = this.$echarts;
            let myChart = echarts.init(document.getElementById('pie_chart'));
            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                series: [
                    {
                        name:'投诉人旅行方式',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                formatter: '{b}（{d}%）',
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
                        data: this.tableData
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
    border-bottom: 1px solid #e0e9ff;
    .content-box {
        display: flex;
        align-items: center;
        padding: 20px;
        .flex1 {
            flex: 1;
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