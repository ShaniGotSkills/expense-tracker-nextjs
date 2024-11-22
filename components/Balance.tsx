import getUserBalance from "@/app/actions/getUserBalance"
import { addCommas } from "@/lib/utils";

export default async function () {
    const { balance } = await getUserBalance();

  return (
    <div>
        <h4>Your balance</h4>
        <h1>${addCommas(Number(balance?.toFixed(2) ?? 0))}</h1>
    </div>
  )
}
