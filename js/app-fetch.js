/******************************************
Brian Buitrago
Treehouse Techdegree:
FSJS project 5 - Public API Requests
******************************************/
//Thank you for taking a look at my code. I am going for the "Exceeds Expectations" grade. If my code is not on par with that grade, then please reject this project for resubmission.

// =====================================
//    FETCH REQUEST
// =====================================

// This is a fetch request to fetch random user profiles including address, name, birthday, email and phone number.

fetch("https://randomuser.me/api/?results=12&nat=us")
	.then((data) => data.json())
	.then((data) => {
		// Generates a profile card for each resulting profile pulled from the site.
		profileGenerator(data.results);
	});
