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

			createContact: (name, email, phone, address, agenda) => {
				fetch("https://playground.4geeks.com/apis/fake/contact/", {
					method: "POST",
					body: JSON.stringify({
						full_name: name,
						email: email,
						agenda_slug: agenda,
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
			}
		}
	};
};

export default getState;
