import { BackButton } from "../../components";
import WishListProductGrid from "../../components/user/WishListProductGrid";


export default function WishListPage() {
  return (
    <div className="flex flex-col gap-2">
      <BackButton />
      <WishListProductGrid />
    </div>
  );
}

