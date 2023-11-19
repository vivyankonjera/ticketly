import { useState } from "react";
import { Link } from "react-router-dom";
import TicketTab from "./TicketTab";
import TabContent from "./TabContent";
import { MdAddBox } from "react-icons/md";
import Ticket from "./Ticket";
import { BsSearch } from "react-icons/bs";

const Tickets = ({ tickets }) => {
    const [activeTab, setActiveTab] = useState("All");
    const [query, setQuery] = useState();
    const [sort, setSort] = useState();

    const filteredTickets = tickets
        .filter((ticket) => {
            if (query) {
                return ticket.name.toLowerCase().includes(query?.toLowerCase());
            } else {
                return ticket;
            }
        })
        .sort((a, b) => {
            if (a[sort] < b[sort]) {
                return 1;
            } else if (a[sort] > b[sort]) {
                return -1;
            } else {
                return 0;
            }
        });

    return (
        <div className='ticketList'>
            <div className='ticketListHeader'>
                <h3 className='myTickets'>My tickets</h3>
                <Link to='/new-ticket'>
                    <h5 className='newTicket'>
                        New ticket <MdAddBox />
                    </h5>
                </Link>
            </div>

            <nav>
                <ul className='ticketNav'>
                    <TicketTab
                        tab={"All"}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    <TicketTab
                        tab={"Open"}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    <TicketTab
                        tab={"Resolved"}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    <TicketTab
                        tab={"Closed"}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                </ul>
            </nav>
            <div className='ticketQuery'>
                <div className='search'>
                    <BsSearch />

                    <input
                        type='search'
                        className='searchBar'
                        placeholder='Search by ticket name...'
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                    />
                </div>

                <div className='sortBy'>
                    <label className='sortByLabel'>Sort by: </label>
                    <select
                        className='sortBySelect'
                        name='sortBy'
                        id='sortBy'
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value='date'>Date</option>
                        <option value='priority'>Priority</option>
                        <option value='platform'>Platform</option>
                    </select>
                </div>
            </div>

            <TabContent tab={"All"} activeTab={activeTab}>
                {<Ticket tickets={filteredTickets} state={undefined} />}
            </TabContent>

            <TabContent tab={"Open"} activeTab={activeTab}>
                {<Ticket tickets={filteredTickets} state={"open"} />}
            </TabContent>

            <TabContent tab={"Resolved"} activeTab={activeTab}>
                {<Ticket tickets={filteredTickets} state={"resolved"} />}
            </TabContent>

            <TabContent tab={"Closed"} activeTab={activeTab}>
                {<Ticket tickets={filteredTickets} state={"closed"} />}
            </TabContent>

            {tickets == "" && <p id='noTicketsPrompt'>No new tickets</p>}
        </div>
    );
};

export default Tickets;
