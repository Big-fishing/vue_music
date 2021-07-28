<template>
    <div class="song-sheet"  v-loading="classifyList.length === 0">
        <div class="song-head">
            <ul>
                <li v-for="itme in classifyList" :key='itme.name'>
                    <span>{{itme.name}}</span>
                    <router-link 
                    v-for="citme in itme.children" 
                    :class="{'textcolorred':type === citme.name}" 
                    :key='citme.name' 
                    :to='`/discover/songSheet?type=${citme.name}`'>
                        {{citme.name}}
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="song-content" v-loading="playlist.length === 0">
            <ul>
                <li v-for="itme in playlist" :key='itme.id+(Math.random()*100)'>
                    <router-link :to='`/detailsPage/songSheet?id=${itme.id}`'>
                        <img :src="itme.coverImgUrl" :alt="itme.name">
                        <p>{{itme.name}}</p>
                    </router-link>
                </li>
            </ul>
            <el-pagination
            @current-change='changepage'
            :current-page='page'
            :page-size="50"
            :total="total"
            background
            layout="prev, pager, next">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import {ReqCatlist,ReqPlaylist} from '@/api'

export default {
    name:'SongSheet',
    data(){
        return{
            classifyList:[],
            playlist:[],
            type:'全部',
            page:1,
            total:0,
        }
    },
    methods:{
        async initSongtClassify(){
            //获取分类并初始化格式
            const result = await ReqCatlist();
            let classList = []
            for(let key in result.categories){
                classList[key] = {name:result.categories[key],type:+key}
            }
            this.classifyList = classList.map(itme=>{
                itme.children = result.sub.filter(citme=>{
                    return itme.type === citme.category
                })
                return itme
            })
        },
        async initPlaylist(page=1){
            let result
            this.playlist = [];
            if(this.type){
                result = await ReqPlaylist({cat:this.type,offset:(page-1)*50});
            }else{
                result = await ReqPlaylist({offset:(page-1)*50});
            }
            this.playlist = result.playlists
            this.total = result.total
            this.page = page
        },
        changepage(e){
            this.$router.push(`/discover/songSheet?type=${this.type || '全部'}&page=${e}`)
        }
    },
    watch:{
        '$route.query'(obj){
            this.type = obj.type
            this.initPlaylist(Number(obj.page) || 1)
        }
    },
    created(){
        if(this.$route.query.type) this.type = this.$route.query.type
        this.initSongtClassify();
        this.initPlaylist(Number(this.$route.query.page) || 1)
    }
}
</script>

<style>
.song-sheet .song-head{
    text-align: left;
    line-height: 35px;
    font-size: 16px;
}
.song-sheet .song-head ul li span{
    padding: 5px;
    background: #c62f2f;
    color: #ffffff;
    letter-spacing: 10px;
    border-radius: 5px;
}
.song-sheet .song-head ul li a{
    font-size: 14px;
    margin:0 10px
}
.song-sheet .song-head ul li a.textcolorred{
    color: #c62f2f;
}
.song-content>ul{
    display: flex;
    justify-content: space-between;
    flex-wrap:wrap
}
.song-content>ul li{
    width: 19%;
    margin:15px 0;
}
.song-content>ul li img{
    width: 100%;
    transition: all .5s;
}
.song-content>ul li img:hover{
    filter: blur(5px);
}
</style>