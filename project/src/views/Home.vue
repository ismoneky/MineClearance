<template>
  <div class="home">
    <button class="start" @click="topaly">点击开始游戏</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
        
    }
  },
  created(){

  },
  methods:{
    topaly(){
      this.$router.push('/about')
    }

  }
}
</script>
<style lang="scss" scoped>
.home{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  button{
    margin-bottom: 30px;
    width: 200px;
    height: 50px;
  }
}
.start{
  margin-top: 200px;
}
</style>
