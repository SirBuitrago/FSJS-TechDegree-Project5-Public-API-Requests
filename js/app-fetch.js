/******************************************
Brian Buitrago
Treehouse Techdegree:
FSJS project 5 - Public API Requests
******************************************/
//Thank you for taking a look at my code. I am going for the "Exceeds Expectations" grade. If my code is not on par with that grade, then please reject this project for resubmission.

// =====================================
//    FETCH REQUEST
// =====================================

// This is a fetch request to fetch 12 random user profiles including address, name, birthday, email and phone number.

fetch(
	"https://randomuser.me/api/?results=12&inc=name,location,email,picture,cell,dob&nat=us"
)
	.then((data) => data.json())
	.then((data) => {
		// Generates a profile card for each resulting profile pulled from the site data.
		profileGenerator(data.results);

		// Submits event listener
		document.querySelector("form").addEventListener("submit", (e) => {
			e.preventDefault();
			searchFilter(
				e.target.firstElementChild.value.toLowerCase(),
				data.results
			);
		});
	});

//.catch((error) => console.log("Ran into an issue, error occured", error));

// =====================================
//    SEARCH BAR
// =====================================

// Here I dynamically add the search bar to the page.

document.querySelector(
	".search-container"
).innerHTML = `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
//
