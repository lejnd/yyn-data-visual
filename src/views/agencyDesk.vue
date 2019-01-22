<template>
<div class="agency-desk">
    <search-bar name="旅行社管理" @getQuery="request"></search-bar>
    <div class="content-box">
        <div class="right">
            <div class="map-chart" id="map_chart"></div>
        </div>
        <div class="left">
            <div class="bar-chart" id="agency_rate"></div>
            <div class="bar-chart" id="agency_comp"></div>
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
        }
    },
    methods: {
        request(query) {
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
        initChart(id = null, option = {}) {
            const echarts = this.$echarts;
            const dom = document.getElementById(id)
            this.myChart = echarts.init(dom)
            this.myChart.setOption(option)
        },
    },
    mounted () {
        this.initMap()
    }
}
</script>

<style lang="less">
.agency-desk {
    .content-box {
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .right {
            width: 35%;
            .map-chart {
                min-height: 400px;
            }
        }
        .left {
            width: 64%;
        }
    }
}
    
</style>