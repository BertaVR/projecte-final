<!-- Load an icon library to show a hamburger menu (bars) on small screens -->
<template>

  <div class="topnav" id="myTopnav">
    <a href="/">Packs</a>
    <a href="/items">Items</a>
    <Carrito></Carrito>


  </div>

</template>
<style>
/* Add a black background color to the top navigation */
.topnav {
  background-color: rgb(36, 29, 39);
  overflow: hidden;
}

.topnav a:link {
  color: #f2f2f2
}

.topnav a:visited {
  color: #f2f2f2;

}

/* Style the links inside the navigation bar */
.topnav a {
  float: right;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: rgb(235, 209, 252);
  color: black;
}

/* Add an active class to highlight the current page */
.topnav a.active {
  background-color: #511863;
  color: rgb(255, 255, 255);
}

/* Hide the link that should open and close the topnav on small screens */
.topnav .icon {
  display: none;
}
</style>
<script>
import Carrito from './Carrito.vue';
export default {
  data: () => ({}),
  mounted() { this.activarLink() },
  computed: {},
  methods: {
    isDesktop() {
      return (document.documentElement.clientWidth > 992)
    },
    activarLink() {
      let path = window.location.pathname
      document.querySelector(`a[href='${path}']`).classList.add("active")
    },

  },
  components: { Carrito }
}
</script>