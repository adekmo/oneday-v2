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
        pendapatan_per_bulan,
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
            pendapatan_per_bulan,
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
        return new Response("Fail to create a new Prompt", {status: 500})
    }
}