import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full h-20 bg-cyan-950 sticky flex justify-center items-center">
      <ul className="hidden md:flex gap-x-14 text-white text-lg font-bold text-center">
        <li>
          <Link href="/">
            <p className="hover:text-gray-500 transition-colors">Hem</p>
          </Link>
        </li>
        <li>
          <Link href="/bookkeep">
            <p className="hover:text-gray-500 transition-colors">Bokför</p>
          </Link>
        </li>
        <li>
          <Link href="/history">
            <p className="hover:text-gray-500 transition-colors">Historik</p>
          </Link>
        </li>
        <li>
          <Link href="/invoice">
            <p className="hover:text-gray-500 transition-colors">Faktura</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
