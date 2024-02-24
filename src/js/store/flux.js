const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			getAgenda: () => {
				fetch("https://playground.4geeks.com/apis/fake/contact/agenda/my_super_agenda")
					.then(response => response.json())
					.then(data => setStore({ contacts: data }))
					.catch(error => console.log(error));
			},

			createContact: (name, email, phone, address) => {
				fetch("https://playground.4geeks.com/apis/fake/contact/", {
					method: "POST",
					body: JSON.stringify({
						full_name: name,
						email: email,
						agenda_slug: "my_super_agenda",
						address: address,
						phone: phone
					}),
					headers: {
						"Content-type": "application/json"
					}
				})
					.then(response => response.json())
					.then(data => console.log({ contacts: data }))
					.catch(error => console.log(error));
			},

			deleteContact: id => {
				fetch("https://playground.4geeks.com/apis/fake/contact/" + id, {
					method: "DELETE"
				})
					.then(response => {
						console.log(response.status);
						if (response.status === 201) {
							getActions().getAgenda();
						}
						return response.json();
					})
					.then(data => console.log(data))
					.catch(error => console.log(error));
			},

			updateContact: (name, email, phone, address) =>{}
		}
	};
};

export default getState;
