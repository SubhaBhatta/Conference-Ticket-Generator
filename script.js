const submitBtn = document.querySelector("#submit");
const main = document.querySelector("main");
const section = document.querySelector("section");
const congratsSpan = document.querySelector("h1 span");
const fullName = document.querySelector(".fullname");
const email = document.querySelector("input[type='email']");
const emailSpan = document.querySelector(".ticket-info span");
const githubInfo = document.querySelector(".github-info");
const fileInput = document.querySelector("#file-upload");
const fileLabel = document.querySelector(".file-label");
const changeImageBtn = document.querySelector("#change-image");
const actionsBtn = document.querySelector(".actions");
const avatarPara = document.querySelector(".avatar p");
const dropArea = document.querySelector("#drop-area");
const image = document.querySelector("#preview");
const genImage = document.querySelector(".generated-image");
const generatedName = document.querySelector(".gen-name");

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.stopPropagation();
  dropArea.classList.add("dragging");
});

dropArea.addEventListener("dragleave", (e) => {
  e.preventDefault();
  e.stopPropagation();
  dropArea.classList.remove("dragging");
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  e.stopPropagation();
  dropArea.classList.remove("dragging");
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    handleFiles(files);
  }
  displayImage(files);
});

function handleFiles(files) {
  const file = files[0];
  if (file && file instanceof Blob) {
    displayImage({ target: { files: [file] } });
    fileInput.files = files;
  } else {
    console.error("File is not a Blob");
  }
}

function displayImage(event) {
  const file = event.target.files[0];
  if (file && file instanceof Blob) {
    const reader = new FileReader();
    reader.onload = function () {
      if (reader.readyState === 2) {
        image.src = reader.result;
        image.style.display = "block";
      }
    };
    reader.readAsDataURL(file);
    fileLabel.style.display = "none";
    avatarPara.style.display = "none";
    actionsBtn.style.display = "flex";
  } else {
    console.error("File is not a Blob");
  }
}

function removeImage() {
  image.src = "#";
  image.style.display = "none";
  fileInput.value = "";
  fileLabel.style.display = "block";
  avatarPara.style.display = "block";
  actionsBtn.style.display = "none";
}

changeImageBtn.addEventListener("click", () => {
  fileInput.click();
});

function capitalizeName(name) {
  return name
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

submitBtn.addEventListener("click", (e) => {
  let formValid = true;
  const inputElements = document.querySelectorAll(
    "input[type='text'], input[type='email']"
  );

  inputElements.forEach((input) => {
    const span = input.nextElementSibling;
    if (!input.validity.valid) {
      formValid = false;
      if (span && span.tagName === "SPAN") {
        span.style.display = "block";
        input.style.border = "1px solid var(--Orange-700)";
      }
    } else {
      if (span && span.tagName === "SPAN") {
        span.style.display = "none";
        input.style.border = "1px solid var(--Green-600-medium)";
      }
    }
  });

  if (formValid) {
    main.style.display = "none";
    section.style.display = "block";
    congratsSpan.innerHTML = `${capitalizeName(fullName.value)}!`;
    emailSpan.innerHTML = `${email.value} `;
    genImage.src = image.src;
    genImage.style.display = "block";
    generatedName.innerHTML = `${capitalizeName(fullName.value)}`;
    const generatedGithub = document.querySelector(".gen-github");
    generatedGithub.innerHTML = `${githubInfo.value}`;
  }
});

