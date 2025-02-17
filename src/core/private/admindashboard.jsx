import { useState } from 'react';
import AdminNavbar from "../../components/admin_navbar/admin_navbar.jsx"; // Renamed to AdminNavbar
import AdminSidebar from "../../components/admin_sidebar/admin_sidebar.jsx"; // Renamed to AdminSidebar


const AdminDashboardPage = () => {
    const [activeSection, setActiveSection] = useState("addGames"); // Default to "Add Games"

    // Handle changing the active section when a sidebar link is clicked
    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    return (
        <div className="flex h-screen bg-white">
            <AdminSidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
            <div className="flex-1 flex flex-col">
                <AdminNavbar />


            </div>
        </div>
    );
};

export default AdminDashboardPage;