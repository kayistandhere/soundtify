<template>
    <div class="card-group text-white">

        <div class="card border-0 m-2" style="width: 40em">
            <img src="../../assets/Images/Background/prenium.jpg" class="card-img-top custom-img-card" height="200"
                alt="..." />
            <div class="card-body bg-module">
                <h5 class="card-title">NORMAL SOUNDTIFY</h5>
                <ul class="">
                    <li class="d-flex align-items-center">
                        <span class="material-symbols-rounded txt-green me-3">done</span><span>1 account free</span>
                    </li>
                    <li class="d-flex align-items-center">
                        <span class="material-symbols-rounded txt-green me-3">done</span><span>Just listen music
                            online</span>
                    </li>
                    <li class="d-flex align-items-center">
                        <span class="material-symbols-rounded txt-green me-3">done</span><span>Listen music with
                            Ads</span>
                    </li>
                    <li class="d-flex align-items-center">
                        <span class="material-symbols-rounded txt-green me-3">done</span><span>Sound quality
                            basic</span>
                    </li>
                </ul>
                <h5 class="card-text">$3 / Month</h5>
                <button-md-radius class="d-block ms-auto text-dark" :customContent="select"></button-md-radius>
                <p class="card-text">
                    <small class="text-muted">Last updated 3 mins ago</small>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import buttonMdRadius from "../button/button_md_radius.vue";
export default {
    data() {
        return {
            select: "Select",
        };
    },
    components: {
        buttonMdRadius,
    },
};
</script>

<style scoped>
.custom-img-card {
    object-fit: cover;
}
</style>
