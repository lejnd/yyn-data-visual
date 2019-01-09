<template>
<div class="search-bar">
    <h2 v-if="title" class="title">{{title}}</h2>
    <date-range ref="dateRange" @getDate="setDate"></date-range>
    <Row :gutter="20">
        <Col span="4">
            <Select v-model="city" style="width: 100%" placeholder="州市" @on-change="setChildCityList()">
                <Option
                v-for="item in cityList"
                :value="item.value"
                :key="item.value">
                {{ item.label }}
                </Option>
            </Select>
        </Col>
        <Col span="4">
            <Select v-model="childCity" style="width: 100%" placeholder="区县">
                <Option
                v-for="item in childCityList"
                :value="item.value"
                :key="item.value">
                {{ item.label }}
                </Option>
            </Select>
        </Col>
        <Col span="6">
            <Button type="primary" @click="onClear" ghost style="margin-right:20px">清空</Button>
            <Button type="primary" @click="onSubmit" :loading="loading">查询</Button>
        </Col>
        <div style="float:right">
            <Button type="primary" @click="onSubmit" style="margin-right:20px">导出</Button>
            <Button type="primary" @click="onPrint">打印</Button>
        </div>
    </Row>
</div>
</template>

<script>
import DateRange from '@/components/dateRange.vue';
import dayjs from 'dayjs';
export default {
    name: 'SearchBar',
    components: { DateRange },
    props: {
        title: {
            type: String,
            default: ()=>null 
        }
    },
    data() {
        return {
            cityList: null,
            childCityList: null,
            city: null,
            childCity: null,
            date: null,
            loading: false,
        }
    },
    methods: {
        setDate(val) {
            if (val) {
                val[0] == '' ? 
                this.date = [] : this.date = [this.formatDate(val[0]), this.formatDate(val[1])]
            }
        },
        onSubmit() {
            let query = {
                city: this.city,
                county: this.childCity,
                date: this.date || []
            }
            this.$emit('getQuery', query)
        },
        onClear() {
            this.city = null;
            this.childCity = null;
            this.date = null;
            this.$refs.dateRange.clearValueYQM();
        },
        onPrint() {
            window.print();
        },
        formatDate(val) {
            return dayjs(val).format('YYYY-MM-DD');
        },
        searchLoading() {
            this.loading = !this.loading;
        },
        getRegion(pid) {
            return this.$fly.post('/dataVisualization/regionalism', {
                data: {
                    pid: pid
                }
            })
            .then((res) => {
                if (res.ret == 0) {
                    return Promise.resolve(res.data.list)
                }
            })
            .catch((err) => {
                Promise.reject(err.msg)
            })
        },
        setCityList() {
            this.getRegion('34').then((res) => {
                if (res && res.length > 0) {
                    this.cityList = res.map((data) => {
                        return {
                            value: data.value,
                            label: data.name
                        }
                    })
                }
            })
        },
        setChildCityList() {
            if (this.city) {
                this.getRegion(this.city).then((res) => {
                    if (res && res.length > 0) {
                        this.childCityList = res.map((data) => {
                            return {
                                value: data.value,
                                label: data.name
                            }
                        })
                    }
                })
            }
        }
    },
    mounted () {
        this.setCityList();
    }
}
</script>

<style lang="less">
    .search-bar {
        padding: 20px 30px;
        .title {
            font-size: 16px;
            height: 20px;
            line-height: 20px;
            font-weight: 500;
            color: #444;
            margin-bottom: 20px;
        }
        .ivu-row {
            margin-top: 8px;
            margin-bottom: 8px;
        }
    }
</style>