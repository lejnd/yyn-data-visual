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
    },
    mounted () {
        this.initMap()
        this.initRateBar()
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
    }
}
    
</style>