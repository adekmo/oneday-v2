"use client"

import { useState } from 'react'
// import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@/components/Form'


const TambahData = () => {

    const router = useRouter();
    // const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        nik_anak: '',
        nik_kk: '',
        nama: '',
        jenis_kelamin: 'Laki-Laki',
        tanggal_lahir: null,
        provinsi: 'Banten',
        kota: 'Tangerang Kota',
        kecamatan: 'Cibodas',
        kelurahan: 'Cibodas Baru',
        rt: '',
        alamat: '',
        puskesmas: 'Jalan Baja',
        anakke: '',
        berat_lahir: '',
        panjang_lahir: '',
        imd: 'Ya',
        kms: 'Ya',
        asi_eksklusif: 'Umur 0 Bulan',
        vitamina: 'Feb',
        penyakit_penyerta: 'Ya',
        cacingan: 'Ya',
        // kia: 'Ya',
        nik_ot: '',
        no_kk: '',
        nama_ot: '',
        pendidikan_terakhir_ot: 'Tidak Lulus SD',
        pendapatan_per_bulan: '',
        nohp: '',
        asuransi: 'BPJS/JKN',
        airbersih: 'Ya',
        jamban: 'Ya',
        imunisasi: 'Ya',
        merokok: 'Ya',
        kehamilan: 'KEK',
        foto: null,
    });

    const handleDateChane = (date) => {
        setPost({ ...post, tanggal_lahir: date });
    };

    const handleChangeFile = (event) => {
        const file = event.target.files[0];

        if (file) {
            const allowFormats = ['image/jpeg', 'image/png'];
            const maxSize = 5 * 1024 * 1024;

            if (allowFormats.includes(file.type) && file.size <= maxSize) {
                setPost({ ...post, foto: file });
                // setError('');
            } else {
                setPost({ ...post, foto: null });
                // setError('File harus berformat JPG atau PNG dan ukuran maksimal 5MB.');
            }
        } else {
            setPost({ ...post, foto: null });
            // setError('');
        }
    };

    const createPrompt = async (e) => {
        e.preventDefault();


        setSubmitting(true);

        try {
            const response = await fetch('api/data-balita/new', {
                // method: 'POST',
                // body: JSON.stringify(post)
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nik_anak: post.nik_anak,
                    nik_kk: post.nik_kk,
                    nama: post.nama,
                    jenis_kelamin: post.jenis_kelamin,
                    tanggal_lahir: post.tanggal_lahir,
                    provinsi: post.provinsi,
                    kota: post.kota,
                    kecamatan: post.kecamatan,
                    kelurahan: post.kelurahan,
                    rt: post.rt,
                    alamat: post.alamat,
                    puskesmas: post.puskesmas,
                    anakke: post.anakke,
                    berat_lahir: post.berat_lahir,
                    panjang_lahir: post.panjang_lahir,
                    imd: post.imd,
                    kms: post.kms,
                    asi_eksklusif: post.asi_eksklusif,
                    vitamina: post.vitamina,
                    penyakit_penyerta: post.penyakit_penyerta,
                    cacingan: post.cacingan,
                    // kia: post.kia,
                    nik_ot: post.nik_ot,
                    no_kk: post.no_kk,
                    nama_ot: post.nama_ot,
                    pendidikan_terakhir_ot: post.pendidikan_terakhir_ot,
                    pendapatan_per_bulan: post.pendapatan_per_bulan,
                    nohp: post.nohp,
                    asuransi: post.asuransi,
                    airbersih: post.airbersih,
                    jamban: post.jamban,
                    imunisasi: post.imunisasi,
                    merokok: post.merokok,
                    kehamilan: post.kehamilan,
                    foto: post.foto
                })
            })

            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }

        // fetch('http://localhost:8000/laksa', {
        //     method: 'POST',
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(post)
        // }).then(() => {
        //     console.log('Data Ditambahkan');
        //     setIsPending(false);
        //     navigate("/");
        // })
    }

    return (
        <Form
            type="Tambah"
            formData={post}
            setFormData={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
            handleChangeFile={handleChangeFile}
            handleDateChane={handleDateChane}
        />
    )
}

export default TambahData