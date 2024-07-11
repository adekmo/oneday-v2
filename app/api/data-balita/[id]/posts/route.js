import {
    connectToDB
} from "@/utils/database";
import Pengukuran from "@/models/pengukuran";
import Balita from "@/models/balita";

export const dynamic = 'force-dynamic';
// export const GET = async (request, { params }) => {
//     try {
//         await connectToDB();

//         const { creator } = params;

//         // const balita = await Balita.findById(creator);
//         // if (!balita) {
//         //     return new Response(JSON.stringify({
//         //         error: 'Balita tidak ditemukan'
//         //     }), {
//         //         status: 404
//         //     });
//         // }

//         const pengukuran = await Pengukuran.find({ creator: creator }).populate('creator');

//         return new Response(JSON.stringify(pengukuran), {
//             status: 200
//         });
//     } catch (error) {
//         console.error('Kesalahan mengambil data:', error);
//         return new Response(JSON.stringify({
//             error: 'Kesalahan Server Internal'
//         }), {
//             status: 500
//         });
//     }
// }

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompts = await Pengukuran.find({}).populate('creator');
        // const prompts = await Pengukuran.find({ creator: params.id }).populate("Balita");
        return new Response(JSON.stringify(prompts), {status : 200});
    } catch (error) {
        return new Response(error, {status : 500});
    }
}
export const POST = async (req, res) => {
    const {
        creator,
        tanggal_pengukuran,
        tinggi_panjang_badan,
        berat_badan,
        lla
    } = await req.json();

    try {
        await connectToDB();
        const newPengukuran = new Pengukuran({
            creator: creator,
            tanggal_pengukuran,
            tinggi_panjang_badan,
            berat_badan,
            lla
        })

        await newPengukuran.save();

        return new Response(JSON.stringify(newPengukuran), {
            status: 201
        })
    } catch (error) {
        return new Response("Fail to create a new Prompt", {
            status: 500
        })
    }
}

export const DELETE = async (req, { params }) => {
    const { pengukuranId } = params;

    try {
        await connectToDB();

        const pengukuran = await Pengukuran.findByIdAndDelete(pengukuranId);

        if (!pengukuran) {
            return new Response("Pengukuran not found", { status: 404 });
        }

        return new Response("Pengukuran deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete Pengukuran", { status: 500 });
    }
}