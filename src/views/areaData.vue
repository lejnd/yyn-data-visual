<template>
<div class="area-data">
    <search-bar ref="searchBar" @getQuery="request"></search-bar>
    <div class="content-box">
        <h3 class="box-title">投诉趋势</h3>
        <div class="trend_line" id="trend_line"></div>
    </div>
    <div class="content-box">
        <div class="flex-box">
            <div class="state-box">
                <h3 class="box-title">区域投诉数据</h3>
                <div class="state">
                    <div class="item" v-for="item in complainStates" :key="item.name">
                        <div class="text">
                            <p>{{item.name}}</p>
                            <p><strong>{{item.value}}</strong>起</p>
                        </div>
                        <Icon type="ios-arrow-forward" size="18" color="#ccc" />
                    </div>
                </div>
            </div>
            <div class="yn_map" id="yn_map"></div>
            <div class="table-box">
                <Table
                highlight-row
                stripe
                :columns="colRegion"
                :data="tableRegion"
                size="small"
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
                <div class="deco">
                    <span><Icon type="ios-time" />十分钟内响应：541起</span>
                    <span><Icon type="ios-time" />二十分钟内响应：541起</span>
                    <span><Icon type="ios-time" />二十分钟内未响应：541起</span>
                </div>
                <div class="sign"></div>
                <div class="bar-chart" id="res_time"></div>
            </div>
            <div class="table-box"></div>
        </div>
    </div>
    <div class="content-box">
        <div class="flex-box">
            <div class="bar-box">
                <h3 class="box-title">平均办结时长</h3>
                <div class="sign">{{region}}-{{classify}} {{date}}</div>
                <div class="bar-chart" id="done_time"></div>
            </div>
            <div class="table-box">
                <Table
                highlight-row
                stripe
                :columns="colDoneTime"
                :data="tableDoneTime"
                size="small"
                style="width:100%">
                </Table>
            </div>
        </div>
    </div>
    <div class="content-box">
        <div class="flex-box">
            <div class="bar-box">
                <h3 class="box-title">24小时办结率</h3>
                <div class="sign">{{region}}-{{classify}} {{date}}</div>
                <div class="bar-chart" id="rate"></div>
            </div>
            <div class="table-box">
                <Table
                highlight-row
                stripe
                :columns="colRate"
                :data="tableRate"
                size="small"
                style="width:100%">
                </Table>
            </div>
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
            colRegion: [{
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
            colDoneTime: [{
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
                key: 'time',
                width: 140,
                title: '平均办结时长'
            }, {
                align: 'center',
                key: 'value',
                title: '投诉量'
            }],
            colRate: [{
                align: 'center',
                key: 'name',
                title: '地域分布'
            }, {
                align: 'center',
                key: 'rate',
                title: '办结率'
            }, {
                align: 'center',
                key: 'value',
                title: '投诉量'
            }, {
                align: 'center',
                key: 'overtime',
                title: '超时量'
            }],
            statisticalTypes: ['thread', 'region', '', 'complete'],
            tableRegion: [],
            tableDoneTime: [],
            tableRate: [],
            state: null,
            region: '',
            classify: '',
            date: ''
        }
    },
    computed: {
        complainStates() {
            let state = this.state;
            if (this.state) {
                return [
                    { name: '投诉总量', value: state.total },
                    { name: '拆单件数', value: state.opened },
                    { name: '游客撤销', value: state.revoke },
                    { name: '不予受理', value: state.refuse },
                    { name: '正常办结', value: state.normal },
                    { name: '超时办结', value: state.overtime },
                    { name: '处理中', value: state.handling }
                ]
            } else {
                return []
            }
        }
    },
    methods: {
        request(query) {
            this.getTrend(query)
            .then(() => this.getRegion(query))
            .then(() => this.getDoneTime(query))
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
        // 请求区域投诉数据
        getRegion(query) {
            return this.getList(query, this.statisticalTypes[1])
            .then((data) => {
                this.tableRegion = data.list;
                this.state = data.complainState;
                this.initMap(data.list)
            })
        },
        // 请求平均办结时长
        getDoneTime(query) {
            return this.getList(query, this.statisticalTypes[3])
            .then((data) => {
                this.tableDoneTime = data.list.map((item) => Object.assign({}, item, {
                    time: `${item.doneMin}分钟${item.doneSec}秒`
                }));
                this.region = data.region;
                this.classify = data.classify;
                this.date = data.date;
                let name = '平均办结时长';
                let xAxis = data.list.map((item) => item.name);
                let series = data.list.map((item) => `${item.doneMin}.${item.doneSec}`);
                let list = data.list;
                this.initBar(name, xAxis, series, list)
            })
        },
        // 请求24小时办结率
        getDoneTime(query) {
            return this.getList(query, this.statisticalTypes[3])
            .then((data) => {
                this.tableDoneTime = data.list.map((item) => Object.assign({}, item, {
                    time: `${item.doneMin}分钟${item.doneSec}秒`
                }));
                this.region = data.region;
                this.classify = data.classify;
                this.date = data.date;
                let name = '平均办结时长';
                let xAxis = data.list.map((item) => item.name);
                let series = data.list.map((item) => `${item.doneMin}.${item.doneSec}`);
                let list = data.list;
                this.initBar(name, xAxis, series, list)
            })
        },
        // 初始化投诉趋势图
        initTrendLine(xAxis, series) {
            let id = 'trend_line';
            let option = chartOption.line(xAxis, series);
            this.initChart(id, option);
        },
        // 初始化云南地图
        initMap(data) {
            let id = 'yn_map';
            this.$echarts.registerMap('yunnan', yunnan);
            let option = chartOption.map(data);
            this.initChart(id, option);
        },
        // 初始化柱状体
        initBar(name, xAxis, series, list) {
            let id = 'done_time';
            let option = chartOption.timeBar(name, xAxis, series, list)
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
    }
}
</script>

<style lang="less">
.area-data {
    padding: 15px;
    .box-title {
        width: 100%;
        margin-bottom: 20px;
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
            .state {
                width: 100%;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                // background-color: aquamarine;
                .item {
                    border: 1px solid #eee;
                    width: 48%;
                    padding: 10px;
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    p {
                        font-size: 12px;
                        strong {
                            font-size: 23px;
                            font-weight: 500;
                            padding-right: 6px;
                        }
                    }
                }
            }
        }
        .yn_map {
            width: 37%;
            min-height: 380px;
            margin-top: 30px;
        }
        .bar-box {
            width: 64%;
            .sign {
                text-align: center;
                color: #808080;
            }
            .bar-chart {
                min-height: 380px;
            }
        }
        .table-box {
            width: 34%;
            td {
                height: 25px;
            }
        }
        .one-third {
            width: 32%;
            min-height: 300px;
            border: 1px solid #D8EDFD;
        }
    }
}
</style>