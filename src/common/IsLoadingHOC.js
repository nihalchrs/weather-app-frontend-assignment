import React, { useState } from "react";
import { Circles } from "react-loader-spinner";
import './loader.css';

const Loading = () => {
    return (
        <div className="loaderHolder">
            <div className="loaderMain">
                <Circles
                    height="80"
                    width="80"
                    color="#f26419"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        </div>
    );
};

const IsLoadingHOC = (WrappedComponent) => {
    function HOC(props) {
        const [isLoading, setLoading] = useState(false);

        const setLoadingState = (isComponentLoading) => {
            setLoading(isComponentLoading);
        };

        return (
            <>
                {isLoading && <Loading />}
                <WrappedComponent
                    {...props}
                    isLoading={isLoading}
                    setLoading={setLoadingState}
                />
            </>
        );
    }
    return HOC;
};

export default IsLoadingHOC;
