<template>
<div class="agency-desk">
    <search-bar parent="旅行社管理" @getQuery="getChart"></search-bar>
    <div class="chart-box">
        <div class="right">
            <div class="map-chart" id="map_chart"></div>
        </div>
        <div class="left">
            <div class="bar-chart" id="agency_rate"></div>
            <div class="bar-chart" id="agency_comp"></div>
        </div>
    </div>
    <search-bar title="违规旅行社重点监管名单" @getQuery="getList"></search-bar>
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
                <Icon type="md-volume-up" :color="iconColor" />{{msg.name}}新增一家扣分旅行社
            </div>
            <div class="roll-header">
                <ul class="table-row">
                    <li v-for="name in names" :key="name">{{name}}</li>
                </ul>
            </div>
            <div class="roll-body">
                <div class="roll" :class="{anim: animate}" @mouseenter="stopRoll" @mouseleave="roll">
                    <ul class="table-row" v-for="(item, index) in rollData" :key="index">
                        <li><Tooltip :content="item.name">{{item.name}}</Tooltip></li>
                        <li><Tooltip :content="item.department">{{item.department}}</Tooltip></li>
                        <li><Tooltip :content="item.reason">{{item.reason}}</Tooltip></li>
                        <li><Tooltip :content="item.while">{{item.while}}</Tooltip></li>
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
                key: 'deduction',
                title: '累计扣分',
                tooltip: true
            }, {
                align: 'center',
                key: 'department',
                title: '扣分部门',
                tooltip: true
            }, {
                align: 'center',
                key: 'area',
                title: '所属区域',
                tooltip: true
            }],
            names: [ '旅行社名称', '扣分部门', '扣分原因', '累计时间', '累计扣分' ],
            tableData: [
                { name: '昆明A旅行社', deduction: '1', department: '昆明旅发委', area: '昆明市五华区' },
                { name: '昆明A旅行社', deduction: '2', department: '昆明旅发委', area: '昆明市五华区' },
                { name: '昆明A旅行社', deduction: '3', department: '昆明旅发委', area: '昆明市五华区' },
                { name: '昆明A旅行社', deduction: '4', department: '昆明旅发委', area: '昆明市五华区' },
                { name: '昆明A旅行社', deduction: '5', department: '昆明旅发委', area: '昆明市五华区' },
                { name: '昆明A旅行社', deduction: '6', department: '昆明旅发委', area: '昆明市五华区' },
                { name: '昆明A旅行社', deduction: '7', department: '昆明旅发委', area: '昆明市五华区' },
                { name: '昆明A旅行社', deduction: '8', department: '昆明旅发委', area: '昆明市五华区' },
                { name: '昆明A旅行社', deduction: '9', department: '昆明旅发委', area: '昆明市五华区' },
                { name: '昆明A旅行社', deduction: '10', department: '昆明旅发委', area: '昆明市五华区' },
                { name: '昆明A旅行社', deduction: '11', department: '昆明旅发委', area: '昆明市五华区' },
                { name: '昆明A旅行社', deduction: '12', department: '昆明旅发委', area: '昆明市五华区' },
                { name: '昆明A旅行社', deduction: '13', department: '昆明旅发委', area: '昆明市五华区' },
            ],
            rollData: [
                { name: '昆明A旅行社', deduction: '1', department: '昆明旅发委', reason: '昆明市五华区', while: '2018-01-01 09:56' },
                { name: '昆明A旅行社', deduction: '2', department: '昆明旅发委', reason: '昆明市五华区', while: '2018-01-01 09:56' },
                { name: '昆明A旅行社', deduction: '3', department: '昆明旅发委', reason: '昆明市五华区', while: '2018-01-01 09:56' },
                { name: '昆明A旅行社', deduction: '4', department: '昆明旅发委', reason: '昆明市五华区', while: '2018-01-01 09:56' },
                { name: '昆明A旅行社', deduction: '5', department: '昆明旅发委', reason: '昆明市五华区', while: '2018-01-01 09:56' },
                { name: '昆明A旅行社', deduction: '6', department: '昆明旅发委', reason: '昆明市五华区', while: '2018-01-01 09:56' },
                { name: '昆明A旅行社', deduction: '7', department: '昆明旅发委', reason: '昆明市五华区', while: '2018-01-01 09:56' },
                { name: '昆明A旅行社', deduction: '8', department: '昆明旅发委', reason: '昆明市五华区', while: '2018-01-01 09:56' },
                { name: '昆明A旅行社', deduction: '9', department: '昆明旅发委', reason: '昆明市五华区', while: '2018-01-01 09:56' },
                { name: '昆明A旅行社', deduction: '10', department: '昆明旅发委', reason: '昆明市五华区', while: '2018-01-01 09:56' },
                { name: '昆明A旅行社', deduction: '11', department: '昆明旅发委', reason: '昆明市五华区', while: '2018-01-01 09:56' },
                { name: '昆明A旅行社', deduction: '12', department: '昆明旅发委', reason: '昆明市五华区', while: '2018-01-01 09:56' },
                { name: '昆明A旅行社', deduction: '13', department: '昆明旅发委', reason: '昆明市五华区', while: '2018-01-01 09:56' },
            ],
        }
    },
    methods: {
        getChart(query) {
            console.log(query);
            
        },
        getList(query) {
            console.log(query);
            
        },
        initMap() {
            const id = 'map_chart';
            this.$echarts.registerMap('yunnan', yunnan);
            const option = OP.map();
            this.initChart(id, option);
            this.myChart.on('click', function(params) {
                if (!params.value) return;
                console.log(params);
            })
        },
        initRateBar() {
            const id = 'agency_rate';
            const option = OP.bar();
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
            }, 2000)
        },
        stopRoll() {
            clearInterval(this.interval);
        }
    },
    mounted() {
        this.roll()
    }
}
</script>

<style lang="less">
.agency-desk {
    .chart-box {
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        // border-bottom: 1px solid #ddd;
        .right {
            width: 35%;
            .map-chart {
                min-height: 400px;
            }
        }
        .left {
            width: 63%;
            display: flex;
            flex-flow: column;
            .bar-chart {
                height: 300px;
                width: 100%;
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
                width: 100%;
                height: 30px;
                align-items: center;
                li {
                    flex: 1;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    &:last-child {
                        flex: none;
                        width: 58px;
                        padding-right: 10px;
                    }
                }
            }
            .roll-header {
                font-weight: 600;
                background-color: #f3f3f3;
            }
            .roll-body {
                height: 300px;
                overflow: hidden;
                .anim{
                    transition: all 0.5s;
                    margin-top: -30px;
                }
            }
        }
    }
}
    
</style>