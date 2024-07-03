const submitButton = document.getElementById("form-submit");
const form = document.getElementsByTagName("form");
const successMessage = document.getElementById("success-message");

const updateState = (message) => {
  submitButton.innerText = message;
};

const handleSuccess = () => {
  updateState("Success!");

  setTimeout(() => {
    // hide the form
    form[0].style.display = "none";

    // display success message
    successMessage.style.display = "block";
  }, 1000);
};

const handleError = () => {
  updateState("Something went wrong!");

  setTimeout(() => {
    updateState("Schedule a call");
  }, 1500);
};

const submitForm = (event) => {
  // prevents form from refreshing page

  event.preventDefault();

  // update the state
  updateState("Submitting...");

  // process the form data
  const formData = new FormData(event.target);

  // plain object for form data
  const formObject = {};

  // populate object
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  // create JSON string
  const jsonString = JSON.stringify(formObject);

  // submit to formspark
  fetch("https://submit-form.com/iZJ8JdVKM", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: jsonString,
  })
    .then(function (response) {
      // update state again
      if (response.ok) {
        handleSuccess();
      } else {
        throw new Error();
      }
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
      handleError();
    });
};
