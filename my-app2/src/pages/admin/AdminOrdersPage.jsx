import {
  BackButton,
  Loader,
  OrdersDashboard,
  Pagination,
} from "../../components";
import { useOrders } from "../../hooks";

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
