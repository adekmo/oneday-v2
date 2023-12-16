import {
    connectToDB
} from "@/utils/database";
import Monev from "@/models/monev";
import Balita from "@/models/balita";

export const dynamic = 'force-dynamic';

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompts = await Monev.find({}).populate('creator');
        return new Response(JSON.stringify(prompts), {status : 200});
    } catch (error) {
        return new Response(error, {status : 500});
    }
}

export const POST = async (req, res) => {
    const {
        creator,
        harike,
        bulan,
        diberikan_telur,
        porsi_telur_dihabis,
        // waktu_beri_telur,
        jam_beri_telur,
        // waktu_menu_makanan,
        menu_makanan
    } = await req.json();

    try {
        await connectToDB();
        const newMonev = new Monev({
            creator: creator,
            harike,
            bulan,
            diberikan_telur,
            porsi_telur_dihabis,
            // waktu_beri_telur,
            jam_beri_telur,
            // waktu_menu_makanan,
            menu_makanan
        })

        await newMonev.save();

        return new Response(JSON.stringify(newMonev), {
            status: 201
        })
    } catch (error) {
        console.log(error);
    }
}