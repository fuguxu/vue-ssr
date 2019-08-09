import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

export default ()=>{
    const store = new  Vuex.Store({
        atate:{
            name:''
        },
        mutations:{
            changeName(state){
                state.name = 'zf'
            }
        },
        actions:{
            changeName({commit}){
                return new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        commit('changeName');
                        resolve();
                    },1000)
                })
            }
        }
    })
    //如果浏览器端调用的时候 我需要将服务器端设置的最新状态 替换掉客户端的
    if(typeof window !=='undefined'&&window.__INITIAL_STATE__){
        store.replaceState(window.__INITIAL_STATE__)
    }
    return store
}