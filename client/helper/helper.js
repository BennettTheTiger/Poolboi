const handleError = (message) =>{
    $("#errorMessage").text(message);
    $("#domoMessage").animate({width:'toggle'},350);
};

const redirect = (response) =>{
    $('#domoMessage').animate({width:'hide'},350);
    window.location = response.redirect;
};

const sendAjax = (type, action, data, success) => {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: 'json',
        success: success,
        error: function(xhr,status, error){
            let msgObject = JSON.parse(xhr.responseText); 
            handleError(msgObject.error);
        },
    });
};

//Convert Mongo Dbs ISO time to a readable time string
const readableDate = (data) => {
    let dateString = String(data);
    dateString = dateString.slice(0,10);
    dateString = dateString.split("-");
    return (dateString[1] + '/' + dateString[2] + '/' + dateString[0]);
}