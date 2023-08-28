//Variables
const searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-container");
const root = document.documentElement.style;
const get = (param) => document.getElementById(`${param}`);
const url = "https://api.github.com/users/";
const noresults = get("no-results");
const btnmode = get("btn-mode");
const modetext = get("mode-text");
const modeicon = get("mode-icon");
const btnsubmit = get("submit");
const input = get("input");
const avatar = get("avatar");
const userName = get("name");
const user = get("user");
const date = get("date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");   
const company = get("company");

// Event Listeners
btnsubmit.addEventListener("click", () => {
  if (input.value !== "") {
    getUserData(url + input.value);
  }
});

input.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      if (input.value !== "") {
        getUserData(url + input.value);
      }
    }
  }
);

input.addEventListener("input", ()=> {
  noresults.style.display = "none";
});

btnmode.addEventListener("click", () => {
  if (darkMode == false) {
    // console.log("inside if, darkMode = ", darkMode)
    applyDarkMode();
    // console.log("After applying Dark Mode , darkMode = ", darkMode)
  } else {
    // console.log("inside else, darkMode" ,darkMode)
    applyLightMode();
    // console.log("After applying Light Mode , darkMode = " ,darkMode)
  }
});

// Functions

let darkMode = false; // Then Apply Dark Mode
// Initialise UI
function init(){

  //1- WITHOUT CONSIDERING USER PREFERENCE:-
  const value = localStorage.getItem("dark-mode");
  console.log(value);
  console.log(typeof(value));
  if(value == null){
    localStorage.setItem("dark-mode" , dakrMode);
  }
  else if(value == "true"){
    applyDarkMode();
  }
  else if(value == "false"){
    applyLightMode();
  }

// //2- CONSEDERING USER PREFERRED MODE ON BROWSER -> using window.matchMedia API:-
  // const userPreference = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches; // Asking browser is user preferred dark mode , if yes then it returns true
  // console.log("Is User Preferred Dark Mode ? = " ,userPreference);
  // if (localStorage.getItem("dark-mode")) {
  //   darkMode = localStorage.getItem("dark-mode");
  //   applyDarkMode();
  // } else {
  //   localStorage.setItem("dark-mode", userPreference);
  //   darkMode = userPreference;
  //   applyLightMode();
  // }


// // TESTING:-
  // const userPreference = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches; 
  // console.log("Is User Preferred Dark Mode ? = " ,userPreference);
  // const value = localStorage.getItem("dark-mode");
  // if (value == "true") {
  //   // console.log("inside if local storage value = " , value ," darkMode = " ,  darkMode)
  //   darkMode = localStorage.getItem("dark-mode");
  //   // console.log("value of darkMode inside localStorage " ,darkMode)
  //   applyDarkMode();
  // } else {
  //   console.log("inside else value = " , value)
  //   // value = userPreference;
  //   value.replace("false", userPreference.toString())
  //   // console.log("inside else userprefence = " , userPreference ," darkMode = " ,  darkMode)
  //   darkMode = userPreference;
  //   console.log(darkMode)
  //   applyLightMode();
  // }


  getUserData(url + "intakhab1");

}
init();


// Switch to Dark mode
function applyDarkMode() {
  root.setProperty("--lm-bg", "#141D2F");
  root.setProperty("--lm-bg-content", "#1E2A47");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  modetext.innerText = "LIGHT";
  modeicon.src = "./assets/images/sun-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(1000%)");
  darkMode = true;
  localStorage.setItem("dark-mode", darkMode);
}
// Switch to light mode
function applyLightMode() {
  root.setProperty("--lm-bg", "#F6F8FF");
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  modetext.innerText = "DARK";
  modeicon.src = "./assets/images/moon-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  darkMode = false;
  localStorage.setItem("dark-mode", darkMode);
}

// API call
function getUserData(gitUrl) {
  fetch(gitUrl)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      updateProfile(data);
    })
    .catch((error) => {
      throw error;
    });
}
// Render data 
function updateProfile(data) {
  if (data.message !== "Not Found") {
    noresults.style.display = "none";
    function checkNull(param1, param2) {
      if (param1 === "" || param1 === null) {
        param2.style.opacity = 0.5;
        param2.previousElementSibling.style.opacity = 0.5;
        return false;
      } else {
        return true;
      }
    }
    avatar.src = `${data.avatar_url}`;
    userName.innerText = data.name === null ? data.login : data.name;
    user.innerText = `@${data.login}`;
    user.href = `${data.html_url}`;
    datesegments = data.created_at.split("T").shift().split("-");
    date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
    bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
    repos.innerText = `${data.public_repos}`;
    followers.innerText = `${data.followers}`;
    following.innerText = `${data.following}`;
    user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
    page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
    page.href = checkNull(data.blog, page) ? data.blog : "#";
    twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
    twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
    company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
    searchbar.classList.toggle("active");
    profilecontainer.classList.toggle("active");
  } else {
    noresults.style.display = "block";
  }
}
