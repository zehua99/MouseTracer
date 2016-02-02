function addCredibleTraces(){
    var json = {
        trace: $("#trace_id").val()
    }
    $.ajax({
        url: "/model/addCredibleTraces",
        type: 'POST',
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(json), 
        success: function(callbackData) {
            $("#trace_id").val(callbackData);
        }
    });
}