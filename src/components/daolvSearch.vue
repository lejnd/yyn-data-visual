<template>
<div class="search-bar">
    <div class="header" v-if="parent">
        <Breadcrumb>
            <BreadcrumbItem to="">{{parent}}</BreadcrumbItem>
            <BreadcrumbItem>工作台</BreadcrumbItem>
        </Breadcrumb>
    </div>
    <div class="title" v-if="title">{{title}}</div>
    <Form class="search-form" ref="form" :model="form" inline>
        <FormItem label="行政区划" :label-width="80" style="width:200px" prop="city">
            <Select v-model="form.city" :disabled="disCity" placeholder="州市" @on-change="setChildCityList()">
                <Option
                v-for="item in cityList"
                :value="item.value"
                :key="item.value">
                {{ item.name }}
                </Option>
            </Select>
        </FormItem>
        <FormItem style="width:120px" prop="county">
            <Select v-model="form.county" :disabled="disCounty" placeholder="区县">
                <Option
                v-for="item in countyList"
                :value="item.value"
                :key="item.value">
                {{ item.name }}
                </Option>
            </Select>
        </FormItem>
        <FormItem label="等级" :label-width="50" style="width:150px" prop="level" v-if="parent">
            <Select v-model="form.level" placeholder="等级">
                <Option
                v-for="item in levelOption"
                :value="item.value"
                :key="item.value">
                {{ item.label }}
                </Option>
            </Select>
        </FormItem>
        <FormItem label="选择日期" :label-width="80" style="width:260px" prop="dateRange">
            <DatePicker
            v-model="form.dateRange"
            type="daterange"
            placement="bottom-end"
            placeholder="日期范围"
            style="width:100%">
            </DatePicker>
        </FormItem>
        <FormItem>
            <Button :disabled="loading" @click="onReset('form')">清空</Button>
            <Button type="primary" :loading="loading" @click="onSubmit()" style="margin-left: 8px">查询</Button>
        </FormItem>
    </Form>
</div>
</template>

<script>
import dayjs from 'dayjs'
export default {
    name: 'SearchBar',
    props: {
        parent: {
            type: String,
            default: () => null
        },
        title: {
            type: String,
            default: () => null
        }
    },
    data() {
        return {
            form: {
                city: this.$region == '34' || this.$region.length == 4 ? '' : this.$region,
                county: this.$region.length == 4 ? this.$region : '',
                level: '',
                dateRange: []
            },
            cityList: [],
            countyList: [],
            levelOption: [
                { value: '00', label: '未评级' },
                { value: '01', label: '一星级' },
                { value: '02', label: '二星级' },
                { value: '03', label: '三星级' },
                { value: '04', label: '四星级' }
            ],
            loading: false,
            disCity: true,
            disCounty: true,
        }
    },
    methods: {
        onSubmit() {
            const f = this.form;
            const query = {
                city: f.city,
                county: f.county,
                level: f.level,
                startDate: f.dateRange[0] ? dayjs(f.dateRange[0]).format('YYYY-MM-DD') : '',
                endDate: f.dateRange[1] ? dayjs(f.dateRange[1]).format('YYYY-MM-DD') : ''
            }
            let formData = new FormData();
            formData.append('city', query.city);
            formData.append('county', query.county);
            formData.append('level', query.level);
            formData.append('startDate', query.startDate);
            formData.append('endDate', query.endDate);
            this.toggleLoading();
            this.$emit('getQuery', formData);
        },
        getCity() {
            let formData = new FormData();
            formData.append('city', '34');
            this.$fly.post('/guideEvaluation/api/common/queryCity', formData)
            .then((res) => {
                let data = res.data || {}
                this.cityList = data.city || []
            })
            .catch((err) => {
                this.$Message.warning(err ? err.msg || err : '请求失败');                
            })
        },
        toggleLoading() {
            this.loading = !this.loading;
        },
        setChildCityList() {
            let formData = new FormData();
            formData.append('city', this.form.city);
            this.$fly.post('/guideEvaluation/api/common/queryDistrict', formData)
            .then((res) => {
                let data = res.data || {}
                this.countyList = data.district || []
            })
            .catch((err) => {
                this.$Message.warning(err ? err.msg || err : '请求失败');                
            })
        },
        onReset(name) {
            this.form = {
                city: this.$region == '34' || this.$region.length == 4 ? '' : this.$region,
                county: this.$region.length == 4 ? this.$region : '',
                level: '',
                dateRange: []
            },
            this.onSubmit();
        },
        setCity(v) {
            const obj = this.cityList.filter(item => item.name == v)[0]
            const code = obj ? obj.value : ''
            this.form.city = code;
        }
    },
    mounted () {
        this.getCity()
        if (this.$region == '34') {
            this.disCity = false;
            this.disCounty = false;
        }
        if (this.$region.length == 3) {
            this.disCounty = false;
            this.setChildCityList()
        }
    }
}
</script>

<style lang="less">
.search-bar {
    .header {
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        border-bottom: 1px solid #eee;
        margin-bottom: 15px;
    }
    .title {
        padding: 6px 20px;
        font-size: 15px;
        font-weight: 600;
        color: #515a6e;
        margin-bottom: 10px;
    }
    .search-form {
        margin: 0 15px;
        // border-bottom: 1px solid #eee;
    }
    .ivu-select-selection, input, button {
        border-radius: 0;
    }
}
</style>