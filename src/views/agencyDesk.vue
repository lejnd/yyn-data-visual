<template>
<div class="agency-desk">
    <search-bar ref="searchChart" parent="旅行社管理" @getQuery="getChart"></search-bar>
    <div class="chart-box">
        <div class="right">
            <div class="map-chart" id="map_chart"></div>
        </div>
        <div class="left">
            <div class="title">{{region}}旅行社及占比</div>
            <div class="deco">总数：{{total}}</div>
            <div class="bar-chart" id="agency_rate"></div>
            <div class="title">旅行社点子行程单填报数量</div>
            <div class="bar-chart" id="agency_comp"></div>
        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <search-bar ref="searchList" title="违规旅行社重点监管名单" @getQuery="getList"></search-bar>
    <div class="list-box">
        <div class="right">
            <Table
            highlight-row
            stripe
            :columns="columns"
            :data="tableData"
            size="small">
            </Table>
        </div>
        <div class="left">
            <div class="msg">
                <Icon type="md-volume-up" :color="iconColor" />{{msg.name}}新增一条扣分记录
            </div>
            <div class="roll-header">
                <ul class="table-row" style="height: 30px;">
                    <li v-for="name in names" :key="name">{{name}}</li>
                </ul>
            </div>
            <div class="roll-body">
                <div class="roll" :class="{anim: animate}" @mouseenter="stopRoll" @mouseleave="roll">
                    <ul class="table-row" v-for="(item, index) in rollData" :key="index" style="min-height: 30px;">
                        <li><Tooltip :content="item.name">{{item.name}}</Tooltip></li>
                        <li><Tooltip :content="item.department">{{item.department}}</Tooltip></li>
                        <li><Tooltip :content="item.reason">{{item.reason}}</Tooltip></li>
                        <li><Tooltip :content="item.while">{{item.time}}</Tooltip></li>
                        <li><Tooltip :content="item.deduction">{{item.deduction}}</Tooltip></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import SearchBar from '@/components/daolvSearch.vue'
import OP from '@/components/optionDL.js'
import yunnan from '@/assets/yunnan.json'
export default {
    name: 'AgencyDesk',
    components: { SearchBar },
    data() {
        return {
            myChart: null,
            msg: { name: '大理' },
            iconColor: '',
            animate: false,
            interval: null,
            columns: [{
                align: 'center',
                key: 'name',
                title: '旅行社名称',
                tooltip: true
            }, {
                align: 'center',
                key: 'total_value',
                title: '累计扣分',
                width: 80,
                tooltip: true
            }, {
                align: 'center',
                key: 'area',
                title: '所属区域',
                tooltip: true
            }],
            names: [ '旅行社名称', '扣分部门', '扣分原因', '累计时间', '累计扣分' ],
            tableData: [],
            rollData: [],
            region: '',
            total: null,
            spinShow: false
        }
    },
    methods: {
        async getChart(query) {
            // console.log(query);
            this.spinShow = true;
            let agency = await this.$fly.post('/guideEvaluation/api/tsView/travelDistrict', query)
            let agencyData = agency.data || {};
            let list = agencyData.dataList || []
            
            this.region = agencyData.region ? agencyData.region.name : ''
            this.total = list.reduce((total, item) => total + item.value, 0)
            this.initMap(list)
            this.initRateBar(list)

            let comp = await this.$fly.post('/guideEvaluation/api/tsView/travelItinerary', query)
            let compData = comp.data || {};
            let compList = compData.dataList || []
            this.initCompBar(compList);
            
            this.$refs.searchChart.toggleLoading()
            this.spinShow = false;
        },
        async getList(query) {
            // console.log(query);
            let res = await this.$fly.post('/guideEvaluation/api/tsView/violationQuery', query)
            let data = res.data || {}
            this.tableData = data.violateList || []
            this.rollData = data.deductionList || []

            this.$refs.searchList.toggleLoading()
        },
        async getMsg() {
            let res = await this.$fly.post('/guideEvaluation/api/tsView/latestDeduction')
            this.msg = res.data || {}
        },
        initMap(list) {
            const id = 'map_chart';
            this.$echarts.registerMap('yunnan', yunnan);
            const option = OP.agency_map(list);
            this.initChart(id, option);
            let vm = this;
            this.myChart.on('click', function(params) {
                if (!params.value) return;
                vm.$refs.searchChart.setCity(params.name)
                vm.$refs.searchChart.onSubmit()
            })
        },
        initRateBar(list) {
            const id = 'agency_rate';
            const option = OP.bar('旅行社', list);
            this.initChart(id, option);
        },
        initCompBar(list) {
            const id = 'agency_comp';
            const option = OP.agencyCompBar(list);
            this.initChart(id, option);
        },
        initChart(id = null, option = {}) {
            const echarts = this.$echarts;
            const dom = document.getElementById(id)
            this.myChart = echarts.init(dom)
            this.myChart.setOption(option)
        },
        roll() {
            this.interval = setInterval(() => {
                this.animate = true;
                setTimeout(() => {
                    this.rollData.push(this.rollData[0]);
                    this.rollData.shift();
                    this.animate = false;
                }, 500)
            }, 5000)
        },
        stopRoll() {
            clearInterval(this.interval);
        }
    },
    mounted() {
        this.roll()
        this.$refs.searchChart.onSubmit()
        this.$refs.searchList.onSubmit()
        this.getMsg()
        setInterval(() => {
            this.getMsg()
        }, 60000)
    }
}
</script>

<style lang="less">
.agency-desk {
    .chart-box {
        position: relative;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        // border-bottom: 1px solid #ddd;
        .right {
            width: 39%;
            .map-chart {
                min-height: 400px;
            }
        }
        .left {
            width: 60%;
            display: flex;
            flex-flow: column;
            .bar-chart {
                height: 380px;
                width: 100%;
            }
            .title {
                text-align: center;
                height: 35px;
                line-height: 35px;
                font-size: 14px;
                color: #333;
                font-weight: 500;
            }
            .deco {
                text-align: center;
                font-size: 12px;
                color: #999;
            }
        }
    }
    .list-box {
        border: 1px solid #eee;
        padding: 10px;
        margin: 0 20px;
        margin-bottom: 40px;
        min-height: 200px;
        display: flex;
        justify-content: space-between;
        .right {
            width: 49%;
            td {
                height: 30px;
            }
            .ivu-table-cell {
                padding: 0;
            }
        }
        .left {
            width: 49%;
            margin: 0;
            padding: 0;
            li {
                list-style: none;
            }
            .msg {
                height: 30px;
                line-height: 30px;
                white-space: nowrap;
                overflow: hidden;
                background-color: antiquewhite;
                padding-left: 5px;
                i {
                    font-size: 16px;
                    padding: 0 5px;
                    vertical-align: sub;
                    color: coral;
                }
            }
            ul.table-row {
                display: flex;
                align-items: center;
                // border-bottom: 1px solid #ddd;
                border-right: 1px solid #ddd;
                border-left: 1px solid #ddd;                
                padding: 5px 0;
                box-sizing: content-box;
                li {
                    flex: 1;
                    text-align: center;
                    &:last-child {
                        flex: none;
                        width: 58px;
                    }
                }
            }
            .roll-header {
                font-weight: 600;
                background-color: #f3f3f3;
            }
            .roll-body {
                height: 480px;
                overflow: hidden;
                .anim{
                    transition: all 0.5s;
                    margin-top: -46px;
                }
            }
        }
    }
}
    
</style>