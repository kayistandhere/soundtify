<template>
    <div class="d-flex">
        <div class="custom-card-albums m-2 bg-module-1 ">
                <img src="../../assets/Images/Artists/SonTung.jpg" class="custom-img-albums" alt="..." />
      
                <div class="custom-title-albums">
                    <span>Pop</span>
                </div>
        </div>
        <div class="custom-card-albums m-2 bg-module-1 ">
                <img src="../../assets/Images/Artists/WrenEvan.jpg" class="custom-img-albums" alt="..." />
                <div class="custom-title-albums">
                    <span>Jazz</span>
                </div>
        </div>
        <div class="custom-card-albums m-2 bg-module-1 ">
                <img src="../../assets/Images/Artists/PhucDu.jpg" class="custom-img-albums" alt="..." />
                <div class="custom-title-albums">
                    <span>Jazz</span>
                </div>
        </div>
        <div class="custom-card-albums m-2 bg-module-1 ">
                <img src="../../assets/Images/Artists/Tlinh.jpg" class="custom-img-albums" alt="..." />
                <div class="custom-title-albums">
                    <span>Jazz</span>
                </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'cardAlbum',
    data(){
        return {
            
        }
    },
    setup(){

    },
    methods:{
    },
    onMounted(){
        // const colors = ['#17cf5b', '#fcba03', '#4123v1'];
        // const random_color = colors[Math.floor(Math.random() * colors.length)];
        // document.getElementsByClassName('.custom-card-albums').style.color = random_color;
    }
};
</script>
<style scoped>
.custom-card-albums {
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 14px;
    overflow: hidden;
}
.custom-title-albums {
    position: absolute;
    color: #fff;
    left: 10%;
    top : 10%;
    width: 10rem;
    font-size: 25px;
    font-weight: 700;
    z-index: 999;
}

.custom-img-albums{
    position: absolute;
    left: 30%;
    top:30%;
    transform: rotate(30deg);
    box-shadow: 1px 2px 5px black;
    width: 70%;
    height: 70%;
    object-fit: cover;
}
</style>
