"use client"

import React, { useEffect } from 'react'
import Link from "next/link";

import { useRouter } from 'next/navigation'


const DataList = ({ blogs, setPosts }) => {

    const router = useRouter();

    return (
        <div className="w-full mt-4 mb-10">
            <div className='mt-10 w-36 h-10 text-center px-1 py-2 text-sm rounded-lg font-bold black_btn'> <Link href='/tambah-data'>Tambah Data</Link></div>
            <table className='min-w-full border-collapse border-spacing-8 border-slate-500 bg-slate-100 mt-10'>
                <thead>
                    <tr>
                        <th className="px-20 border border-slate-600">Nama Balita</th>
                        <th className="px-20 border border-slate-600">NIK</th>
                        <th className="px-5 border border-slate-600">Jenis Kelamin</th>
                        <th className="px-20 border border-slate-600">Umur</th>
                        <th className="px-5 border border-slate-600">Puskesmas Asal</th>
                        <th className="px-5 border border-slate-600">Kelurahan</th>
                        <th className="px-5 border border-slate-600">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog) => {
                        const umur = new Date(blog.tanggal_lahir);
                        const tglNow = new Date();
                        const selisihTahun = tglNow.getFullYear() - umur.getFullYear();
                        const selisihBulan = tglNow.getMonth() - umur.getMonth();
                        const selisihHari = tglNow.getDate() - umur.getDate();

                        const handleEdit = () => {
                            router.push(`/update-data?id=${blog._id}`)
                        }

                        const handleDetail = () => {
                            router.push(`/detail-data?id=${blog._id}`)
                        }

                        const handleMonev = () => {
                            router.push(`/data-monev?id=${blog._id}`)
                        }

                        const handleRefresh = () => {
                            window.location.reload();
                        }

                        const handleDelete = async (id) => {
                            const hasConfirm = confirm("Are you sure?");

                            if (hasConfirm) {
                                try {
                                    await fetch(`/api/data-balita/${blog._id.toString()}`, {
                                        method: 'DELETE'
                                    });

                                    const filteredPosts = blogs.filter((p) => p._id !== id);

                                    // handleRefresh();
                                    setPosts(filteredPosts);
                                    router.push('/');
                                    handleRefresh();
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                        }

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
                        console.log(blog);
                        // if(selisihBulan < 0 || (selisihBulan === 0 && selisihHari < 0 )){
                        //     return selisihTahun - 1;
                        // }
                        return (

                            <tr key={blog._id}>
                                <td className="px-2 border border-slate-700">{blog.nama}</td>
                                <td className="border text-center border-slate-700">{blog.nik_anak}</td>
                                <td className="border text-center border-slate-700">{blog.jenis_kelamin}</td>
                                <td className="border text-center border-slate-700">{umurText}</td>
                                <td className="border text-center border-slate-700">{blog.puskesmas}</td>
                                <td className="border text-center border-slate-700">{blog.kelurahan}</td>
                                <td className="border text-center border-slate-700">
                                    <div className="flex justify-between items-center gap-2 p-3">

                                        <div className="w-28 h-10 text-center px-1 py-2 text-sm rounded-lg font-bold bg-amber-500 text-white cursor-pointer hover:bg-amber-600 flex gap-1 justify-center items-center" onClick={handleEdit}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                            </svg>
                                            Edit
                                        </div>
                                        {/* <div className="w-24 h-10 text-center px-1 py-2 text-sm rounded-lg font-bold bg-amber-500 text-white cursor-pointer hover:bg-amber-600"><Link href={`/update-data?id=${blog._id}`}>Edit</Link></div> */}
                                        <div className="w-28 h-10 text-center px-1 text-sm rounded-lg font-bold bg-blue-500 text-white cursor-pointer hover:bg-blue-700 flex gap-1 justify-center items-center" onClick={handleDetail}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                            Pengukuran</div>
                                        <div className="w-28 h-10 text-center px-1 py-2 text-sm rounded-lg font-bold bg-emerald-500 text-white cursor-pointer hover:bg-emerald-700 flex gap-1 justify-center items-center" onClick={handleMonev}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                            Monev</div>
                                        <div className="w-28 h-10 text-center px-1 py-2 text-sm rounded-lg font-bold bg-red-500 text-white cursor-pointer hover:bg-red-700 flex gap-1 justify-center items-center" onClick={handleDelete}>
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
    )
}

export default DataList