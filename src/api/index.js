import ajax from './ajax'

const BEFORE = '/api'

export const Reqsong = (data)=> ajax(`${BEFORE}/artist/top/song`,data,'get')
export const Reqbanner = (data)=> ajax(`${BEFORE}/banner`,data,'get')//轮播图
export const Reqpersonalized = (data)=> ajax(`${BEFORE}/personalized`,data,'get')//推荐歌单
export const Reqpernewsong = (data)=> ajax(`${BEFORE}/personalized/newsong`,data,'get')//推荐新音乐
export const ReqplaylistDetail = (data)=> ajax(`${BEFORE}/playlist/detail`,data,'get')//歌单详情动态
export const ReqsongUrl = (data)=> ajax(`${BEFORE}/song/url`,data,'get')//id获取音乐
export const ReqLyric = (data)=> ajax(`${BEFORE}/lyric`,data,'get')//获取歌词
export const ReqCommentMusic = (data)=> ajax(`${BEFORE}/comment/music`,data,'get')//获取歌曲评论
export const ReqCommentPlaylist = (data)=> ajax(`${BEFORE}/comment/playlist`,data,'get')//获取歌单评论
export const ReqCatlist = (data)=> ajax(`${BEFORE}/playlist/catlist`,data,'get')//获取歌单分类
export const ReqPlaylist = (data)=> ajax(`${BEFORE}/top/playlist`,data,'get')//获取歌单
export const ReqToplist = (data)=> ajax(`${BEFORE}/toplist`,data,'get')//获取排行榜
export const ReqArtist = (data)=> ajax(`${BEFORE}/artist/list`,data,'get')//分类获取歌手
export const ReqArtistDetail = (data)=> ajax(`${BEFORE}/artist/detail`,data,'get')//获取歌手详情
export const ReqArtistSongs = (data)=> ajax(`${BEFORE}/artist/songs`,data,'get')//获取歌手全部歌曲
export const ReqVideoList = (data)=> ajax(`${BEFORE}/video/timeline/all`,data,'get')//推荐视频


