
export function categorizeData(dataArray) {

    console.log("the input dataArray to categorizeData is:",dataArray)
        const categories = {
            'articles': ['wikipedia'],
            'lectures_and_demos': ['your-lecture-url-here'],
            'step_by_step_tutorials': ['your-tutorial-url-here'],
            'discussion_forum_helpseeking': ['stackOverflow'],
            'ai_help': ['chat.openai.com'],
            'uncategorized': []
        };
    
        const categoryData = {};
    
        // Initialize categoryData object
        for (const categoryName in categories) {
            categoryData[categoryName] = [];
        }

        // Categorize each event
        dataArray.forEach(dataItem => {
            let categorized = false;
    
            //default value of categoryName is "uncategorized"; it's never expected to be null
            //the first condition checks if the current item has a categoryName property and then..
            //checks if the same categoryName value of the item is present in specified list of categories
            //if the category is found, the item is added to the categoryData object
            //else if it is not found, the item should be added to the "uncategorized" category
            if (dataItem.hasOwnProperty('categoryName') && dataItem.categoryName !== null) {
                const categoryName = dataItem.categoryName.toLowerCase();
                if (categories.hasOwnProperty(categoryName)) {
                    console.log("--The current item is",dataItem," -- categorized under:--",categoryName)
                    categoryData[categoryName].push(dataItem);
                    dataItem.class = categoryName; // Add class property
                    categorized = true;
                }
            }
            //this if section handles automatic categorization of items based on their URL
            if (!categorized) {
                for (const categoryName in categories) {
                    if (categories[categoryName].some(keyword => dataItem.url.includes(keyword))) {
                        categoryData[categoryName].push(dataItem);
                        dataItem.class = categoryName; // Add class property
                        categorized = true;
                        break;
                    }
                }
            }
    
            if (!categorized) {
                categoryData['uncategorized'].push(dataItem);
                dataItem.class = 'uncategorized'; // Add class property
            }
        });
    
        return categoryData;

}