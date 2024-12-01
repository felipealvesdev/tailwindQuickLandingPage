import { Link, useLocation } from 'react-router-dom';
import { Home, Sun, MoonStar } from 'lucide-react'; 
import { Switch } from "@/components/ui/switch"
import useTheme from '@/hooks/useTheme';
import emmLogo from '../../assets/logos/emmLogo.png';

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

export default function Navbar() {
  const location = useLocation();
  const { toggleTheme, theme } = useTheme();

  const navigation = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
  ];

  return (
    <nav className="sticky top-0 bg-orange-500 dark:bg-orange-600 shadow-lg pb-1 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center">
            <img className="h-10 w-auto" src={emmLogo} alt="Logo" />
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={classNames(
                location.pathname === '/' ? 'text-white' : 'text-teal-100 hover:bg-orange-500 hover:text-white',
                'rounded-md p-2'
              )}
            >
              <Home className="h-6 w-6" />
            </Link>

            <div className="flex items-center space-x-2">
              {theme === "light" ? (
                <Sun className="text-white h-6 w-6" />
              ) : (
                <MoonStar className="text-white h-6 w-6" />
              )}

              <Switch
                checked={theme === "dark"}
                onClick={toggleTheme}
                className="w-10 h-6 bg-orange-500 rounded-full relative focus:outline-none"
              />
            </div>
            
            <Link
              to="/signin"
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-orange-700 shadow-md hover:bg-orange-500 hover:text-white focus:outline-none"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
