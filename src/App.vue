<template>
  <header>
    <div class="wrapper"></div>
  </header>

  <main>
    <vue-cal class="vuecal--blue-theme"
      selected-date="2018-11-19" 
      :time-from="4 * 60"
      :events="events"
      editable-events="editable-events"   
      
      ></vue-cal>
   </main>
</template>


<script setup>
// Documentation: https://antoniandre.github.io/vue-cal
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { ref } from 'vue';

const events = ref([
{
    start: '2018-11-19 10:30',
    end: '2018-11-19 11:30',
    title: 'Understanding the architecture',
  },
  {
    start: '2018-11-19 18:30',
    end: '2018-11-19 19:15',
    title: 'Configurations',
  },
  {
    start: '2018-11-20 18:30',
    end: '2018-11-20 20:30',
    title: 'Testing datasets',
  },
  {
    start: '2018-11-21 11:00',
    end: '2018-11-21 13:00',
    title: 'Automatically generating test cases',
  },
  {
    start: '2018-11-21 19:30',
    end: '2018-11-21 23:00',
    title: 'Handling errors with Python',
  },

]);


</script>





<style>

.vuecal__event {
  background-color: rgba(128, 207, 233, 0.5);
  box-sizing: border-box;
  padding: 5px;

  &.lunch {
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      #f2f2f2 10px,
      #f2f2f2 20px
    );
  }




}

.vuecal {
  height: 90vh;
  margin: auto;
}






html,
body,
#app {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  position: fixed;
  top: 5px;
  right: 5px;
  color: #333;
}


</style>
