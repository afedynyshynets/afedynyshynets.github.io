import { useEffect, useState } from 'react';
import axios from 'axios';

export function useNotes() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // function addProduct(productIProduct) {
    //     setProducts((prev) => [...prev, product]);
    // }

    async function fetchNotes() {
        try {
            setError('');
            setLoading(true);
            const response = await axios.get('http://localhost:3001/notices');
            setNotes(response.data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setError(e.message);
        }
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    return { notes, loading, error };
    // return { products, loading, error, addProduct };
}
