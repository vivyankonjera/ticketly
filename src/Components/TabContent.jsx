const TabContent = ({ tab, activeTab, children }) => {
    return activeTab === tab ? (
        <div className='tabContent'>{children}</div>
    ) : null;
};

export default TabContent;
