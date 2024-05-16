<template>
    <section class=" p-2">
        <!-- Modal -->
        <div class="col-sm-12">
            <div class="card hovercard text-center text-white bg-module">
                <div class="user-image">
                    <div class="avatar"><img alt="images profile" class="custom-img-thumb"
                            src="https://images.wallpaperscraft.com/image/single/wooden_texture_beam_119635_1920x1080.jpg">
                    </div>
                    <div class="icon-wrapper"><i class="icofont icofont-pencil-alt-5"></i></div>
                </div>
                <div class="info">
                    <div class="row">
                        <div class="col-sm-6 col-lg-4 order-sm-1 order-xl-0">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="ttl-info text-start">
                                        <h6><i class="bi bi-envelope"></i>&nbsp;&nbsp;&nbsp;Email</h6>
                                        <span>{{ this.formData.email }}</span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="ttl-info text-start">
                                        <h6><i class="bi bi-calendar"></i>&nbsp;&nbsp;&nbsp;Age</h6><span>{{ this.formData.age }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-lg-4 order-sm-0 order-xl-1 position-relative">
                            <div class="user-designation">
                                <img :src="this.formData.avatar" class="custom-img-animation" alt="">
                                <div class="title"><span class="fs-3 fw-bold">{{ this.formData.name }}</span></div>
                                <div class="desc">Profile</div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-4 order-sm-2 order-xl-2">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="ttl-info text-start">
                                        <h6><i class="bi bi-phone"></i>&nbsp;&nbsp;&nbsp;Gender</h6><span>{{ this.formData.gender }}</span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="ttl-info text-start">
                                        <h6><i class="bi bi-location-arrow"></i>&nbsp;&nbsp;&nbsp;Phone</h6><span>{{ this.formData.phone }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>

                    <div class="follow">
                        <div class="row">
                            <div class="col-6 text-md-end border-right">
                                <div class="follow-num counter">{{ this.formData.follower }}</div><span>Follower</span>
                            </div>
                            <div class="col-6 text-md-start">
                                <div class="follow-num counter">{{ this.formData.following }}</div><span>Following</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import { mapWritableState } from 'pinia';
import { useAuthStoreStore } from '@/store/authStore';
import { getUserById } from '@/firebase/fireStore/fireQuery';
export default {
    
    data() {
        return {
            formData: {},
            backText: "Back",
            saveText: "Save"
        }
    },
    created() {
        mapWritableState(useAuthStoreStore, ['user']);
        this.getUser();
    },
    methods: {
        async getUser() {
            const id = this.$route.query.id;
            this.formData = await getUserById(id);
            console.log(this.formData);
        }
    },
    computed: {

    }
}
</script>

<style scoped>
.user-designation{
    position: relative;
    top: -50%;
}
</style>