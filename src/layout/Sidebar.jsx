import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../public/image/logo.png";
import { FaDollarSign, FaUsers } from "react-icons/fa6";
import { BiSolidDashboard } from "react-icons/bi";
import { HiLogout } from "react-icons/hi";
import { RiAdminLine } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import { TbSpeakerphone } from "react-icons/tb";
import { MdSubscriptions, MdNotificationsNone, MdOutlineSupportAgent } from "react-icons/md";
import Swal from "sweetalert2";

const navItems = [
  { to: "home", label: "Dashboard", icon: BiSolidDashboard },
  { to: "content-creator", label: "Creators", icon: FaUsers },
  { to: "brand", label: "Brands", icon: RiAdminLine },
  { to: "campaigns", label: "Campaigns", icon: TbSpeakerphone },
  { to: "withdraw-request", label: "Withdrawals", icon: FaDollarSign },
  { to: "support", label: "Support", icon: MdOutlineSupportAgent },
  { to: "plans", label: "Plans", icon: MdSubscriptions },
  { to: "notification", label: "Notifications", icon: MdNotificationsNone },
  { to: "settings", label: "Settings", icon: CiSettings },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    Swal.fire({
      title: "Log out?",
      text: "You will need to sign in again to access the admin panel.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0F766E",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Yes, log out",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      }
    });
  };

  return (
    <div className="flex h-full min-h-screen flex-col border-r border-white/5 bg-ink-900 text-white">
      <div className="flex items-center gap-3 px-4 py-6 lg:px-5">
        <img
          className="h-11 w-11 rounded-xl object-cover ring-2 ring-accent/40"
          src={logo}
          alt="Logo"
        />
        <div className="hidden lg:block">
          <p className="font-display text-sm font-semibold tracking-wide">InfluencerAd</p>
          <p className="text-xs text-slate-400">Admin Console</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `nav-item ${isActive ? "nav-item-active" : ""}`
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span className="hidden lg:inline">{label}</span>
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={handleLogOut}
        className="m-3 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-300 transition hover:bg-rose-500/10 hover:text-rose-200"
      >
        <HiLogout className="h-5 w-5" />
        <span className="hidden lg:inline">Log out</span>
      </button>
    </div>
  );
};

export default Sidebar;
