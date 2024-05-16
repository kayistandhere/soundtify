<template>
    <div class="d-flex">
            <div  style="width: 12rem;" :key="artist"
                v-for="artist in limitData">
                <div class="card bg-transparent custom-bg-card m-2 border-0 " v-if="isCard" >
                <img :src="artist.thumbnail" class="custom-img-thumbnail p-2" alt="...">
                <div class="p-2">
                    <h5 class="card-title fs-6 fw-bolder text-white text-start">{{ artist.name }}</h5>
                    <p class="text-white fs-8">Nghệ sĩ</p>
                </div>
                <div class="custom-btn-position custom-cursor" @click="redirectArtistDetail(artist.id)">
                    <div class="custom-btn-play">
                        <!-- <i class="bi bi-play-fill fs-2 text-dark ms-1"></i> -->
                        <span class="material-symbols-rounded fs-2 text-dark text-white">
account_circle
</span>
                    </div>
                </div>
                <span class="material-symbols-rounded position-absolute end-0 text-secondary custom-cursor"
                    @click="removeCard">close</span>
            </div>
        </div>
    </div>
</template>
<script>
import { getAllArtist } from '@/firebase/fireStore/fireQuery';
import { mapActions } from 'pinia';
import { useIndexStore } from '@/store';
export default {

    data() {
        return {
            dataArtist: [],
            limitData: [],
            albums: "",
            isCard: true,
        }
    },
    created() {
        this.limitDataArtist();
    },
    methods: {
        ...mapActions(useIndexStore, ["artistDetailId"]),
        async limitDataArtist() {
            await getAllArtist().then((res) => {
                this.dataArtist = res
            })
            this.limitData = this.dataArtist.slice(0, 6);
        },
        async redirectArtistDetail(id) {
            const idArtist = {
                "id": id
            }
            this.$router.push({ path: `artistAllbums/`, query: idArtist })
        },
        removeCard() {
            this.isCard = false;
        }
    }
}
</script>
<style scoped>
.custom-img-thumbnail {
    width: 100%;
    height: 180px;
    border-radius: 50%;
    object-fit: cover;
}

.custom-btn-play {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #17cf5b;
}

.custom-btn-position {
    position: absolute;
    left: 70%;
    top: 50%;
    display: none;
    transform: translate(-50% -50%);
    background-color: none !important;

}

.custom-bg-card:hover {
    background-color: #2b2b2b;
}

.custom-bg-card:hover .custom-btn-position {
    display: block;
}
</style>