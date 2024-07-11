import { Schema, models, model } from "mongoose";

const BalitaSchema = new Schema({
    nik_anak: {
        type: String,
        required: [true, "Nik Anak is required"],
    },
    nik_kk: {
        type: String,
        required: [true, "NIk KK is required"],
    },
    nama: {
        type: String,
        required: [true, "Nama is required"],
    },
    jenis_kelamin: {
        type: String,
        required: [true, "Jenis Kelamin is required"],
    },
    tanggal_lahir: {
        type: String,
        // required: [true, "Tanggal Lahir is required"],
    },
    provinsi: {
        type: String,
        required: [true, "{Provinsi} is required"],
    },
    kota: {
        type: String,
        required: [true, "Kota is required"],
    },
    kecamatan: {
        type: String,
        required: [true, "Kecamatan is required"],
    },
    kelurahan: {
        type: String,
        required: [true, "Kelurahan is required"],
    },
    rt: {
        type: String,
        required: [true, "RT/RW is required"],
    },
    alamat: {
        type: String,
        required: [true, "Alamat is required"],
    },
    puskesmas: {
        type: String,
        required: [true, "puskesmas is required"],
    },
    anakke: {
        type: String,
        required: [true, "This Input is required"],
    },
    berat_lahir: {
        type: String,
        required: [true, "Berat Lahir is required"],
    },
    panjang_lahir: {
        type: String,
        required: [true, "Panjang Lahir is required"],
    },
    imd: {
        type: String,
        required: [true, "This Input is required"],
    },
    kms: {
        type: String,
        required: [true, "This Input is required"],
    },
    asi_eksklusif: {
        type: String,
        required: [true, "This Input is required"],
    },
    vitamina: {
        type: String,
        required: [true, "This Input is required"],
    },
    penyakit_penyerta: {
        type: String,
        required: [true, "This Input is required"],
    },
    cacingan: {
        type: String,
        required: [true, "This Input is required"],
    },
    // kia: {
    //     type: String,
    //     required: [true, "This Input is required"],
    // },
    nik_ot: {
        type: String,
        required: [true, "This Input is required"],
    },
    no_kk: {
        type: String,
        required: [true, "This Input is required"],
    },
    nama_ot: {
        type: String,
        required: [true, "This Input is required"],
    },
    pendidikan_terakhir_ot: {
        type: String,
        required: [true, "This Input is required"],
    },
    // pendapatan_per_bulan: {
    //     type: String,
    //     // required: [true, "This Input is required"],
    // },
    pengeluaran_makan_perbulan: {
        type: String,
        required: [true, "This Input is required"],
    },
    nohp: {
        type: String,
        required: [true, "This Input is required"],
    },
    asuransi: {
        type: String,
        required: [true, "This Input is required"],
    },
    airbersih: {
        type: String,
        required: [true, "This Input is required"],
    },
    jamban: {
        type: String,
        required: [true, "This Input is required"],
    },
    imunisasi: {
        type: String,
        required: [true, "This Input is required"],
    },
    merokok: {
        type: String,
        required: [true, "This Input is required"],
    },
    kehamilan: {
        type: String,
        required: [true, "This Input is required"],
    },
    foto: {
        type: String,
        // required: [true, "Image is required"],
    }
});

const Balita = models.Balita || model("Balita", BalitaSchema);

export default Balita;