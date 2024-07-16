import {
    connectToDB
} from "@/utils/database";
import Balita from "@/models/balita";
// import Pengukuran from "@models/pengukuran";
// GET -> read

export const GET = async (request, {
    params
}) => {
    try {
        await connectToDB();

        // const prompt = await Prompt.findById(params.id).populate('creator');
        const balita = await Balita.findById(params.id);

        if (!balita) return new Response("Prompt not found", {
            status: 404
        });

        return new Response(JSON.stringify(balita), {
            status: 200
        });
    } catch (error) {
        return new Response("Apanya yang error?", {
            status: 500
        });
    }
}

// export const POST = async (req, res) => {
//     const { userId, tanggal_pengukuran, tinggi_panjang_badan, berat_badan, lla } = await req.json();

//     try {
//         await connectToDB();
//         const newPengukuran = new Pengukuran({ creator: userId, tanggal_pengukuran, tinggi_panjang_badan, berat_badan, lla})

//         await newPengukuran.save();

//         return new Response(JSON.stringify(newPengukuran), { status: 201 })
//     } catch (error) {
//         return new Response("Fail to create a new Prompt", {status: 500})
//     }
// }

// PATCH -> update
export const PATCH = async (request, {
    params
}) => {
    const {
        nik_anak,
        // nik_kk,
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
        // nik_ot,
        // no_kk,
        nama_ot,
        pendidikan_terakhir_ot,
        // pendapatan_per_bulan,
        pengeluaran_makan_perbulan,
        nohp,
        asuransi,
        airbersih,
        jamban,
        imunisasi,
        merokok,
        kehamilan,
        foto
    } = await request.json();

    try {
        await connectToDB();
        const existingPrompt = await Balita.findById(params.id);

        if (!existingPrompt) return new Response("Prompt not Found", {
            status: 404
        });

        existingPrompt.nik_anak = nik_anak;
        // existingPrompt.nik_kk = nik_kk;
        existingPrompt.jenis_kelamin = jenis_kelamin;
        existingPrompt.nama = nama;
        existingPrompt.tanggal_lahir = tanggal_lahir;
        existingPrompt.provinsi = provinsi;
        existingPrompt.kota = kota;
        existingPrompt.kecamatan = kecamatan;
        existingPrompt.kelurahan = kelurahan;
        existingPrompt.rt = rt;
        existingPrompt.alamat = alamat;
        existingPrompt.puskesmas = puskesmas;
        existingPrompt.anakke = anakke;
        existingPrompt.berat_lahir = berat_lahir;
        existingPrompt.panjang_lahir = panjang_lahir;
        existingPrompt.imd = imd;
        existingPrompt.kms = kms;
        existingPrompt.asi_eksklusif = asi_eksklusif;
        existingPrompt.vitamina = vitamina;
        existingPrompt.penyakit_penyerta = penyakit_penyerta;
        existingPrompt.cacingan = cacingan;
        // existingPrompt.nik_ot = nik_ot;
        // existingPrompt.no_kk = no_kk;
        existingPrompt.nama_ot = nama_ot;
        existingPrompt.pendidikan_terakhir_ot = pendidikan_terakhir_ot;
        // existingPrompt.pendapatan_per_bulan = pendapatan_per_bulan;
        existingPrompt.pengeluaran_makan_perbulan = pengeluaran_makan_perbulan;
        existingPrompt.nohp = nohp;
        existingPrompt.asuransi = asuransi;
        existingPrompt.airbersih = airbersih;
        existingPrompt.jamban = jamban;
        existingPrompt.imunisasi = imunisasi;
        existingPrompt.merokok = merokok;
        existingPrompt.kehamilan = kehamilan;
        existingPrompt.foto = foto;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {
            status: 200
        });
    } catch (error) {
        return new Response("Failed update prompt", {
            status: 500
        });
    }
}

// DELETE -> delete
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        const result = await Balita.deleteOne({ _id: params.id });

        if (result.deletedCount === 0) {
            return new Response("Data not found", { status: 404 });
        }

        return new Response("Data deleted successfully", { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Data deletion failed", { status: 500 });
    }
}