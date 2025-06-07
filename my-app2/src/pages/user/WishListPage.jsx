import { BackButton } from "../../components";
import WishListProductGrid from "../../components/user/WishListProductGrid";
import { pathnames } from "../../routes/pathnames";

export default function WishListPage() {
  return (
    <div className="flex flex-col gap-2">
      <BackButton path={pathnames.HOME} />
      <WishListProductGrid />
    </div>
  );
}
