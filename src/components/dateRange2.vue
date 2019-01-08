<template>
    <div class="data-range">
        <el-date-picker
        ref="year"
        v-model="value_y"
        type="year"
        placeholder="按年查询"
        @change="clearValueYQM(3)">
        </el-date-picker>
        <el-select v-model="value_q" placeholder="按季查询" @change="clearValueYQM(3)">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-date-picker
        v-model="value_m"
        type="month"
        placeholder="按月查询"
        @change="clearValueYQM(4)">
        </el-date-picker>
        <el-date-picker
        v-model="value_d"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions2"
        @change="clearValueYQM(0)">
        </el-date-picker>
    </div>
</template>

<script>
	export default {
		name: 'DateRange',
		props: {
            conf: {
                type: Object,
                default: function() {
                    return {};
                }
            }
        },
        mounted () {
            // let yearInput = $('.el-date-editor--year input')
            // let monthInput = $('.el-date-editor--month input')
            // let quaInput = $('.el-select input')
            // yearInput.attr("placeholder", "按年查询")
            // monthInput.attr("placeholder", "按月查询")
            // quaInput.attr("placeholder", "按季查询")
        },
		data(){
            let conf = this.conf
			return {
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value_y: conf.year || null,
                value_q: conf.quarter || null,
                value_m: conf.month || null,
                value_d: conf.date || null,
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
                    console.log(this.value_d);
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
            }
        },
        methods: {
            setValueD(start, end) {
                let date = new Date();
                let getYear = new Date(this.value_y).getFullYear()
                console.log(getYear);
                
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
                        this.value_q = null;
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