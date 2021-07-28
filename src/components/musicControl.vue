<template>
    <div class="music">
        <audio
        v-if="musicUrl.length"
        ref="audioRef"
        :src="musicUrl"
        @timeupdate="reftimeupdate"
        @ended="changemusic('next')"
        ></audio>
        <div class="music-control">
            <div @click="ggg" class="music-control-title">
                <img @click="cardbol" :src="musicImg.length ? musicImg : '/imgs/test.jpg'" alt="封面">
                <p v-if="musicLoadBol">加载中...</p>
                <p v-else>
                    {{musictitle.length > 10 ? musictitle.substr(0,8) + '...' : musictitle}}
                </p>
            </div>
            <div class="music-control-body">
                <div class="music-control-but">
                    <button @click="changemusic('pre')"><i class="iconfont icon-shangyishou" ></i></button>
                    <button @click="changeState(!playBol)">
                        <i v-if='playBol' style="font-size:25px" class="iconfont icon-bofang" ></i>
                        <i v-else style="font-size:25px" class="iconfont icon-zuoce-bofangqixiafang-bofang" ></i>
                    </button>
                    <button @click="changemusic('next')"><i class="iconfont icon-shangyishou-copy" ></i></button>
                </div>
                <div class="music-control-slider">
                    <span>{{currentTime}}</span>
                    <el-slider 
                    v-model="timeProgress"
                    :show-tooltip='false'
                    @change="changeTime"
                    :disabled='musicList.length === 0 || musicLoadBol'
                    ></el-slider>
                    <span>{{allTheTime}}</span>
                </div>
            </div>
            <div class="music-control-right">
                <div class="music-right-slider">
                    <div class="volumbol" @click="changevolum(!volumeBol)">
                        <i v-if='volumeBol' class="iconfont icon-yinliang" ></i>
                        <i v-else class="iconfont icon-yinliang-" ></i>
                    </div>
                    <el-slider 
                    v-model="volumenum"
                    :show-tooltip='false'
                    @input="changeVolume"
                    :disabled='musicList.length === 0 || musicLoadBol'
                    ></el-slider>
                </div>
                <div class="music-right-list">
                    <button @click="drawer = !drawer"> 
                        <i class="el-icon-s-unfold"></i>
                    </button>
                    <el-drawer
                    title="我是标题"
                    v-model="drawer"
                    :append-to-body='true'
                    :with-header="false">
                        <p class="linstnum">共{{musicList.length}}首</p>
                        <el-scrollbar v-if="musicList.length" height="100%">
                            <ul>
                                <li 
                                v-for="itme in musicList" 
                                :key='itme.id' 
                                @dblclick="choiceMusic(itme)" 
                                :id="(itme.index-1) === musicIndex ? 'coloritme' : ''"
                                :class="(Number(itme.index)% 2 ) && 'backcolor'">
                                    <span style="flex:.2">{{itme.index}}</span>
                                    <span style="flex:1">{{
                                        itme.name.length > 6 ? itme.name.substr(0,6)+'...':itme.name
                                        }}</span>
                                    <span style="flex:1">{{itme.song ? itme.song.artists[0].name : itme.ar[0].name}}</span>
                                </li>
                            </ul>
                        </el-scrollbar>
                        <el-empty v-else description="暂无数据"></el-empty>
                    </el-drawer>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
import {ReqsongUrl} from '@/api'

