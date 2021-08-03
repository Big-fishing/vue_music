<template>
    <div class="toplist">
        <h3>官方榜</h3>
        <div class="officialTop" v-loading='officialTop.length === 0'>
            <ul>
                <li v-for="itme in officialTop" :key='itme.id'>
                    <router-link :to='`/detailsPage/songSheet?id=${itme.id}`'>
                        <el-image :src="itme.coverImgUrl" :alt="itme.name" lazy></el-image>
                        <p>{{itme.name}}</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <h3>全球榜</h3>
        <div class="globalTop" v-loading='globalTop.length === 0'>
            <ul>
                <li v-for="itme in globalTop" :key='itme.id'>
                    <router-link :to='`/detailsPage/songSheet?id=${itme.id}`'>
                        <el-image :src="itme.coverImgUrl" :alt="itme.name" lazy></el-image>
                        <p>{{itme.name}}</p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>  
</template>

<script>
import {ReqToplist} from '@/api'

export default {
    name:'Ranking',
    data(){
        return{
            officialTop:[],
            globalTop:[]
        }
    },
    methods:{
        async initToplist(){
            const result = await ReqToplist();
            this.officialTop = result.list.slice(0,4);
            this.globalTop = result.list.slice(4);
        }
    },
    created(){
        this.initToplist()
    }
}
</script>

<style>
.toplist h3{
    text-align: left;
    font-size: 24px;
    line-height: 40px;
    border-bottom:1px solid #dbdbdb;
}
.toplist ul{
    display: flex;
    font-size: 16px;
}
.toplist .officialTop ul li{
    flex: 1;
    margin: 10px;
}
.toplist ul li img{
    width: 100%;
}
.toplist .globalTop ul{
    flex-wrap: wrap;
}
.toplist .globalTop ul li{
    width: 19%;
    margin: 10px 5px;
}
</style>