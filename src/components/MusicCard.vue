<template>
    <div class="music-card" :class="{'music-card-display':cardDislayBol}">
        <div @click="backCard" class="back-card">
            <i class="el-icon-arrow-down"></i>
        </div>
        <div class="center" v-if="musicList.length">
            <el-scrollbar height="100vh">
            <div class="music-card-title">
                <div class="music-card-left">
                    <div class="needle" :class="{'needle-play':musicBol}">
                        <img src="/imgs/MusicDetailCard/needle.png">
                    </div>
                    <div 
                    class="music-img-rotate rotate-animation" 
                    :class="{'.rotate-animation-play':musicBol,'rotate-animation-pause':!musicBol}">
                        <img class="disc" src="/imgs/MusicDetailCard/disc.png">
                        <img class="title-img" :src="musicImg" >
                    </div>
                </div>
                <div class="music-card-right">
                    <h3>{{musictitle}}</h3>
                    <div v-if='lyricList.length' class="lyricList">
                        <ul :style="{transform:'translateY('+(lyricIndex*-40)+'px)'}">
                            <li 
                            v-for="itme in lyricList" 
                            :key='itme.index' 
                            :class="{'colorlyric':lyricIndex===itme.index,'textSparent':itme.text.length === 0}">
                                {{itme.text.length ? itme.text : '空位;'}}
                            </li>
                        </ul>
                    </div>
                    <div v-else class="lyricload">
                        {{lyricbol ? '歌词加载中...' : '暂无歌词'}}
                    </div>
                </div>
            </div>
            <div class="comment-head">
                最新评论
            </div>
            <Comments type='music' :id='id' />
            </el-scrollbar>
        </div>
        <el-empty v-else description="暂无数据"></el-empty>
    </div>
</template>

<script>
import {ReqLyric} from '@/api'
import Comments from '@/components/Comments.vue'


export default {
    name:'MusicCard',
    data(){
        return{
            musictitle:'',
            lyricList:[],
            lyricIndex:0,
            id:'',
            lyricbol:true
        }
    },
    methods:{
        backCard(){
            this.$store.commit('cardDislayBolState',true)
        },
        async initlyric(id){
            this.lyricList = []
            const {lrc} = await ReqLyric({id})
            if(!lrc) return this.lyricbol = false
            const str = lrc.lyric.split('\n')
            this.lyricList = str.map((itme,index) =>{
                //将歌词字符串截取成可用对象
                let text = itme.split(']')[1] || '' //截取歌词
                const time = itme.substring(1,6) // 截取时间戳的字符串
                const m = Number(time.split(':')[0])
                const s = Number(time.split(':')[1])
                return {text,time,index,timeNum:(m*60)+s}
            })
        }
    },
    watch:{
        '$store.state.musicIndex'(num){
            //当前音乐下标
            if(num < 0) return
            this.musictitle = this.$store.state.musicList[num].name
        },
        '$store.state.musicId'(id){
            //监听音乐id获取歌词和评论
            if(id){
                this.id = id
                this.lyricbol = true
                this.initlyric(id)
            }
        },
        '$store.state.currentTime'(time){
            //监听当前播放时间设置歌词位置
            const len = this.lyricList.length-1
            for(let i = len ; i >= 0 ; i--){
                if(time >= this.lyricList[i].timeNum){
                    this.lyricIndex = this.lyricList[i].index
                    break
                }
            }
        }
    },
    computed:{
        cardDislayBol(){
            //卡片是否展示
            return this.$store.state.cardDislayBol
        },
        musicList(){
            //音乐列表
            return this.$store.state.musicList
        },
        musicImg(){
            //当前音乐封面url
            return this.$store.state.musicImg
        },
        musicBol(){
            //音乐播放状态
            return this.$store.state.musicBol
        }
    },
    components:{
        Comments
    }
}
</script>

<style>
.music-card{
    position: fixed;
    z-index: 2000;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,.6);
    backdrop-filter: blur(8px);
    transition: all .5s;
}
.music-card-display{
    transform: translateY(100vh);
}
.music-card .back-card{
    cursor: pointer;
    position: absolute;
    top: 15px;
    left: 20px;
    color: #e4e7ed;
    font-size: 30px;
}
.music-card .music-card-title{
    display: flex;
    height: 500px;
}
.music-card .music-card-title .music-card-left{
    width: 40%;
}
.music-card .music-card-title .music-card-left .needle{
    z-index: 100;
    width: 250px;
    margin: auto;
    position: relative;
    left: 125px;
}
.music-card .music-card-title .music-card-left .needle{
    transform-origin: 0 0 0;
    width: 250px;
    margin: auto;
    position: relative;
    left: 125px;
    transition: all .5s;
}
.music-card .music-card-title .music-card-left .needle img{
    width: 100%;
}
.needle-play{
    transform: rotate(25deg);
}
.music-card .music-card-title .music-card-left .music-img-rotate{
    width: 340px;
    height: 340px;
    position: relative;
    top: -47px;
    margin: auto;
}
.music-card .music-card-title .music-card-left .music-img-rotate .disc{
    z-index: 5;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
}
.music-card .music-card-title .music-card-left .music-img-rotate .title-img{
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    position: absolute;
    width: 73%;
    margin: auto;
    border-radius: 50%;
}
.music-card .music-card-title .music-card-right{
    width: 60%;
}
.rotate-animation{
    transform: rotate(0deg);
    animation:rotate 8s linear infinite;
}
.rotate-animation-play{
    animation-play-state:running
}
.rotate-animation-pause{
    animation-play-state:paused
}
@keyframes rotate{
    0%{transform: rotate(0deg)}
    100%{transform: rotate(360deg)}
}
.music-card-right .lyricload{
    margin-top: 220px;
    text-align: center;
    font-size: 25px;
    color: #fff;
}
.music-card-right{
    overflow: hidden;
}
.music-card-right h3{
    line-height: 60px;
    color: #fff;
    font-size: 24px;
}
.music-card-right .lyricList{
    overflow: hidden;
}
.music-card-right .lyricList ul{
    transition: all .5s;
    position: relative;
    top: 250px;
}
.music-card-right .lyricList li{
    line-height: 40px;
    color: #b2b2b2;
    font-size: 16px;
}
.music-card-right .lyricList .colorlyric{
    font-size: 18px;
    color:#fff;
}
.music-card-right .lyricList .textSparent{
    color: transparent;
}

.comment-head{
    line-height: 50px;
    border-bottom: 1px solid #9e9e9e;
    text-align: left;
    color:#fff;
    font-size: 22px;
    text-indent: 5px;
}
</style>