<template>
	<Header />
	<el-container>
		<!-- 导航 -->
		<el-aside class="content-left">
			<h3>导航</h3>
			<ul>
				<li v-for="itme in leftlist" :key='itme.name'>
					<router-link :to='itme.path'>
						<i :class="itme.icon"></i>
						<span>{{itme.name}}</span>
					</router-link>
				</li>
			</ul>
		</el-aside>
		<!-- 内容区 -->
		<el-main>
			<router-view></router-view>
		</el-main>
	</el-container>
	<MusicCard/>
	<MusicControl/>
</template>

<script>
import Header from '@/components/Header.vue'
import MusicCard from '@/components/MusicCard.vue'
import MusicControl from '@/components/musicControl.vue'

export default {
	name: 'Index',
	data(){
		return{
			leftlist:[
				{name:'发现音乐',icon:'el-icon-service',path:'/discover'},
				{name:'视频',icon:'el-icon-video-camera',path:'/video'},
				{name:'收藏',icon:'el-icon-collection-tag',path:'/collection'},
				{name:'每日推荐',icon:'el-icon-shopping-bag-1',path:'/recommendation'}
			]
		}
	},
	components:{
		Header,
		MusicControl,
		MusicCard
	}
}
</script>

<style>
#app>.el-container{
	flex: 1;
	width: 100vw;
	overflow: hidden;
}
.el-container .content-left{
	width: 250px !important;
	height: 100%;
	background-color: rgb(245,245,247);
	text-align: left;;
	border-right: 1px solid #ececec
}
.el-container .content-left h3{
	padding-left: 15px;
	font-size: 16px;
	font-weight: 400;
	line-height: 40px;
	border-bottom: 1px solid #ececec
}
.el-container .content-left ul li a{
	color: #526579;
	font-size: 16px;
	padding: 0 40px;
	line-height: 40px;
	display: block;
}
.el-container .content-left ul li a.router-link-active{
	color:#2c3e50;
	background-color: #dbdbdb;
}
.el-container .content-left ul li i{
	margin-right: 15px;
}
.el-container .el-main{
	flex:1;
	height: 100%;
	overflow: auto;
}
</style>