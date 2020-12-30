/******************************************
Brian Buitrago
Treehouse Techdegree:
FSJS project 5 - Public API Requests
******************************************/
//Thank you for taking a look at my code. I am going for the "Exceeds Expectations" grade. If my code is not on par with that grade, then please reject this project for resubmission.

// =====================================
//    GENERAL CODE & FUNCTIONS
// =====================================

// =====================================
//    WINDOW COLOR RANDOMIZER [for exceeds grade]
// =====================================

// Random Color generator for modal windows as you look through them.

const colorRandomizer = () => {
	let numbers = [];

	while (numbers.length < 3) {
		numbers.push(Math.floor(Math.random() * (255 - 0 + 1) + 0));
	}

	let newColor = `rgba(${numbers[0]},${numbers[1]},${numbers[2]},0.5)`;
	return newColor;
};

// =======================================================
//    PROFILE GENERATOR AND GALLERY CARD CREATOR FUNCTION
// =======================================================

// Empty array that will eventually contain the filtered profiles.
let activeProfiles = [];

// This function generates a profile or gallery card for each subsequent profile fetched object.
const profileGenerator = (profileData) => {
	const gallery = document.querySelector(".gallery");
	// This serves as an empty div, so when gallery is called - we don't have multiple instances added all the time.
	gallery.innerHTML = "";

	// This block iterates over the profile data and creates the profile card for each example user object.
	for (let i = 0; i < profileData.length; i++) {
		gallery.innerHTML += `<div class="card" id="${i}">
            <div class="card-img-container">
                <img class="card-img" src="${profileData[i].picture.thumbnail}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${profileData[i].name.first} ${profileData[i].name.last}</h3>
                <p class="card-text">${profileData[i].email}</p>
                <p class="card-text cap">${profileData[i].location.city}, ${profileData[i].location.state}</p>
            </div>
        </div>`;
	}

	// Click event listener is added for each profile card, and presents the corresponding modal window for each profile.
	let profiles = document.querySelectorAll(".card");
	profiles.forEach((profile) => {
		profile.addEventListener("click", (e) => {
			modalDepiction(parseInt(e.currentTarget.id), profileData);
		});
	});
};

// =====================================
//    MODAL WINDOW GENERATOR FUNCTION
// =====================================

// This function creates a modal window for each selected user object.

const modalDepiction = (profileIndex, data) => {
	let modalContainer = document.createElement("div");

	modalContainer.className = "modal-container";

	modalContainer.innerHTML = `<div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${
									data[profileIndex].picture.thumbnail
								}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${
									data[profileIndex].name.first
								} ${data[profileIndex].name.last}</h3>
                <p class="modal-text">${data[profileIndex].email}</p>
                <p class="modal-text cap">${
									data[profileIndex].location.city
								}</p>
                <hr>
                <p class="modal-text">${data[profileIndex].cell}</p>
                <p class="modal-text">${data[profileIndex].location.street}, ${
		data[profileIndex].location.state
	}, ${data[profileIndex].location.postcode}</p>
                <p class="modal-text">Birthday: ${data[
									profileIndex
								].dob.date.substring(0, 10)}</p>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
		</div>`;

	document.querySelector("body").appendChild(modalContainer);
	let modalInfo = document.querySelector(".modal-info-container");
	modalInfo.style.backgroundColor = colorRandomizer();

	// Removes document window when the X button on it is clicked.
	let modalCloseBtn = document.querySelector(".modal-close-btn");
	modalCloseBtn.addEventListener("click", () => {
		document
			.querySelector("body")
			.removeChild(document.querySelector(".modal-container"));
	});

	// This variable contains the 'NEXT' and 'PREVIOUS' buttons.
	const modalButtons = document.querySelectorAll(".modal-btn-container button");

	// This function controls whether or not the Next and Previous buttons are displayed. (found below line-148).

	hideOrDisplayProfileButtons(profileIndex, data, modalButtons);

	// Adds a event listener to the previous and next button within the modal window.
	modalButtons.forEach((buttons) => {
		buttons.addEventListener("click", (e) => {
			hideOrDisplayProfileButtons(profileIndex, data, modalButtons);

			document.querySelector("body").removeChild(modalContainer);
			if (e.target.textContent === "Next") {
				modalDepiction(profileIndex + 1, data);
			} else if (e.target.textContent === "Prev") {
				modalDepiction(profileIndex - 1, data);
			}
		});
	});
};

// =====================================
//    SEARCH FUNCTION
// =====================================

// This function is for the Search Bar. Filters the profiles by value.

const searchFilter = (searchInput, data) => {
	// Empty array for filtered profiles.
	activeProfiles = [];

	if (document.querySelector(".modal-container")) {
		document.querySelector("body").removeChild(".modal-container");
	}

	data.forEach((profiles) => {
		if (
			profiles.name.first.includes(searchInput) ||
			profiles.name.last.includes(searchInput)
		) {
			activeProfiles.push(profiles);
		}
	});

	// This calls on the remove or display function, for any potential error messages, wrapped within this function.
	errorMessagePresence(activeProfiles);

	// This function generates the profile cards for the search function values.
	profileGenerator(activeProfiles);
};

// =====================================
//    HIDE OR DISPLAY BUTTONS FUNCTION
// =====================================

// This functions either hides or shows the 'Next' and 'Previous' button, dependant on whether it is the first or last profile. For instance: if it is the first presented profile, the function hides the previous button as there are no profiles before the first. If it is the last profile, this function hides the next button as there are no profiles after the last. This is for the exceeds expectations grade. //

const hideOrDisplayProfileButtons = (currentProfile, data, buttons) => {
	if (currentProfile === 0 && data.length === 1) {
		buttons[0].style.visibility = "hidden";
		buttons[1].style.visibility = "hidden";
	} else if (currentProfile === 0) {
		buttons[0].style.visibility = "hidden";
		buttons[1].style.visibility = "visible";
	} else if (currentProfile === data.length - 1) {
		buttons[0].style.visibility = "visible";
		buttons[1].style.visibility = "hidden";
	}
};

// =====================================
//    ERROR MESSAGE DISPLAY FUNCTION
// =====================================

// This function controls the presence or display of the error messages. By creating and appending the error message dynamically if their is one (an error). Or hiding the error message if their isn't an "error".

const errorMessagePresence = (results) => {
	if (results.length === 0) {
		if (document.querySelector(".errorMessage") === null) {
			let noProfiles = document.createElement("p");
			noProfiles.className = "errorMessage";
			noProfiles.textContext =
				"Sorry. That search produced no results. Give it another go?";
			document.querySelector("body").insertBefore(noProfiles, gallery);
		}
	} else {
		if (document.querySelector(".errorMessage") !== null) {
			document.querySelector(".errorMessage").style.display = "none";
		}
	}
};
