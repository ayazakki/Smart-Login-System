var userEmailInput = document.querySelector("#userEmail");
var userPasswordInput = document.querySelector("#userPassword");
var form = document.querySelector("form");
var signInBtn=document.querySelector("#signInBtn")
var users = JSON.parse(localStorage.getItem("users")) || [];
function signIn() {
    var isEmailFound=false;
    var isPasswordFound=false;
    var isFound=false;
    var loggedInUser=null;
  for(var i=0;i<users.length;i++){
    if(userEmailInput.value===users[i].userEmail && userPasswordInput.value===users[i].userPassword){
      isFound=true;
      loggedInUser=users[i].userName
      break;
    }else if(userEmailInput.value===users[i].userEmail && userPasswordInput.value!==users[i].userPassword){
      isEmailFound=true;
    }else if(userEmailInput.value!==users[i].userEmail && userPasswordInput.value==users[i].userPassword){
      isPasswordFound=true
    }
  }
  if(isFound){
    localStorage.setItem("loggedInUser",loggedInUser)
    window.location.href="../index.html"
  }else if(isEmailFound&&!(isPasswordFound)){
    document.querySelector("#alertPassword").classList.replace("d-none","d-flex")
    document.querySelector("#alertPassword").innerHTML=`<p class="mb-0 mt-1"> Please enter the same password you created during sign-up to access your account.</p>`
    document.querySelector("#alertEmail").classList.replace("d-flex","d-none")
  }else if(!isEmailFound && isPasswordFound){
    document.querySelector("#alertEmail").classList.replace("d-none","d-flex")
    document.querySelector("#alertEmail").innerHTML=`<p class="mb-0"> Kindly use the email you registered with during sign-up to access your account.</p>`
    document.querySelector("#alertPassword").classList.replace("d-flex","d-none")
  }else{
    document.querySelector("#alertEmail").classList.replace("d-none","d-flex")
    document.querySelector("#alertEmail").innerHTML=`<p class="mb-0"> Kindly use the email you registered with during sign-up to access your account.</p>`
    document.querySelector("#alertPassword").classList.replace("d-none","d-flex")
    document.querySelector("#alertPassword").innerHTML=`<p class="mb-0 mt-1"> Please enter the same password you created during sign-up to access your account.</p>`
  }
}
signInBtn.addEventListener("click",function(){
  signIn();
})
form.addEventListener("submit", function (e) {
  e.preventDefault();
});