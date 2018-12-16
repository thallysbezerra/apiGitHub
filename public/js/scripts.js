// Label positioning based on Search InputText behavior
function labelPosition() {
	let label = document.querySelector("#username").value;
	if (label != "") {
		$("#username").addClass("fixed");
	} else {
		$("#username").removeClass("fixed");
	}
}

// Pressing Enter on Search InputText, call user search function
var input = document.querySelector("#username");

input.addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.keyCode === 13) {
		document.querySelector("#doSearch").click();
	}
});

// User serch function
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
							<span class="showUserDetails">Ver detalhes</span>
						</div>
					</li>
				`;
				searchResult.innerHTML += username;
				return user;
			});
		})
		.catch(function(error) {
			const username = `
				<li class="result__noResult"><i class="fa fa-frown"></i>Não foram encontrados resultados para sua busca.</li>
			`;
			searchResult.innerHTML += username;
		});

	showUserDetails();
});

// User details
function showUserDetails(){
	setTimeout(function(){
 		$(".showUserDetails").click(function () {

			let userLogin = $(this).siblings().html();
			const userContent = document.querySelector("#userContent");
		
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
					</div>
					<div>
						<label>Name</label>
						${ userData.name ? userData.name : 'Nome indisponível' }
					</div>
					<div>
						<label>Bio</label>
						${ userData.bio ? userData.bio : 'Bio indisponível' }
					</div>
					<div>
						<label>E-mail</label>
						${ userData.email ? userData.email : 'E-mail indisponível' }
					</div>
					<div>
						<label>Seguidores</label>
						${ userData.followers }
					</div>
					<div>
						<label>Seguindo</label>
						${ userData.following }
					</div>
				`;
				userContent.innerHTML += userDetails;
			});
		 });
		 
		 $(".modal").focus();
 
	}, 1000);
};

$("#modalClose").click(function() {
	$(".modal").removeClass("show");
	$("body").removeClass("blockScroll");
	$("#userContent").children().remove();
});