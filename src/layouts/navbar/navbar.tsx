import {Link, useLocation} from "react-router-dom";

export const Navbar = () => {
  // Active Menu
  const location = useLocation();
  return (
    <div className="w-full py-5 flex justify-center items-center">
      <ul className="flex flex-row space-x-4">
        <li>
          <Link to={'/'} className={`flex items-center font-medium hover:text-[#f97316] group ${location && location.pathname === '/' ? 'text-[#f97316]' : '#666666'}`}>
            Excel Merge
          </Link>
        </li>
      </ul>
      <div className="flex justify-center px-10">
        <Link
          to={'/'}
          className="text-4xl font-extrabold">
          TOOLS
          <label className="text-orange-500">HUB</label>
        </Link>
      </div>
      <ul className="flex flex-row space-x-4">
        <li>
          <Link to={'/invoice-maker'} className={`flex items-center font-medium hover:text-[#f97316] ${location && location.pathname === '/invoice-maker' ? 'text-orange-500' : ''}`}>
            Invoice Maker
          </Link>
        </li>
      </ul>
    </div>
  );
}