import Link from 'next/link';

function Navbar() {
  return (
    <nav className="bg-indigo-500 h-14">
      <ul className="flex justify-start items-center gap-4 sm:gap-4 px-4 h-full overflow-x-auto">
        <li className="whitespace-nowrap font-bold text-xl">
          Selinas Tagebuch
        </li>
        <li>
          <Link href="/" className="text-white font-bold text-lg hover:opacity-70 transition-opacity whitespace-nowrap">
            Fragen
          </Link>
        </li>
        <li>
          <Link href="/antworten" className="text-white font-semibold text-lg hover:opacity-70 transition-opacity whitespace-nowrap">
            Alle Antworten
          </Link>
        </li>
        <li>
          <Link href="/share" className="text-white font-semibold text-lg hover:opacity-70 transition-opacity whitespace-nowrap">
            Teilen
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
