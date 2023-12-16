import {
    Schema,
    models,
    model
} from "mongoose";

const MonevSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'Balita',
    },
    harike: {
        type: String,
        required: [true, 'Harike is required'],
    },
    bulan: {
        type: String,
        required: [true, 'Bulan is required'],
    },
    diberikan_telur: {
        type: String,
        required: [true, 'Diberikan Telur is required'],
    },
    porsi_telur_dihabis: {
        type: String,
        required: [true, 'Porsi Telur Dihabis is required'],
    },
    // waktu_beri_telur: {
    //     pagi: {
    //         type: Boolean,
    //         default: false,
    //     },
    //     siang: {
    //         type: Boolean,
    //         default: false,
    //     },
    //     sore: {
    //         type: Boolean,
    //         default: false,
    //     },
    //     malam: {
    //         type: Boolean,
    //         default: false,
    //     },
    // },
    jam_beri_telur: {
        type: String,
    },
    // waktu_menu_makanan: {
    //     pagi: {
    //         type: Boolean,
    //         default: false,
    //     },
    //     siang: {
    //         type: Boolean,
    //         default: false,
    //     },
    //     sore: {
    //         type: Boolean,
    //         default: false,
    //     },
    //     malam: {
    //         type: Boolean,
    //         default: false,
    //     },
    // },
    menu_makanan: {
        type: String,
        required: [true, 'Menu Makanan is required'],
    },
});

const Monev = models.Monev || model("Monev", MonevSchema);

export default Monev;