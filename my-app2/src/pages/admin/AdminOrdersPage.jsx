import { BackButton, Loader, Pagination } from "../../components";
import OrdersDashboard from "../../components/admin/OrdersDashboard";
import useOrders from "../../hooks/Admin/useOrders";

function AdminOrdersPage() {
  const { orders, setPage, setSort, sort, page } = useOrders();

  if (!orders) return <Loader />;

  return (
    <section className="w-full" id="orders">
      <BackButton />
      <OrdersDashboard sort={sort} setSort={setSort} page={page} />
      <Pagination handlePage={setPage} page={page} orders={orders} />
    </section>
  );
}

export default AdminOrdersPage;
