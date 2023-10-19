import { useState, useEffect } from "react"; // import useEffect
import "./App.css";

function App() {
  // create a state variable called contacts
  //list of all contactc in the database
  const [contacts, setContacts] = useState([]);
  // value of the input field
  const [newContactName, setNewContactName] = useState("");

  // useEffect is a hook that runs after the first render and
  //   fetchContacts is called to get all contacts from the database
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchData = async (url, option = {}) => {
    const response = await fetch(url, option);
    const data = await response.json();
    return data;
  };

  const fetchContacts = async () => {
    try {
      const data = await fetchData("http://localhost:5003/api/contacts");
      setContacts(data);
    } catch (error) {
      console.log("Error while fetching contacts", error);
    }
  };

  return (
    <div>
      <h1>Contacts</h1>
      {contacts.map((contact) => (
        <div className="contact" key={contact.id}>
          <h3>{contact.name}</h3>
        </div>
      ))}
      <div id="outer-box">
        <h2>Contacts</h2>
        <input
          id="inputfield"
          type="text"
          placeholder="Please input a name"
          value={newContactName}
          onChange={(e) => setNewContactName(e.target.value)}
        />
        <button id="createContact" >Create Contact</button>
        <p>Click a contact to view associated phone numbers</p>
      </div>
    </div>
  );
}

export default App;
