import { useState, useEffect } from "react";
import useForm from "./useForm";

export default function useFilter(parameters) {
    const [filteredData, setFilteredData] = useState(parameters.originalData);
    const [filters, handleFilterInput] = useForm(new parameters.formShape());

    useEffect(() => setFilteredData(parameters.originalData), [parameters.originalData]);

    useEffect(() => {
        async function fetchFilteredData() {
            const ordersData = await parameters.fetcher(filters, ...(parameters.fetcherArgs || []));
            setFilteredData(ordersData);
        }

        fetchFilteredData();
    }, [filters])

    return [filteredData, filters, handleFilterInput]
}