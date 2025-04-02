import axios from 'axios';
import { useState } from 'react';
import React from 'react';

export default function useFetchData(url) {
    const [data, setData] = useState({
        label: [],
        value: [],
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            const { data } = response;
            const { label, value } = data;
            setData({ label, value });
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }
  return {data, error, loading };
}
