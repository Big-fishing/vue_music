<template>
    <el-header>
        <div class="logo"></div>
        <div class="control">
            <button @click="onControl(-1)"><i class="el-icon-arrow-left"></i></button>
            <button @click="onControl(1)"><i class="el-icon-arrow-right"></i></button>
        </div>
        <div class="search">
            <input v-model="searchText" type="text" placeholder="搜索音乐，视频，歌词，电台">
            <i class="el-icon-search"></i>
        </div>
        <div class="login">
            <div v-if="loginbol" class="user"></div>
            <div v-else class="loginfalse">
                <span>请登录</span>
                <i class="el-icon-s-custom"></i>
            </div>
        </div>
    </el-header>
</template>

<script>
export default {
    name:"Header",
    data(){
        return{
            searchText:'',
            loginbol:false
        }
    },
    methods:{
        onControl(num){
            this.$router.go(num)
        }
    }
}
</script>

<style>
.el-header{
    height: 60px;
    background: rgb(198,47,47);
    display: flex;
    align-items: center;
}
.el-header .logo{
    width: 170px;
    height: 40px;
    background: url('/imgs/logo.png');
    background-position-y: -16px;
    overflow: hidden;
}
.el-header .search{
    display: flex;
    overflow: hidden;
    margin-left: 30px;
    width: 180px;
    height: 30px;
    background-color: rgb(168,40,40);
    border-radius: 15px;
}
.el-header .search input[type=text]{
    border: 0;
    outline: 0;
    padding-left:10px;
    width: 80%;
    line-height: 30px;
    background: transparent;
    color:#fff;
}
.el-header .search input[type=text]::-webkit-input-placeholder{
    color:#c96363;
}
.el-header .search i.el-icon-search{
    flex: 1;
    color:#eb8282;
    cursor: pointer;
    display: flex;
    align-items: center;
}
.el-header .search i.el-icon-search:hover{
    color:#fff;
}
.el-header .login{
    cursor: pointer;
    color:#fff;
    margin-left:auto;
}
.el-header .control{
    margin-left:30px
}
.el-header .control button{
    cursor: pointer;
    border-radius: 50%;
    margin:  0 5px;
    color:#fff;
    background-color: rgb(198,47,47);
    border:1px solid rgb(153 0 0);
    width: 30px;
    height: 30px;
}
</style>