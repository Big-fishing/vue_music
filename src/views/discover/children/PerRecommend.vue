<template>
  <!-- 轮播图 -->
    <el-carousel v-if='banner.length' :interval="6000" type="card" height='250px'>
        <el-carousel-item v-for="item in banner" :key="item.imageUrl">
            <img v-if='item.imageUrl' :src="item.imageUrl" :alt="item.typeTitle">
        </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div v-if='personalized' class="personalized">
        <div class="personalized-top">
            <span>
                推荐歌单
            </span>
            <router-link to='/discover/songSheet'>
                更多<i class="el-icon-arrow-right"></i>
            </router-link>
        </div>
        <div v-if='personalized' class="per-content">
            <div v-for="itme in personalized" class="per-content-itme" :key='itme.name' @click="ondetailsPage(itme.id)">
                    <img :src="itme.picUrl" :alt="itme.name">
                    <p>{{itme.name}}</p>
            </div>
        </div>
        <p v-else>暂无数据</p>
    </div>
    <!-- 最新音乐 -->
    <div v-if='personalized' class="latest-music">
        <div class="personalized-top">
            <span>
                最新音乐
            </span>
        </div>
        <ul v-if='newsongtext'>
            <li v-for="itme in newsongtext" :key='itme.id' :class=" (Number(itme.index)% 2 ) &&'itme-sign'">
                <i>{{itme.index}}</i>
                <img @click="playlist(newsongtext,itme.index,itme.picUrl,itme.id)" :src="itme.picUrl" :alt="itme.name">
                <div class="newsongtext-itme">
                    <p>{{itme.name}}</p>
                    <span>{{itme.song.album.company}}</span>
                </div>
            </li>
        </ul>
        <p v-else>暂无数据</p>
    </div>
    <div class="loading" v-else v-loading='true'></div>
</template>

<script>
import {Reqbanner,Reqpersonalized,Reqpernewsong} from '@/api'
export default {
    data(){
        return{
            banner:5,
            personalized:false,
            newsong:false,
        }
    },
    created(){
        this.bannerInit()
        this.personalizedInit()
        this.newsonginit()
    },
    methods:{
        async bannerInit(){
            const {code,banners} = await Reqbanner()
            if(code !== 200) return this.$message.error('轮播图获取失败')
            this.banner = banners
        },
        async personalizedInit(){
            const {code,result} = await Reqpersonalized({limit:10})
            if(code !== 200) return this.$message.error('数据获取失败')
            this.personalized = result
        },
        async newsonginit(){
            const {code,result} = await Reqpernewsong()
            if(code !== 200) return this.$message.error('数据获取失败')
            this.newsong = result
        },
        ondetailsPage(id){
            this.$router.push(`/detailsPage/songSheet?id=${id}`)
        },
        playlist(list,index,img,id){
            this.$store.commit('musicListState',list)
            this.$store.commit('musicImgState',img)
            this.$store.commit('musicIndexState',index-1)
            this.$store.commit('musicIdState',id)
        }
    },
    computed:{
        newsongtext(){
            return this.newsong && this.newsong.map((itme,index)=>{
                index++
                index < 10 ? itme.index = '0'+ index : itme.index = index
                return itme
            })
        }
    }
};
</script>

<style>
.el-carousel__container img{
    width: 100%;
    border-radius: 15px;
}
.personalized{
    margin: 10px 0;
}
.personalized-top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ececec;
    margin:10px 0;
    height: 40px;
    font-size: 16px;
}
.personalized-top a{
    font-size:14px;
}
.personalized .per-content{
    cursor: pointer;
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between;
}
.personalized .per-content .per-content-itme{
    width: 19%;
    margin-bottom: 10px;
}
.personalized .per-content .per-content-itme img{
    width: 100%;
    border-radius: 20px;
    border: 1px solid #bebebe;
}
.latest-music ul {
    border: 1px solid #f5f5f7;
}
.latest-music ul li {
    display: flex;
    align-items: center;
    height: 70px;
}
.latest-music ul li.itme-sign {
    background-color: #f5f5f7;
}
.latest-music ul li img{
    cursor: pointer;
    width: 50px;
    margin-right: 15px;
}
.latest-music ul li i{
    color: rgb(153, 153, 153);
    padding: 0 20px;
}
.latest-music ul li .newsongtext-itme {
    text-align: left;
    line-height: 24px;
}
.latest-music ul li .newsongtext-itme span{
    font-size: 12px;
    color: #666;
}
</style>