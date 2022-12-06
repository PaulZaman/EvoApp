<template>
    <div class="mainContent" id="container">
        <h1>{{title}}</h1>
        <router-link to="/home"><img id="image" src="../assets/image-evo-logo.png" /></router-link>
    </div>
</template>

<script>
export default {
    name: 'headerComp',
    props: {
        title: String,
    },
    mounted() {
        if (this.title == "WHO ARE WE ?") {
            let container = document.querySelector('#container');
            container.classList.add("larger-header");

        }
    }


}
</script>

<style scoped>
* {
    transition: all 0.3s;
}

.mainContent {
    background-color: #3C5261;
    top: 0;
    height: 100px;
    margin-top: 0px;
}

#image {
    position: absolute;
    right: 10px;
    top: 10px;
    height: 80px;
}

h1 {
    padding: 0px;
    padding-top: 42px;
    margin: 0px;
    font-size: 60px;
    color: white;
}

@media screen and (max-width: 670px) {
    .larger-header {
        height: 180px;
    }

    h1 {
        width: 70%;
        text-align: center;
        margin: auto;
    }
}

@media screen and (max-width: 449px) {
    .larger-header {
        height: 265px;
    }

    h1 {
        width: 70%;
        text-align: center;
        margin: auto;
    }
}
</style>