import Link from 'next/link';

function Navbar() {
  return (
    <nav className="bg-indigo-500 px-4 h-14">
      <ul className="flex justify-start items-center gap-4 px-4 h-full">
        <li>
          Selinas Tagebuch
        </li>
        <li>
          <Link href="/" className="text-white font-bold text-lg hover:opacity-70 transition-opacity">
            Frage
          </Link>
        </li>
        <li>
          <Link href="/antworten" className="text-white font-semibold text-lg hover:opacity-70 transition-opacity">
            Antwortliste
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
