
export function processLoadedData(dataArray) {
    console.log("Processing loaded object of dataArray into vue-cal event structure...")
    const loadedEvents = [];
    for (const dataItem of dataArray) {
        console.log("Processing dataItem:", dataItem);
        // Check if isExactBookmark flag is true and custom tags are present
       if (dataItem.data.siteInfo.isExactBookmark === true || 
        (typeof dataItem.data.siteInfo.qtags === 'string' && dataItem.data.siteInfo.qtags !== 'no-qtag-yet' && dataItem.data.siteInfo.qtags !== 'no-qtags-yet') ||
        (Array.isArray(dataItem.data.siteInfo.qtags) && dataItem.data.siteInfo.qtags.length === 1 && dataItem.data.siteInfo.qtags[0] !== 'no-qtag-yet' &&  dataItem.data.siteInfo.qtags[0] !== 'no-qtags-yet')) { 
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
            //content: '<i class="icon material-icons">local_hospital</i>',
            //content: `<i class="icon material-icons"></i> ${dataItem.data.siteInfo.qtags}`,
            url: dataItem.data.siteInfo.url,
            categoryName: dataItem.data.siteInfo.categoryName,
        };

        loadedEvents.push(eventItem);
    }//end of bookmarkcheck condition
}
    //console.log("ProcessLoadedData result:", loadedEvents);
    return loadedEvents;
}