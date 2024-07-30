"use client"

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Link from 'next/link';

const EditPengukuran = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const pengukuranId = searchParams.get('pengukuranId');

    const [submitting, setSubmitting] = useState(false);
    const [ukuran, setUkuran] = useState({
        tanggal_pengukuran: null,
        tinggi_panjang_badan: '',
        berat_badan: '',
        lla: '',
    });

    useEffect(() => {
        if (id && pengukuranId) {
            const fetchPengukuran = async () => {
                try {
                    const response = await fetch(`/api/data-balita/${id}/posts/${pengukuranId}`);
                    
                    if (!response.ok) {
                        console.error('Server responded with an error:', response.statusText);
                        return;
                    }
                    
                    const data = await response.json();
                    console.log('Fetched data:', data); // Logging fetched data
                    
                    setUkuran({
                        tanggal_pengukuran: new Date(data.tanggal_pengukuran),
                        tinggi_panjang_badan: data.tinggi_panjang_badan,
                        berat_badan: data.berat_badan,
                        lla: data.lla,
                    });
                } catch (error) {
                    console.error('Failed to fetch and parse data:', error);
                }
            };
            fetchPengukuran();
        }
    }, [id, pengukuranId]);

    const handleDateChange = (date) => {
        setUkuran({ ...ukuran, tanggal_pengukuran: date });
    };

    const updatePengukuran = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch(`/api/data-balita/${id}/posts/${pengukuranId}`, {
                method: 'PATCH',
                body: JSON.stringify(ukuran),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                router.push(`/detail-data?id=${id}`);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h3 className='head_text_dua text-left'>
                Edit Data Pengukuran
            </h3>
            <form onSubmit={updatePengukuran} className="w-full mt-10 max-w-2xl flex flex-col gap-7 glassmorphism">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="tanggal_lahir" className="block text-lg font-medium leading-6 text-gray-900">Tanggal Pengukuran</label>
                        <DatePicker
                            selected={ukuran.tanggal_pengukuran}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            className="block flex-1 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 bg-transparent cursor-pointer py-1.5 pl-1"
                        />
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">Tinggi Badan / Panjang Badan</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                required
                                type="text"
                                value={ukuran.tinggi_panjang_badan}
                                onChange={(e) => setUkuran({ ...ukuran, tinggi_panjang_badan: e.target.value })}
                                className="block flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900"
                            />
                            <label>cm</label>
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">Berat Badan</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                required
                                type="text"
                                value={ukuran.berat_badan}
                                onChange={(e) => setUkuran({ ...ukuran, berat_badan: e.target.value })}
                                className="block flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900"
                            />
                            <label>kg</label>
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">LILA</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                required
                                value={ukuran.lla}
                                onChange={(e) => setUkuran({ ...ukuran, lla: e.target.value })}
                                className="block flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900"
                            />
                            <label>cm</label>
                        </div>
                    </div>
                </div>

                <div className="flex-end mx-3 mb-5 gap4">
                    <Link href={`/detail-data?id=${id}`} className="text-gray-500 text-sm">
                        Cancel
                    </Link>

                    <button type="submit" disabled={submitting} className="px-5 mx-5 py-1.5 text-sm black_btn rounded-full text-white">
                        {submitting ? `Edit...` : 'Edit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPengukuran;
