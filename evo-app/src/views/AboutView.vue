<template>
  <HeaderComp title="WHO ARE WE ?"></HeaderComp>
  <div class="background-img"></div>
  <div class="about">
    <div class="mainContent">
      <div class="first">
        <p>We are a group of three french students studying abroad in Canada in Concordia. During our stay, we experienced a few problems in our accomodation.</p>
        <p>We are 64 students for one kitchen which is quite difficult to manage.</p>
        <p>Also knowing what activities, parties and fun things going on in the residence or in the city is quite hard as we are not locals.</p>
        <p>This website aims at answering those issues.</p>
        <p>Every one wants to have fun so enjoy our application :)</p>
      </div>
      <div class="second">
        <ul>
          <li class="map"><a href="https://www.google.com/maps/place/Evo+Montréal+Vieux-Montréal/@45.4999933,-73.5645944,17z/data=!3m1!4b1!4m5!3m4!1s0x4cc91a5c6fa40c95:0x2f339b294ae8bcea!8m2!3d45.4999933!4d-73.5624057"> <img src="../assets/plan_evo.png"/></a></li>
          <li class="location">Our location, right in Montréal's downtown</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComp from '../components/headerComp.vue'
export default {
  name: "aboutView",
  components:{
    HeaderComp
  }
  }
</script>

<style lang="scss" scoped>

.background-img {
  background-image: url(../assets/Snowy.jpeg);
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
  top: 0px;
}

.about{
  align-content: center;
  margin-top: 50px;
}

h1{
  font-size:40px;
  text-shadow:100px;
}
.first{
  background-color:#8ca7ba;
  border-radius: 15px;
  border: 5px solid white;
  height:auto;
  width:80%;
  padding-top:15px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  color:white;
  margin: auto;
  margin-bottom: 60px;
  margin-top:60px;
}

ul{
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style-type:none;
  background-color:#8ca7ba;
  border-radius: 15px;
  border: 5px solid white;
  height:auto;
  width:80%;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  color:white;
  margin: auto;
  padding: 0;
  margin:auto;
}

.map{
  width:500px;
}

.location{
  margin:50px;
  padding-left:20px;
}

img{
  height:90%;
  width:90%;
  margin: 50px;
}

p{
  padding-left: 10px;
  padding-right:10px;
}

</style>