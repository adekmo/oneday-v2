import Feed from "@/components/Feed"


const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="mt-5 text-3xl font-bold leading-[1.15] text-black text-center">Data Balita</h1>

            <Feed />
        </section>
    )
}

export default Home