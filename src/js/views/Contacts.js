import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import EditModal from "../component/EditModal.js";

export const Contacts = () => {
	const [state, setState] = useState({
		showModal: false,
		idToDelete: null
	});

	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getAgenda();
	}, []);

	console.log(store.contacts);

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{/* <ContactCard onDelete={() => setState({ showModal: true })} />
						<ContactCard />
						<ContactCard />
						<ContactCard /> */}
						{store.contacts.map((item, index) => (
							<ContactCard
								infoContact={item}
								key={item.id}
								onDelete={() => setState({ showModal: true, idToDelete: item.id })}
								onEdit={() => setState({ showModal: true })}
							/>
						))}
					</ul>
				</div>
			</div>
			<Modal
				show={state.showModal}
				id={state.idToDelete}
				edit={state.editContact}
				onClose={() => setState({ showModal: false })}
			/>
			<EditModal show={state.showModal} edit={state.editContact} onClose={() => setState({ showModal: false })} />
		</div>
	);
};