export default {
    name:'MusicControl',
    data(){
        return{
            musictitle:'', //音乐标题
            timeProgress:0, //音乐进度条的进度值0-100
            volumenum:40, //音量0-100
            bofevolumenum:0, //静音之前的音量值
            currentTime:'00:00', //音乐当前播放时间
            allTheTime:'00:00', //音乐总时间
            volumeBol:true, //是否静音
            playBol:false, //是否播放音乐
            musicLoadBol:false, //音乐是否正在加载
            drawer:false, //列表躺创是否展开
        }
    },
    methods:{
        async initsongUrl(id){
            //请求音乐
            this.$store.commit('musicLoadBolState',true)
            const redult = await ReqsongUrl({id,br:320000})
            if(redult.data[0].code === 200){
                this.$store.commit('musicUrlState',redult.data[0].url)
                this.timeProgress = 0
                const tm = setInterval(() => {
                    if(this.$refs.audioRef.duration){
                        this.currentTime = this.formatTime(this.$refs.audioRef.currentTime)
                        this.allTheTime = this.formatTime(this.$refs.audioRef.duration)
                        this.sliderMax = +this.$refs.audioRef.duration
                        this.$store.commit('musicLoadBolState',false)
                        this.$refs.audioRef.volum = this.volumenum / 100
                        clearInterval(tm)
                    }
                    console.log(this.$refs.audioRef.duration)
                }, 1000/60)
                return
            }
            this.$message.error('暂无版权，进入下一曲')
            this.changemusic('next')
        },
        changevolum(bol){
            //静音
            if(bol){
                this.$refs.audioRef.volume = (this.bofevolumenum / 100) 
                this.volumenum = this.bofevolumenum
                this.volumeBol = bol
                console.log(this.volumeBol)
            }else{
                console.log('false')
                this.bofevolumenum = this.volumenum
                this.volumenum = 0
                this.$refs.audioRef.volume = 0
                this.volumeBol = bol
                console.log(this.volumeBol)
            }
        },
        changeVolume(e){
            //修改音量
            this.$refs.audioRef.volume = e / 100
            this.volumeBol = e ? true : false
        },
        changeTime(e){
            //修改音乐进度
            const num = this.$refs.audioRef.duration
            this.$refs.audioRef.currentTime = Math.floor(num * (e/100))
            this.currentTime = this.formatTime(this.$refs.audioRef.currentTime)
        },
        formatTime(time){
            //格式化时间
            const num = Math.floor(Number(time))
            if(num){
                if(num < 60) return `00:${num < 10 ? '0'+num :num}`
                let m = Math.floor(num / 60)
                let s = Math.floor(num % 60)
                return `
                    ${m < 10 ? '0' + m : m}:${ s < 10 ? '0' + s : s }
                `
            }else{
                return '00:00'
            }
        },
        changeState(bol){
            if(this.musicLoadBol) return
            if(this.musicUrl.length){
                this.playBol = bol
                this.$store.commit('musicBolState',bol)
            }
        },
        reftimeupdate(ev){
            //音乐播放中修改进度条
            const num = Math.floor((ev.target.currentTime / ev.target.duration) * 10000) / 100
            this.timeProgress = num
            this.currentTime = this.formatTime(ev.target.currentTime)
            this.$store.commit('currentTimeState',ev.target.currentTime)
        },
        changemusic(state){
            //控制上下一曲
            const num = +this.$store.state.musicIndex
            const list = this.$store.state.musicList
            this.$store.commit('musicBolState',false)
            if(state === 'pre'){
                if(num <= 0){
                    this.$message.warning('已经是第一了前面没有歌了哦')
                    return
                }
                this.$store.commit('musicIdState', list[num - 1].id)
                this.$store.commit('musicImgState', list[num - 1].picUrl)
                this.$store.commit('musicIndexState', num - 1)
            }else if(state === 'next'){
                if(num >= list.length-1){
                    this.$message.warning('已经是最后一首了没有歌了哦')
                    return
                }
                this.$store.commit('musicIdState', list[num+1 ].id)
                this.$store.commit('musicImgState', list[num+1].picUrl)
                this.$store.commit('musicIndexState', num+1)
            }
        },
        choiceMusic(val) {
            //在列表中播放
            this.$store.commit('musicIdState', val.id)
            this.$store.commit('musicImgState', val.picUrl)
            this.$store.commit('musicIndexState', val.index - 1)
            this.$store.commit('musicBolState',true)
        },
        cardbol(){
            //控制卡片的出现
            this.$store.commit('cardDislayBolState',!this.$store.state.cardDislayBol)
        }
    },
    watch:{
        '$store.state.musicBol'(bol){
            //监听播放状态
            if(bol){
                this.playBol = bol
                this.$refs.audioRef.play()
            }else{
                this.playBol = bol
                this.$refs.audioRef.pause()
            }
        },
        '$store.state.musicId'(id){
            //监听音乐ID
            this.initsongUrl(id)
        },
        '$store.state.musicLoadBol'(bol){
            //音乐是否加载中
            this.musicLoadBol = bol
            if(bol){
                this.$store.commit('musicBolState',false)
            }else{
                this.$store.commit('musicBolState',true)
            }
        },
        '$store.state.musicIndex'(num){
            //当前音乐下标
            if(num < 0) return
            this.musictitle = this.$store.state.musicList[num].name
        }
    },
    computed:{
        musicList(){
            //音乐列表
            return this.$store.state.musicList
        },
        musicImg(){
            //音乐封面url
            return this.$store.state.musicImg
        },
        musicUrl(){
            //音乐url
            return this.$store.state.musicUrl
        },
        musicIndex(){
            //音乐下标
            return this.$store.state.musicIndex
        }
    }
};
</script>

