<template>
  <MenuSliderComponent />
  <router-view />
  <FooterComp class="footer"/>
</template>

<script>
import MenuSliderComponent from "./components/MenuSliderComponent.vue";
import FooterComp from "./components/footerComp.vue";

export default {
  components: { MenuSliderComponent, FooterComp }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
