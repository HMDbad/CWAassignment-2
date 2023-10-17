import { useState, useEffect } from 'react';  // import useEffect
import './App.css';

function App() {

    return (
        <div id="outter box">
            <h1>Contacts</h1>
            <div>
                <h2>Contacts</h2>
                <input
                    id="inputfield"
                    type="text" 
                    placeholder="please input a name"/>
                <button>Create Contact</button>

            </div>
        {/* text that shows "Click a contact to view associated phone numbers" */}
        <text>Click a contact to view associated phone numbers</text>


        </div>

    );
}

export default App;