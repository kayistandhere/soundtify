<template>
    <div class="d-block">
        <table class="table text-white">
  <thead>
    <tr class="fs-9 text-start">
      <th scope="col" class="custom-table-title col-1">#</th>
      <th scope="col" class="custom-table-title col-4">Title</th>
      <th scope="col" class="custom-table-title col-3">Albums</th>
      <th scope="col" class="custom-table-title col-2">Date added</th>
      <th scope="col" class="custom-table-title col-1"><span class="material-symbols-rounded fs-8">schedule</span></th>
    </tr>
  </thead>
  <tbody>
    <tr class="fs-9">
      <th scope="row">1</th>
      <td>
        <div class="custom_card d-flex align-items-center">
          <img class="custom_Img" src="../../assets/Images/Artists/WrenEvan.jpg" alt="" srcset="" width="30" height="30">
          <div class="">
              <span class=" fs-8">Sơn Tùng MTP</span>
              <span class=" fs-9">Artists</span> 
          </div>
        </div>
      </td>
      <td>Dance Dance Dance</td>
      <td>Jul 18, 2023</td>
      <td>3:32</td>
    </tr>
    <tr class="fs-9">
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
.custom-table-title{
  font-weight: 500;
}
.custom_card {
    display: flex;
    border-radius: 5px;
    width : 100%;
    background-color: blue;
}
  .custom_Img {
    border-radius: 5px;
    object-fit: contain;
    margin-right: 5px;
  }
</style>