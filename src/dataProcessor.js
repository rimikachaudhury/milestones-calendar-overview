export function processLoadedData(dataArray) {
    console.log("Processing loaded object of dataArray into vue-cal event structure...")
    const loadedEvents = [];
    for (const dataItem of dataArray) {
        console.log("Processing dataItem:", dataItem);
       // if (dataItem.data.siteInfo.isExactBookmark === true) { // Check if isExactBookmark flag is true
        const dateAdded = new Date(dataItem.data.siteInfo.accessStartTime);
        const end = new Date(dateAdded.getTime() + 30 * 60 * 1000);
        const eventItem = {
            start: dateAdded,
            end: end,
            title: dataItem.data.siteInfo.siteName,
            //content: dataItem.data.siteInfo.qtags,
            content: `<a href="https://www.google.com/" target="_blank">link</a>`,
        };
        loadedEvents.push(eventItem);
    //}//end of bookmarkcheck condition
}
    //console.log("ProcessLoadedData result:", loadedEvents);
    return loadedEvents;
}