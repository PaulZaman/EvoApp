<template>
    <div class="mainContent">
        <ul>
            <li>JOIN OUR COMMUNITY | CONNECT WITH US</li>
            <li>@evomontreal | #evoMTL</li>
        </ul>
        <ul id="socials">
            <li><a href="https://www.facebook.com/evomontreal"><img src="../assets/facebook.png" /></a></li>
            <li><a href="https://twitter.com/evomontreal"><img src="../assets/twitter.png" /></a></li>
            <li><a href="https://www.instagram.com/evomontreal/"><img src="../assets/insta.png" /></a></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "footerPart",
    no_content: false,
}
</script>

<style lang="scss" scoped>
.mainContent {
    margin-top: 50px;
    padding: 2px;
    background-color: #3C5261;
}

ul {
    list-style-type: none;
    color: white;
}

#socials {
    display: flex;
    list-style-type: none;
    justify-content: center;
}

img {
    height: 70px;
    width: 77px;
}
</style>