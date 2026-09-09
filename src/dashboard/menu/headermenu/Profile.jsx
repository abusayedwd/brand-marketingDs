import { Image, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaEnvelope,
  FaPhoneAlt,
  FaUserShield,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useLogedUserQuery } from "../../../redux/features/users/logedUser";
import getMediaUrl, { DEFAULT_AVATAR } from "../../../utils/getMediaUrl";

const Field = ({ icon: Icon, label, value }) => (
  <div className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3">
    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
      <Icon className="text-sm" />
    </div>
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-0.5 truncate text-sm font-semibold text-ink-900">
        {value || "—"}
      </p>
    </div>
  </div>
);

const Profile = () => {
  const navigate = useNavigate();
  const { data: loggedUser, isLoading } = useLogedUserQuery();
  const user = loggedUser?.data?.attributes;

  if (isLoading || !user) {
    return (
      <div className="panel flex h-64 items-center justify-center">
        <Spin />
      </div>
    );
  }

  const avatarSrc = getMediaUrl(user?.image, DEFAULT_AVATAR);

  return (
    <div className="page-shell space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-[var(--ink)] px-6 py-8 text-white sm:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(15,118,110,0.35),transparent_45%)]" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="overflow-hidden rounded-2xl border-2 border-teal-400/30 shadow-lg">
              <Image
                width={96}
                height={96}
                src={avatarSrc}
                alt={user.fullName}
                className="!object-cover"
                preview={{ mask: "View" }}
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">
                Admin profile
              </p>
              <h1 className="font-display mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                {user.fullName}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-300">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-0.5 text-xs font-semibold capitalize text-teal-100">
                  <FaUserShield />
                  {user.role || "admin"}
                </span>
                {user.email && <span>{user.email}</span>}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/dashboard/editprofile")}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 text-sm font-semibold text-white transition hover:bg-teal-500"
          >
            <FaEdit />
            Edit profile
          </button>
        </div>
      </div>

      <div className="panel">
        <h2 className="font-display text-lg font-semibold text-ink-900">
          Account details
        </h2>
        <p className="page-subtitle !mt-1">
          Contact information for this admin account
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field icon={FaUserShield} label="Full name" value={user.fullName} />
          <Field icon={FaEnvelope} label="Email" value={user.email} />
          <Field icon={FaPhoneAlt} label="Phone" value={user.phoneNumber} />
          <Field
            icon={FaMapMarkerAlt}
            label="Address"
            value={user.address}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
