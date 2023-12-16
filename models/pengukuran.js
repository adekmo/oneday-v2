import { Schema, models, model } from "mongoose";

const PengukuranSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'Balita',
    },
    tanggal_pengukuran: {
        type: String,
        required: [true, 'Prompt is required'],
    },
    tinggi_panjang_badan: {
        type: String,
        required: [true, 'Tag is required'],
    },
    berat_badan: {
        type: String,
        required: [true, 'Tag is required'],
    },
    lla: {
        type: String,
        required: [true, 'Tag is required'],
    }
});

const Pengukuran = models.Pengukuran || model("Pengukuran", PengukuranSchema);

export default Pengukuran;