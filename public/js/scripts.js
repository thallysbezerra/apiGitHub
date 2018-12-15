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
function doSearch() {
	const username = document.querySelector("#username").value;
	const result = document.querySelector("#result");

	$("#result").children().remove();

	axios
		.get("https://api.github.com/search/users?q=" + username)
		.then(function(response) {
			const users = response.data.items;
			console.log(response.data.items);
			users.map(user => {
				const username = `
					<li>
						<img src="${user.avatar_url}" alt="${user.login}">
						<div>
							<p>${user.login}</p>
							<span onclick="showUserDetails()">Ver detalhes</span>
						</div>
					</li>
				`;
				result.innerHTML += username;
				return user;
			});
		})
		.catch(function(error) {
			const username = `
				<li class="result__noResult"><i class="fa fa-frown"></i>Não foram encontrados resultados para sua busca.</li>
			`;
			result.innerHTML += username;
		});
}

function showUserDetails() {
	$(".modal").addClass("show");
	$("body").addClass("blockScroll");
}

function hideUserDetails() {
	$(".modal").removeClass("show");
	$("body").removeClass("blockScroll");
}