
<script setup>
// Documentation: https://antoniandre.github.io/vue-cal
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { ref } from 'vue';
import { defineAsyncComponent, onMounted, reactive } from 'vue'


const loadedData = ref(["dummy data"]);
const loadedEvents = reactive([]);
// reminder: use loadedData.value to access the value inside script setup
// in the template, loadedData is accessible or unwrapped directly: {{loadedData}}

// Define an async component for Vue-cal
//const AsyncVueCal = defineAsyncComponent(() => import('./VueCal.vue'))
console.log("code from App.vue");

// test_usersDB database secret key: fnAFLgiyHqAARM3hOMlaMuvqhwwlaMIOVcKU66Os
try{
    var faunaClient = new faunadb.Client({
        secret: "fnAFLgiyHqAARM3hOMlaMuvqhwwlaMIOVcKU66Os", // need safer way to handle this
    }); 
      
    console.log("connected to database server successfully");
    var q = faunadb.query  


}catch(e){
    console.log("could not connect to database!:", e)
}

//access collection in database

var refID = ref(0);
//var refID = 0;
//todo: make siteInfo accessible outside of the then block - 
//by using ref() and async, i think?
//or by using return statement in then block
//async function starts here

//async function loadData() {
  const loadData = async () => {
  try{

    //check which collection to query based on the current user
    const queriedData = await faunaClient.query(q.Map(q.Paginate(q.Documents(q.Collection('pilot0'))), q.Lambda(x => q.Get(x)) ))
                    .then((ret) => {
                        //allDocuments = ret;
                        refID=ret.data[0].ref.id;
                        console.log("First data item in the array <data> in the returned object <ret> from the specific collection <pilot>", ret.data[0].data.siteInfo);
                        console.log("returned document ID is ",ret.data[0].ref.id, "and the refID declared outside, and defined inside the scope is ", refID);
                        console.log("length of returned document is ",ret.data.length);
                        return ret;
                      })
                      .catch((err) => {
                        console.log("error in querying collection from database", err);
                        });
//await ends here
console.log("length of queriedData is ",queriedData.data.length);
                        return queriedData; 
//try ends here
  }catch(e){console.log("could not get collection from database!:", e)}
   
//refID=returnedData.data[0].ref.id;
}//end of async loadData function

//call loadData function when component is mounted + todo: and again when data is updated
//when is onMounted called?
onMounted(()=>{
   console.log("====> Loaded data outside async function, in onMounted is: ",
   loadData().then((dataObject)=>{    
    loadedData.value = dataObject.data[0].data.siteInfo;
    console.log("Accessing data from OnMounted", loadedData.value);
    const dataArray = dataObject.data;
//handle the data tranformations here

//loop through each source object in the array and convert it into event object
//looping begins here
    for(const dataItem of dataArray){

      const dateAdded = new Date(dataItem.data.siteInfo.dateAdded)

      //calculate default endtime - 1hr (60*60*1000 milliseconds) from start time
      const end = new Date(dateAdded.getTime() + 60*60*1000);

      //define event object
      const eventItem = {
        start: new Date(dataItem.data.siteInfo.dateAdded),
        end: new Date(dateAdded.getTime() + 60*60*1000),
        title: dataItem.data.siteInfo.title,
        content: dataItem.data.siteInfo.url
      }
      loadedEvents.push(eventItem);
      
    }// end of for loop for each dataItem in dataArray
    console.log("loadedEvents array is ",loadedEvents);
  
  }));
})

//note1: the first console.log is printed before the promise is resolved
//note2: the inner console.log prints again, when promise does resolve and data is accessible

const events = loadedEvents;


// const events = ref([
// {
//     start: '2018-11-19 10:30',
//     end: '2018-11-19 11:30',
//     title: 'Understanding the architecture',
//     test: 'test',
//     deletable: false, // optional - force undeletable when events are editable.
//     resizable: false // optional - force unresizable when events are editable.
//   },
//   {
//     start: '2018-11-19 18:30',
//     end: '2018-11-19 19:15',
//     title: 'Configurations',
//   },
//   {
//     start: '2018-11-20 18:30',
//     end: '2018-11-20 20:30',
//     title: 'Testing datasets',
//   },
//   {
//     start: new Date('2018-11-21 11:05'),
//     end: '2018-11-21 13:00',
//     title: 'Automatically generating test cases',
//     content: [],
//   },
//   {
//     start: '2018-11-21 19:30',
//     end: '2018-11-21 23:00',
//     title: 'Handling errors with Python',
//   },

// ]);


//delete selected document from database
// let deleteDocument = faunaClient.query(
//     q.Delete(q.Ref(q.Collection('pilot0'), '293137999999999999'))
//   )
//   .then((ret) => {
//     console.log("deleted document from database", ret);
//     return ret;
//    })
//    .catch((err) => {
//     console.log("error in deleting document from database", err);
//     });

//create new document in database
// let createDocument = faunaClient.query(
//     q.Create(q.Collection('pilot0'), { data: { siteInfo: "test site info", siteURL: "test site url", siteTitle: "test site title", siteDescription: "test site description", siteTags: "test site tags", siteNotes: "test site notes" } }))
//        .then((ret) => {
//           console.log("created document in database", ret);
//           return ret;
//          })
//          .catch((err) => {
//           console.log("error in creating document in database", err);
//           });

//update document in database
// let updateDocument = faunaClient.query(
//     q.Update(q.Ref(q.Collection('pilot0'), '293137999999999999'), { data: { siteInfo: "updated site info", siteURL: "updated site url", siteTitle: "updated site title", siteDescription: "updated site description", siteTags: "updated site tags", siteNotes: "updated site notes" } }))
//        .then((ret) => {
//           console.log("updated document in database", ret);
//           return ret;
//          })
//          .catch((err) => {
//           console.log("error in updating document in database", err);
//           });

</script>


<template>
  <header>
    <div class="wrapper"></div>
  </header>
  <main>
    <!-- wrapping one child node in suspense component -->
      
    <div> {{ loadedEvents }} </div>
    <vue-cal class="vuecal--blue-theme"
      selected-date= "2023-09-15"
      :time="true"
      :time-from="4 * 60"
      :events="events"
      editable-events="editable-events">
      <template #title="{ title }"> {{ title }} </template>
      
    </vue-cal>

   </main>
</template>

<style>


.vuecal__now-line {color: #06c;}

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
