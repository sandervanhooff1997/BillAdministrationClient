<template>
  <div class="loader-overlay">
    <li class="wandering-cubes selected">
      <div v-for="i in 4" :key="`cube${i}`" class="cube" :class="[`cube${i}`]"></div>
    </li>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({});
</script>

<style scoped lang="scss">
$spacing: 30px;

.loader-overlay {
  list-style: none;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 100;
  text-align: center;
}

.wandering-cubes {
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
}

.cube {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-cubemove 2s infinite ease-in-out;
  animation: sk-cubemove 2s infinite ease-in-out;
}

.cube1 {
  background-color: #2d936c;
}

.cube2 {
  background-color: #2d936c;
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}

.cube3 {
  background-color: #2d936c;
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

.cube4 {
  background-color: #2d936c;
  -webkit-animation-delay: -1.5s;
  animation-delay: -1.5s;
}

@-webkit-keyframes sk-cubemove {
  25% {
    -webkit-transform: translateX($spacing) rotate(-90deg) scale(0.5);
  }
  50% {
    -webkit-transform: translateX($spacing) translateY($spacing) rotate(-180deg);
  }
  75% {
    -webkit-transform: translateX(0px) translateY($spacing) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -webkit-transform: rotate(-360deg);
  }
}

@keyframes sk-cubemove {
  25% {
    transform: translateX($spacing) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX($spacing) rotate(-90deg) scale(0.5);
  }
  50% {
    transform: translateX($spacing) translateY($spacing) rotate(-179deg);
    -webkit-transform: translateX($spacing) translateY($spacing) rotate(-179deg);
  }
  50.1% {
    transform: translateX($spacing) translateY($spacing) rotate(-180deg);
    -webkit-transform: translateX($spacing) translateY($spacing) rotate(-180deg);
  }
  75% {
    transform: translateX(0px) translateY($spacing) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY($spacing) rotate(-270deg)
      scale(0.5);
  }
  100% {
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
</style>

