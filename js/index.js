
const main = document.getElementById('mcelec-page')
const navbar = document.getElementById("mcelec-nav");
const reqForm = document.getElementById('request-form');
const reqName = document.getElementById('request-name')
const phone = document.getElementById('request-number');
const phoneLabel = document.getElementById('label-for-request-number');
const email = document.getElementById('request-email');
const emailLabel = document.getElementById('label-for-request-email');
const options = document.getElementsByName('method-choice');
const articles = document.getElementsByClassName('anchor')
const navLinks = document.getElementById('nav-links')
const reqSend= document.getElementById('request-send')

let scrolled = false;
let furthest = articles[0]
let reqMethodElem = document.getElementById("by-phone")

reqMethodElem.checked = "checked"

main.onscroll = function () { 
    if (!scrolled && main.scrollTop >= 100) {  scrolled = true; navbar.classList.add("scrolled") } 
    else if (scrolled && main.scrollTop == 0) { scrolled = false; navbar.classList.remove("scrolled") }

    const vheight = main.getBoundingClientRect().height;
    
    let fchanged = false;
    for(let i=0; i<articles.length; i++){
        if ( (articles[i].getBoundingClientRect().top/vheight) < 0.2){ 
            if(furthest != articles[i] ){
                furthest = articles[i];  fchanged = true
            }
        }
    }
    
    if(fchanged){
        for (let i = 0; i < navLinks.children.length; i++) {
            navLinks.children[i].firstChild.classList.remove("active");
        }
        document.querySelector("a[href*=" + furthest.getAttribute("id") + "]").classList.add("active");
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

    if(reqName.value.length == 0){
        alert('Please enter your name.')
        return false;
    }

    if(reqMethodElem.id == "by-phone" || reqMethodElem.id == "by-text"){
        const validNumber = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone.value) ||
                    (/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/im.test(phone.value)) ||
                    /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/im.test(phone.value) ||
                    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/im.test(phone.value)
        if(!validNumber){
            alert('Invalid phone number. ')
            return false;
        }
    }else{
        if(!validateEmail(email.value)){
            alert('Invalid email. ')
            return false;
        }
    }

    const fd = new FormData(reqForm);
    const fdJson = JSON.stringify(Object.fromEntries(fd))
    const url = "https://mccarthyelectricinc.com.bomb.zone/request-contact/"
    reqSend.value = "Sending..."
    const reqObj = postJson(url,fdJson,doOnDone)

    function doOnDone(){
        if(reqObj.status == 201 || reqObj.status == 200 ){
            console.log("POST SUCCESSFUL", reqObj.status)
            alert('Your request has been sent! We will get back to you as soon as able.')
            reqForm.reset();
            reqMethodElem.checked = "checked"

        }else if(reqObj.error){
            console.error("POST NOT SENT ERROR", reqObj.status)
            alert('Your request was not sent due to a technical error. We apologize for the inconvenience.')

        }else{
            console.warn("POST FAILED", reqObj.status)
            alert('Your request was not received due to a server error invalid input. We apologize for the inconvenience. Please verify your name and contact method just in case.')
        }
        reqSend.value = "Let Us Contact You"

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

const testobj = {"user_name":"Timothy","method-choice":"text","user_number":"456-456-4567","user_email":"","type-choice":"planning"}