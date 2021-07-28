<template>
    <div class="video">

    </div>
</template>

<script>
import {ReqVideoList} from '@/api'

export default {
    name:'Video',
    methods:{
        async initvideolist(){
            console.log('4561')
            const result = await ReqVideoList()
            console.log(result)
        }
    },
    created(){
        this.initvideolist()
    }
}
</script>

<style>

</style>