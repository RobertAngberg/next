import Link from "next/link";

function Logo() {
  return (
    <ul className="flex items-center md:ml-4">
      <li className="list-none transition-colors duration-300 hover:text-slate-400 mb-6 md:mb-0 md:text-lg md:px-4 md:text-slate-600">
        <Link href="/">Logo</Link>
      </li>
    </ul>
  );
}

export { Logo };
