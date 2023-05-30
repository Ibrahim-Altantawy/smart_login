/** global varriable */
var nameSign =  document.querySelector("#userNameSignIn");
var EmailSign = document.getElementById("userMailSignIn");
var passwordSign = document.querySelector("#userPasswordSignIn");
var signUpEmail = document.querySelector("#signUpEmail");
var signUpPass = document.querySelector("#signUpPass");
var users = [];
var EmptyInputNameError = "Please Enter you Name";
var EmptyInputEmailError = "Please Enter you Email";
var registedEmailError = "This mail alrady signIn before";
var EmptyInputPassError = "Please Enter you Password";

/**مهمة اضافة مستخدم جديد */
function addNewUser() {
  if (dependEmptyInpu(nameSign.value) == false) {
    document.querySelector("#nameMassError").innerHTML = `${EmptyInputNameError}`

  } else
    if (TestMail(EmailSign.value) == false) {
      document.querySelector("#emailMassError").innerHTML = `${EmptyInputEmailError}`

    }
    else if (checkIfRegistBefor()) {
      document.querySelector("#emailMassError").innerHTML = `${registedEmailError}`
    }
    else if (dependEmptyInpu(passwordSign.value) == false) {
      document.querySelector("#passMassError").innerHTML = `${EmptyInputPassError}`

    }
    else {
      var user = {
        userName: nameSign.value,
        userMail: EmailSign.value,
        userMailPass: passwordSign.value,
      }
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      clear();
      document.querySelector("#passMassError").innerHTML = `Sucess`;
           
      checkIfRegistBefor()
    }
}
/**  ----------   برمجة صفحة التسجيل---------------------- */
/**  خاصية منع المستخدم من ادخال بيانات فارغة */
function dependEmptyInpu(x) {
  var correctInput = /(\w+|\d){3,}/;
  return correctInput.test(x);
}
/*خاصية منع المستخدم من ادخال ايميل خاطئ */
function TestMail(x) {
  var correctEmail = /\w+@\w+\.\w+/;
  return correctEmail.test(x);
}
/**حذف رسالة الخطا عند عمل فوكس علي الان بوت */
if( nameSign != null){/**تم عمل اف الشرطية هنا لانه في التنقل بين الصفحات الكود بيدي خطا مش بيكون قادر يجيب الابمن من الصفحاتالتانية */
  nameSign.addEventListener("focus", function () {
    document.querySelector("#nameMassError").innerHTML = ``
  })
  EmailSign.addEventListener("focus", function () {
    document.querySelector("#emailMassError").innerHTML = ``
  })
  passwordSign.addEventListener("focus", function () {
    document.querySelector("#passMassError").innerHTML = ``
  })

}

/**افراغ محتويات الان بوت */
function clear() {
  nameSign.value = "";
  EmailSign.value = "";
  passwordSign.value = "";
}
/** التاكد من ان الايميل جديد وليس مسجل سابقا */
function checkIfRegistBefor() {
  var usersSavedInLocalStorage = JSON.parse(localStorage.getItem("users"));
  var num = "";
  if (usersSavedInLocalStorage != null) {
    for (var i = 0; i < usersSavedInLocalStorage.length; i++) {
      if (usersSavedInLocalStorage[i].userMail == EmailSign.value) {
        num += 1;
      } else {
        num += 0;
      }

    }
    return (num.includes(1));
  }

}

if (document.querySelector("#signtButton")!=null){
  document.querySelector("#signtButton").addEventListener("click",
  addNewUser
);

}


/**  ----------   برمجة صفحة الدخول---------------------- */
function CheckCorrectEmailAndPassword() {
  var usersSavedInLocalStorage = JSON.parse(localStorage.getItem("users"));
  var num = "";
  if (usersSavedInLocalStorage != null) {
    for (var i = 0; i < usersSavedInLocalStorage.length; i++) {
      if (usersSavedInLocalStorage[i].userMail == signUpEmail.value&&usersSavedInLocalStorage[i].userMailPass == signUpPass.value) {
        num += 1;
      } else {
        num += 0;
      }

    }
    return (num.includes(1));
  }

}

if (document.querySelector("#signIntButton")!=null){
  document.querySelector("#signIntButton").addEventListener("focus",
  function(){
    if (CheckCorrectEmailAndPassword()){
    
      document.querySelector("#signIntButton").innerHTML=`<a href="Home.html" target="_self" rel="noopener noreferrer"
      class=" text-decoration-none text-white ">Login</a>`
    }
  }
);
  document.querySelector("#signIntButton").addEventListener("click",
  function(){
    if (CheckCorrectEmailAndPassword()== false){
      
   
      document.querySelector("#errorLoginMass").innerHTML=`Please Check Your Mail And Password Again`
    }
  }
);

}
if( signUpEmail != null &&signUpEmail != null){/**تم عمل اف الشرطية هنا لانه في التنقل بين الصفحات الكود بيدي خطا مش بيكون قادر يجيب الابمن من الصفحاتالتانية */
signUpEmail.addEventListener("focus", function () {
    document.querySelector("#errorLoginMass").innerHTML = ``
  })
  signUpPass.addEventListener("focus", function () {
    document.querySelector("#errorLoginMass").innerHTML = ``
  })
}
