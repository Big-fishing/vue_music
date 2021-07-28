<template>
    <div v-if="commentbol" class="comment-content" :class="{'colorFff':$props.type === 'music'}">
        <ul class="conment-certer">
            <li v-for="itme in comment" :key='itme.commentId'>
                <el-image :src="itme.user.avatarUrl"></el-image>
                <div class="comment-text">
                    <p>
                        <span>{{itme.user.nickname}}：</span>
                        {{itme.content}}
                    </p>
                    <div class="comment-information">
                        <span>{{formatime(new Date(itme.time))}}</span>
                        <span class="commentzan">
                            <i class="iconfont icon-zan"></i>
                            ({{itme.likedCount}})
                        </span>
                        <span>分享</span>
                        <span>回复</span>
                    </div>
                </div>
            </li>
        </ul>
        <el-pagination
        :current-page='page'
        :page-size="20"
        layout="prev, pager, next"
        :total="total"
        @current-change='changepage'>
        </el-pagination>
    </div>
    <div v-else class="comment-load" :class="{'colorFff':$props.type === 'music'}">
        加载中...
    </div>
</template>

<script>
import {ReqCommentMusic,ReqCommentPlaylist} from '@/api'

export default {
    name:'Comments',
    data(){
        return{
            page:0,
            comment:[],
            commentbol:false,
            total:0
        }
    },
    props:{
        type:String,
        id:Number,
    },
    methods:{
        async initComment(id,page = 0){
            this.commentbol = false
            if(this.$props.type === 'music'){
                const {code,comments,total} = await ReqCommentMusic({id,limit:20,offset:page*20})
                if(code !== 200) return this.$message.error('评论请求失败，稍后再试')
                this.comment = comments
                this.total = total
                this.commentbol = true
            }else if(this.$props.type === 'songSheet'){
                const {code,comments,total} = await ReqCommentPlaylist({id,limit:20,offset:page*20})
                if(code !== 200) return this.$message.error('评论请求失败，稍后再试')
                this.comment = comments
                this.total = total
                this.commentbol = true
            }
        },
        formatime(date){    // 获取日期
            const y = (date.getMonth()+1 < 10 ? `0${date.getMonth()+1}`: date.getMonth()+1) //月
            const r = date.getDate() < 10 ? `0${date.getDate()}`: date.getDate() //日
            const h = date.getHours() < 10 ? `0${date.getHours()}`: date.getHours() //时
            const m = date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes() //分
            return `${y}月${r}日 ${h}:${m}`
        },
        changepage(e){
            this.page = e
            this.initComment(this.$props.id,e-1)
        }
    },
    watch:{
        '$props.id'(id){
            this.initComment(id)
            this.page = 0
        }
    },
    created(){
        this.initComment(this.$props.id)
    }
}
</script>

<style>
.comment-load{
    margin-top: 220px;
    text-align: center;
    font-size: 25px;
}
.colorFff{
    color: #fff;
}
.comment-content {
    padding: 0 20px 20px 20px;
}
.comment-content .conment-certer li{
    display: flex;
    align-items: flex-start;
    margin-top:25px;
    line-height: 20px;
    text-align: left;
}
.colorFff .conment-certer li{
    color: #fff;
}
.comment-content .conment-certer li .el-image{
    width: 50px;
    margin-right:15px;
    border-radius: 50%;
    overflow: hidden;
}
.comment-content .conment-certer li .comment-text{
    flex: 1;
}
.comment-content .conment-certer li .comment-text p{
    margin-bottom: 8px;
}
.comment-content .conment-certer li .comment-text p span{
    color: #53acfa;
}
.comment-content .conment-certer li .comment-information{
    display: flex;
}
.colorFff .conment-certer li .comment-information{
    color: #bcbcbc;
}
.comment-content .conment-certer li .comment-information span{
    padding: 0 5px;
}
.comment-content .conment-certer li .comment-information .commentzan{
    margin-left: auto;
}
.comment-content .el-pagination{
    padding: 30px 0 90px 0;
}
.colorFff .el-pagination button{ 
    color: #fff;
    background: transparent;
}
.colorFff .el-pagination ul li{ 
    color: #fff;
    background: transparent;
}
.colorFff .el-pagination ul li.active{
    color: #409EFF;
}
</style>