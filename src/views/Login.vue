<template>
  <div class="packsSCreen">
    <Header></Header>
    <Login></Login>
  </div>
</template>

<script>

import Login from "../components/Login.vue"
export default {
  name: "PacksScreen",
  components: {
    Login
  },
};
</script>
<style>
Header: {
  width: 100%;
}
</style>