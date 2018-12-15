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
	const result = document.querySelector("#result");

	$("#result").children().remove();

	axios
		.get("https://api.github.com/search/users?q=" + username)
		.then(function(searchResponse) {
			const users = searchResponse.data.items;
			users.map(user => {
				const username = `
					<li>
						<img src="${user.avatar_url}" alt="${user.login}">
						<div>
							<p id="${user.login}">${user.login}</p>
							<span class="teste">Ver detalhes</span>
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

	teste();
});

// User details
function teste(){
	setTimeout(function(){

		$(".teste").click(function () {
			var usuario = $(this).siblings().html();
			console.log(usuario)
		
			$(".modal").addClass("show");
			$("body").addClass("blockScroll");
			
			axios
			.get("https://api.github.com/users/" + usuario)
			.then(function(userResponse) {
				console.log(userResponse.data);
			})
			.catch(function(error) {
				console.log(error)
			});

		});
 
	}, 1000);
 };

function hideModalUserDetails() {
	$(".modal").removeClass("show");
	$("body").removeClass("blockScroll");
}