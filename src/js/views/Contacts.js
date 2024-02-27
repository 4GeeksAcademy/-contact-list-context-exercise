import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import EditModal from "../component/EditModal.js";

export const Contacts = () => {
	const [state, setState] = useState({
		showModal: false,
		showEditModal: false,
		idToDelete: null,
		idToEdit: null,
		showSelectedAgenda: false,
		showSelectAgendaModal: false,
		agendaOptions: []
	});

	const { store, actions } = useContext(Context);
	const [selectedAgenda, setSelectedAgenda] = useState("defaultAgenda");

	useEffect(() => {
		actions.getAgenda();
	}, []);

	console.log(store.contacts);

	return (
		<div className="container">
			<div className="">
				<p className="text-left my-3 ">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<button className="btn btn-primary ml-2" onClick={() => setState({ showSelectAgendaModal: true })}>
					Select Agenda
				</button>

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
								onEdit={() => setState({ showEditModal: true, idToEdit: item.id })}
							/>
						))}
					</ul>
				</div>
			</div>
			<Modal show={state.showModal} id={state.idToDelete} onClose={() => setState({ showModal: false })} />
			<EditModal
				show={state.showEditModal}
				id={state.idToEdit}
				onClose={() => setState({ showEditModal: false })}
			/>
			<Modal show={state.showSelectAgendaModal} onClose={() => setState({ showSelectAgendaModal: false })}>
				<h2>Select Agenda</h2>
				<form>
					<label htmlFor="agendaSelection">Choose an agenda:</label>
					<select
						id="agendaSelection"
						value={state.selectedAgenda}
						onChange={e => setState({ selectedAgenda: e.target.value })}
						className="form-control">
						{state.agendaOptions.map(option => (
							<option key={option.id} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
					<button
						type="button"
						className="btn btn-primary mt-3"
						onClick={() => {
							setState({ showSelectAgendaModal: false });
							// Puedes realizar acciones adicionales según la agenda seleccionada
							console.log("Selected Agenda:", state.selectedAgenda);
						}}>
						Save Selection
					</button>
				</form>
			</Modal>
		</div>
	);
};
