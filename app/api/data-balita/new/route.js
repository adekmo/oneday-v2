import { connectToDB } from "@/utils/database";
import Balita from "@/models/balita";


export const POST = async (req, res) => {
    const { nik_anak,
        nik_kk,
        nama,
        jenis_kelamin,
        tanggal_lahir,
        provinsi,
        kota,
        kecamatan,
        kelurahan,
        rt,
        alamat,
        puskesmas,
        anakke,
        berat_lahir,
        panjang_lahir,
        imd,
        kms,
        asi_eksklusif,
        vitamina,
        penyakit_penyerta,
        cacingan,
        // kia,
        nik_ot,
        no_kk,
        nama_ot,
        pendidikan_terakhir_ot,
        pengeluaran_makan_perbulan,
        nohp,
        asuransi,
        airbersih,
        jamban,
        imunisasi,
        merokok,
        kehamilan,
        foto } = await req.json();

    try {
        await connectToDB();
        const newPrompt = new Balita({
            nik_anak,
            nik_kk,
            nama,
            jenis_kelamin,
            tanggal_lahir,
            provinsi,
            kota,
            kecamatan,
            kelurahan,
            rt,
            alamat,
            puskesmas,
            anakke,
            berat_lahir,
            panjang_lahir,
            imd,
            kms,
            asi_eksklusif,
            vitamina,
            penyakit_penyerta,
            cacingan,
            // kia,
            nik_ot,
            no_kk,
            nama_ot,
            pendidikan_terakhir_ot,
            pengeluaran_makan_perbulan,
            nohp,
            asuransi,
            airbersih,
            jamban,
            imunisasi,
            merokok,
            kehamilan,
            foto})

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        console.error('Error creating new data:', error);
        return new Response(JSON.stringify({ message: 'Gagal menambahkan data balita', error: error.message }), { status: 500 });
    }
}