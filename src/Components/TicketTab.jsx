const TicketTab = ({ tab, activeTab, setActiveTab }) => {
    const handleClick = () => {
        setActiveTab(tab);
    };

    return (
        <li onClick={handleClick} className={activeTab === tab ? "active" : ""}>
            {tab}
        </li>
    );
};

export default TicketTab;
