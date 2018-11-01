import React, { Component } from 'react';

class ContactList extends Component {

  render() {
    // const people = [
    //   { name: 'Michael'},
    //   { name: 'Ryan'},
    //   { name: 'Tyler'}
    // ];
    const people = this.props.contacts;

    return <ol>
      {people.map(person => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ol>
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <ContactList contacts={[
          { name: 'Michael'},
          { name: 'Ryan'},
          { name: 'Tyler'}
        ]} />

        <ContactList contacts={[
          { name: 'Jane'},
          { name: 'Crystal'},
          { name: 'Rochelle'}
        ]} />
      </div>
    );
  }
}

export default App;
