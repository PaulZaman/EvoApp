<template>
  <div>
    <h1 id="sorry">(404) SORRY THIS PAGE DOES NOT EXIST !</h1>
    <router-link to="/home"><button><h1>GO BACK TO THE HOME PAGE</h1></button></router-link>
  </div>
</template>

<script>

export default {
  name: "errorPage",
}
</script>

<style lang="scss" scoped>
div{
  background-color: rgba(33, 145, 209, 0.92);
  height:425px;
  width:80%;
  margin: auto;
  border-radius:15px;
  #sorry{
    margin-top:60px;
    padding-top: 60px;;
    color:white;
  }
  button{
    background-color: white;
    border:5px solid #00CED1;
    border-radius:15px;
    color:#00CED1;
  }
}

</style>

