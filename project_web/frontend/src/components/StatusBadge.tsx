export default function StatusBadge({ status }: { status: string }) {
  const map: any = {
    pending: { text: "รอดำเนินการ", color: "warning" },
    approved: { text: "อนุมัติ", color: "success" },
    rejected: { text: "ปฏิเสธ", color: "danger" }
  };

  const data = map[status] || map.pending;

  return <span className={`badge bg-${data.color}`}>{data.text}</span>;
}