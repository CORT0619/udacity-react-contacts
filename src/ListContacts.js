import React, {Component} from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import { Link } from 'react-router-dom';

// function ListContacts(props) {
//   return (
//     <ol className="contact-list">
//     {props.contacts.map(contact => (
//     <li key={contact.id} className="contact-list-item">
//       <div className="contact-avatar" style={{
//         backgroundImage: `url(${contact.avatarURL})`
//       }}/>
//       <div className="contact-details">
//         <p>{contact.name}</p>
//         <p>{contact.email}</p>
//       </div>
//       <button onClick={() => props.onDeleteContact(contact)} className="contact-remove">Remove</button>
//     </li>))}
//     </ol>
//   )
// }
// ListContacts.propTypes = {
//   contacts: PropTypes.array.isRequired,
//   onDeleteContact: PropTypes.func.isRequired
// };

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  };

  state = {
    query: ''
  };

  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    })
  }  

  clearQuery = () => {
    this.setState({
      query: ''
    });
  }

  render() {
    let showingContacts;
    const { contacts, onDeleteContact } = this.props;
    const { query }= this.state;

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingContacts = contacts.filter((contact) => match.test(contact.name))

    } else {
      showingContacts = contacts;
    }

    showingContacts.sort(sortBy('name'));

    return (
      <div className="list-contacts">
        {JSON.stringify(this.state)}
        <div className="list-contacts-top">
          <input className="search-contacts" type="text" placeholder="Search contacts" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} />
          {/* <a
            href="#create"
            onClick={this.props.onNavigate}
            className="add-contact"
          >Add Contact</a> */}
          <Link
            to="/create"
            className="add-contact"
          >Add Contact</Link>
        </div>

        {showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>Now showing {showingContacts.length} of {contacts.length} total</span>
            <button onClick={this.clearQuery}>Show All</button>
          </div>
        )}
        <ol className="contact-list">
        {showingContacts.map(contact => (
        <li key={contact.id} className="contact-list-item">
          <div className="contact-avatar" style={{
            backgroundImage: `url(${contact.avatarURL})`
          }}/>
          <div className="contact-details">
            <p>{contact.name}</p>
            <p>{contact.email}</p>
          </div>
          <button onClick={() => onDeleteContact(contact)} className="contact-remove">Remove</button>
        </li>))}
        </ol>
      </div>
    )
  }
}

export default ListContacts;