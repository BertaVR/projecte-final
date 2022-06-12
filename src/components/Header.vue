<!-- Load an icon library to show a hamburger menu (bars) on small screens -->
<template>
  <div class="topnav" id="myTopnav">
    <a href="/">Packs</a>
    <a href="/about">Items</a>
    <Carrito></Carrito>

    <a href="javascript:void(0);" class="icon" @click="myFunction()">
      <i class="fa fa-bars"></i>
    </a>
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

/* When the screen is less than 600 pixels wide, hide all links, except for the first one ("Home"). Show the link that contains should open and close the topnav (.icon) */
@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {
    display: none;
  }

  .topnav a.icon {
    float: right;
    display: block;
  }
}

/* The "responsive" class is added to the topnav with JavaScript when the user clicks on the icon. This class makes the topnav look good on small screens (display the links vertically instead of horizontally) */
@media screen and (max-width: 600px) {
  .topnav.responsive {
    position: relative;
  }

  .topnav.responsive a.icon {
    position: absolute;
    right: 0;
    top: 0;
  }

  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
<script>
import Carrito from './Carrito.vue';
export default {
  data: () => ({}),
  mounted() { this.activarLink() },
  methods: {
    activarLink() {
      let path = window.location.pathname
      document.querySelector(`a[href='${path}']`).classList.add("active")
    },
    myFunction() {
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      }
      else {
        x.className = "topnav";
      }
    }
  },
  components: { Carrito }
}
</script>