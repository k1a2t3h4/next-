import PageNavigator from '../../components/PageNavigator';
// Define your dynamic navigation list (can be from DB, file, etc.)
const navItems = [
  { name: 'Home', path: '/call' },
  { name: 'About', path: '/about' },
  { name: 'Dynamic-State-creation-algorith-testing', path: '/Dynamic-State-creation-algorith-testing' },
];

export default function Header() {
  return (
    <header className="flex justify-between p-4 bg-gray-800 text-white relative">
      <h1 className="text-xl font-bold">My App</h1>
      <nav className="flex gap-4">
        {navItems.map((item, index) => (
          <span
            key={index}
            id={`nav-${index}`}
            className="cursor-pointer hover:underline"
          >
            {item.name}
          </span>
        ))}
      </nav>

      {/* Client overlays to handle navigation */}
      {navItems.map((item, index) => (
        <PageNavigator key={index} id={`nav-${index}`} path={item.path} />
      ))}
    </header>
  );
}
