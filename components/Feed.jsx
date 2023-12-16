"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from 'next/navigation'

import DataList from "./DataList"


const Feed = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    // const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('api/data-balita');
            const data = await response.json();

            setPosts(data);
        }

        fetchPosts();
    }, [])
    

    return (
        <section className="feed">

            {/* <PromptCardList 
                data={posts}
                // handleTagClick={() => {}}
            /> */}
            {posts && <DataList blogs={posts} setPosts={setPosts} />}
        </section>
    )
}

export default Feed