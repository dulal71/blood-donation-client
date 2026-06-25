
const Loading = () => {
    return (
        <div className="loader-container">
            <div className="loader">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="circle">
                        <div className="dot"></div>
                        <div className="outline"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Loading; 