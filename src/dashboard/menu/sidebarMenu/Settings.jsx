import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const links = [
  {
    title: "Subscription plans",
    desc: "Create and price marketplace subscription plans",
    path: "/dashboard/plans",
  },
  {
    title: "Privacy Policy",
    desc: "Manage privacy content shown on the website",
    path: "/dashboard/settings/privacypolicy",
  },
  {
    title: "Terms and Conditions",
    desc: "Update platform terms for brands and creators",
    path: "/dashboard/settings/termcondition",
  },
  {
    title: "About Us",
    desc: "Edit company story and about page copy",
    path: "/dashboard/settings/about",
  },
];

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">CMS pages and legal content for the public site.</p>
      </div>

      <div className="grid gap-3">
        {links.map((item) => (
          <button
            key={item.path}
            type="button"
            onClick={() => navigate(item.path)}
            className="panel flex w-full items-center justify-between text-left transition hover:border-accent/40 hover:shadow-lift"
          >
            <div>
              <p className="font-display text-base font-semibold text-ink-900">
                {item.title}
              </p>
              <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
            </div>
            <IoIosArrowForward className="text-xl text-accent" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Settings;
