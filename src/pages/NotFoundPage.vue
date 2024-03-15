<script>
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";

export default {
    components: {
        AppHeader,
        AppFooter,
    },
    data() {
        return {
            activeSection: 'mainSection'
        };
    },
    methods: {
        showSection(section) {
            this.activeSection = section;
        }
    }
};
</script>

<template>
    <AppHeader />

    <div class="position-relative">
        <div class="container text-center mt-5">
            <img src="../assets/images/404/404-img.png" alt="">
        </div>
        <div class="ms_wave"></div>
    </div>

    <AppFooter />
</template>

<style lang="scss" scoped>
.ms_wave {

    &::after {
        width: 100%;
        background-image: url(../assets/images/main/onda_white.png);
        content: '';
        height: 6rem;
        position: absolute;
        display: block;
        z-index: 9;
        bottom: -70px;
        left: 0;
        background-size: cover;
        background-repeat: no-repeat;
        transform: rotateX(180deg);
    }
}
</style>
