<template>
<body>
  <div id="container"> 
    <div id = "inputUser">
    <input type="text" class="hide username" name="username" id="username" placeholder="Enter your name" autocomplete="off">
    </div>
  </div>
  
</body>
</template>

<script>


import "../scenes/init";
export default {
  name: "SnakeGame",
};
</script>

<style scoped>
::placeholder {
  color: #d2e603;
}
.container {
  position: relative;
}
.username {
  position: relative;
  visibility: visible;

  right: 220px;
  top: 180px;
  text-align: center;
  background-color: #81b214;
  color: #d2e603;
  border: 5px solid greenyellow;
  border-radius: 30px;
  height: 80px;
  width: 300px;
  font-size: 30px;
  font-weight: bolder;
  outline: none;
}

.hide {
  display: none;
  visibility: hidden;
}

</style>
