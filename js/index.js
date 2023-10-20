
const navbar = document.getElementById("mcelec-nav");
window.onscroll = function () { 
    if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50 ) {
        navbar.classList.add("scrolled");
    } 
    else {
        navbar.classList.remove("scrolled");
    }
};
  
function requestMethodChanged(){
    const phone = document.getElementById('request-number');
    const phoneLabel = document.getElementById('label-for-request-number');
    const email = document.getElementById('request-email');
    const emailLabel = document.getElementById('label-for-request-email');

    const options = document.getElementsByName('method-choice');
    let checked = undefined;
    for(let i=0; i<options.length; i++){
        if(options[i].checked){
            checked = options[i]
        }
    }
    switch(checked.id){
        case 'by-email':
            phone.style.display = "none";
            phoneLabel.style.display = "none";

            email.style.display = "block";
            emailLabel.style.display = "block";
            
            break;
        default:
            phone.style.display = "block";
            phoneLabel.style.display = "block";
            email.style.display = "none";
            emailLabel.style.display = "none";

            break;

    }
}


var form = document.getElementById('request-form');
form.onsubmit = function(event){
    event.preventDefault();
    var xhr = new XMLHttpRequest();
    var fd = new FormData(form);
    let fdjson = JSON.stringify(Object.fromEntries(fd))
    console.log("atttempting to send",fdjson)

    //todo use actual api link
    xhr.open('POST','https://bomb.zone/mccarthyelectricinc/request-contact/')          //'https://jsonplaceholder.typicode.com/posts')
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onerror = function () {
        alert('An unknown error occurred when attempting to send your request. We apologize for the inconvenience.')
    };

    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("response status", xhr.status)

            if(xhr.status == 201 || xhr.status == 200 ){
                console.log("SUCCESS")
            }else{
                console.log("FAIL")
            }
            console.log(xhr.response)

            form.reset();

        }
    }

    xhr.send(fdjson);

    return false; 
}