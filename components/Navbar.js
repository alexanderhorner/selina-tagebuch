import RouteAwareLink from '@/components/RouteAwareLink'

function Navbar() {
  return (
    <nav className="bg-indigo-500 h-14 shrink-0">
      <ul className="flex justify-center sm:justify-start items-center gap-4 sm:gap-4 px-4 h-full overflow-x-auto">
        <li className="whitespace-nowrap font-bold text-xl">
          Selinas Tagebuch
        </li>
        <li className="hidden sm:block">
          <RouteAwareLink href="/" className="text-white font-bold text-lg transition-opacity whitespace-nowrap">
            Fragen
          </RouteAwareLink>
        </li>
        <li className="hidden sm:block">
          <RouteAwareLink href="/antworten" className="text-white font-semibold text-lg transition-opacity whitespace-nowrap">
            Alle Antworten
          </RouteAwareLink>
        </li>
        <li className="hidden sm:block">
          <RouteAwareLink href="/share" className="text-white font-semibold text-lg transition-opacity whitespace-nowrap">
            Teilen
          </RouteAwareLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
