import { useState } from "react";
import {
    BarChart,
    Bar,
    Cell,
    ResponsiveContainer,
    PieChart,
    Pie,
    Sector,
} from "recharts";
import {
    FcHighPriority,
    FcLowPriority,
    FcMediumPriority,
} from "react-icons/fc";

const Stats = ({ tickets }) => {
    const handleClick = (data, index) => {
        setActiveIndex(index);
    };

    const filterTicket = (filter, tickets, key) => {
        const filteredTickets = tickets.filter((ticket) => {
            return ticket[key] == filter;
        });
        return filteredTickets;
    };

    //Tickets by State
    const openTickets = filterTicket("open", tickets, "state");
    const resolvedTickets = filterTicket("resolved", tickets, "state");

    //Tickets by Platform
    const squarespaceTickets = filterTicket("squarespace", tickets, "platform");
    const wordpressTickets = filterTicket("wordpress", tickets, "platform");
    const shopifyTickets = filterTicket("shopify", tickets, "platform");
    const wixTickets = filterTicket("wix", tickets, "platform");
    const otherTickets = filterTicket("other", tickets, "platform");

    //Tickets by Priority
    const lowPriority = filterTicket("p1 - low", tickets, "priority");
    const mediumPriority = filterTicket("p2 - medium", tickets, "priority");
    const highPriority = filterTicket("p3 - high", tickets, "priority");

    const data = [
        {
            name: "Squarespace",
            ticketCount: squarespaceTickets.length,
        },
        {
            name: "Wordpress",
            ticketCount: wordpressTickets.length,
        },
        {
            name: "Shopify",
            ticketCount: shopifyTickets.length,
        },
        {
            name: "Wix",
            ticketCount: wixTickets.length,
        },
        {
            name: "Other",
            ticketCount: otherTickets.length,
        },
    ];
    const data2 = [
        { prioritiy: "low", value: lowPriority.length },
        { prioritiy: "medium", value: mediumPriority.length },
        { prioritiy: "high", value: highPriority.length },
    ];

    const COLORS = ["#cccccc", "#cccccc", "#cccccc"];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill='white'
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline='central'
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const [activeIndex, setActiveIndex] = useState(0);
    const activeItem = data[activeIndex];

    return (
        <div className='Stats'>
            <div className='statsContainer'>
                <div id='slaPercentage'>
                    <p>SLA Adherance</p>
                    <div
                        className='circularPercentage'
                        style={{
                            background: `conic-gradient(#ffffff ${"260deg"}, transparent 0deg)`,
                        }}
                    >
                        <span className='percentageValue'>75%</span>
                    </div>
                    <h5>15/20 Tickets solved on time</h5>
                </div>
                <div className='statsRight'>
                    <div id='ticketCount'>
                        <p>All tickets</p>
                        <h1>{tickets.length}</h1>
                    </div>
                    <div id='openTicketCount'>
                        <p>Open tickets</p>
                        <h1>{openTickets.length}</h1>
                    </div>
                    <div id='resolvedTicketCount'>
                        <p>Resolved tickets</p>
                        <h1>{resolvedTickets.length}</h1>
                    </div>
                </div>
                <div className='ticketsByPlatformChart'>
                    <p className='ticketsByPlatformLabel'>Tickets by plaform</p>
                    <ResponsiveContainer width='100%' height={100}>
                        <BarChart width={150} height={40} data={data}>
                            <Bar dataKey='ticketCount' onClick={handleClick}>
                                {data.map((entry, index) => (
                                    <Cell
                                        cursor='pointer'
                                        fill={
                                            index === activeIndex
                                                ? "#0db7c7"
                                                : "#cccccc"
                                        }
                                        key={`cell-${index}`}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <div className='chartKey'>
                        {activeItem.name === "Squarespace" && (
                            <img
                                src='https://yt3.googleusercontent.com/TyYx1KXoYFP3dfR2ZtMw1FWNJtrqSMUQj6VOKQ7XJdYIziKmsCYwQIXjv8GLuGFb64oiGN3CTQ=s900-c-k-c0x00ffffff-no-rj'
                                alt=''
                                className='platformImg'
                            />
                        )}

                        {activeItem.name === "Wordpress" && (
                            <img
                                src='https://s2.wp.com/wp-content/themes/a8c/supportforums/images/wpcom-logo.png'
                                alt=''
                                className='platformImg'
                            />
                        )}

                        {activeItem.name === "Shopify" && (
                            <img
                                src='https://cdn3.iconfinder.com/data/icons/social-media-2068/64/_shopping-512.png'
                                alt=''
                                className='platformImg'
                            />
                        )}

                        {activeItem.name === "Wix" && (
                            <img
                                src='https://www.drupal.org/files/project-images/webflow-mark-blue-circle-square.png'
                                alt=''
                                className='platformImg'
                            />
                        )}

                        {activeItem.name !== "Squarespace" &&
                            activeItem.name !== "Wix" &&
                            activeItem.name !== "Shopify" &&
                            activeItem.name !== "Wordpress" && (
                                <img
                                    src='https://i.pinimg.com/736x/86/c3/05/86c30529904c3a992eb7241299e5f3e5.jpg'
                                    alt=''
                                    className='platformImg'
                                />
                            )}

                        <p className='platformChartKey'>{`${activeItem.name} - ${activeItem.ticketCount}`}</p>
                    </div>
                </div>

                <div className='ticketsByPriorityChart'>
                    <p className='ticketsByPriorityLabel'>
                        Tickets by priority
                    </p>
                    <ResponsiveContainer width='100%' height='100%'>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={data2}
                                cx='50%'
                                cy='50%'
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill='#8884d8'
                                dataKey='value'
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className='charts'></div>
        </div>
    );
};

export default Stats;
