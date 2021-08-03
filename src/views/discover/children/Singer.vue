<template>
    <div class="singer">
        <div class="singer-head">
            <ul>
                <li v-for="itme in classifyList" :key='itme.name'>
                    <span>{{itme.name}}:</span>
                    <a 
                    @click="changeQuery(citme)" 
                    v-for="citme in itme.children" 
                    :key="citme.name"
                    :class="{'colorRed':(this.type === citme.type) || (this.area === citme.area)}">
                        {{citme.name}}
                    </a>  
                </li>
            </ul>
        </div>
        <div class="singer-contnet" v-loading='artists.length === 0'>
            <ul>
                <li v-for="itme in artists" :key="itme.id">
                    <router-link :to='`/detailsPage/singer?id=${itme.id}`'>
                        <el-image :src="itme.picUrl" :alt="itme.name" lazy>
                            <template #placeholder>
                                <div class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </template>
                        </el-image>
                        <p>{{itme.name}}</p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>  
</template>

<script>
import {ReqArtist} from '@/api'

export default {
    name:'Singer',
    data(){
        return{
            classifyList:[
                {
                    name:'语种',
                    children:[
                        {
                            name:'全部',
                            type:-1
                        },
                        {
                            name:'男歌手',
                            type:1
                        },
                        {
                            name:'女歌手',
                            type:2
                        },
                        {
                            name:'乐队',
                            type:3
                        },
                    ]
                },
                {
                    name:'分类',
                    children:[
                        {
                            name:'全部',
                            area:-1
                        },
                        {
                            name:'华语',
                            area:7
                        },
                        {
                            name:'欧美',
                            area:96
                        },
                        {
                            name:'日本',
                            area:8
                        },
                        {
                            name:'韩国',
                            area:16
                        },
                        {
                            name:'其他',
                            area:0
                        },
                    ]
                }
            ],
            type:-1,
            area:-1,
            artists:[]
        }
    },
    methods:{
        async initsinger(){
            this.artists = []
            const {artists} = await ReqArtist({type:this.type,area:this.area,limit:60})
            this.artists = artists
        },
        changeQuery(obj){
            if(obj.type) this.type = obj.type
            if(obj.area) this.area = obj.area
            this.$router.push(`/discover/singer?type=${this.type}&area=${this.area}`)
        }
    },
    watch:{
        '$route.query'(obj){
            if(obj.type) this.type = +obj.type
            if(obj.area) this.area = +obj.area
            this.initsinger()
        }
    },
    created(){
        if(this.$route.query.type) this.type = +this.$route.query.type
        if(this.$route.query.area) this.area = +this.$route.query.area
        this.initsinger()
    }
}
</script>

<style>
.singer .singer-head{
    text-align: left;
    line-height: 40px;
    font-size: 16px;
}
.singer .singer-head a{
    cursor: pointer;
    padding: 7PX;
    margin: 0 15px;
}
.singer .singer-head a.colorRed{
    background: #c62f2f;
    color: #fff;
    border-radius: 5px;
}
.singer .singer-head span{
    padding: 7PX;
}
.singer .singer-contnet ul{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 15px;
}
.singer .singer-contnet ul li{
    cursor: pointer;
    width: 19%;
    text-align: left;
    margin: 15px 0;
}
.singer .singer-contnet ul li img{
    width: 100%;
    transition: all .5s;
}
.singer .singer-contnet ul li img:hover{
    width: 100%;
    filter: blur(8px);
}
</style>