import { useState, useEffect } from "react"; // import useEffect
import "./App.css";

function App() {
  //contacts is a state variable that stores all contacts
  const [contacts, setContacts] = useState([]);

  // newContactName is a state variable that stores the name of a new contact
  const [newContactName, setNewContactName] = useState("");

  // function which fetches data from the backend and returns it as json
  const fetchData = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
      return await response.json();
    } catch (error) {
      console.log("Error while fetching data: ", error);
      throw error;
    }
  };

  // useEffect is a hook that runs after the first render and after every update
  // the emty array is the dependency array, which tells useEffect
  // to only run once after the componenet is mounted
  useEffect(() => {
    fetchContacts();
  }, []);

  // function which fetches all contacts from the database
  const fetchContacts = async () => {
    console.log("fetching contacts from database");
    try {
      const data = await fetchData("http://localhost:80/api/contacts");
      setContacts(data);
    } catch (error) {
      console.log("Error while fetching contacts data: ", error);
    }
  };

  // function which creates a new contact in the database
  const createContact = async (name) => {
    console.log("creating new contact");
    try {
      await fetchData("http://localhost:80/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      fetchContacts();
    } catch (error) {
      console.log("Error while creating new contact: ", error);
    }
  };

  // delete contacts
  const DeleteContact = async (contactId) => {
    console.log("deleting contact");
    try {
      await fetchData(`http://localhost:80/api/contacts/${contactId}`,{
        method: "DELETE",
      });
      fetchContacts();
    } catch (error) {
      console.log("Error while deleting contact: ", error);
    }
  };

  // component JSX here
  return (
    <div className="Container">
      <h1>CONTACTOR</h1>
      <div className="Maincontainer">
        <h2>Contacts</h2>
        <div className="ContactsInput">
          <input
            id="inputfield"
            type="text"
            placeholder=" Name "
            value={newContactName}
            onChange={(e) => setNewContactName(e.target.value)}
          />
          <button
            onClick={() => {
              createContact(newContactName);
              setNewContactName("");
            }}
          >
            Create Contact
          </button>
        </div>
        <hr />
        <div className="ContactsList">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} 
            contact={contact} 
            DeleteContact={DeleteContact}
            fetchData={fetchData}/>
          ))}
        </div>
      </div>

      <p>Click a contact to view associated phone numbers</p>
    </div>
  );
}

// ContactCard component
function ContactCard({ contact, DeleteContact, fetchData }) {
  // const [phoneNumbers, setPhoneNumbers] = useState([]);
  // const [newPhoneName, setNewPhoneName] = useState("");
  // const [newPhoneNumber, setNewPhoneNumber] = useState("");
  return (
    <div className="Card">
      <div className="Info">
        <div className="name">
          <h1>{contact.name}</h1>
          <p>   contactId : {contact.id} </p>
          
          <button onClick={() => DeleteContact(contact.id)}>Delete</button>

          {/* name input field and ph input field and add button */}
          {/* <input type="text" placeholder=" Name " />
          <input type="text" placeholder=" Phone Number " />
          <button>Add</button> */}
        </div>
        <hr />
      </div>

      {/* <div className="PhoneNumbers"> */}
    </div>
  );
}

export default App;
