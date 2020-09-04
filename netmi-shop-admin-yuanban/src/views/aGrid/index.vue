<template>
  <div class="content">
      <div class="box">
        <div class="item">
            <img src="@/assets/timg.jpg" alt="">
        </div>
        <div class="item">
            <img src="@/assets/timg.jpg" alt="">
        </div>
        <div class="item">
            <img src="@/assets/timg.jpg" alt="">
        </div>
        <div class="item">
            <img src="@/assets/timg.jpg" alt="">
        </div>
        <div class="item">
            <img src="@/assets/timg.jpg" alt="">
        </div>
        <div class="item">
            <img src="@/assets/timg.jpg" alt="">
        </div>
        <div class="item">
            <img src="@/assets/timg.jpg" alt="">
        </div>
        <div class="item">
            <img src="@/assets/timg.jpg" alt="">
        </div>
        <div class="item">
            <img src="@/assets/timg.jpg" alt="">
        </div>
        <div class="item">
            <img src="@/assets/timg.jpg" alt="">
        </div>
      </div>
 
  </div>
</template>

<script>


export default {
  name: 'aGrid',
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.content {
    width: 100%;
    position: relative;
}
.box {
    width: 1200px;
    margin: 20vh auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
.item {
    width: 230px;
    height: 230px;
    background-color: #eee;
    margin-bottom: 12px;
    overflow: hidden;
    transform: rotate(0deg);
    transition: transform 0.5s;
    /* border: 5px solid #fff; */
}
.item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1);
    transition: transform 0.3s;
}
.item:hover {
    /* transform: scale(1.1);
    transition: transform 0.5s;
    z-index: 1; */
    /* box-shadow: 0 0 10px 0 #ccc; */
}
.item img:hover {
    transform: scale(1.2);
    transition: transform 0.3s;
} 
</style>

