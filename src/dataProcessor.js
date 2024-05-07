
export function processLoadedData(dataArray) {
    console.log("Processing loaded object of dataArray into vue-cal event structure...")
    const loadedEvents = [];
    for (const dataItem of dataArray) {
        console.log("Processing dataItem:", dataItem);
       if (dataItem.data.siteInfo.isExactBookmark === true || dataItem.data.siteInfo.qtags!="no-qtag-yet") { // Check if isExactBookmark flag is true
        const dateAdded = new Date(dataItem.data.siteInfo.accessStartTime);
        let defaultEndTime = new Date(dateAdded.getTime() + 60 * 60 * 1000);
        let endTime;
            if (dataItem.data.siteInfo.totalTime) {
                const totalTimeMilliseconds = dataItem.data.siteInfo.totalTime * 1000; // Convert totalTime to milliseconds
                const endTimeFromTotalTime = new Date(dateAdded.getTime() + totalTimeMilliseconds);
                endTime = endTimeFromTotalTime > defaultEndTime ? endTimeFromTotalTime : defaultEndTime;
            } else {
                endTime = defaultEndTime;
            }
        const eventItem = {
            start: dateAdded,
            end: endTime,
            title: dataItem.data.siteInfo.siteName,
            content: dataItem.data.siteInfo.qtags,
            url: dataItem.data.siteInfo.url,
            categoryName: dataItem.data.siteInfo.categoryName,
        };

        loadedEvents.push(eventItem);
    }//end of bookmarkcheck condition
}
    //console.log("ProcessLoadedData result:", loadedEvents);
    return loadedEvents;
}