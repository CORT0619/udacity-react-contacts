import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';

class App extends Component {

  state = {
    // screen: 'list', // list, create
    contacts: []
  };

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts });
    })
    .catch(() => {

    });
  }

  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }));

    ContactsAPI.remove(contact);
  };

  createContact (contact) {
    ContactsAPI.create(contact)
      .then(contact => {
        this.setState(state => ({
          contacts: state.contacts.concat([ contact ])
        }))
      });
  }

  render() {
    return (
      <div className="app">
        {/* {this.state.screen === 'list' && ( */}
          <Route exact path="/" render={() => (
            <ListContacts 
              onDeleteContact={this.removeContact} 
              contacts={this.state.contacts}
              // onNavigate={() => {
              //   this.setState({screen: 'create'})
              // }}
            />
          )} />
        {/* )} */}
        {/* <Route path="/create" component={CreateContact}/> */}
        <Route path="/create" render={({ history }) => (
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact);
              history.push('/');
            }}/>
        )}/>
      </div>
    );
  }
}

export default App;

// class ContactList extends Component {

//   render() {
//     // const people = [
//     //   { name: 'Michael'},
//     //   { name: 'Ryan'},
//     //   { name: 'Tyler'}
//     // ];
//     const people = this.props.contacts;

//     return <ol>
//       {people.map(person => (
//         <li key={person.name}>{person.name}</li>
//       ))}
//     </ol>
//   }
// }

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <ContactList contacts={[
//           { name: 'Michael'},
//           { name: 'Ryan'},
//           { name: 'Tyler'}
//         ]} />

//         <ContactList contacts={[
//           { name: 'Jane'},
//           { name: 'Crystal'},
//           { name: 'Rochelle'}
//         ]} />
//       </div>
//     );
//   }
// }

// export default App;
