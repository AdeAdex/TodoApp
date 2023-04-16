let allUsers = [];
if (localStorage.localAllUsers) {
  allUsers = JSON.parse(localStorage.getItem("localAllUsers"));
}
function SignUp() {
  let userDetails = {
    firstname: firstName.value,
    lastname: lastName.value,
    email: email.value,
    password: pass.value,
    allTodo: [],
  };
  allUsers.push(userDetails);
  localStorage.setItem("localAllUsers", JSON.stringify(allUsers));
  window.location.href = "todoProMaxSignIn.html";
}

function signIn() {
  let found = false;
  allUsers = JSON.parse(localStorage.getItem("localAllUsers"));
  for (let index = 0; index < allUsers.length; index++) {
    if (
      allUsers[index].email == em.value &&
      allUsers[index].password == ps.value
    ) {
      localStorage.setItem("currentUserIndex", index);
      found = true;
      break;
    }
  }
  if (found) {
    window.location.href = "todoProMaxGetStarted.html";
  } else {
    alert("I no see am");
  }
}

let everyHabit = [];
if (localStorage.everydayHabit) {
  everyHabit = JSON.parse(localStorage.getItem("everydayHabit"));
}
function myHabit(myHabitImg) {
  let allMyHabit = {
    mumuHabit: myHabitImg,
  };
  everyHabit.push(allMyHabit);
  localStorage.setItem("everydayHabit", JSON.stringify(everyHabit));
}

// function next() {}
let currentUserIndex = localStorage.getItem("currentUserIndex");
everyHabit = JSON.parse(localStorage.getItem("everydayHabit"));
function addTodo() {
  if ((title.value == "")) {
    Swal.fire({
      icon: 'warning',
      title: 'Warning!',
      text: 'Please enter a todo',
      confirmButtonText: 'Ok',
      allowOutsideClick: false,
    })
  } else {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Todo added Successfully'
    })
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayss = new Date();
    let day = weekdays[dayss.getDay()];
    let userTodo = {
      todoTitle: title.value,
      todoCategory: category.value,
      todoTime: day,
      allTodo: [],
    };
    allUsers[currentUserIndex].allTodo.push(userTodo);
    localStorage.setItem("localAllUsers", JSON.stringify(allUsers));
    displayTodo();
  }
  removeAlert();
}


let editedIndex = 0 
showPreviousData = (eachTodo) => {
  editedIndex = eachTodo
  title.value = allUsers[currentUserIndex].allTodo[eachTodo].todoTitle
  category.value = allUsers[currentUserIndex].allTodo[eachTodo].todoCategory
  time.value = allUsers[currentUserIndex].allTodo[eachTodo].todoTime
}

function editTodo() {
  if (title.value == "") {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'error',
      title: 'Please enter a Todo to be updated'
    })
  } else {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayss = new Date();
    let day = weekdays[dayss.getDay()];
    let userTodo = {
      todoTitle: title.value,
      todoCategory: category.value,
      todoTime: day,
    };
    allUsers[currentUserIndex].allTodo.splice(editedIndex, 1, userTodo);
    localStorage.setItem("localAllUsers", JSON.stringify(allUsers));
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Your Todo has been updated successfully'
    })
  }
  displayTodo();
}

function delTodo(userIndex) {
  Swal.fire({
    icon: 'warning',
    title: 'Warning!',
    text: 'Are you sure you want to delete this Todo? This action cannot be undone',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Yes',
    denyButtonText: `No`,
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Todo Deleted Successfully!',
        showConfirmButton: false,
        timer: 1500
      })
      allUsers[currentUserIndex].allTodo.splice(userIndex, 1);
      localStorage.setItem("localAllUsers", JSON.stringify(allUsers));
    } else if (result.isDenied) {
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'You just cancelled, Todo not deleted!',
        showConfirmButton: false,
        timer: 1500
      })
    }
    displayTodo();
  })
}

disp.innerHTML = `
<h2 class="text-center">Welcome, ${allUsers[currentUserIndex].firstname}</h2>
`;
offcanvasName.innerHTML = `
${allUsers[currentUserIndex].firstname} <br> ${allUsers[currentUserIndex].lastname}
`;

function displayTodo() {
  dispTodo.innerHTML = "";
  currentUserTodo = allUsers[currentUserIndex].allTodo;
  currentUserTodo.reverse()
  for (let index = 0; index < currentUserTodo.length; index++) {
    dispTodo.innerHTML += `
    <div class="gen-todo flex-column">
    <div class="d-flex">
    <h3 class="text-uppercase text-light d-flex my-auto"> <input type="radio" class="mx-3"> ${currentUserTodo[index].todoTitle}</h3>
  <h6 class="text-light text-capitalize"> ${currentUserTodo[index].todoCategory}</h6>
  <h6 class="text-capitalize d-flex justify-content-center py-2 my-3 todo-time"> ${currentUserTodo[index].todoTime}</h6>
    </div>
  <div class= "actionBtn">
  <button class="warning" data-bs-toggle="modal"
  data-bs-target="#editModal" onclick="showPreviousData(${index})"><i class="fas fa-edit fs-3" ></i></button>
  <button class="danger" onclick="delTodo(${index})"><i class="fas fa-trash fs-3"></i></button>
  </div>
    </div>
  `;
  }
  localStorage.setItem("localAllUsers", JSON.stringify(allUsers));

  // if(localStorage.getItem("img")) {
  //   document.querySelector("#img").src = localStorage.getItem("img");
  //   // document.querySelector("#status").innerText = `Image Loaded!`;
  // } else {
  //   // document.querySelector("#status").innerText = `No Image!`;
  // }
}

const _ReadImage = () => {
  // document.querySelector("#status").innerText = `Reading File...`;
  let f = document.querySelector("#file");
  if(f.files && f.files[0]) {
    var reader = new FileReader();
    reader.onload = e => {
      _SaveImage(e.target.result);
    }
    reader.readAsDataURL(f.files[0]);
  }
}

// const _SaveImage = img => {
//   localStorage.setItem("img", img);
//   document.querySelector("#status").innerText = `Saved!`;
// }

setInterval(myDays);
function myDays() {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const days = new Date();
  daysTime.innerHTML = days.toDateString();
  day.innerHTML = weekday[days.getDay()] + "&nbsp; Habit";
}

function rules() {
  rulesModal.style.display = "block";
}

function closeSaveNameModal() {
  rulesModal.style.display = "none";
}

// setTimeout(function () {
//   alertMessage.style.display = "none";
// }, 5000);
function removeAlert() {
  setTimeout(() => {
    // alertMessage.className = ''
    alertMessage.innerHTML = "";
  }, 2000);
}
removeAlert();


