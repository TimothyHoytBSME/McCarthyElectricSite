
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
    const email = document.getElementById('request-email');

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
            email.style.display = "block";
            break;
        default:
            email.style.display = "none";
            phone.style.display = "block";
            break;

    }
}
