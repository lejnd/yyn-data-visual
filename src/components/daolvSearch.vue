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
            <Select v-model="form.city" placeholder="州市" @on-change="setChildCityList()">
                <Option
                v-for="item in cityList"
                :value="item.value"
                :key="item.value">
                {{ item.label }}
                </Option>
            </Select>
        </FormItem>
        <FormItem style="width:120px" prop="county">
            <Select v-model="form.county" placeholder="区县">
                <Option
                v-for="item in countyList"
                :value="item.value"
                :key="item.value">
                {{ item.label }}
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
        <FormItem :label-width="40">
            <Button @click="onReset('form')">清空</Button>
            <Button type="primary" @click="onSubmit()" style="margin-left: 8px">查询</Button>
        </FormItem>
    </Form>
</div>
</template>

<script>
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
                city: null,
                county: null,
                level: '00',
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
            ]
        }
    },
    methods: {
        onSubmit() {
            const f = this.form;
            const query = {
                city: f.city,
                county: f.county,
                level: f.level,
                startDate: f.dateRange[0] || '',
                endDate: f.dateRange[1] || ''
            }
            this.$emit('getQuery', query);
        },
        setChildCityList() {
            console.log(1);
            
        },
        onReset(name) {
            this.$refs[name].resetFields();
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