var userNameInput = document.querySelector("#userName");
var userEmailInput = document.querySelector("#userEmail");
var userPasswordInput = document.querySelector("#userPassword");
var signUpBtn = document.querySelector("#signUpBtn");
var form = document.querySelector("form");
// Load users from localStorage when the script starts to preserve the existing data and append new ones, or initialize as empty array if no data on local stoarge returning with null
var users = JSON.parse(localStorage.getItem("users")) || [];
function signUp() {
  var userData = {
    userName: userNameInput.value,
    userEmail: userEmailInput.value,
    userPassword: userPasswordInput.value,
  };
  if (validation(userNameInput) &&validation(userEmailInput) &&validation(userPasswordInput)){
    var isDuplicate=false
    for(var i=0;i<users.length;i++){
      if(userEmailInput.value === users[i].userEmail){
        isDuplicate=true
        Swal.fire({
          padding: "10px 10px 30px 10px",
          icon: "warning",
          html: `
                <h4 class="text-secondary">This email has been entered before!</h4>
            `,
          showConfirmButton: false,
          showCloseButton: true,
        });
        break;
      }
    }
    if(!isDuplicate){
      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));
      document.querySelector("#success").classList.replace("d-none", "d-flex");
      window.location.href="../index.html"
    }
  
  }else{
    if(!validation(userNameInput)){
      document.querySelector("#alertName").classList.replace("d-none","d-flex")
      document.querySelector("#alertName").innerHTML=`
      <p class="mb-0"> username must be at least 3 characters long!</p>
      `
    }
    if(!validation(userEmailInput)){
      document.querySelector("#alertEmail").classList.replace("d-none","d-flex")
        document.querySelector("#alertEmail").innerHTML=`
        <p class="mb-0"> A standard email address format with a local part, @ symbol, domain, and top-level domain! like: user@domain.com</p>
      
      `
    }
    if(!validation(userPasswordInput)){
      document.querySelector("#alertPassword").classList.replace("d-none","d-flex")
        document.querySelector("#alertPassword").innerHTML=`
        <ul class="mb-0 list-unstyled">Minimum length: 8 characters. Must include:
          <li class="ms-1 mt-1"><i class="fa-solid fa-circle-check me-2"></i>At least 1 lowercase letter.</li>
          <li class="ms-1"><i class="fa-solid fa-circle-check me-2"></i>At least 1 uppercase letter.</li>
          <li class="ms-1"><i class="fa-solid fa-circle-check me-2"></i>At least 1 number.</li>
          <li class="ms-1"><i class="fa-solid fa-circle-check me-2"></i>At least 1 special character from !@#$%^&*.</li>
        </ul>
        `
    }
  }
  
}
function validation(fieldInput) {
  var regex;
  switch (fieldInput) {
    case userNameInput:
      regex = /^\w{3,}(\s*-*\w+)*$/;
      break;
    case userEmailInput:
      regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      break;
    case userPasswordInput:
      regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
      break;
    default:
      console.log("there is something wrong !");
  }
  var testString = fieldInput.value;
  if (testString == "") {
    fieldInput.classList.remove("is-valid", "is-invalid");
  } else if (regex.test(testString)) {
    fieldInput.classList.add("is-valid");
    fieldInput.classList.remove("is-invalid");
    return true;
  } else {
    fieldInput.classList.add("is-invalid");
    fieldInput.classList.remove("is-valid");
    return false;
  }
}
userNameInput.addEventListener("blur",function(){
  if(userNameInput.value==""){
    document.querySelector("#alertName").classList.replace("d-flex","d-none")
  }else if(validation(userNameInput)){
    document.querySelector("#alertName").classList.replace("d-flex","d-none")
  }else{
    document.querySelector("#alertName").classList.replace("d-none","d-flex")
    document.querySelector("#alertName").innerHTML=`
    <p class="mb-0"> username must be at least 3 characters long!</p>
    `
  }
})
userEmailInput.addEventListener("blur",function(){
  if(userEmailInput.value==""){
    document.querySelector("#alertEmail").classList.replace("d-flex","d-none")
  }else if(validation(userEmailInput)){
    document.querySelector("#alertEmail").classList.replace("d-flex","d-none")
  }else{
    document.querySelector("#alertEmail").classList.replace("d-none","d-flex")
    document.querySelector("#alertEmail").innerHTML=`
    <p class="mb-0"> A standard email address format with a local part, @ symbol, domain, and top-level domain! like: user@domain.com</p>
    `
  }
})
userPasswordInput.addEventListener("blur",function(){
  if(userPasswordInput.value==""){
    document.querySelector("#alertPassword").classList.replace("d-flex","d-none")
  }else if(validation(userPasswordInput)){
    document.querySelector("#alertPassword").classList.replace("d-flex","d-none")
  }else{
    document.querySelector("#alertPassword").classList.replace("d-none","d-flex")
    document.querySelector("#alertPassword").innerHTML=`
    <ul class="mb-0 list-unstyled">Minimum length: 8 characters. Must include:
      <li class="ms-1 mt-1"><i class="fa-solid fa-circle-check me-2"></i>At least 1 lowercase letter.</li>
      <li class="ms-1"><i class="fa-solid fa-circle-check me-2"></i>At least 1 uppercase letter.</li>
      <li class="ms-1"><i class="fa-solid fa-circle-check me-2"></i>At least 1 number.</li>
      <li class="ms-1"><i class="fa-solid fa-circle-check me-2"></i>At least 1 special character from !@#$%^&*.</li>
    </ul>
    `
  }
})
userNameInput.addEventListener("input", function () {
  validation(userNameInput);
});
userEmailInput.addEventListener("input", function () {
  validation(userEmailInput);
});
userPasswordInput.addEventListener("input", function () {
  validation(userPasswordInput);
});
signUpBtn.addEventListener("click", function () {
  signUp();
});
form.addEventListener("submit", function (e) {
  e.preventDefault();
});
