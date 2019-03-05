<template>
<div class="guide-desk">
    <search-bar ref="searchBar"
    parent="导游管理"
    guide
    @getQuery="getChart">
    </search-bar>
    <div class="area chart-box">
        <div class="map-chart" id="guide_map"></div>
        <div class="bar">
            <div class="title">{{region}}导游数量及占比</div>
            <div class="deco">总数：{{total}}</div>
            <div class="bar-chart" id="guide_rate"></div>
        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <div class="pie-box chart-box">
        <div class="pie" id="sex_pie"></div>
        <div class="pie" id="age_pie"></div>
    </div>
    <div class="bar-box chart-box">
        <div class="lang" id="lang_bar"></div>
        <div class="score" id="guide_score"></div>
    </div>
    <div class="bar-box chart-box">
        <div class="bar-chart" id="nation_bar"></div>
    </div>
    <div class="chart-box">
        <div class="list">
            <h3>云南省导游打分排名（TOP100）</h3>
            <Table
            highlight-row
            stripe
            :columns="columns"
            :data="scoreList"
            size="small">
            </Table>
        </div>
        <div class="list">
            <h3>云南省导游扣分排名（TOP100）</h3>
            <Table
            highlight-row
            stripe
            :columns="columns"
            :data="deductionList"
            size="small">
            </Table>
        </div>
    </div>
</div>
</template>

<script>
import SearchBar from '@/components/daolvSearch.vue'
import OP from '@/components/optionDL.js'
import yunnan from '@/assets/yunnan.json'
export default {
    name: 'GuideDesk',
    components: { SearchBar },
    data() {
        return {
            myChart: null,  
            city: null,
            county: null, 
            columns: [{
                align: 'center',
                key: 'name',
                title: '姓名',
                width: 100,
                tooltip: true
            }, {
                align: 'center',
                key: 'value',
                title: '累计分值',
                width: 100,
                tooltip: true
            }, {
                align: 'center',
                key: 'agency',
                title: '所属旅行社',
                tooltip: true
            }, {
                align: 'center',
                key: 'area',
                title: '所属区域',
                tooltip: true
            }],
            scoreList: [],
            deductionList: [],
            region: '',
            total: null,
            spinShow: false
        }
    },
    methods: {
        async getChart(query) {
            // console.log(query);
            this.spinShow = true
            let area = await this.$fly.post('/evaluation/api/tsView/guideStatistics/area', query)            
            let areaData = area.data || {}
            let areaList = areaData.areaList || []
            this.region = areaData.region ? areaData.region.name : ''
            this.total = areaList.reduce((total, item) => total + item.value, 0)
            this.initMap(areaList);
            this.initRateBar(areaList);

            let sex = await this.$fly.post('/evaluation/api/tsView/guideStatistics/sex', query)
            let age = await this.$fly.post('/evaluation/api/tsView/guideStatistics/age', query)
            let sexData = sex.data || {}
            let ageData = age.data || {}
            let sexList = sexData.sexList || []
            let ageList = ageData.ageList || []
            this.initPie('sex_pie', '导游性别分布', sexList)
            this.initPie('age_pie', '导游年龄分布', ageList)

            let lang = await this.$fly.post('/evaluation/api/tsView/guideStatistics/language', query)
            let nation = await this.$fly.post('/evaluation/api/tsView/guideStatistics/nation', query)
            let langData = lang.data || {}
            let nationData = nation.data || {}
            let langList = langData.languageList || {}
            let nationList = nationData.nationList || []
            this.initBar('lang_bar', '导游语种分布', langList)
            this.initScoreBar(areaList);
            this.initBar('nation_bar', '导游民族分布', nationList)

            this.$refs.searchBar.toggleLoading()
            this.spinShow = false
        },
        async getList() {
            let score = await this.$fly.post('/evaluation/api/tsView/guideScoreRank', { type: 'score' })
            let deduction = await this.$fly.post('/evaluation/api/tsView/guideScoreRank', { type: 'deduction' })
            let list1 = score.data || [];
            let list2 = deduction.data || [];
            this.scoreList = list1;
            this.deductionList = list2.map(item => Object.assign({}, item, { value: '-' + item.value }));

        },
        initRateBar(list) {
            const id = 'guide_rate';
            const option = OP.bar('导游', list);
            this.initChart(id, option);
        },
        initScoreBar(list) {
            const id = 'guide_score';
            const option = OP.score_bar(`${this.region}导游打分平均分情况分布图`, list);
            this.initChart(id, option);
        },
        initBar(id, name, list) {
            const option = OP.langBar(name, list);
            this.initChart(id, option);
        },
        // 初始化饼图
        initPie(id, title, list) {
            const width = document.body.clientWidth;
            let redis = ['40%', '60%'];
            if (width < 1200 && width >= 1000) {
                redis = ['30%', '50%']
            } else if (width < 1000) {
                redis = ['20%', '40%']
            }
            const option = OP.pie(title, list, redis)
            this.initChart(id, option)
        },
        initMap(list) {
            const id = 'guide_map';
            this.$echarts.registerMap('yunnan', yunnan);
            const option = OP.guide_map(list, this.$region);
            this.initChart(id, option);
            let vm = this
            this.myChart.off('click')
            this.myChart.on('click', function(params) {
                // if (!params.value) return;
                if (vm.$region == '34') {
                    vm.$refs.searchBar.setCity(params.name)
                    vm.$refs.searchBar.onSubmit()
                }
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
        this.$refs.searchBar.onSubmit()
        this.getList()
    }
}
</script>

<style lang="less">
.guide-desk {
    .chart-box {
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // border-bottom: 1px solid #ddd;
        .list {
            width: 49%;
            h3 {
                font-size: 20px;
                font-weight: 600;
                color: #333;
                padding: 15px 5px;
            }
            td {
                height: 32px;
            }
            .ivu-table-cell {
                padding: 0;
            }
        }
    }
    .area {
        position: relative;
        .map-chart {
            width: 38%;
            min-height: 400px;
        }
        .bar {
            width: 60%;
            .bar-chart {
                min-height: 500px;
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
    .pie-box {
        .pie {
            width: 49%;
            height: 400px;
        }
    }
    .bar-box {
        .lang {
            width: 39%;
            height: 400px;
        }
        .score {
            width: 60%;
            height: 400px;
        }
        .bar-chart {
            width: 100%;
            height: 400px;
        }
    }
}
</style>