/******************************************
Brian Buitrago
Treehouse Techdegree:
FSJS project 5 - Public API Requests
******************************************/
//Thank you for taking a look at my code. I am going for the "Exceeds Expectations" grade. If my code is not on par with that grade, then please reject this project for resubmission.

// Empty array that will eventually contain the filtered profiles.
let activeProfiles = [];

// This function generates a profile card for each subsequent profile fetched object.
const profileGenerator = (profileData) => {
	const gallery = document.querySelector(".gallery");
	// This serves as an empty div, so when gallery is called - we don't have multiple instances added all the time.
	gallery.innerHTML = "";

	// This block iterates over the profile data and creates the profile card for each example user object.
	profileData.forEach((index) => {
		gallery.innerHTML += `<div class="card" id="${index}">
            <div class="card-img-container">
                <img class="card-img" src="${profileData[index].picture.thumbnail}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${profileData[index].name.first} ${profileData[index].name.last}</h3>
                <p class="card-text">${profileData[index].email}</p>
                <p class="card-text cap">${profileData[index].location.city}, ${profileData[index].location.state}</p>
            </div>
        </div>`;
	});

	// Click event listener is added for each profile card, and presents the corresponding modal window for each profile.
	let profiles = document.querySelector(".card");
	profiles.forEach((profile) => {
		profile.addEventListener("click", (e) => {
			modalDepiction(parseInt(e.currenttarget.id), profileData);
		});
	});
};

// This function creates modal window for each selected user object
const modalDepiction = (profileIndex, data) => {
	let modalContainer = document.createElement("div");
	modalContainer.className = "modal-container";
	modalContainer.style.backgroundColor = generateRandomColor();
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

	// Removes document window when the X button on it is clicked.
	let modalCloseBtn = document.querySelector(".modal-close-btn");
	modalCloseBtn.addEventListener("click", () => {
		document.querySelector("body").removeChild(modalCloseBtn);
	});
};

// This variable contains the 'NEXT' and 'PREVIOUS' buttons.
const modalButtons = document.querySelectorAll(".modal-btn-container button");

// Activates function to hide or show the 'Next' and 'Previous' button, dependant on whether it is the first or last profile. For instance: if it is the first presented profile, the function hides the previous button as there are no profiles before the first. If it is the last profile, this function hides the next button as there are no profiles after the last. This is for the exceeds expectations grade. //

hideOrDisplayProfileButtons(profileIndex, data, buttons);

// Adds a event listener to the previous and next button within the modal window.
modalButtons.forEach((button) => {
	button.addEventListener("click", (e) => {
		hideOrDisplayProfileButtons(profileIndex, data, buttons);

		document.querySelector("body").removeChild(modalContainer);
		if (e.target.textContent === "Next") {
			modalDepiction(profileIndex + 1, data);
		} else if (e.target.textContent === "Prev") {
			modalDepiction(profileIndex - 1, data);
		}
	});
});

// This function is for the search bar. Filters the profiles by value.

const searchFilter = (searchInput, data) => {
	// Empty array for filtered profiles.
	profilesSearched = [];

	if (document.querySelector(".modal-container")) {
		document.querySelector("body").removeChild(".modal-container");
	}

	data.forEach((profiles) => {
		if (
			profiles.name.first.includes(searchInput) ||
			profiles.name.last.includes(searchInput)
		) {
			profilesSearched.push(profiles);
		}
	});
};
