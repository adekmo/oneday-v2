import { connectToDB } from "@/utils/database";
import Balita from "@/models/balita";

export const dynamic = 'force-dynamic';
export const GET = async (request) => {
    try {
        await connectToDB();

        // const balita = await BalitaSchema.find({}).populate('nika');
        const balita = await Balita.find({});

        return new Response(JSON.stringify(balita), {status : 200});
    } catch (error) {
        return new Response("Failed to fetch data prompt", {status : 500});
    }
}
