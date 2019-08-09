<template>
    <div class="box">
        Foo
        <button @click="click">按钮</button>
        <div>状态：{{this.$store.state.name}}</div>
    </div>
</template>
<script>
export default {
    mounted(){//客户端调用
        this.$store.dispatch('changeName');
        console.log(222)
    },
    asyncData(store){// asyncData方法会在组件（限于页面组件）每次加载之前被调用。它可以在服务端或路由更新之前被调用
        console.log('server asyncData')
        return store.dispatch('changeName');
    },
    methods:{
        click(){
            alert(222)
        }
    }
}
</script>
<style scoped>
    .box{
        background: #f00
    }
</style>
