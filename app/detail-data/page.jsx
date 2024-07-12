"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Link from 'next/link';

const DetailData = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const creator = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [hasilUkuran, setHasilUkuran] = useState([]);

    const [post, setPost] = useState({
        nik_anak: '',
        nik_kk: '',
        nama: '',
        jenis_kelamin: 'Laki-Laki',
        tanggal_lahir: new Date(),
        provinsi: 'Banten',
        kota: 'Tangerang Kota',
        kecamatan: 'Cibodas',
        kelurahan: 'Cibodas Baru',
        rt: '',
        alamat: '',
        puskesmas: 'Jalan Baja',
    });

    const [ukuran, setUkuran] = useState({
        creator,
        tanggal_pengukuran: null,
        tinggi_panjang_badan: '',
        berat_badan: '',
        lla: '',

    });

    const handleBack = () => {
        router.push('/');
    };

    const handleRefresh = () => {
        window.location.reload();
    }

    const handleDateChane = (date) => {
        setUkuran({ ...ukuran, tanggal_pengukuran: date });
    };

    const createPrompt = async (e) => {
        e.preventDefault();

        setSubmitting(true);

        try {
            const response = await fetch(`/api/data-balita/${creator}/posts`, {
                method: 'POST',
                body: JSON.stringify({
                    creator: ukuran.creator,
                    tanggal_pengukuran: ukuran.tanggal_pengukuran,
                    tinggi_panjang_badan: ukuran.tinggi_panjang_badan,
                    berat_badan: ukuran.berat_badan,
                    lla: ukuran.lla
                })
            })

            if (response.ok) {
                // router.push('/');
                handleRefresh();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/data-balita/${creator}`);
            const data = await response.json();

            setPost({
                nik_anak: data.nik_anak,
                nik_kk: data.nik_kk,
                nama: data.nama,
                jenis_kelamin: data.jenis_kelamin,
                tanggal_lahir: data.tanggal_lahir,
                provinsi: data.provinsi,
                kota: data.kota,
                kecamatan: data.kecamatan,
                kelurahan: data.kelurahan,
                rt: data.rt,
                alamat: data.alamat,
                puskesmas: data.puskesmas,
            });
        }

        if (creator) getPromptDetails();
    }, [creator]);

    const umur = new Date(post.tanggal_lahir);
    const tglHasil = umur.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });
    const tglNow = new Date();
    const selisihTahun = tglNow.getFullYear() - umur.getFullYear();
    const selisihBulan = tglNow.getMonth() - umur.getMonth();
    const selisihHari = tglNow.getDate() - umur.getDate();

    let umurText = "";
    if (selisihTahun > 0) {
        umurText += `${selisihTahun} tahun `;
    }
    if (selisihBulan > 0) {
        umurText += `${selisihBulan} bulan `;
    }
    if (selisihHari > 0) {
        umurText += `${selisihHari} hari `;
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`api/data-balita/${creator}/posts`);
            const dataukuran = await response.json();
            // console.log('data', hasilUkuran);
            setHasilUkuran(dataukuran);
        }

        if (creator) fetchPosts();
    }, [])

    // const matchingPengukuranData = hasilUkuran.filter(item => item.creator._id === creator);
    const matchingPengukuranData = hasilUkuran.filter(item => {
        // Memastikan bahwa item.creator tidak null sebelum mencoba mengakses properti _id
        return item.creator && item.creator._id === creator;
    });

    // Fungsi handleDelete diletakkan di luar iterasi map
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Anda yakin?");
        if (confirmDelete) {
            try {
                const response = await fetch(`/api/data-balita/${creator}/posts/${id}`, {
                    method: 'DELETE'
                });
    
                if (response.ok) {
                    const filteredPosts = hasilUkuran.filter(p => p._id !== id);
                    setHasilUkuran(filteredPosts);
                } else {
                    console.error('Gagal menghapus data pengukuran:', response.status);
                }
            } catch (error) {
                console.error('Kesalahan saat menghapus data:', error);
            }
        }
    }

    // console.log('data', matchingPengukuranData);

    return (
        <div className='w-full mt-4 mb-20'>
            <div className='flex justify-between items-center'>
                <h1 className='head_text text-left'>
                    <span className="head_text">Data Balita</span>
                </h1>
                <h3 className='head_text_dua text-rigth cursor-pointer flex gap-1' onClick={handleBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>

                    Kembali
                </h3>
            </div>

            <table className='min-w-full border-collapse border-spacing-8 border-slate-500 bg-slate-100 mt-10'>
                <tbody>
                    <tr>
                        <td className="px-10">Nama Lengkap</td>
                        <td> : </td>
                        <td className="px-5">{post.nama}</td>
                        <td className="px-10">Puskesmas</td>
                        <td> : </td>
                        <td className="px-5">{post.puskesmas}</td>
                        <td className="px-10">Alamat</td>
                        <td> : </td>
                        <td className="px-5">{post.alamat}</td>
                    </tr>
                    <tr>
                        <td className="px-10">NIK</td>
                        <td> : </td>
                        <td className="px-5">{post.nik_anak}</td>
                        <td className="px-10">RT / RW</td>
                        <td> : </td>
                        <td className="px-5">{post.rt}</td>
                        <td className="px-10">Kelurahan</td>
                        <td> : </td>
                        <td className="px-5">{post.kelurahan}</td>
                    </tr>
                    <tr>
                        <td className="px-10">Jenis Kelamin</td>
                        <td> : </td>
                        <td className="px-5">{post.jenis_kelamin}</td>
                        <td className="px-10"></td>
                        <td> </td>
                        <td className="px-5"></td>
                        <td className="px-10 font-bold">Kecamatan</td>
                        <td> : </td>
                        <td className="px-5">{post.kecamatan}</td>
                    </tr>
                    <tr>
                        <td className="px-10 font-bold">Tanggal Lahir</td>
                        <td> : </td>
                        <td className="px-5">{tglHasil}</td>
                        <td className="px-10 font-bold">Umur</td>
                        <td> : </td>
                        <td className="px-5">{umurText}</td>
                        <td className="px-10 font-bold">Provinsi</td>
                        <td> : </td>
                        <td className="px-5">{post.provinsi}</td>
                    </tr>
                </tbody>
            </table>

            <div className='mt-10'>
                {/* <div className='w-36 h-10 text-center px-1 py-2 text-sm rounded-lg font-bold bg-blue-500'> <Link href={`/tambah-pengukuran`}> + Tambah Pengukuran Balita</Link></div>
                <div className='w-36 h-10 text-center px-1 py-2 text-sm rounded-lg font-bold bg-blue-500'> <Link href='/tambah-data'>+ Catatan Makanan Monev Stunting</Link></div> */}
                <h3 className='head_text_dua text-left'>
                    Tambah Data Pengukuran
                </h3>

                <form
                    onSubmit={createPrompt}
                    className="w-full mt-10 max-w-2xl flex flex-col gap-7 glassmorphism"
                >
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="tanggal_lahir" className="block text-lg font-medium leading-6 text-gray-900">Tanggal Pengukuran</label>
                            <DatePicker
                                selected={ukuran.tanggal_pengukuran}
                                onChange={handleDateChane}
                                dateFormat="dd/MM/yyyy"
                                className="block flex-1 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 bg-transparent cursor-pointer py-1.5 pl-1"
                            />
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">Tinggi Badan / Panjang Badan</label>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    type="text"
                                    required
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
                                    type="text"
                                    required
                                    value={ukuran.berat_badan}
                                    onChange={(e) => setUkuran({ ...ukuran, berat_badan: e.target.value })}
                                    className="block flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900"
                                />
                                <label>kg</label>
                            </div>

                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">LLA</label>
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
                        <Link href="/" className="text-gray-500 text-sm">
                            Cancel
                        </Link>

                        <button type="submit" disabled={submitting} className="px-5 mx-5 py-1.5 text-sm black_btn rounded-full text-white">
                            {submitting ? `Tambah...` : 'Tambah'}
                        </button>
                    </div>
                </form>

                <div>
                    <h3 className='head_text_dua text-left'>
                        Hasil Ukuran {post.nama}
                    </h3>

                    <table className='min-w-full border-collapse border-spacing-8 border-slate-500 bg-slate-100 mt-10'>
                        <thead>
                            <tr>
                                <th className="px-20 border border-slate-600">Tanggal Pengukuran</th>
                                <th className="px-20 border border-slate-600">Tinggi Bandan / Panjang Badan</th>
                                <th className="px-5 border border-slate-600">Berat Badan</th>
                                <th className="px-20 border border-slate-600">LLA</th>
                                <th className="px-20 border border-slate-600">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(matchingPengukuranData) && matchingPengukuranData.map((ukuran) => {


                                const umur = new Date(ukuran.tanggal_pengukuran);
                                const tglHasil = umur.toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: '2-digit',
                                });
                                return (

                                    <tr key={ukuran._id}>
                                        <td className="px-2 border border-slate-700">{tglHasil}</td>
                                        <td className="border text-center border-slate-700">{ukuran.tinggi_panjang_badan} cm</td>
                                        <td className="border text-center border-slate-700">{ukuran.berat_badan} kg</td>
                                        <td className="border text-center border-slate-700">{ukuran.lla} cm</td>
                                        <td className="border text-center border-slate-700">
                                            <div className="flex justify-between items-center gap-2 p-3">
                                            <div className="w-28 h-10 text-center px-1 py-2 text-sm rounded-lg font-bold bg-red-500 text-white cursor-pointer hover:bg-red-700 flex gap-1 justify-center items-center" onClick={() => handleDelete(ukuran._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                                Delete
                                            </div>
                                            </div>
                                        </td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </div >
    )
}

export default DetailData