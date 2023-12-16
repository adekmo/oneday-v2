"use client";

import Link from "next/link"; // helps moving through different pages
import Image from "next/image"; // optimize images
import { useState } from "react"; // hooks (client side ability)

const Nav = () => {
  // const { data: session } = useSession(); // destructuring session from useSession
  // const [providers, setProviders] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  // useEffect(() => {
  //   const setUpProviders = async () => {
  //     const response = await getProviders();
  //     setProviders(response);
  //   };
  //   setUpProviders();
  // }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 items-center flex-center">
        <Image
          src="/assets/images/baja.jpg"
          alt="puskesmas baja"
          width={100}
          height={100}
          className="object-contain"
        />
        <p className="mt-5 text-3xl font-bold leading-[1.15] text-black xs:text-xl">ONE DAY <br /> ONE EGG</p>
      </Link>

      <Link href="/" className="flex flex-center">
        <Image
          src="/assets/images/eat.jpg"
          alt="balita"
          width={100}
          height={100}
          className="object-contain"
        />
      </Link>
      {/* <div className="sm:flex hidden">
        <div className="flex gap-3 md:gap-5">
          <Link href="/tambah-data" className="black_btn">
            Tambah Data
          </Link>
        </div>
      </div> */}

      {/* Mobile Navigation */}

      {/* <div className="sm:hidden flex relative">
        <Link
          href="/tambah-data"
          className="dropdown_link"
          onClick={() => setToggleDropdown(false)}
        >
          Create Prompt
        </Link>
      </div> */}
    </nav>
  );
};

export default Nav;