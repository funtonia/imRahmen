/* The function below is used for the search bar and moved to this file to keep the component clean. */

export function checkForStringAndUpdate(context, dataArrayName, dataArray, fieldsToBeSearchedFor, searchstring) {
    if (searchstring.trim() === "") {
        // empty string
        context.setState({
            [dataArrayName]: dataArray
         })
        
        return;
    }

    searchstring = searchstring.toLowerCase()

    if (fieldsToBeSearchedFor.length === 0) {
        // we don't know what to search for, return
        return;
    }  

    var dataArray_searched = []

    var index_outer;
    var index_inner;
    for (index_outer = 0; index_outer < dataArray.length; ++index_outer) {
        var data = dataArray[index_outer]

        innerloop:
        for (index_inner = 0; index_inner < fieldsToBeSearchedFor.length; ++index_inner) {
            var fieldToBeSearched = fieldsToBeSearchedFor[index_inner];
            if (data[fieldToBeSearched] !== undefined && ((data[fieldToBeSearched]).toLowerCase().indexOf(searchstring) !== -1)) {
                
                dataArray_searched.push(data)

                break innerloop;
            }
        }
    }

    context.setState({
        [dataArrayName]: dataArray_searched
    })

    return;
}