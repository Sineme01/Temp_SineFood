const shimmerResMenu = () => {
    return (
        <>
            <div className="animate-pulse bg-gray-200 py-24 shadow-xl"></div>
            <div className="animate-pulse mt-20 mx-80">
            <h1 className="animate-pulse h-14 rounded-lg w-52 bg-gray-200 mt-5 mb-10"></h1>
                {
                    Array(5).fill("").map(() => (<div className="border-b-2">
                        <h1 className="animate-pulse h-8 rounded-lg w-24 bg-gray-100 mt-5"></h1>
                        <div className="animate-pulse flex justify-end items-end bg-gray-200 w-36 h-32 rounded-lg shadow-md mb-1 ml-[740]"></div>
                    </div>))
                }
            </div>
        </>
    );
}
export default shimmerResMenu;