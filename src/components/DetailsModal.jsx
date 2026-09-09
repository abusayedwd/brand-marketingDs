import React from "react";
import { Modal, Tag } from "antd";
import getMediaUrl from "../utils/getMediaUrl";

export const DetailItem = ({ label, value }) => (
  <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
    <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
      {label}
    </div>
    <div className="mt-1 text-sm font-semibold text-ink-900 break-words">
      {value ?? "—"}
    </div>
  </div>
);

/**
 * Professional detail drawer for Brand / Creator profiles in admin.
 */
const DetailsModal = ({
  open,
  onClose,
  title,
  subtitle,
  badge,
  avatar,
  meta = [],
  children,
  width = 880,
  footer = null,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={footer}
      width={width}
      title={null}
      className="details-modal"
      styles={{ body: { paddingTop: 8 } }}
    >
      <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-5 py-6 text-white sm:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(15,118,110,0.35),transparent_45%)]" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
          {avatar !== undefined && (
            <img
              src={getMediaUrl(avatar, "/image/logo.png")}
              alt=""
              className="h-20 w-20 rounded-2xl object-cover ring-2 ring-teal-400/30"
            />
          )}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                {title}
              </h2>
              {badge ? (
                <Tag className="!m-0 !border-0 !bg-teal-500/20 !text-teal-100">{badge}</Tag>
              ) : null}
            </div>
            {subtitle ? (
              <p className="mt-1 truncate text-sm text-slate-300">{subtitle}</p>
            ) : null}
            {meta.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300">
                {meta.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5">{children}</div>
    </Modal>
  );
};

export default DetailsModal;
