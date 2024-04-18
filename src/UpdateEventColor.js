

//this function updates the color of the event based on the category it belongs to
//the style is included in App.vue file

export function updateEventColor(events, categorizedDataObjects) {
    for (const categoryName in categorizedDataObjects) {
        const categoryEvents = categorizedDataObjects[categoryName];
        categoryEvents.forEach(event => {
            event.class = categoryName;
        });
        events.push(...categoryEvents);
    }
}