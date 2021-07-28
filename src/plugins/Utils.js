/*
*   该文件的作用是存放一些常用的方法
* */


export const setnewtime = (date)=>{    // 获取日期
    date = date || new Date()
    const n = date.getUTCFullYear()//年
    const y = (date.getMonth()+1 < 10 ? `0${date.getMonth()+1}`: date.getMonth()+1) //月
    const r = date.getDate() < 10 ? `0${date.getDate()}`: date.getDate() //日
    return `${n}-${y}-${r}`
}