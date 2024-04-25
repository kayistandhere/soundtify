<template>
  <div class="d-block">
    <table class="table table-borderless text-white">
      <thead>
        <tr class="fs-9 text-start">
          <th scope="col" class="custom-table-title col-1">#</th>
          <th scope="col" class="custom-table-title col-4">Title</th>
          <th scope="col" class="custom-table-title col-3">Albums</th>
          <th scope="col" class="custom-table-title col-2">Date added</th>
          <th scope="col" class="custom-table-title col-1"><span class="material-symbols-rounded fs-8">schedule</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="fs-9 text-white table-items-hover">
          <th scope="row">1</th>
          <td>
            <div class="custom_card d-flex align-items-center">
              <img class="custom_Img" src="../../assets/Images/Artists/SonTung.jpg" alt="" srcset="" width="30"
                height="30">
              <div class="">
                <span class="fs-8">Em của ngày hôm qua</span>
                <div class="d-flex align-items-center">
                  <span class=" fs-9">Sơn Tùng MTP</span>
                </div>

              </div>
            </div>
          </td>
          <td>Dance Dance Dance</td>
          <td>Jul 18, 2023</td>
          <td>3:32</td>
        </tr>
        <tr class="fs-9 text-white table-items-hover">
          <th scope="row">1</th>
          <td>
            <div class="custom_card d-flex align-items-center">
              <img class="custom_Img" src="../../assets/Images/Artists/SonTung.jpg" alt="" srcset="" width="30"
                height="30">
              <div class="">
                <span class="fs-8">Em của ngày hôm qua</span>
                <div class="d-flex align-items-center">
                  <span class=" fs-9">Sơn Tùng MTP</span>
                </div>

              </div>
            </div>
          </td>
          <td>Dance Dance Dance</td>
          <td>Jul 18, 2023</td>
          <td>3:32</td>
        </tr>
        <tr class="fs-9 text-white table-items-hover">
          <th scope="row">1</th>
          <td>
            <div class="custom_card d-flex align-items-center">
              <img class="custom_Img" src="../../assets/Images/Artists/SonTung.jpg" alt="" srcset="" width="30"
                height="30">
              <div class="">
                <span class="fs-8">Em của ngày hôm qua</span>
                <div class="d-flex align-items-center">
                  <span class=" fs-9">Sơn Tùng MTP</span>
                </div>

              </div>
            </div>
          </td>
          <td>Dance Dance Dance</td>
          <td>Jul 18, 2023</td>
          <td>3:32</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
}
</script>
<style scoped>
.custom-table-title {
  font-weight: 500;
}

.custom_card {
  display: flex;
  border-radius: 5px;
  border: none;
  width: 100%;
}

.custom_Img {
  border-radius: 5px;
  object-fit: contain;
  margin-right: 5px;
}
.table-items-hover {
  opacity: 0.8;
}
.table-items-hover:hover {
  opacity: 1.1;
  background: #3b3b3b;
}
</style>