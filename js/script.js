/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

function showPage (list, page) {
   const studentList = document.querySelector(".student-list");
   let pageStart = (page * 9) - 9;
   let pageEnd = page * 9;
   list.forEach(function(student, index) {
      if (index >= pageStart && index < pageEnd) {
         studentList.innerHTML += `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${student.picture.thumbnail}" alt="profile-picture">
               <h3>${student.name.first}  ${student.name.last}</h3>
               <span class="email">${student.email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${student.registered.date}</span>
            </div>
         </li>
         `
      } 
   });
}

function addPagination (list) {
   const linkList = document.querySelector(".link-list"); 
   const numberOfPages = Math.ceil(list.length / 9);
   linkList.innerHTML = ""
   for (let i = 1; i <= numberOfPages; i++) {
      linkList.innerHTML += `
      <li>
         <button type="button" class="pagination">${i}</button>
      </li>
      `
   }
   const active = document.querySelector("button")
   active.className = "active"
   
   linkList.addEventListener("click", e => {
      const target = e.target;
      if (target.type === "button") {
         const newPage = parseInt(target.innerText);
         const studentList = document.querySelector(".student-list");   
         document.querySelector(".active").className = "";
         target.className = "active";

         studentList.innerHTML = ""
         showPage(list, newPage);
      }
   })
}

showPage(data, 1);
addPagination(data)

function addSearchBar() {
   const header = document.querySelector("header");
   header.innerHTML += `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button" id="search-button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `;
}
addSearchBar();


const searchBar = document.getElementById("search");
const submit = document.getElementById("search-button")

function searchPagination (filteredList) {
   const linkList = document.querySelector(".link-list"); 
   const numberOfPages = Math.ceil(filteredList.length / 9);
   linkList.innerHTML = ""
   for (let i = 1; i <= numberOfPages; i++) {
      linkList.innerHTML += `
      <li>
         <button type="button" class="pagination">${i}</button>
      </li>
      `
   }
   const active = document.querySelector("button")
   active.className = "active"
   
   linkList.addEventListener("click", e => {
      const target = e.target;
      if (target.type === "button") {
         const newPage = parseInt(target.innerText);
         const studentList = document.querySelector(".student-list");   
         document.querySelector(".active").className = "";
         target.className = "active";

         studentList.innerHTML = ""
         showPage(filteredList, newPage);
      }
   })
}

function searchFunction(list, page) {
      const studentList = document.querySelector(".student-list");
      let pageStart = (page * 9) - 9;
      let pageEnd = page * 9;
      let filteredList = []
      list.forEach(function(student, index) {
         if(student.name.first.toLowerCase().includes(searchBar.value.toLowerCase()) || student.name.last.toLowerCase().includes(searchBar.value.toLowerCase())){
            filteredList.push(student)
         }
      });
      filteredList.forEach(function(student, index){
         if (index >= pageStart && index < pageEnd) {
               studentList.innerHTML += `
               <li class="student-item cf">
                  <div class="student-details">
                     <img class="avatar" src="${student.picture.thumbnail}" alt="profile-picture">
                     <h3>${student.name.first}  ${student.name.last}</h3>
                     <span class="email">${student.email}</span>
                  </div>
                  <div class="joined-details">
                     <span class="date">Joined ${student.registered.date}</span>
                  </div>
               </li>
               `
            }
         });
          
         searchPagination(filteredList)
   } 



searchBar.addEventListener("keyup", () => {
   const studentList = document.querySelector(".student-list");   
   studentList.innerHTML = "";
   searchFunction(data, 1);
   if (studentList.innerHTML === "") {
      studentList.innerHTML += `<p style="font-size: 2rem; text-align: center"> No results found</p>`;
   }
})

submit.addEventListener("click", () =>{
   const studentList = document.querySelector(".student-list");   
   studentList.innerHTML = "";
   searchFunction(data, 1);
   if (studentList.innerHTML === "") {
      studentList.innerHTML += `<p style="font-size: 2rem; text-align: center"> No results found</p>`
   }
})
