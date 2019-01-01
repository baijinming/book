<template>
  <ul class="bg-bubbles">
    <li v-for="i in 10" :key="i"></li>
  </ul>
</template>

<script>
    export default {

    }
</script>

<style scoped lang="scss">
  .bg-bubbles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: skyblue;

    li {
      position: absolute;
      bottom: -160px;
      width: 40px;
      height: 40px;
      background-color: rgba(255, 255, 255, 0.15);
      border-radius: 50%;
      list-style: none;
      animation: square 15s infinite;
      transition-timing-function: ease;
      &:nth-child(1) {
         left: 50%;
      }
      &:nth-child(2) {
         left: 20%;
         animation-delay: 2s;
         animation-duration: 7s;
       }
      &:nth-child(3) {
         left: 65%;
         animation-delay: 4s;
        animation-duration: 10s;
       }
      &:nth-child(4) {
         left: 40%;
         animation-duration: 8s;
         background-color: rgba(255, 255, 255, 0.3);
       }
      &:nth-child(5) {
         left: 70%;
       }
      &:nth-child(6) {
         left: 80%;
         animation-delay: 3s;
         background-color: rgba(255, 255, 255, 0.2);
       }
      &:nth-child(7) {
         left: 32%;
         animation-delay: 8s;
       }
      &:nth-child(8) {
         left: 55%;
         animation-delay: 1s;
         animation-duration: 5s;
       }
      &:nth-child(9) {
         left: 25%;
         animation-delay: 2s;
         animation-duration: 12s;
         background-color: rgba(255, 255, 255, 0.3);
       }
      &:nth-child(10) {
         left: 85%;
         animation-delay: 5s;
       }
    }
    @keyframes square {
      0% {
        width: 40px;
        height: 40px;
        opacity: 0.4;
        transform: translateY(0px) rotate(45deg);
      }
      25% {
        width: 80px;
        height: 80px;
        opacity: 0.6;
        transform: translateY(-400px) rotate(90deg)
      }
      50% {
        width: 120px;
        height: 120px;
        opacity: 0.8;
        transform: translateY(-600px) rotate(135deg);
      }
      100% {
        width: 160px;
        height: 160px;
        opacity: 1;
        transform: translateY(-1000px) rotate(180deg);
      }
    }
  }

</style>
