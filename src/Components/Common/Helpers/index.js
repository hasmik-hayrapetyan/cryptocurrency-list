import React from 'react';


export const handleResponse = (response) => {
    return response.json().then(json => {
        return response.ok ? json: Promise.reject(json)
    })
};


export const renderPercentChange = (percent) => {
    return percent < 0 ? <span className="percent-fallen">{percent} % &darr;</span>
        : percent > 0 ? <span className="percent-raised">{percent} % &uarr;</span>
            : <span>percent</span>;
};