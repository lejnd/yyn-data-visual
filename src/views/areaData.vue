<template>
<div class="area-data">
    <search-bar ref="searchBar" hasType @getQuery="request"></search-bar>
    <div class="content-box">
        <h3 class="box-title">投诉趋势</h3>
        <div class="trend_line" id="trend_line"></div>
    </div>
    <div class="content-box">
        <div class="flex-box">
            <div class="state-box">
                <h3 class="box-title">区域投诉数据</h3>
                <div class="state">
                    <div class="item" v-for="item in complainStates" :key="item.name" @click="gotoAreaList(item.url)">
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
            <RadioGroup v-model="department" style="margin-left:20px" @on-change="getResTime(queryCopy)">
                <Radio label="1">指挥中心</Radio>
                <Radio label="2">横行部门</Radio>
                <Radio label="3">企业</Radio>
            </RadioGroup>
        </h3>
        <div class="flex-box">
            <div class="bar-box">
                <div class="deco">
                    <span><i>• </i>十分钟内响应：{{resDeco.tenRes}}起</span>
                    <span><i>• </i>二十分钟内响应：{{resDeco.twentyRes}}起</span>
                    <span><i>• </i>二十分钟内未响应：{{resDeco.twentyNoRes}}起</span>
                </div>
                <div class="sign">{{region}}-{{classify}} {{date}}</div>
                <div class="bar-chart" id="res_time"></div>
            </div>
            <div class="table-box">
                <Table
                highlight-row
                stripe
                @on-current-change="gotoResTimeList"
                :columns="colResTime"
                :data="tableResTime"
                size="small"
                style="width:100%">
                </Table>
            </div>
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
                @on-current-change="gotoCloseTimeList"
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
                @on-current-change="gotoCloseRateList"
                :columns="colRate"
                :data="tableRate"
                size="small"
                style="width:100%">
                </Table>
            </div>
        </div>
    </div>
    <div class="flex-box">
        <div class="one-third" @click="gotoAccList()">
            <h3 class="box-title">账号开通数</h3>
            <div class="deco" v-if="account">
                <div class="gov">政府账号<strong>{{account.gov}}</strong></div>
                <div class="acc-tree">
                    <span>• 指挥中心：{{account.center}}（{{account.centerRate}}）</span>
                    <span>• 横行企业：{{account.department}}（{{account.departmentRate}}）</span>
                </div>
            </div>
            <div class="bar-chart" id="account"></div>
        </div>
        <div class="one-third">
            <h3 class="box-title">游客评价情况
                <RadioGroup v-model="assessType" style="margin-left:20px" @on-change="getEvaluation(queryCopy)">
                    <Radio label="0">全部（含系统自动评价）</Radio>
                    <Radio label="1">游客评价</Radio>
                </RadioGroup>
            </h3>
            <div ref="assess_pie" class="bar-chart" id="assess_pie"></div>
        </div>
        <div class="one-third">
            <h3 class="box-title">投诉对象分类</h3>
            <div class="radar">
                <div class="bar-chart" id="object_type"></div>
                <div class="list">
                    <div class="uli" v-for="item in objectTypes" :key="item.name" @click="gotoClassifyList(item.id)">
                        {{item.name}}:<span>{{item.value}}</span>
                    </div>
                </div>
            </div>
        </div>
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
            colResTime: [{
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
                title: '平均响应时长'
            }, {
                align: 'center',
                key: 'value',
                title: '投诉量'
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
            statisticalTypes: ['thread', 'region', 'response', 'complete', 'completeRate', 'account', 'evaluation', 'objectType'],
            tableRegion: [],
            tableResTime: [],
            tableDoneTime: [],
            tableRate: [],
            state: null,
            region: '',
            classify: '',
            date: '',
            account: null,
            department: '1',
            assessType: '0',
            objectTypes: [],
            queryCopy: {},
            resDeco: {},
            myChart: null
        }
    },
    computed: {
        complainStates() {
            let state = this.state;
            if (this.state) {
                return [
                    { name: '投诉总量', value: state.total, url: 'dataDisplayList?method=initAreaList' },
                    { name: '拆单件数', value: state.opened, url: 'dataDisplayList?method=initAreaList&typeItem=split' },
                    { name: '游客撤销', value: state.revoke, url: 'dataDisplayList?method=initAreaList&typeItem=revocation' },
                    { name: '不予受理', value: state.refuse, url: 'dataDisplayList?method=initAreaList&typeItem=notaccept' },
                    { name: '正常办结', value: state.normal, url: 'dataDisplayList?method=initAreaList&typeItem=nomalComplete' },
                    { name: '超时办结', value: state.overtime, url: 'dataDisplayList?method=initAreaList&typeItem=timeoutComplete' },
                    { name: '处理中', value: state.handling, url: 'dataDisplayList?method=initAreaList&typeItem=notcomplete' }
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
            .then(() => this.getResTime(query))
            .then(() => this.getDoneTime(query))
            .then(() => this.getDoneRate(query))
            .then(() => this.getAccount(query))
            .then(() => this.getEvaluation(query))
            .then(() => this.getObjectType(query))
        },
        getList(query, statisticalType) {
            const searchBar = this.$refs.searchBar;
            if(searchBar) searchBar.searchLoading();
            const data = Object.assign({}, query, {
                userid: userid,
                statisticalType: statisticalType,
                date: query.date || [],
                city: query.city || '',
                county: query.county || '',
                type: query.type || ''
            })
            this.queryCopy = data;
            return this.$fly.post('/dataVisualization/display', { data: data })
            .then((res) => {
                if(searchBar) searchBar.searchLoading();
                let data = res.data;
                if (data && data !== '') {
                    return Promise.resolve(data)
                } else {
                    return Promise.reject('模块 ' + statisticalType + ' ' + (res.msg || res || '请求错误'))
                }
            })
            .catch((err) => {
                if(searchBar) searchBar.searchLoading();
                this.$Message.warning(err ? err.msg || err : '请求失败');
                return Promise.resolve(err);
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
        // 请求平均响应时长
        getResTime(query) {
            query = Object.assign({}, query, { department: this.department })
            return this.getList(query, this.statisticalTypes[2])
            .then((data) => {
                this.tableResTime = data.list.map((item) => Object.assign({}, item, {
                    time: `${item.resMin}分钟`
                }));
                this.region = data.region;
                this.classify = data.classify;
                this.date = data.date;
                this.resDeco = {
                    tenRes: data.tenRes,
                    twentyRes: data.twentyRes,
                    twentyNoRes: data.twentyNoRes
                }
                let list = data.list.map((item) => item.name == '西双版纳' ? Object.assign({}, item, { name: '版纳' }) : item);
                this.initBar('res_time', '平均响应时长', list)
            })
        },
        // 请求平均办结时长
        getDoneTime(query) {
            return this.getList(query, this.statisticalTypes[3])
            .then((data) => {
                this.tableDoneTime = data.list.map((item) => Object.assign({}, item, {
                    time: `${item.doneMin}分钟`
                }));
                let list = data.list.map((item) => item.name == '西双版纳' ? Object.assign({}, item, { name: '版纳' }) : item);
                this.initBar('done_time', '平均办结时长', list)
            })
        },
        // 请求24小时办结率
        getDoneRate(query) {
            return this.getList(query, this.statisticalTypes[4])
            .then((data) => {
                this.tableRate = data.list;
                let list = data.list.map((item) => item.name == '西双版纳' ? Object.assign({}, item, { name: '版纳' }) : item);
                this.initRateBar(list)
            })
        },
        // 请求账号开通数
        getAccount(query) {
            return this.getList(query, this.statisticalTypes[5])
            .then((data) => {
                this.account = data;
                this.initAccountBar(data.list)
            })
        },
        // 请求游客评价情况
        getEvaluation(query) {
            query = Object.assign({}, query, { assessType: this.assessType })
            return this.getList(query, this.statisticalTypes[6])
            .then((data) => {
                this.initAssessPie(data.list)
            })
        },
        // 请求投诉对象分类
        getObjectType(query) {
            return this.getList(query, this.statisticalTypes[7])
            .then((data) => {
                this.initRadar(data)
                this.objectTypes = [
                    { name: '投诉总量', value: data.total },
                    ...data.list
                ]
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
        // 初始化时间柱状体
        initBar(id, name, list) {
            const option = chartOption.timeBar(name, list)
            this.initChart(id, option);
        },
        // 初始化比率柱状体
        initRateBar(list) {
            const id = 'rate';
            const option = chartOption.rateBar(list)
            this.initChart(id, option);
        },
        // 初始化账号柱状体
        initAccountBar(list) {
            const id = 'account';
            const option = chartOption.accountBar(list)
            this.initChart(id, option);
        },
        // 初始化游客评价饼图
        initAssessPie(list) {
            const id = 'assess_pie';
            const echarts = this.$echarts;
            this.myChart = echarts.init(document.getElementById(id));
            const width = this.$refs.assess_pie.clientWidth;
            let redis = ['20%', '40%'];
            if (width > 420) {
                redis = ['30%', '55%']
            } else if (width < 355 && width >= 305) {
                redis = ['15%', '35%']
            } else if (width < 305) {
                redis = ['10%', '25%']
            }
            const option = chartOption.assessPie(list, redis)
            this.myChart.setOption(option)
            this.myChart.on('click', function(params) {
                const url = params.data.url
                window.location.href = url
            })
        },
        // 初始化游客评价饼图
        initRadar(data) {
            const id = 'object_type';
            const width = this.$refs.assess_pie.clientWidth;
            let redis = 80
            if (width < 355 && width >= 305) {
                redis = 50
            } else if (width < 305 && width >= 290) {
                redis = 30
            } else if (width < 290) {
                redis = 25
            }
            const option = chartOption.radar(data, redis)
            this.initChart(id, option);
        },
        initChart(id = null, option = {}) {
            const echarts = this.$echarts;
            const dom = document.getElementById(id)
            this.myChart = echarts.init(dom)
            this.myChart.setOption(option)
        },
        // 区域投诉数据跳转
        gotoAreaList(url) {
            window.location.href = url;
        },
        // 平均办结时长跳转
        gotoResTimeList(row) {
            const id = row.areaId;
            window.location.href = `dataDisplayList?method=initResponseList&areaId=${id}`
        },
        // 平均办结时长跳转
        gotoCloseTimeList(row) {
            const id = row.areaId;
            window.location.href = `dataDisplayList?method=initCloseTimeList&areaId=${id}`
        },
        // 24小时办结率跳转
        gotoCloseRateList(row) {
            const id = row.areaId;
            window.location.href = `dataDisplayList?method=initCloseRateList&areaId=${id}`
        },
        // 账号开通数跳转
        gotoAccList() {
            window.location.href = 'dataDisplayList?method=initAccountList'
        },
        // 投诉对象分类跳转
        gotoClassifyList(id) {
            if (!id) return null;
            window.location.href = `dataDisplayList?method=initClassifyList&id=${id}`
        }
    },
    mounted () {
        this.$refs.searchBar.onSubmit();
        const dom = document.body.offsetHeight
        console.log(dom);
        
    },
    destroyed () {
        if(this.myChart) this.myChart.dispose()
    }
}
</script>

<style lang="less">
.area-data {
    padding: 15px;
    // min-width: 1000px;
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
                    cursor: pointer;
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
            .deco {
                margin-bottom: 15px;
                text-align: center;
                color: #000;
                span {
                    padding-right: 20px;
                }
            }
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
                cursor: pointer;
                height: 25px;
            }
            .ivu-table-cell {
                padding: 0;
            }
        }
        .one-third {
            padding: 15px;
            width: 32%;
            border: 1px solid #D8EDFD;
            .deco {
                width: 100%;
                display: inline-flex;
                align-items: center;
                justify-content:space-around;
                // background-color: #808080;
                .gov {
                    // width: 30%;
                    vertical-align: middle;
                    strong {
                        cursor: pointer;
                        font-size: 22px;
                        padding: 0 6px;
                        font-weight: 400;
                        color: #000;
                        vertical-align: sub;
                    }
                }
                .acc-tree {
                    width: 60%;
                    // height: 100px;
                    span {
                        display: block;
                        white-space: nowrap;
                    }
                }
            }
            .bar-chart {
                min-height: 300px;
            }
            .radar {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .bar-chart {
                    width: 65%;
                }
                .list {
                    width: 35%;
                    .uli {
                        cursor: pointer;
                        padding: 3px 0 4px 15px;
                        &:first-child {
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }
}
</style>