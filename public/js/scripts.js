function labelPosition() {
	let label = document.querySelector("#username").value;
	if (label != "") {
		$("#username").addClass("fixed");
	} else {
		$("#username").removeClass("fixed");
	}
}

function doSearch() {
	const username = document.querySelector("#username").value;
	const result = document.querySelector("#result");

	axios
		.get("https://api.github.com/search/users?q=" + username)
		.then(function(response) {
			const users = response.data.items;
			users.map(user => {
				const username = `
					<li>
						<img src="${user.avatar_url}" alt="${user.login}">
						<p>${user.login}<p>
						<a href="">Ver detalhes</a>
					</li>
				`;
				result.innerHTML += username;
				return user;
			});
		})
		.catch(function(error) {
			console.log(error);
		});
}