<style>
.music{
    position: relative;
    bottom: 0;
    width: 100%;
    height: 70px;
}
.music .music-control{
    z-index: 10000 !important;
    position: relative;
    display: flex;
    z-index: 550;
    align-items: center;
    justify-content: space-between;
    bottom: 0;
    height: 70px;
    box-shadow: rgba(0,0,0,.5) 0 0 3px;
    background-color: #fff;
}
.music .music-control .music-control-title{
    padding-left: 15px;
    display: flex;
    align-items: center;
    width: 200px;
}
.music .music-control .music-control-title img{
    cursor: pointer;
    margin-right:10px;
    width: 45px;
    border-radius: 5px;
}
.music .music-control .music-control-body{
    width: 550px;
    text-align: center;
}
.music .music-control .music-control-body .music-control-but{
    display: flex;
    justify-content: center;
    align-items: center;
}
.music .music-control .music-control-body .music-control-but button{
    display: flex;
    justify-content: center;
    cursor: pointer;
    margin: 0 10px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background-color: transparent;
    font-size:25px ;
}
.music .music-control .music-control-body .music-control-slider{
    width: 100%;
    height: 20px;
    display: flex;
    align-items: center;
    justify-items: center;
}
.music .music-control .music-control-body .music-control-slider .el-slider{
    flex: 1;
}
.music .music-control .music-control-body .music-control-slider .el-slider .el-slider__button{
    width: 15px;
    height: 15px;
    border: solid 2px #c62f2f;
}
.music .music-control .music-control-body .music-control-slider .el-slider__bar{
    background-color: #c62f2f;
}
.music .music-control .music-control-body .music-control-slider span{
    padding: 0 15px;
}
.music .music-control .music-control-right{
    display: flex;
    align-items: center;
    padding: 0 30px;
    width: 150px;
}
.music .music-control .music-control-right .music-right-slider{
    width: 100%;
    height: 20px;
    display: flex;
    align-items: center;
    justify-items: center;
}
.music .music-control .music-control-right .music-right-slider .el-slider{
    flex: 1;
}
.music .music-control .music-control-right .music-right-slider .el-slider .el-slider__button{
    width: 10px;
    height: 10px;
    border: solid 2px #c62f2f;
}
.music .music-control .music-control-right .music-right-slider .el-slider__bar{
    background-color: #c62f2f;
}


.music .music-control .music-control-right .music-right-slider .volumbol{
    cursor: pointer;
    padding: 10px;
}
.music .music-control .music-control-right .music-right-list button{
    cursor: pointer;
    background: transparent;
    outline: 0;
    border: none;
    font-size: 25px;
    color: #2c3e50;
}

.el-overlay .el-drawer{
    width: 300px !important;
    padding: 10px 10px 70px 10px;
    color: #516170;
}
.el-overlay .el-drawer .el-drawer__body .linstnum{ 
    z-index: 50;
    position: absolute;
    background: #fff;
    width: 100%;
    line-height: 30px;
}
.el-overlay .el-drawer .el-drawer__body ul li{
    cursor: pointer;
    display: flex;
    line-height: 30px;
    font-size: 12px;
}
.el-overlay .el-drawer .el-drawer__body ul #coloritme{
    color: #c62f2f;
}
.el-overlay .el-drawer .el-drawer__body ul .backcolor{
    background-color: #f5f5f7;
}
.el-overlay .el-drawer .el-drawer__body{
    height: 100%;
}
.el-overlay .el-drawer .el-drawer__body .el-scrollbar{
    padding-top: 30px
}
</style>