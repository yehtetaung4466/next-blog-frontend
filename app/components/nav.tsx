
import IfLogin from './ifLogin';
export default function Nav() {
  
  return (
    <div className="navbar z-[60] bg-base-100 sticky top-0 opacity-80 border-b shadow-sm">
      <div className="flex-1">
        <a className=" ml-4 font-semibold normal-case text-xl">My blog</a>
      </div>
      <IfLogin/>
    </div>
  );
}
