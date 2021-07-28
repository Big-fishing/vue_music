<template>
    <div v-if='datalist' class="details-page">
        <div class="details-head">
            <div class="title-img">
                <img :src="datalist.coverImgUrl || datalist.cover" :alt="datalist.name">
            </div>
            <div class="details-head-cont">
                <h2>{{datalist.name}}</h2>
                <div v-if="type === 'songSheet'" class="author-time">
                    <img :src="datalist.creator.avatarUrl" :alt="datalist.creator.nickname">
                    <strong>{{datalist.creator.nickname}}</strong>
                    <span>{{createTime}} 创建</span>
                </div>
                <div v-if="type === 'songSheet'" class="details-head-but">
                    <el-button @click="playlist('all')" type="danger" round>
                        <i class="el-icon-video-play"></i>
                        全部播放
                    </el-button>
                    <el-button plain>
                        <i class="el-icon-star-off"></i>
                        收藏
                    </el-button>
                    <el-button plain>
                        <i class="el-icon-share"></i>
                        分享
                    </el-button>
                </div>
                <div class="details-head-text">
                    <p v-if="type === 'songSheet'">
                    标签：
                        <span v-for="itme in datalist.tags" :key='itme'>
                            {{itme}}
                        </span>
                    </p>
                    <p>{{trackCount}}</p>
                    <p>{{playCount}}</p>
                    <p class="text-introduction por" :class="introductionBol && 'text-open'" >
                        简介：{{datalist.description  || '暂无简介'}}
                        <span @click="introductionBol = !introductionBol" class="poa">
                            <i v-if="introductionBol" class="el-icon-arrow-up"></i>
                            <i v-else class="el-icon-arrow-down"></i>
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="歌曲列表" name="list">
                <el-table
                :data="musicListformat"
                @row-dblclick='playlist'
                stripe
                style="width: 100%">
                    <el-table-column prop="index" label="序号" width="50" />
                    <el-table-column prop="name" label="音乐标题"  />
                    <el-table-column prop="ar[0].name" label="歌手" />
                    <el-table-column prop="al.name" label="专辑"  />
                </el-table>
            </el-tab-pane>
            <el-tab-pane v-if="type === 'songSheet'" label="评论" name="comment">
                <Comments type='songSheet' :id='id' />
            </el-tab-pane>
        </el-tabs>
    </div>
    <div class="loading" v-else v-loading='true'></div>
</template>

<script>
import {ReqplaylistDetail,ReqArtistDetail,ReqArtistSongs} from '@/api'
import {setnewtime} from '@/plugins/Utils'
import Comments from '@/components/Comments.vue'

export default {
    name:'DetailsPage',
    data(){
        return{
            activeName:'list',
            datalist:false,
            introductionBol:false,
            musicList:[],
            id:'',
            type:'',
        }
    },
    async created(){
        this.id = +this.$route.query.id
        this.noInit()
    },
    methods:{
        async noInit(){
            console.log(this.$route.params.type)
            switch (this.$route.params.type) {
                case 'songSheet':{
                    const {code,playlist} = await ReqplaylistDetail(this.$route.query)
                    if(code !== 200) return this.$message.error('数据获取失败')
                    this.datalist = playlist
                    this.musicList = playlist.tracks
                    console.log(this.datalist)
                    this.type = 'songSheet'
                    break;
                }
                case 'singer':{
                    console.log(this.$route.params.type)
                    const {data} = await ReqArtistDetail(this.$route.query)
                    const {songs} = await ReqArtistSongs(this.$route.query)
                    this.datalist = data.artist
                    this.datalist.description = data.artist.briefDesc
                    this.musicList = songs
                    this.type = 'singer'
                    break;
                }
                default:{
                    this.$message.error({
                        message:'没有该页面',
                        duration:1000
                    })
                    this.$router.replace('/')
                }
                    break;
            }
        },
        initNum(num){
            if(num > 10000){
                return Math.floor(num / 10000) + '万'
            }else{
                return num
            }
        },
        playlist(row){
            this.$store.commit('musicListState',this.musicListformat)
            if(row === 'all'){
                this.$store.commit('musicImgState',this.musicListformat[0].picUrl)
                this.$store.commit('musicIndexState',this.musicListformat[0].index-1)
                this.$store.commit('musicIdState',this.musicListformat[0].id)
            }else{
                this.$store.commit('musicImgState',row.picUrl)
                this.$store.commit('musicIndexState',row.index-1)
                this.$store.commit('musicIdState',row.id)
            }
        }
    },
    computed:{
        //格式化数量
        trackCount(){
            if(this.datalist.trackCount){
                return `歌曲：${this.initNum(this.datalist.trackCount)}`
            }else{
                return `单曲数：${this.datalist.musicSize}`
            }
        },
        //格式化播放了
        playCount(){
            if(this.datalist.playCount){
                return `播放：${this.initNum(this.datalist.playCount)}`
            }else{
                return `专辑数：${this.datalist.albumSize}`
            }
        },
        //格式化事件
        createTime(){
            return setnewtime(new Date(this.datalist.createTime))
        },
        musicListformat(){
            return this.musicList && this.musicList.map((itme,index)=>{
                index++
                index < 10 ? itme.index = '0'+ index : itme.index = index
                if(itme.picUrl) return itme
                itme.picUrl = itme.al.picUrl || this.datalist.cover
                return itme
            })
        }
    },
    components:{
        Comments
    }
};
</script>

<style>
.loading{
    width: 100%;
    height: 100%;
}
.details-page {
    width: 80%;
    margin: 0 auto;
}
.details-page .details-head{
    display: flex;
    justify-content: center;
}
.details-page .details-head .title-img{
    width: 250px;
    margin-right:15px
}
.details-page .details-head .title-img img{
    width: 100%;
    border-radius: 20px;
}
.details-page .details-head-cont{
    flex:1;
    text-align: left;
    line-height: 24px;
}
.details-page .details-head-cont h2{
    font-size:22px;
    line-height: 50px;
}
.details-page .details-head-cont .author-time{
    display: flex;
    align-items: center;
}
.details-page .details-head-cont .author-time img{
    width: 30px;
    border-radius: 50%;
    margin-right:5px
}
.details-page .details-head-cont .author-time strong{
    color:rgb(64, 167, 251);
    margin-right:20px
}
.details-page .details-head-cont .details-head-text{
    color:#666;
}
.details-page .details-head-cont .details-head-text span{
    color:rgb(64, 167, 251);
    margin: 0 3px;
}
.details-page .details-head-cont .details-head-text .text-introduction{
    padding-right: 130px;
    overflow: hidden;
    max-height: 50px;
    transition: all .3s;
}
.details-page .details-head-cont .details-head-text .text-introduction span{
    cursor: pointer;
    top: 0;
    right: 0px;
    font-size: 18px;
    color: #000;
    transition: all .3s;
}
.details-page .details-head-cont .details-head-text .text-open{
    max-height: 500px;
}
.details-page .details-head-cont .details-head-but{
    margin: 8px 0;
}

.details-page .details-head-cont .details-head-but .el-button{
    font-size: 12px;
    padding: 0 15px;
    min-height:28px
}
.details-page .el-table__body .el-table__row{
    cursor: pointer;
}
</style>