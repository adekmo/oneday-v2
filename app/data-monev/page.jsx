"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Link from 'next/link';

const DataMonev = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const creator = searchParams.get('id');
    // const { id: creator } = router.query;

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

    const [monev, setMonev] = useState({
        creator,
        harike: '1',
        bulan: 'Mei',
        diberikan_telur: 'Ya',
        porsi_telur_dihabis: '1/4 Porsi',
        // waktu_beri_telur: '',
        jam_beri_telur: '',
        // waktu_menu_makanan: '',
        menu_makanan: '',

    });

    const handleBack = () => {
        router.push('/');
    };

    const handleRefresh = () => {
        window.location.reload();
    }

    const createPrompt = async (e) => {
        e.preventDefault();

        setSubmitting(true);

        try {
            const response = await fetch(`/api/data-balita/${creator}/monev`, {
                method: 'POST',
                // headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    creator: creator,
                    harike: monev.harike,
                    bulan: monev.bulan,
                    diberikan_telur: monev.diberikan_telur,
                    porsi_telur_dihabis: monev.porsi_telur_dihabis,
                    // waktu_beri_telur: monev.waktu_beri_telur,
                    jam_beri_telur: monev.jam_beri_telur,
                    // waktu_menu_makanan: monev.waktu_menu_makanan,
                    menu_makanan: monev.menu_makanan,
                })
            })

            if (response.ok) {
                // router.push('/');
                handleRefresh();
            } else {
                const responseData = await response.json();
                console.error('Gagal menyimpan data monev:', responseData);
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
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
            const response = await fetch(`api/data-balita/${creator}/monev`);
            const datamonev = await response.json();
            // console.log('data', hasilUkuran);
            setHasilUkuran(datamonev);
        }

        if (creator) fetchPosts();
    }, [])

    // const matchingDataMonev = hasilUkuran.filter(item => item.creator._id === creator);

    const matchingDataMonev = hasilUkuran.filter(item => {
        // Memastikan bahwa item.creator tidak null sebelum mencoba mengakses properti _id
        return item.creator && item.creator._id === creator;
    });

    // console.log('data', matchingPengukuranData);
    // console.log('id', creator);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Anda yakin?");
        if (confirmDelete) {
            try {
                const response = await fetch(`/api/data-balita/${creator}/monev/${id}`, {
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
                    Catatan Monev One Day One Egg
                </h3>

                <form
                    onSubmit={createPrompt}
                    className="w-full mt-10 max-w-2xl flex flex-col gap-7 glassmorphism"
                >
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-2">
                            <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">Hari ke</label>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <select
                                    value={monev.harike}
                                    onChange={(e) => setMonev({ ...monev, harike: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">Bulan</label>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <select
                                    value={monev.bulan}
                                    onChange={(e) => setMonev({ ...monev, bulan: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                                    <option value="Mei">Mei</option>
                                    <option value="Juni">Juni</option>
                                    {/* <option value="Agustus">Agustus</option>
                                    <option value="September">September</option>
                                    <option value="Oktober">Oktober</option>
                                    <option value="November">November</option>
                                    <option value="Desember">Desember</option> */}
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">Diberikan Telur</label>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <select
                                    value={monev.diberikan_telur}
                                    onChange={(e) => setMonev({ ...monev, diberikan_telur: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                                    <option value="Ya">Ya</option>
                                    <option value="Tidak">Tidak</option>
                                </select>
                            </div>
                        </div>

                        {/* <div className="sm:col-span-1">
                            <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">Waktu Pemberian Makan Telur</label>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    type="text"
                                    required
                                    value={monev.jam_beri_telur}
                                    onChange={(e) => setMonev({ ...monev, jam_beri_telur: e.target.value })}
                                    className="block flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900"
                                />
                            </div>
                        </div> */}

                        <div className="sm:col-span-6">
                            <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">Waktu Pemberian Makan Telur</label>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <textarea
                                    value={monev.jam_beri_telur}
                                    onChange={(e) => setMonev({ ...monev, jam_beri_telur: e.target.value })}
                                    rows="4" // Sesuaikan dengan jumlah baris yang diinginkan
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                                    placeholder='Contoh: Pagi: 07:00'
                                />
                            </div>
                        </div>

                        {/* <div className="sm:col-span-4">
                            <label htmlFor="waktu_beri_telur" className="block text-lg font-medium leading-6 text-gray-900">Waktu Pemberian Makan Telur</label>
                            <div className="flex flex-col rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <div className="border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900">
                                    <label>
                                        Pagi :
                                        <input
                                            type="checkbox"
                                            name="pagi"
                                            checked={monev.waktu_beri_telur.pagi}
                                            onChange={handleChangeCheckbox}
                                            className="mx-2"
                                        />
                                    </label>
                                    {monev.waktu_beri_telur.pagi && (
                                        <input
                                            type="text"
                                            name="makanan"
                                            value={monev.jam_beri_telur}
                                            // onChange={handleChangeInput}
                                            onChange={(e) => setMonev({ ...monev, jam_beri_telur: e.target.value })}
                                            placeholder="07:00"
                                            className="flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900"
                                        />
                                    )}
                                </div>
                                <div>
                                    <label>
                                        Siang :
                                        <input
                                            type="checkbox"
                                            name="siang"
                                            checked={monev.waktu_beri_telur.siang || false}
                                            onChange={handleChangeCheckbox}
                                            className="mx-2"
                                        />
                                    </label>
                                    {monev.waktu_beri_telur.siang && (
                                        <input
                                            type="text"
                                            name="makanan"
                                            value={monev.jam_beri_telur}
                                            onChange={(e) => setMonev({ ...monev, jam_beri_telur: e.target.value })}
                                            placeholder="13:00"
                                            className="flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900"
                                        />
                                    )}
                                </div>
                                <div>
                                    <label>
                                        Sore :
                                        <input
                                            type="checkbox"
                                            name="sore"
                                            checked={monev.waktu_beri_telur.sore || false}
                                            onChange={handleChangeCheckbox}
                                            className="mx-2"
                                        />
                                    </label>
                                    {monev.waktu_beri_telur.sore && (
                                        <input
                                            type="text"
                                            name="makanan"
                                            value={monev.jam_beri_telur}
                                            onChange={(e) => setMonev({ ...monev, jam_beri_telur: e.target.value })}
                                            placeholder="17:00"
                                            className="flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900"
                                        />
                                    )}
                                </div>
                                <div>
                                    <label>
                                        Malam :
                                        <input
                                            type="checkbox"
                                            name="malam"
                                            checked={monev.waktu_beri_telur.malam || false}
                                            onChange={handleChangeCheckbox}
                                            className="mx-2"
                                        />
                                    </label>
                                    {monev.waktu_beri_telur.malam && (
                                        <input
                                            type="text"
                                            name="makanan"
                                            value={monev.jam_beri_telur}
                                            onChange={(e) => setMonev({ ...monev, jam_beri_telur: e.target.value })}
                                            placeholder="21:00"
                                            className="flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900"
                                        />
                                    )}
                                </div>
                            </div>
                        </div> */}

                        <div className="sm:col-span-2">
                            <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">Jumlah Porsi Telur yang dihabiskan</label>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <select
                                    value={monev.porsi_telur_dihabis}
                                    onChange={(e) => setMonev({ ...monev, porsi_telur_dihabis: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                                    <option value="1/4 Porsi">1/4 Porsi</option>
                                    <option value="1/2 Porsi">1/2 Porsi</option>
                                    <option value="3/4 Porsi">3/4 Porsi</option>
                                    <option value="1 Porsi">1 Porsi</option>
                                    <option value="2 Porsi">2 Porsi</option>
                                    <option value="Lebih Dari 3 Porsi">Lebih dari 3 Porsi</option>
                                    <option value="Tidak Ada">Tidak Ada</option>
                                </select>
                            </div>
                        </div>

                        {/* <div className="sm:col-span-1">
                            <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">Menu Makanan</label>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    type="text"
                                    required
                                    value={monev.menu_makanan}
                                    onChange={(e) => setMonev({ ...monev, menu_makanan: e.target.value })}
                                    className="block flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900"
                                />
                            </div>
                        </div> */}

                        <div className="sm:col-span-6">
                            <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">Menu Makanan</label>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <textarea
                                    value={monev.menu_makanan}
                                    onChange={(e) => setMonev({ ...monev, menu_makanan: e.target.value })}
                                    rows="4" // Sesuaikan dengan jumlah baris yang diinginkan
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                                    placeholder='Contoh: Pagi (Nasi, Sayur Sop, Telur Dadar)'
                                />
                            </div>
                        </div>

                        {/* <div className="sm:col-span-4">
                            <label htmlFor="menu_makan" className="block text-lg font-medium leading-6 text-gray-900">Menu Makanan</label>
                            <div className="flex flex-col rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <div className="flex border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900">
                                    <label>
                                        Pagi :
                                        <input
                                            type="checkbox"
                                            name="pagi"
                                            checked={monev.waktu_menu_makanan.pagi || false}
                                            onChange={handleChangeCheckbox2}
                                            className="mx-2"
                                        />
                                    </label>
                                    {monev.waktu_menu_makanan.pagi && (
                                        <input
                                            type="text"
                                            name="makanan"
                                            value={monev.menu_makanan}
                                            onChange={(e) => setMonev({ ...monev, menu_makanan: e.target.value })}
                                            placeholder="contoh: Nasi, sayur sop, telur dadar"
                                            className="flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900"
                                        />
                                    )}
                                </div>
                                <div>
                                    <label>
                                        Siang:
                                        <input
                                            type="checkbox"
                                            name="siang"
                                            checked={monev.waktu_menu_makanan.siang || false}
                                            onChange={handleChangeCheckbox2}
                                            className="mx-2"
                                        />
                                    </label>
                                    {monev.waktu_menu_makanan.siang && (
                                        <input
                                            type="text"
                                            name="makanan"
                                            value={monev.menu_makanan}
                                            onChange={(e) => setMonev({ ...monev, menu_makanan: e.target.value })}
                                            className="flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900"
                                            placeholder="contoh: Nasi, sayur sop, telur dadar"
                                        />
                                    )}
                                </div>
                                <div>
                                    <label>
                                        Sore :
                                        <input
                                            type="checkbox"
                                            name="sore"
                                            checked={monev.waktu_menu_makanan.sore || false}
                                            onChange={handleChangeCheckbox2}
                                            className="mx-2"
                                        />
                                    </label>
                                    {monev.waktu_menu_makanan.sore && (
                                        <input
                                            type="text"
                                            name="makanan"
                                            value={monev.menu_makanan}
                                            onChange={(e) => setMonev({ ...monev, menu_makanan: e.target.value })}
                                            className="flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900"
                                            placeholder="contoh: Nasi, sayur sop, telur dadar"
                                        />
                                    )}
                                </div>
                                <div>
                                    <label>
                                        Malam :
                                        <input
                                            type="checkbox"
                                            name="malam"
                                            checked={monev.waktu_menu_makanan.malam || false}
                                            onChange={handleChangeCheckbox2}
                                            className="mx-2"
                                        />
                                    </label>
                                    {monev.waktu_menu_makanan.malam && (
                                        <input
                                            type="text"
                                            name="makanan"
                                            value={monev.menu_makanan}
                                            onChange={(e) => setMonev({ ...monev, menu_makanan: e.target.value })}
                                            className="flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900"
                                            placeholder="contoh: Nasi, sayur sop, telur dadar"
                                        />
                                    )}
                                </div>
                            </div>
                        </div> */}
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
                        Hasil Data Monev {post.nama}
                    </h3>

                    <table className='min-w-full border-collapse border-spacing-8 border-slate-500 bg-slate-100 mt-10'>
                        <thead>
                            <tr>
                                <th className="px-20 border border-slate-600">Hari Ke</th>
                                <th className="px-20 border border-slate-600">Diberikan Telur</th>
                                <th className="px-20 border border-slate-600">Jumlah Porsi Telur yang dihabiskan</th>
                                <th className="px-5 border border-slate-600">Waktu Pemberian Makan Telur</th>
                                <th className="px-20 border border-slate-600">Menu Makanan</th>
                                <th className="px-20 border border-slate-600">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(matchingDataMonev) && matchingDataMonev.map((ukuran) => {

                                return (

                                    <tr key={ukuran._id}>
                                        <td className="px-2 border border-slate-700">{ukuran.harike} - {ukuran.bulan ? ukuran.bulan : ''}</td>
                                        <td className="border text-center border-slate-700">{ukuran.diberikan_telur} </td>
                                        <td className="border text-center border-slate-700">{ukuran.porsi_telur_dihabis} </td>
                                        <td className="border text-center border-slate-700">{ukuran.jam_beri_telur}</td>
                                        <td className="border text-center border-slate-700">{ukuran.menu_makanan}</td>
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

export default DataMonev