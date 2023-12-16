"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@/components/Form';

// import Form from '@components/Form'

const UpdateData = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
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


    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`api/data-balita/${promptId}`);
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
                anakke: data.anakke,
                berat_lahir: data.berat_lahir,
                panjang_lahir: data.panjang_lahir,
                imd: data.imd,
                kms: data.kms,
                asi_eksklusif: data.asi_eksklusif,
                vitamina: data.vitamina,
                penyakit_penyerta: data.penyakit_penyerta,
                cacingan: data.cacingan,
                nik_ot: data.nik_ot,
                no_kk: data.no_kk,
                nama_ot: data.nama_ot,
                pendidikan_terakhir_ot: data.pendidikan_terakhir_ot,
                pendapatan_per_bulan: data.pendapatan_per_bulan,
                nohp: data.nohp,
                asuransi: data.asuransi,
                airbersih: data.airbersih,
                jamban: data.jamban,
                imunisasi: data.imunisasi,
                merokok: data.merokok,
                kehamilan: data.kehamilan,
                foto: data.foto,
            });
        }

        if (promptId) getPromptDetails();
    }, [promptId]);

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

    const updatePrompt = async (e) => {
        e.preventDefault();

        setSubmitting(true);

        if (!promptId) return alert('Data Balita Tidak Ditemukan');

        try {
            const response = await fetch(`/api/data-balita/${promptId}`, {
                method: 'PATCH',
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
    }
    return (
        <div>
            <Form
            type="Edit"
            formData={post}
            setFormData={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
            handleChangeFile={handleChangeFile}
            handleDateChane={handleDateChane}
        />
        </div>
        // <div>HAlaman Edit {promptId}</div>
    )
}

export default UpdateData