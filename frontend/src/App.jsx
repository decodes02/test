import React, { useState, useEffect } from "react";
import KanbanBoard from "./KanbanBoard";
import AddTicketForm from "./components/AddTicketForm"; // Import AddTicketForm component
import "./App.css";
import DisplayIcon from "../images/Display.svg"; // Adjust path to Display.svg
import DownArrowIcon from "../images/down.svg"; // Adjust path to down.svg
import { Link } from "react-router-dom";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState("user");
  const [ordering, setOrdering] = useState("priority");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddTicketOpen, setIsAddTicketOpen] = useState(false); // State to control Add Ticket modal

  useEffect(() => {
    fetch("http://localhost:3000/data")
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      });

    const savedGrouping = localStorage.getItem("grouping");
    const savedOrdering = localStorage.getItem("ordering");

    if (savedGrouping) {
      setGrouping(savedGrouping);
    }
    if (savedOrdering) {
      setOrdering(savedOrdering);
    }
  }, []);

  const handleGroupingChange = (e) => {
    const newGrouping = e.target.value;
    setGrouping(newGrouping);
    localStorage.setItem("grouping", newGrouping);
  };

  const handleOrderingChange = (e) => {
    const newOrdering = e.target.value;
    setOrdering(newOrdering);
    localStorage.setItem("ordering", newOrdering);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleAddTicket = () => setIsAddTicketOpen(true); // Open Add Ticket modal

  const handleTicketAdded = () => {
    // Close the modal after adding and refresh ticket list
    setIsAddTicketOpen(false);
    fetch("http://localhost:3000/data")
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets); // Update ticket list
      });
  };

  return (
    <div className="App">
      <div className="navbar">
        <div className="dropdown-container" style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button className="dropdown-button" onClick={toggleDropdown}>
              <img src={DisplayIcon} alt="Display Icon" className="icon" />
              Display
              <img src={DownArrowIcon} alt="Down Arrow Icon" className="down-icon" />
            </button>
            <div style={{display:"flex",gap:"10px"}}>
            <Link aria-current="page" to="/user">
              <div className="addbutton">Users</div>
            </Link>
            <button className="addbutton" onClick={handleAddTicket}>
              Add Ticket
            </button> {/* Button to open Add Ticket modal */}
            </div>
          </div>

          {isDropdownOpen && (
            <div className="dropdown-content">
              <div className="dropdown-section">
                <label>Grouping</label>
                <select value={grouping} onChange={handleGroupingChange}>
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div className="dropdown-section">
                <label>Ordering</label>
                <select value={ordering} onChange={handleOrderingChange}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      <KanbanBoard
        tickets={tickets}
        users={users}
        grouping={grouping}
        ordering={ordering}
      />

      {/* AddTicketForm Modal */}
      {isAddTicketOpen && (
        <AddTicketForm
          onClose={() => setIsAddTicketOpen(false)} // Close modal function
          onTicketAdded={handleTicketAdded} // Function to handle ticket addition
        />
      )}
    </div>
  );
}

export default App;
