import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="w-full h-20 bg-cyan-950 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            {/* <Logo /> */}
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/">
                  <p>Hem</p>
                </Link>
              </li>
              <li>
                <Link href="/bookkeep">
                  <p>Bokför</p>
                </Link>
              </li>
              <li>
                <Link href="/history">
                  <p>Historik</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
