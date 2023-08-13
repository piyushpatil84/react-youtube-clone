import React, { createContext, useState, useEffect } from "react";

import { getDataFromAPI } from "../utils/api";

export const Context = createContext();

export const AppContext = (props) => {
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("New");
    const [mobileMenu, setMobileMenu] = useState(false);

    const fetchSelectedCategoryData = (query) => {
        setLoading(true);
        getDataFromAPI(`search/?q=${query}`).then(({ contents }) => {
            // console.log(contents);
            setSearchResults(contents);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchSelectedCategoryData(selectedCategory)
    }, [selectedCategory])

    return (
        <Context.Provider value={{
            loading,
            setLoading,
            searchResults,
            setSearchResults,
            selectedCategory,
            setSelectedCategory,
            mobileMenu,
            setMobileMenu,
        }}>
            {props.children}
        </Context.Provider>
    )
}