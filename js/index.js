
const main = document.getElementById('mcelec-page')
const navbar = document.getElementById("mcelec-nav");
const reqForm = document.getElementById('request-form');
const reqName = document.getElementById('request-name')
const phone = document.getElementById('request-number');
const phoneLabel = document.getElementById('label-for-request-number');
const email = document.getElementById('request-email');
const emailLabel = document.getElementById('label-for-request-email');
const options = document.getElementsByName('method-choice');
let reqMethodElem = document.getElementById("by-phone")
reqMethodElem.checked = "checked"

main.onscroll = function () { 
    if (main.scrollTop >= 100) {
        navbar.classList.add("scrolled");
    } 
    else if (main.scrollTop == 0) {
        navbar.classList.remove("scrolled");
    }
};
  
function requestMethodChanged(){
    let checked = undefined;
    for(let i=0; i<options.length; i++){
        if(options[i].checked){  checked = options[i]  }
    }
    reqMethodElem = checked
    switch(reqMethodElem.id){
        case 'by-email':
            phone.style.display = "none";   phoneLabel.style.display = "none";
            email.style.display = "block";  emailLabel.style.display = "block";
            break;
        default:
            phone.style.display = "block";  phoneLabel.style.display = "block";
            email.style.display = "none";   emailLabel.style.display = "none";
            break;
    }
}

reqForm.onsubmit = function(event){
    event.preventDefault();


    //validate name
    if(reqName.value.length == 0){
        alert('Please enter your name.')
        return false;
    }

    if(reqMethodElem.id == "by-phone" || reqMethodElem.id == "by-text"){
        //validate number
        const validNumber = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone.value) ||
                    (/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/im.test(phone.value)) ||
                    /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/im.test(phone.value) ||
                    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/im.test(phone.value)
        if(!validNumber){
            alert('Invalid phone number. ')
            return false;
        }
    }else{
        //validate email
        if(!validateEmail(email.value)){
            alert('Invalid email. ')
            return false;
        }
    }

    const fd = new FormData(reqForm);
    const fdJson = JSON.stringify(Object.fromEntries(fd))
    const url = "https://mccarthyelectricinc.com.bomb.zone/request-contact/"
    const reqObj = postJson(url,fdJson,doOnDone)

    function doOnDone(){
        if(reqObj.status == 201 || reqObj.status == 200 ){
            console.log("POST SUCCESSFUL", reqObj.status)
            alert('Your request has been sent! We will get back to you as soon as able.')
            reqForm.reset();
        }else if(reqObj.error){
            console.error("POST NOT SENT ERROR", reqObj.status)
            alert('Your request was not sent due to a technical error. We apologize for the inconvenience.')

        }else{
            console.warn("POST FAILED", reqObj.status)
            alert('Your request was not received due to a server error invalid input. We apologize for the inconvenience. Please verify your name and contact method just in case.')
        }
    }
    return false; 
}


function postJson(url, json, doOnDone){
    const xhr = new XMLHttpRequest();
    xhr.open('POST',url)  
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onerror = function () {
        alert('Your request was not received due to a technical error. We apologize for the inconvenience. Please verify your name and contact method just in case.')

        xhr.error = true;
    };
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) { doOnDone(); xhr.error = false; }
    }
    xhr.send(json);
    return xhr
}


const validateEmail = (email) => {
    return String(email).toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};




const articles = document.getElementsByClassName('anchor')
main.addEventListener("scroll", navHighlighter);

function navHighlighter() {
    // let scrollY = main.scrollTop
    let furthest = articles[0]
    let last = 0;
    for(let i=0; i<articles.length; i++){
        const article = articles[i]
        const vheight = main.getBoundingClientRect().height;
        const articletop = article.getBoundingClientRect().top;
        const screenpc = articletop/vheight

        // const articleTop = article.getBoundingClientRect().top;
        
        if ( screenpc < 0.2){
            furthest = article
            last = screenpc;
        }

        document.querySelector("a[href*=" + article.getAttribute("id") + "]").classList.remove("active");
    }
    document.querySelector("a[href*=" + furthest.getAttribute("id") + "]").classList.add("active");
}
