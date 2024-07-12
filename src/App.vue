
<script setup>
import { fetchDataFromDB } from './faunaService';
import { processLoadedData } from './dataProcessor';
// Documentation: https://antoniandre.github.io/vue-cal
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { ref } from 'vue';
import { defineAsyncComponent, onMounted, reactive } from 'vue'
import { updateEventColor } from './UpdateEventColor.js';
import {categorizeData} from './categorizeData.js';

const loadedData = ref(["dummy data"]);//iniliaze as an array with dummy string
const loadedEvents = reactive([]);

// reminder: use loadedData.value to access the value inside script setup
// in the template, loadedData is accessible or unwrapped directly: {{loadedData}}

console.log("code from App.vue");

var userInput = "";
window.collectionName = "";
window.siteInfoData = [];

function populateEvents(){
    fetchDataFromDB(collectionName)
        .then(dataObject => {
          console.log("Fetched data 'dataObject' is: ", dataObject);
            const processedData = processLoadedData(dataObject.data);
            console.log("processed data array is ",processedData);
            loadedEvents.push(...processedData);
            console.log("loadedEvents array is ",loadedEvents);

            //The function call to change eventcolor needs to alter the reactive variable: loadedEvents
            const categorizedDataObjects = categorizeData(processedData)
            console.log(categorizedDataObjects);
            
        })
        .catch(error => console.error("Failed to load data:", error));
    }//end of populateEvents function

    //insert displayLastRefreshed


// Function to handle user input submission
  function submitUserInput() {
    
        userInput = document.getElementById('userInput').value;
      
        //assign collectionName the value of userInput to save the collection name
        collectionName = userInput;
        window.collectionName = collectionName;

        //test if collection name is being saved
      // console.log('Collection Name:', collectionName);

          // Call the function to load data and populate events with the user input collection name
          populateEvents(collectionName);

        // Optionally, clear the user input field after submission
        document.getElementById('userInput').value = '';
        

    return collectionName;

  }//end of submitUserInput function



function loadData() {

    let collectionName = ""
    //add event listeners
    console.log("code from loadData function");

    // Find the submit button element
    const submitButton = document.querySelector('#submit');

    // Wait for the DOM content to be fully loaded to attach handlers for onclick submit event
      document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM content loaded");
      // Find the submit button element
      const submitButton = document.querySelector('#submit');
      // Add a click event listener to the submit button
      submitButton.addEventListener('click', function(event) {
          // Prevent the default form submission behavior
          event.preventDefault();
          // Get the value of the user input field
          collectionName = submitUserInput()
          console.log("the collection name is ",collectionName);
      });
    });

    // Add event listener to the user input field to submit on Enter key press
    const userInputField = document.getElementById('userInput');
    userInputField.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') { // Check if the Enter key is pressed
          collectionName = submitUserInput(); // Call the submitUserInput function
        }
    });

    
}

onMounted(()=>{
  
  loadData()
  

});

const events = loadedEvents;

//event handler for card dialog - not working 11June2024
function onEventClick(event) {
    selectedEvent.title = event.title;
    selectedEvent.start = event.start;
    selectedEvent.end = event.end;
    selectedEvent.contentFull = event.content;
    selectedEvent.url = event.url;
    selectedEvent.categoryName = event.categoryName;
    selectedEvent.icon = 'info'; // Replace with actual icon logic if needed
    showDialog.value = true;
}


</script>


<template>
  <header>
    <div class="wrapper"></div>
  </header>
  <main>
    <!-- wrapping one child node in suspense component -->
      
    <!-- <div> {{ loadedEvents }} </div> -->
    <vue-cal class="vuecal"
      :selected-date= "selectedDate"
      :time="true"
      :timeCellHeight="120"
      :time-from="4 * 60"      
      editable-events="{ title: true, drag: true, resize: true, delete: true, create: false }"
      :events="events"
      :cell-click-hold="false"
      :drag-to-create-event="false"
      :disable-views="['years', 'year', 'month']"
      @event-clicked="onEventClick">
    </vue-cal>

    <!-- <v-dialog v-model="showDialog">
      <v-card>
        <v-card-title>
          <span>{{ selectedEvent.title }}</span>
          <v-spacer/>
        </v-card-title>
        <v-card-text>
          <strong>Event details:</strong>
          <ul>
            <li>Category: {{ selectedEvent.categoryName }}</li>
          </ul>
        </v-card-text>
      </v-card>
    </v-dialog> -->


   </main>
</template>

<style>


.vuecal__now-line {color: #06c;}

.vuecal__event.articles {background-color: #ecc5b7}
.vuecal__event.lectures_and_demos {background-color: #d7947d}
.vuecal__event.step_by_step_tutorials {background-color: #b97763}
.vuecal__event.discussion_forum_helpseeking {background-color: #7eaba6}
.vuecal__event.ai_help {background-color: #5abba7}
.vuecal__event.my_work {background-color: #6ad6e7}


.vuecal__event {
  background-color: #D3D3D3;
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
