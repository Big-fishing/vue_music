import { createStore } from 'vuex'

export default createStore({
	state: {
		//封面
		musicImg:'',
		//音乐Id
		musicId:'',
		//音乐Url
		musicUrl:'',
		//音乐播放状态
		musicBol:false,
		//音乐列表
		musicList:[],
		//目前音乐索引
		musicIndex:-1,
		//音乐发片是否展示
		musicCardBol:false,
		// 音乐是否在加载中
		musicLoadBol:true,
		//音乐卡片是否出现，true是不显示
		cardDislayBol:true,
		//当前播放时间
		currentTime:''
	},
	mutations: {
		musicImgState(state,value){
			state.musicImg = value
		},
		musicUrlState(state,value){
			state.musicUrl = value
		},
		musicBolState(state,value){
			state.musicBol = value
		},
		musicListState(state,value){
			state.musicList = value
		},
		musicIndexState(state,value){
			state.musicIndex = value
		},
		musicCardBolState(state,value){
			state.musicCardBol = value
		},
		musicLoadBolState(state,value){
			state.musicLoadBol = value
		},
		musicIdState(state,value){
			state.musicId = value
		},
		cardDislayBolState(state,value){
			state.cardDislayBol = value
		},
		currentTimeState(state,value){
			state.currentTime = value
		}
	}
})
