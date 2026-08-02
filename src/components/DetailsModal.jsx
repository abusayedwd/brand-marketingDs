import React from "react";
import { Modal, Tag } from "antd";

export const DetailItem = ({ label, value }) => (
  <div className="detail-item">
    <div className="label">{label}</div>
    <div className="value">{value ?? "—"}</div>
  </div>
);

const DetailsModal = ({
  open,
  onClose,
  title,
  subtitle,
  badge,
  children,
  width = 820,
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
    >
      <div className="mb-5 border-b border-slate-100 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-display text-xl font-semibold text-ink-900">{title}</h2>
          {badge ? <Tag color="cyan">{badge}</Tag> : null}
        </div>
        {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
      </div>
      {children}
    </Modal>
  );
};

export default DetailsModal;
