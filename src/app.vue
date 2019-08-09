<template>
<!-- 客户端激活 -->
    <div id="app">
        App
        <router-link to="/foo">foo</router-link>
        <router-link to="/bar">bar</router-link>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
}
</script>
