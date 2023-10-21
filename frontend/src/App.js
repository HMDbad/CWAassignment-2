import { useState, useEffect } from "react"; // import useEffect
import "./App.css";

function App() {
  //contacts is a state variable that stores all contacts
  const [contacts, setContacts] = useState([]);

  // newContactName is a state variable that stores the name of a new contact
  const [newContactName, setNewContactName] = useState("");

  // function which fetches data from the backend and returns it as json
  const fetchData = async (url, options = {}) => {
    const response = await fetch(url, options);
    return await response.json();
    // return data;
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
            onClick={() => { createContact(newContactName); setNewContactName(""); }}>
            Create Contact
          </button>
        </div>
        <hr />
        <div className="ContactsList">
          {contacts.map((contact) => (
            <ContactCard 
              key={contact.id} 
              contact={contact} 
            />
          ))}
        </div>
        
        
      </div>

      <p>Click a contact to view associated phone numbers</p>
      
    </div>
  );
}



function ContactCard({ contact }) {
  return (
    <div className="Card">
      <div className="Info">
        <div className="name">
          {contact.name}
        </div>
        </div>
        
    </div>
  );
}




export default App;
