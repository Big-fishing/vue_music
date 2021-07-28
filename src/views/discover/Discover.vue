<template>
    <div class="diaxover-nav">
        <router-link v-for="itme in navlist" :key='itme.name' :to='itme.path'>
            {{itme.name}}
        </router-link>
    </div>
    <div class="diaxover-content">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name:'Discover',
    data(){
        return{
            navlist:[
                {name:'个性推荐',path:'/discover/perRecommend'},
                {name:'歌单',path:'/discover/songSheet'},
                {name:'排行榜',path:'/discover/Ranking'},
                {name:'歌手',path:'/discover/singer'},
            ]
        }
    }
}
</script>

<style>
.diaxover-nav{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom:25px ;
    border-bottom: 1px solid #ececec;
}

.diaxover-nav a{
    margin: 0 25px;
    line-height: 40px;
    font-size: 16px;
}
.diaxover-nav a.router-link-active{
    color: rgb(198,47,47);
    border-bottom:3px solid rgb(198,47,47);
}
.diaxover-content{
    width: 80%;
    margin: 0 auto;
}
</style>