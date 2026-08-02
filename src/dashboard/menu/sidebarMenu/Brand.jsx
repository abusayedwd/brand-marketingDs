import React, { useMemo, useState } from "react";
import { Table, Button, Space, Input, Tag, message } from "antd";
import { useGetBrandQuery } from "../../../redux/features/users/brand";
import { useModerateUserMutation } from "../../../redux/features/users/moderateUser";
import DetailsModal, { DetailItem } from "../../../components/DetailsModal";
import url from "../../../redux/api/baseUrl";

const BrandListPage = () => {
  const { data: brandData, isLoading, error, refetch } = useGetBrandQuery();
  const [moderateUser] = useModerateUserMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [search, setSearch] = useState("");

  const moderate = async (id, body) => {
    try {
      await moderateUser({ id, ...body }).unwrap();
      message.success("Brand updated");
      refetch();
    } catch (err) {
      message.error(err?.data?.message || "Moderation failed");
    }
  };

  const brands = brandData?.data?.attributes?.results || [];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return brands;
    return brands.filter(
      (b) =>
        b.fullName?.toLowerCase().includes(q) ||
        b.companyName?.toLowerCase().includes(q) ||
        b.email?.toLowerCase().includes(q) ||
        b.industry?.toLowerCase().includes(q)
    );
  }, [brands, search]);

  const columns = [
    { title: "#", width: 60, render: (_, __, index) => index + 1 },
    {
      title: "Brand",
      key: "brand",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <img
            src={row?.image?.url ? url + row.image.url : "/image/logo.png"}
            alt=""
            className="h-11 w-11 rounded-xl object-cover ring-1 ring-slate-200"
          />
          <div>
            <p className="font-semibold text-ink-800">{row.companyName || row.fullName}</p>
            <p className="text-xs text-slate-500">{row.fullName}</p>
          </div>
        </div>
      ),
    },
    { title: "Industry", dataIndex: "industry", key: "industry" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      render: (website) =>
        website ? (
          <a href={website} target="_blank" rel="noopener noreferrer" className="text-accent">
            Visit
          </a>
        ) : (
          "—"
        ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, row) => (
        <Space wrap>
          {row.isBanned && <Tag color="red">Banned</Tag>}
          {row.isSuspended && <Tag color="orange">Suspended</Tag>}
          {!row.isBanned && !row.isSuspended && <Tag color="green">Active</Tag>}
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, brand) => (
        <Space wrap>
          <Button
            type="primary"
            onClick={() => {
              setSelectedBrand(brand);
              setIsModalVisible(true);
            }}
          >
            View
          </Button>
          <Button
            size="small"
            onClick={() =>
              moderate(brand.id || brand._id, {
                isSuspended: !brand.isSuspended,
              })
            }
          >
            {brand.isSuspended ? "Unsuspend" : "Suspend"}
          </Button>
          <Button
            size="small"
            danger={!brand.isBanned}
            onClick={() =>
              moderate(brand.id || brand._id, {
                isBanned: !brand.isBanned,
              })
            }
          >
            {brand.isBanned ? "Unban" : "Ban"}
          </Button>
        </Space>
      ),
    },
  ];

  if (error) {
    return <div className="panel text-rose-600">Failed to load brands.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="page-title">Brands</h1>
          <p className="page-subtitle">{filtered.length} registered brands</p>
        </div>
        <Input.Search
          allowClear
          placeholder="Search brands"
          className="max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="panel !p-0 overflow-hidden">
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={filtered}
          rowKey={(r) => r.id || r._id}
          pagination={{ pageSize: 8 }}
        />
      </div>

      <DetailsModal
        open={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setSelectedBrand(null);
        }}
        title={selectedBrand?.companyName || selectedBrand?.fullName || "Brand details"}
        subtitle={selectedBrand?.email}
        badge={selectedBrand?.industry || "Brand"}
      >
        {selectedBrand && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <img
                src={
                  selectedBrand?.image?.url
                    ? url + selectedBrand.image.url
                    : "/image/logo.png"
                }
                alt=""
                className="h-16 w-16 rounded-2xl object-cover"
              />
              <div>
                <p className="font-display text-lg font-semibold">
                  {selectedBrand.companyName || selectedBrand.fullName}
                </p>
                <p className="text-sm text-slate-500">{selectedBrand.fullName}</p>
              </div>
            </div>
            <div className="detail-grid">
              <DetailItem label="Industry" value={selectedBrand.industry || "—"} />
              <DetailItem label="Phone" value={selectedBrand.phoneNumber || "—"} />
              <DetailItem label="Website" value={selectedBrand.website || "—"} />
              <DetailItem label="Address" value={selectedBrand.address || "—"} />
            </div>
            <div className="detail-item">
              <div className="label">Company description</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {selectedBrand.companyDescription || "No description added."}
              </p>
            </div>
          </div>
        )}
      </DetailsModal>
    </div>
  );
};

export default BrandListPage;
