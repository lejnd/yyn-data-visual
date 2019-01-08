<template>
<div class="area-data">
    <search-bar ref="searchBar" @getQuery="request"></search-bar>
    <div class="content-box">
        <h3 class="box-title">投诉趋势</h3>
        <div class="trend_line" id="trend_line"></div>
    </div>
    <div class="content-box">
        <h3 class="box-title">区域投诉数据</h3>
        <div class="flex-box">
            <div class="state-box"></div>
            <div class="yn_map" id="yn_map"></div>
            <div class="table-box">
                <Table
                highlight-row
                stripe
                :columns="columns1"
                :data="tableData1"
                style="width:100%">
                </Table>
            </div>
        </div>
    </div>
    <div class="content-box">
        <h3 class="box-title">平均响应时长
            <RadioGroup v-model="department" style="margin-left:20px">
                <Radio label="1">指挥中心</Radio>
                <Radio label="2">横行部门</Radio>
                <Radio label="3">企业</Radio>
            </RadioGroup>
        </h3>
        <div class="flex-box">
            <div class="bar-box">
                <div class="deco"></div>
                <div class="sign"></div>
                <div class="bar_chart" id="bar_chart"></div>
            </div>
            <div class="table-box"></div>
        </div>
    </div>
    <div class="flex-box">
        <div class="one-third">
            <h3 class="box-title">账号开通数</h3>
        </div>
        <div class="one-third"></div>
        <div class="one-third"></div>
    </div>
</div>
</template>

<script>
import SearchBar from '@/components/search.vue'
import chartOption from '@/components/option.js'
import yunnan from '@/assets/yunnan.json'
export default {
    name: 'AreaData',
    components: { SearchBar },
    data() {
        return {
            department: '1',
            columns1: [{
                type: 'index',
                width: 60,
                align: 'center',
                title: '排序'
            }, {
                align: 'center',
                key: 'name',
                title: '地域分布'
            }, {
                align: 'center',
                key: 'value',
                title: '投诉量'
            }, {
                align: 'center',
                key: 'ratio',
                title: '投诉占比'
            }],
            statisticalTypes: ['thread'],
            tableData1: [],
        }
    },
    methods: {
        request(query) {
            this.getTrend(query)
        },
        getList(query, statisticalType) {
            this.$refs.searchBar.searchLoading();
            return this.$fly.post('/dataVisualization/display', {
                data: {
                    userid: userid,
                    statisticalType: statisticalType,
                    date: query.date || [],
                    city: query.city || '',
                    county: query.county || '',
                    type: query.type || ''
                }
            })
            .then((res) => {
                this.$refs.searchBar.searchLoading();
                let data = res.data;
                if (data) {
                    // this.tableData = data.list;
                    // this.region = data.region;
                    // this.dateText = data.date;
                    // this.initChart();
                    return Promise.resolve(data)
                } else {
                    console.log('数据为空！', res.msg);
                }
            })
            .catch((err) => {
                console.log('请求失败：', err);
                this.$refs.searchBar.searchLoading();
            })
        },
        // 请求投诉趋势
        getTrend(query) {
            return this.getList(query, this.statisticalTypes[0])
            .then((data) => {
                this.initTrendLine(data.date, data.value)
            })
        },
        // 初始化投诉趋势图
        initTrendLine(xAxis, series) {
            let id = 'trend_line';
            let option = chartOption.line(xAxis, series);
            this.initChart(id, option);
        },
        initMap() {
            let id = 'yn_map';
            this.$echarts.registerMap('yunnan', yunnan);
            let option = chartOption.map();
            this.initChart(id, option);
        },
        initChart(id = '', option = {}) {
            let echarts = this.$echarts;
            let myChart = echarts.init(document.getElementById(id));
            myChart.setOption(option)
        }
    },
    mounted () {
        this.request({});
        this.initMap();
    }
}
</script>

<style lang="less" scoped>
.area-data {
    padding: 15px;
    .box-title {
        width: 100%;
    }
    .content-box {
        padding: 15px;
        margin-bottom: 15px;
        border: 1px solid #D8EDFD;
        .trend_line {
            width: 100%;
            height: 300px;
            color: #6a7985
        }
    }
    .flex-box {
        display: flex;
        justify-content: space-between;
        .state-box {
            width: 26%;
        }
        .yn_map {
            width: 34%;
            min-height: 300px;
        }
        .bar-box {
            width: 64%;
            min-height: 300px;
        }
        .table-box {
            width: 34%;
        }
        .one-third {
            width: 32%;
            min-height: 300px;
            border: 1px solid #D8EDFD;
        }
    }
}
</style>