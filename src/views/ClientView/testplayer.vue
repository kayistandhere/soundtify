<template>
    <div class="bg-module">
      <button type="button" @click="player">Play audio</button>
      <button type="button" @click="pause">Pause audio</button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            player: inject('player'),
        }
    },
    methods:{
        player(){
            mixin.play();
        },
        pause(){
            mixin.pause();
        }
    }
}
</script>

<style>

</style>