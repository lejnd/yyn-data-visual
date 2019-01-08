<template>
    <div class="data-range">
        <Row :gutter="20">
            <Col span="4">
                <DatePicker
                type="year"
                v-model="value_y"
                placeholder="按年查询"
                style="width: 100%"
                @on-change="clearValueYQM(3)">
                </DatePicker>
            </Col>
            <Col span="4">
                <Select v-model="value_q" style="width: 100%" placeholder="按季查询" @on-change="clearValueYQM(3)">
                    <Option
                    v-for="item in options"
                    :value="item.value"
                    :key="item.value">
                    {{ item.label }}
                    </Option>
                </Select>
            </Col>
            <Col span="4">
                <DatePicker
                type="month"
                v-model="value_m"
                placeholder="按月查询"
                style="width: 100%"
                @on-change="clearValueYQM(4)">
                </DatePicker>
            </Col>
            <Col span="5">
                <DatePicker
                v-model="value_d"
                type="daterange"
                placement="bottom-end"
                placeholder="日期范围"
                style="width: 100%"
                @on-change="clearValueYQM(2)">
                </DatePicker>
            </Col>
        </Row>
    </div>
</template>

<script>
	export default {
		name: 'DateRange',
		props: {
            date: {
                default:() => null
            }
        },
        mounted () {
        },
		data(){
            let conf = this.conf
			return {
                value_y: null,
                value_q: null,
                value_m: null,
                value_d: this.date || null,
                options: [{
                    value: 1,
                    label: '第一季度'
                }, {
                    value: 2,
                    label: '第二季度'
                }, {
                    value: 3,
                    label: '第三季度'
                }, {
                    value: 4,
                    label: '第四季度'
                }]
            };
        },
        watch: {
            value_q(now, old) {
                this.switchValueQ(now);
            },
            value_y(now, old) {
                if (this.value_q) {                    
                    this.switchValueQ(this.value_q);
                } else if (now) {
                    let getYear = new Date(now).getFullYear();
                    this.value_d = [
                        `${getYear}-01-01`,
                        `${getYear}-12-31`
                    ]
                }
            },
            value_m(now, old) {
                if (now) {
                    let month = new Date(now).getMonth()+1;
                    let formMonth = month > 9 ? `${month}` : `0${month}`
                    let getYear = new Date(now).getFullYear();
                    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                        this.value_d = [
                            `${getYear}-${formMonth}-01`,
                            `${getYear}-${formMonth}-31`
                        ]                                        
                    } else if (month == 2 && this.isLeapYear(getYear)) {
                        this.value_d = [
                            `${getYear}-${formMonth}-01`,
                            `${getYear}-${formMonth}-29`
                        ]  
                    } else if (month == 2 && !this.isLeapYear(getYear)) {
                        this.value_d = [
                            `${getYear}-${formMonth}-01`,
                            `${getYear}-${formMonth}-28`
                        ]  
                    } else {
                        this.value_d = [
                            `${getYear}-${formMonth}-01`,
                            `${getYear}-${formMonth}-30`
                        ]  
                    }  
                }       
            },
            value_d(val) {
                this.$emit('getDate', val);
            }
        },
        methods: {
            setValueD(start, end) {
                let date = new Date();
                let getYear = new Date(this.value_y).getFullYear()
                let oldDate = [`${getYear}-${start}`, `${getYear}-${end}`];
                let nowDate = [`${date.getFullYear()}-${start}`,`${date.getFullYear()}-${end}`];
                if (this.value_y) {
                    return oldDate;
                } else {
                    return nowDate;
                }
            },
            clearValueYQM(val) {                
                switch (val) {
                    case 1:
                        this.value_y = null;
                        break;
                    case 2:
                        this.value_y = null;
                        this.value_q = null;
                        this.value_m = null;
                        break;
                    case 3:
                        this.value_m = null;
                        break;
                    case 4:
                        this.value_y = null;
                        this.value_q = null;
                        break;
                    default:
                        this.value_y = null;
                        this.value_q = null;
                        this.value_m = null;
                        this.value_d = null;
                        break;
                }
            },
            switchValueQ(val) {
                switch (val) {
                    case 1:
                        this.value_d = this.setValueD('01-01', '03-31')
                        break;
                    case 2:
                        this.value_d = this.setValueD('04-01', '06-30')                        
                        break;
                    case 3:
                        this.value_d = this.setValueD('07-01', '09-30')
                        break;
                    case 4:
                        this.value_d = this.setValueD('10-01', '12-31')
                        break;
                    default:
                        break;
                }
            },
            isLeapYear(year) {
                return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
            }
        }
	}
</script>

<style lang="less">
// .data-range {
//     .el-date-editor {
//         .el-range-separator {
//             width: 20px;
//             line-height: 28px;
//         }
//         .el-range__icon {
//             line-height: 28px;
//         }
//     }
//     .el-input__inner {
//         border-color: #b5b5b5;
//         border-radius: 0;
//         height: 35;
//         line-height: 35px;
//     }
//     .el-select {
//         height: 35;
//         line-height: 35px;
//         .el-input.is-focus .el-input__inner, .el-input__inner:focus {
//             border-color: #b5b5b5;
//         }
//     }
// }
</style>