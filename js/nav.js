// Toggle variables
let aboutmeToggle = false;
let projectsToggle = false;
let contactToggle = false;

// All the navbar items
let _aboutme = document.getElementById("aboutme-content");
let _projects = document.getElementById("projects-content");
let _contact = document.getElementById("contact-content");

// Functions for the navbar
function aboutme() {
  switch (aboutmeToggle) {
    case false:
      _projects.style.visibility = "hidden";
      _projects.style.opacity = 0;
      projectsToggle = false;
      _contact.style.visibility = "hidden";
      _contact.style.opacity = 0;
      contactToggle = false;
      setTimeout(() => {
        _aboutme.style.visibility = "visible";
        _aboutme.style.opacity = 1;
        aboutmeToggle = true;
      }, 500);
      break;
    case true:
      _aboutme.style.opacity = 0;
      setTimeout(() => {
        _aboutme.style.visibility = "hidden";
        aboutmeToggle = false;
      }, 500);
      break;
  }
}
function projects() {
  switch (projectsToggle) {
    case false:
      _aboutme.style.visibility = "hidden";
      _aboutme.style.opacity = 0;
      aboutmeToggle = false;
      _contact.style.visibility = "hidden";
      _contact.style.opacity = 0;
      contactToggle = false;
      setTimeout(() => {
        _projects.style.visibility = "visible";
        _projects.style.opacity = 1;
        projectsToggle = true;
      }, 500);
      break;
    case true:
      _projects.style.opacity = 0;
      setTimeout(() => {
        _projects.style.visibility = "hidden";
        projectsToggle = false;
      }, 500);
      break;
  }
}
function contact() {
  switch (contactToggle) {
    case false:
      _aboutme.style.visibility = "hidden";
      _aboutme.style.opacity = 0;
      aboutmeToggle = false;
      _projects.style.visibility = "hidden";
      _projects.style.opacity = 0;
      projectsToggle = false;
      setTimeout(() => {
        _contact.style.visibility = "visible";
        _contact.style.opacity = 1;
        contactToggle = true;
      }, 500);
      break;
    case true:
      _contact.style.opacity = 0;
      setTimeout(() => {
        _contact.style.visibility = "hidden";
        contactToggle = false;
      }, 500);
      break;
  }
}

function copyDiscord() {
  const notification = document.getElementById("copy-stuff");
  notification.style.opacity = "100%";
  navigator.clipboard.writeText("Majus-Dev#2533");
  setTimeout(() => {
    notification.style.opacity = "0%";
  }, 2000);
}
// Eventlisteners for the navbar
document.getElementById("aboutme").addEventListener("click", aboutme);
document.getElementById("projects").addEventListener("click", projects);
document.getElementById("contact").addEventListener("click", contact);