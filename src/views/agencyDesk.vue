<template>
<div class="agency-desk">
    <div class="search">
        <Form ref="formChart" :model="formChart" inline>
            <FormItem label="行政区划" prop="user">
                <Select v-model="city" style="width: 100%" :disabled="disCity" placeholder="州市" @on-change="setChildCityList()">
                    <Option
                    v-for="item in cityList"
                    :value="item.value"
                    :key="item.value">
                    {{ item.label }}
                    </Option>
                </Select>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formChart.password" placeholder="Password">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button @click="handleReset('formChart')" style="margin-left: 8px">Reset</Button>
                <Button type="primary" @click="handleSubmit()">Signin</Button>
            </FormItem>
        </Form>
    </div>
</div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            
        }
    }
}
</script>

<style lang="less">
    
</style>