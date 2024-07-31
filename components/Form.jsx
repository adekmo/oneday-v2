'use client'

import Link from 'next/link';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Form = ({ 
    type, 
    formData, 
    setFormData, 
    submitting, 
    handleSubmit, 
    handleChangeFile,
    handleDateChane }) => {

        const tanggal_lahir = new Date(formData.tanggal_lahir);
        // const formData.tanggal_lahir = new Date(formData.tanggal_lahir);
        
    return (
        <section className='w-full max-w-full flex-start flex-col'>
            <h1 className='head_text text-left'>
                <span className="head_text">{type} Data Balita </span>
            </h1>

            <form
                onSubmit={handleSubmit}
                className="w-full mt-10 max-w-2xl flex flex-col gap-7 glassmorphism"
            >
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">NIK Anak</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input type="text"
                                required
                                value={formData.nik_anak}
                                onChange={(e) => setFormData({ ...formData, nik_anak: e.target.value })}
                                className="block flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900" />
                        </div>
                    </div>
                    {/* <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">NIK KK</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                required
                                value={formData.nik_kk}
                                onChange={(e) => setFormData({ ...formData, nik_kk: e.target.value })}
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-lg text-gray-900"
                            />
                        </div>
                    </div> */}
                    <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">Nama Lengkap</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                required
                                value={formData.nama}
                                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                                className="block flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-lg font-medium leading-6 text-gray-900">Jenis Kelamin</label>
                        <select
                            value={formData.jenis_kelamin}
                            onChange={(e) => setFormData({ ...formData, jenis_kelamin: e.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                            <option value="Laki-Laki">Laki-Laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="tanggal_lahir" className="block text-lg font-medium leading-6 text-gray-900">Tanggal Lahir</label>
                        {type === 'Edit' ? (
                            <DatePicker
                            selected={tanggal_lahir}
                            onChange={handleDateChane}
                            dateFormat="dd/MM/yyyy"
                            className="block flex-1 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 bg-transparent cursor-pointer py-1.5 pl-1"
                        />
                        ) : (
                            <DatePicker
                            selected={formData.tanggal_lahir}
                            onChange={handleDateChane}
                            dateFormat="dd/MM/yyyy"
                            className="block flex-1 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 bg-transparent cursor-pointer py-1.5 pl-1"
                        />
                        )}
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor="country" className="block text-lg font-medium leading-6 text-gray-900">Provinsi</label>
                        <select
                            value={formData.provinsi}
                            onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                            <option value="Banten">Banten</option>
                        </select>
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor="country" className="block text-lg font-medium leading-6 text-gray-900">Kota</label>
                        <select
                            value={formData.kota}
                            onChange={(e) => setFormData({ ...formData, kota: e.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                            <option value="Tangerang Kota">Tangerang Kota</option>
                        </select>
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor="country" className="block text-lg font-medium leading-6 text-gray-900">Kecamatan</label>
                        <select
                            value={formData.kecamatan}
                            onChange={(e) => setFormData({ ...formData, kecamatan: e.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                            <option value="Cibodas">Cibodas</option>
                        </select>
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor="country" className="block text-lg font-medium leading-6 text-gray-900">Kelurahan</label>
                        <select
                            value={formData.kelurahan}
                            onChange={(e) => setFormData({ ...formData, kelurahan: e.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                            <option value="Cibodas Baru">Cibodas Baru</option>
                            <option value="Jatiuwung">Jatiuwung</option>
                            <option value="Uwungjaya">Uwungjaya</option>
                        </select>
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">RT/RW</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                required
                                value={formData.rt}
                                onChange={(e) => setFormData({ ...formData, rt: e.target.value })}
                                className="block flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">Alamat</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                required
                                value={formData.alamat}
                                onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                                className="block flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor="country" className="block text-lg font-medium leading-6 text-gray-900">Puskesmas</label>
                        <select
                            value={formData.puskesmas}
                            onChange={(e) => setFormData({ ...formData, puskesmas: e.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                            <option value="Jalan Baja">Jalan Baja</option>
                        </select>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">Anak-ke</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                required
                                value={formData.anakke}
                                onChange={(e) => setFormData({ ...formData, anakke: e.target.value })}
                                className="block flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">BB Lahir (gram)</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                required
                                value={formData.berat_lahir}
                                onChange={(e) => setFormData({ ...formData, berat_lahir: e.target.value })}
                                className="block flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">PB Lahir (cm)</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                required
                                value={formData.panjang_lahir}
                                onChange={(e) => setFormData({ ...formData, panjang_lahir: e.target.value })}
                                className="block flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-lg font-medium leading-6 text-gray-900">IMD</label>
                        <select
                            value={formData.imd}
                            onChange={(e) => setFormData({ ...formData, imd: e.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                            <option value="Ya">Ya</option>
                            <option value="Tidak">Tidak</option>
                        </select>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-lg font-medium leading-6 text-gray-900">Memiliki KMS / Buku KIA</label>
                        <select
                            value={formData.kms}
                            onChange={(e) => setFormData({ ...formData, kms: e.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                            <option value="Ya">Ya</option>
                            <option value="Tidak">Tidak</option>
                        </select>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-lg font-medium leading-6 text-gray-900">Riwayat Asi Ekslusif</label>
                        <select
                            value={formData.asi_eksklusif}
                            onChange={(e) => setFormData({ ...formData, asi_eksklusif: e.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                            <option value="Umur 0 Bulan">Umur 0 Bulan</option>
                            <option value="Umur 1 Bulan">Umur 1 Bulan</option>
                            <option value="Umur 2 Bulan">Umur 2 Bulan</option>
                            <option value="Umur 3 Bulan">Umur 3 Bulan</option>
                            <option value="Umur 4 Bulan">Umur 4 Bulan</option>
                            <option value="Umur 5 Bulan">Umur 5 Bulan</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="country" className="block text-lg font-medium leading-6 text-gray-900">Vitamin A</label>
                        <select
                            value={formData.vitamina}
                            onChange={(e) => setFormData({ ...formData, vitamina: e.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                            <option value="Feb">Feb</option>
                            <option value="Agustus">Oktober</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="country" className="block text-lg font-medium leading-6 text-gray-900">Penyakit Penyerta</label>
                        <select
                            value={formData.penyakit_penyerta}
                            onChange={(e) => setFormData({ ...formData, penyakit_penyerta: e.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                            <option value="Ya">Ya</option>
                            <option value="Tidak">Tidak</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="country" className="block text-lg font-medium leading-6 text-gray-900">Cacingan</label>
                        <select
                            value={formData.cacingan}
                            onChange={(e) => setFormData({ ...formData, cacingan: e.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                            <option value="Ya">Ya</option>
                            <option value="Tidak">Tidak</option>
                        </select>
                    </div>
                    {/* <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-lg font-medium leading-6 text-gray-900">Perkembangan KIA</label>
                        <select
                            value={formData.kia}
                            onChange={(e) => setFormData({ ...formData, kia: e.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                            <option value="Ya">Ya</option>
                            <option value="Tidak">Tidak</option>
                        </select>
                    </div> */}

                    {/* Foto */}
                    {/* <div className="col-span-full">
                        <label htmlFor="cover-photo" className="block text-lg font-medium leading-6 text-gray-900">Foto</label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <input
                                type="file"
                                accept='image/jpeg, image/png'
                                onChange={handleChangeFile}
                            />
                            {error && <p>{error}</p>}
                            {formData.foto && (
                                <div>
                                    <p>Gambar yang akan diunggah: </p>
                                    <img src={URL.createObjectURL(formData.foto)} alt="gambar" />
                                </div>
                            )}
                        </div>
                    </div> */}
                    <div className="sm:col-span-6">
                        <h2 className="text-lg font-bold text-gray-900">Identitas Orang Tua</h2>
                    </div>
                    {/* <div className="sm:col-span-3">
                        <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">NIK Ayah</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                required
                                value={formData.nik_ot}
                                onChange={(e) => setFormData({ ...formData, nik_ot: e.target.value })}
                                className="block flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900" />
                        </div>
                    </div> */}
                    {/* <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">NIK Ibu</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                required
                                value={formData.no_kk}
                                onChange={(e) => setFormData({ ...formData, no_kk: e.target.value })}
                                className="block flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900" />
                        </div>
                    </div> */}
                    <div className="sm:col-span-3">
                        <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">Nama Orang Tua</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                required
                                value={formData.nama_ot}
                                onChange={(e) => setFormData({ ...formData, nama_ot: e.target.value })}
                                className="block flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900" />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-lg font-medium leading-6 text-gray-900">Pendidikan Terakhir Ibu</label>
                        <select
                            value={formData.pendidikan_terakhir_ot}
                            onChange={(e) => setFormData({ ...formData, pendidikan_terakhir_ot: e.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                            <option value="Tidak Lulus SD">Tidak Lulus SD</option>
                            <option value="Lulus SD">Lulus SD</option>
                            <option value="Lulus SMP">Lulus SMP</option>
                            <option value="Lulus SMA">Lulus SMA</option>
                            <option value="Lulus Perguruan Tinggi">Lulus Perguruan Tinggi</option>
                        </select>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">Pengeluaran Makan per-bulan Keluarga</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                required
                                value={formData.pengeluaran_makan_perbulan}
                                onChange={(e) => setFormData({ ...formData, pengeluaran_makan_perbulan: e.target.value })}
                                className="block flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900" />
                        </div>
                    </div>
                    <div className="sm:col-span-6">
                        <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">No HP Orang Tua</label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                required
                                value={formData.nohp}
                                onChange={(e) => setFormData({ ...formData, nohp: e.target.value })}
                                className="block flex-1 border-0 bg-transparent text-lg py-1.5 pl-1 text-gray-900" />
                        </div>
                    </div>
                    <div className="sm:col-span-6">
                        <h2 className="text-base font-bold text-gray-900">Determinan</h2>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-lg font-medium leading-6 text-gray-900">Asuransi</label>
                        <select
                            value={formData.asuransi}
                            onChange={(e) => setFormData({ ...formData, asuransi: e.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                            <option value="BPJS/JKN">BPJS/JKN</option>
                            <option value="Mandiri">Mandiri</option>
                            <option value="Tidak Punya">Tidak Punya</option>
                        </select>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="country" className="block text-lg font-medium leading-6 text-gray-900">Air Bersih</label>
                        <select
                            value={formData.airbersih}
                            onChange={(e) => setFormData({ ...formData, airbersih: e.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                            <option value="Ya">Ya</option>
                            <option value="Tidak">Tidak</option>
                        </select>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="country" className="block text-lg font-medium leading-6 text-gray-900">Jamban Sehat</label>
                        <select
                            value={formData.jamban}
                            onChange={(e) => setFormData({ ...formData, jamban: e.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                            <option value="Ya">Ya</option>
                            <option value="Tidak">Tidak</option>
                        </select>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="country" className="block text-lg font-medium leading-6 text-gray-900">Imunisasi Sesuai Usia</label>
                        <select
                            value={formData.imunisasi}
                            onChange={(e) => setFormData({ ...formData, imunisasi: e.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                            <option value="Ya">Ya</option>
                            <option value="Tidak">Tidak</option>
                        </select>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="country" className="block text-lg font-medium leading-6 text-gray-900">Anggota Keluarga Merokok</label>
                        <select
                            value={formData.merokok}
                            onChange={(e) => setFormData({ ...formData, merokok: e.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                            <option value="Ya">Ya</option>
                            <option value="Tidak">Tidak</option>
                        </select>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="country" className="block text-lg font-medium leading-6 text-gray-900">Riwayat Kehamilan Ibu</label>
                        <select
                            value={formData.kehamilan}
                            onChange={(e) => setFormData({ ...formData, kehamilan: e.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6">
                            <option value="KEK">KEK</option>
                            <option value="Non KEK">Non KEK</option>
                        </select>
                    </div>
                </div>

                <div className="flex-end mx-3 mb-5 gap4">
                    <Link href="/" className="text-gray-500 text-sm">
                        Cancel
                    </Link>

                    <button type="submit" disabled={submitting} className="px-5 mx-5 py-1.5 text-sm black_btn rounded-full text-white">
                        {submitting ? `${type}...` : type}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default Form