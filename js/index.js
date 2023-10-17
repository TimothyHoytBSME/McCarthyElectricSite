


const navbar = document.getElementsByClassName("mcelec-nav")[0];
window.onscroll = function () { 
    if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50 ) {
        navbar.classList.add("scrolled");
    } 
    else {
        navbar.classList.remove("scrolled");
    }
};
  

