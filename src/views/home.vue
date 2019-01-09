<template>
<div class="home">
    <div class="block">
        <router-link to="/travel_mode">数据可视化: 投诉人旅游方式</router-link>
    </div>
    <div class="block">
        <router-link to="/area_data">数据可视化: 投诉区域分析</router-link>
    </div>
    <div class="block">
        <Button type="primary" @click="goto()">跳转WAU列表测试</Button>
    </div>
</div>
</template>

<script>
// import DateRange from '@/components/dateRange.vue';
// import SearchBar from '@/components/search.vue'
export default {
    name: 'Home',
    // components: { SearchBar },
    data() {
        return {
            
        }
    },
    methods: {
        goto() {
            window.location.href = 'dataDisplay?method=initAllComplain'
        }
    }
}
</script>

<style lang="less">
.home {
    .block {
        margin: 10px auto;
    }
}
</style>