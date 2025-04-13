var logOutBtn=document.querySelector(".logout")
var headerContent=document.querySelector("header .card")
var loggedInUser=localStorage.getItem("loggedInUser")
if(loggedInUser!=null){
  headerContent.innerHTML=`<h1 class="fw-normal">Welcome ${loggedInUser}</h1>`
}else{
  window.location.href="../index.html"
}

logOutBtn.addEventListener("click",function(){
  localStorage.removeItem("loggedInUser")
  window.location.href="../index.html"
})