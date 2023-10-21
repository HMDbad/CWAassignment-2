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
      await fetchData(`http://localhost:80/api/contacts/${contactId}`, {
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
            <ContactCard
              key={contact.id}
              contact={contact}
              DeleteContact={DeleteContact}
              fetchData={fetchData}
            />
          ))}
        </div>
      </div>

      <p>Click a contact to view associated phone numbers</p>
    </div>
  );
}

// ContactCard component
function ContactCard({ contact, DeleteContact, fetchData }) {
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [newPhoneName, setNewPhoneName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [Showing, setShowing] = useState(false);

  // fetch Phones
  const fetchPhoneNumbers = async () => {
    console.log("fetching phone numbers from database");
    try {
      const data = await fetchData(
        `http://localhost:80/api/contacts/${contact.id}/phones`
      );
      setPhoneNumbers(data);
    } catch (error) {
      console.log("Error while fetching phone numbers data: ", error);
    }
  };

  // add phone number
  const addPhoneNumber = async (name, number) => {
    console.log("adding phone number");
    try {
      await fetchData(`http://localhost:80/api/contacts/${contact.id}/phones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newPhoneName,
          number: newPhoneNumber,
          contactId: contact.id,
        }),
      });
      // After creating a phone number, fetch the updated phone numbers list.
      fetchPhoneNumbers();
      // refresh the input fields
      setNewPhoneName("");
      setNewPhoneNumber("");
    } catch (error) {
      console.log("Error while adding phone number: ", error);
    }
  };

  // delete phone number
  const DeletePhoneNumber = async (phoneId) => {
    console.log("deleting phone number");
    try {
      await fetchData(
        `http://localhost:80/api/contacts/${contact.id}/phones/${phoneId}`,
        {
          method: "DELETE",
        }
      );
      fetchPhoneNumbers();
    } catch (error) {
      console.log("Error while deleting phone number: ", error);
    }
  };

  useEffect(() => {
    // Fetch phone numbers when the component mounts or when the contact changes.
    fetchPhoneNumbers();
  }, [contact]);

  // contact card JSX here
  return (
    <div className="Card">
      <div className="Info">
        <div className="name" onClick={() => setShowing(!Showing)}>
          <h1>{contact.name}</h1>
          <p> contactId : {contact.id} </p>

          <button onClick={() => DeleteContact(contact.id)}>Delete</button>
        </div>
      </div>
      <hr />

      {Showing && (
        <div className="PhoneNumbers">
          {/* name input field and ph input field and add button */}
          <table>
            <thead>
              <tr>
                <th>Phone Name</th>
                <th>Phone Number</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {
                phoneNumbers.map((phone)=>(
                  <tr key={phone.id}>
                    <td>{phone.name}</td>
                    <td>{phone.number}</td>
                    <td>
                      <button onClick={()=>DeletePhoneNumber(phone.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              }

              <tr>
                <td>
                  <input
                    type="text"
                    placeholder=" Name "
                    value={newPhoneName}
                    onChange={(e) => setNewPhoneName(e.target.value)}
                  />

                </td>
                <td>
                  <input
                    type="text"
                    placeholder=" Number "
                    value={newPhoneNumber}
                    onChange={(e) => setNewPhoneNumber(e.target.value)}
                  />

                </td>
                <td>
                  <button
                    onClick={() => {
                      //call addPhoneNumber function
                      addPhoneNumber(newPhoneName, newPhoneNumber);
                    }}
                  >
                    Add
                  </button>
                  
                </td>
              </tr>

            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}

export default App;
