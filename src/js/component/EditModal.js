import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext.js";

export const EditModal = props => {
	const [state, setState] = useState({
		//initialize state here
	});

	const [editName, setEditName] = useState("");
	const [editEmail, setEditEmail] = useState("");
	const [editPhone, setEditPhone] = useState("");
	const [editAddress, setEditAddress] = useState("");

	const { store, actions } = useContext(Context);

	function editContact() {
		actions.updateContact(editName, editEmail, editPhone, editAddress);
		props.onClose();
	}

	return (
		<div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Edit Contact</h5>
						{props.onClose ? (
							<button
								onClick={() => props.onClose()}
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						) : (
							""
						)}
					</div>
					<div className="modal-body">
						<div className="form-group">
							<label>Full Name</label>
							<input
								type="text"
								className="form-control"
								placeholder="Full Name"
								onChange={e => setEditName(e.target.value)}
								value={editName}
							/>
						</div>
						<div className="form-group">
							<label>Email</label>
							<input
								type="email"
								className="form-control"
								placeholder="Enter email"
								onChange={e => setEditEmail(e.target.value)}
								value={editEmail}
							/>
						</div>
						<div className="form-group">
							<label>Phone</label>
							<input
								type="phone"
								className="form-control"
								placeholder="Enter phone"
								onChange={e => setEditPhone(e.target.value)}
								value={editPhone}
							/>
						</div>
						<div className="form-group">
							<label>Address</label>
							<input
								type="text"
								className="form-control"
								placeholder="Enter address"
								onChange={e => setEditAddress(e.target.value)}
								value={editAddress}
							/>
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-primary">
							Back to contacts
						</button>
						<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={editContact}>
							Save changes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
/**
 * Define the data-types for
 * your component's properties
 **/
EditModal.propTypes = {
	history: PropTypes.object,
	onClose: PropTypes.func,
	show: PropTypes.bool,
	id: PropTypes.number
};

/**
 * Define the default values for
 * your component's properties
 **/
EditModal.defaultProps = {
	show: false,
	onClose: null
};

export default EditModal;
