<template>
<div class="search-bar">
    <h2 v-if="title" class="title">{{title}}</h2>
    <date-range ref="dateRange" @getDate="setDate"></date-range>
    <Row :gutter="20">
        <Col span="4">
            <Select v-model="city" style="width: 100%" :disabled="disCity" placeholder="州市" @on-change="setChildCityList()">
                <Option
                v-for="item in cityList"
                :value="item.value"
                :key="item.value">
                {{ item.label }}
                </Option>
            </Select>
        </Col>
        <Col span="4">
            <Select v-model="childCity" :disabled="disCounty" style="width: 100%" placeholder="区县">
                <Option
                v-for="item in childCityList"
                :value="item.value"
                :key="item.value">
                {{ item.label }}
                </Option>
            </Select>
        </Col>
        <Col span="4" v-if="hasType">
            <Select v-model="type" style="width: 100%" placeholder="所有分类">
                <Option
                v-for="item in typeList"
                :value="item.id"
                :key="item.id">
                {{ item.name }}
                </Option>
            </Select>
        </Col>
        <Col span="6">
            <Button type="primary" @click="onClear" ghost style="margin-right:20px">清空</Button>
            <Button type="primary" @click="onSubmit" :loading="loading">查询</Button>
        </Col>
        <div style="float:right">
            <!-- <Button type="primary" @click="onSubmit" style="margin-right:20px">导出</Button> -->
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
            default: () => null 
        },
        hasType: {
            type: Boolean,
            default: () => false
        }
    },
    data() {
        return {
            cityList: null,
            childCityList: null,
            city: pid,
            childCity: cid,
            date: null,
            typeList: null,
            type: null,
            loading: false,
            disCity: false,   // 州市只读
            disCounty: false,   // 区县只读
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
                date: this.date || [],
                type: this.type
            }
            this.$emit('getQuery', query)
        },
        onClear() {
            if (!this.loading) {
                this.city = pid || null;
                this.childCity = cid || null;
                this.date = null;
                this.$refs.dateRange.clearValueYQM();
                this.onSubmit()
            }
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
        getTypeList() {
            this.$fly.get('/dataVisualization/classify')
            .then((res) => {
                this.typeList = res.data.list
            })
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
                return this.getRegion(this.city).then((res) => {
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
        this.getTypeList();
        if (pid) {
            this.setChildCityList()
            this.disCity = true
        }
        if (cid) {
            this.disCounty = true
        }
    }
}
</script>

<style lang="less">
    .search-bar {
        padding: 20px 10px;
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