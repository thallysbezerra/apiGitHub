///// Label positioning based on Search InputText behavior
function labelPosition() {

	let label = document.querySelector("#username").value;

	if (label != "") {
		$("#username").addClass("fixed");
	} else {
		$("#username").removeClass("fixed");
	}
}

///// Pressing Enter on Search InputText, call user search function
var input = document.querySelector("#username");

input.addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.keyCode === 13) {
		document.querySelector("#doSearch").click();
	}
});

///// Close modal
$("#modalClose").click(function() {
	$(".modal").removeClass("show");
	$("body").removeClass("blockScroll");
	$("#userContent").children().remove();
	$("#userRepoContent").children().remove();
});

///// User search function
$("#doSearch").click(function() {

	const username = document.querySelector("#username").value;
	const searchResult = document.querySelector("#searchResult");

	$("#searchResult").children().remove();

	axios
		.get("https://api.github.com/search/users?q=" + username)
		.then(function(searchResponse) {
			const users = searchResponse.data.items;
			users.map(user => {
				const username = `
					<li>
						<img src="${user.avatar_url}" alt="Avatar de ${user.login}">
						<div>
							<p id="${user.login}">${user.login}</p>
							<span class="showUserDetails">See details</span>
						</div>
					</li>
				`;
				searchResult.innerHTML += username;
				return user;
			});
		})
		.catch(function(error) {
			const username = `
				<li class="result__noResult"><i class="icon-frown"></i>Não foram encontrados resultados para sua busca.</li>
			`;
			searchResult.innerHTML += username;
		});

	showUserDetails();
});

///// User details function
function showUserDetails(){
	setTimeout(function(){
 		$(".showUserDetails").click(function () {

			let userLogin = $(this).siblings().html();
			const userContent = document.querySelector("#userContent");
			const userRepoContent = document.querySelector("#userRepoContent");
		
			$(".modal").addClass("show");
			$("body").addClass("blockScroll");
			
			axios
				.get("https://api.github.com/users/" + userLogin)
				.then(function(userResponse) {
					const userData = userResponse.data;
					const userDetails = `
						<img src="${userData.avatar_url}" alt="Avatar de ${userData.login}">
						<div>
							<label>User</label>
							${ userData.login }
							<label>Name</label>
							${ userData.name ? userData.name : 'Name not available' }
							<label>Followers</label>
							${ userData.followers }
							<label>Following</label>
							${ userData.following }
							<label>E-mail</label>
							${ userData.email ? userData.email : 'E-mail not available' }
							<label>Bio</label>
							${ userData.bio ? userData.bio : 'Bio not available' }
						</div>
					`;
					userContent.innerHTML += userDetails;
				});

			axios
				.get("https://api.github.com/users/" + userLogin + "/repos")
				.then(function(userRepoResponse) {
					const usersRepo = userRepoResponse.data;

					function compare(a,b) {
						if (a.stargazers_count < b.stargazers_count)
						  return -1;
						if (a.stargazers_count > b.stargazers_count)
						  return 1;
						return 0;
					}

					usersRepo.sort(compare);
					usersRepo.reverse();

					usersRepo.sort(userRepo => {
						const userRepoDatails = `
							<li>
								<div>
									<label>Name</label>
									<a href="${userRepo.html_url}" target="_blank">${userRepo.name}</a>
									<label>Description</label>
									${ userRepo.description ? userRepo.description : 'Description not available' }
								</div>
								<div>
									<label>Stars</label>
									<span>${userRepo.stargazers_count}</span>
									<label>Language</label>
									<span>${userRepo.language}</span>
								</div>
							</li>
						`;
						userRepoContent.innerHTML += userRepoDatails;
						return userRepo;
					})
				});
		 });
		 
		 $(".modal").focus();
 
	}, 1000);
};