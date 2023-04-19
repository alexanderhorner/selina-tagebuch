import RouteAwareLink from './RouteAwareLink'

export default function BottomNav() {
  return (
    <nav className="bg-indigo-500 h-[calc(3.5rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] shrink-0 sm:hidden">
      <ul className="flex justify-around items-center gap-4 sm:gap-4 px-4 h-full overflow-x-auto">
        <li>
          <RouteAwareLink href="/" className="text-white font-bold text-lg transition-opacity whitespace-nowrap">
            Fragen
          </RouteAwareLink>
        </li>
        <li>
          <RouteAwareLink href="/antworten" className="text-white font-semibold text-lg transition-opacity whitespace-nowrap">
            Alle Antworten
          </RouteAwareLink>
        </li>
        <li>
          <RouteAwareLink href="/share" className="text-white font-semibold text-lg transition-opacity whitespace-nowrap">
            Teilen
          </RouteAwareLink>
        </li>
      </ul>
    </nav>
  );
}
