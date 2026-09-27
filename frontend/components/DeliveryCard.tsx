import Image from "next/image";
import type { YourNextDeliveryResponse } from "@/lib/api/comms";
import FreeGiftTag from "./FreeGiftTag";

const priceFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export default function DeliveryCard({
  title,
  message,
  totalPrice,
  freeGift,
}: YourNextDeliveryResponse) {
  return (
    <article className="relative w-full max-w-sm rounded border border-neutral-300 bg-white md:flex md:max-w-4xl">
      {/* Mobile: round avatar overlapping the top edge. Desktop: full-height panel on the left. */}
      <div className="absolute -top-10 left-1/2 h-20 w-20 -translate-x-1/2 overflow-hidden rounded-full ring-4 ring-white md:relative md:top-auto md:left-auto md:h-auto md:min-h-72 md:w-[45%] md:shrink-0 md:translate-x-0 md:rounded-none md:rounded-l md:ring-0">
        <Image
          src="/cat.jpg"
          alt="A tabby cat"
          fill
          sizes="(min-width: 768px) 400px, 80px"
          className="object-cover"
          priority
        />
      </div>

      <div className="flex flex-col px-5 pt-14 pb-8 text-center md:px-6 md:py-12 md:text-left">
        <h1 className="text-xl font-bold text-brand">{title}</h1>
        <p className="mt-2 text-neutral-600">{message}</p>
        <p className="mt-5 font-semibold text-neutral-700">
          Total price: {priceFormatter.format(totalPrice)}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 md:mt-auto md:pt-10">
          <button
            type="button"
            className="rounded bg-brand px-4 py-2.5 text-sm font-medium uppercase text-white transition-colors hover:bg-brand-dark"
          >
            See details
          </button>
          <button
            type="button"
            className="rounded border border-brand bg-white px-4 py-2.5 text-sm font-medium uppercase text-brand transition-colors hover:bg-brand/5"
          >
            Edit delivery
          </button>
        </div>
      </div>

      {freeGift && <FreeGiftTag />}
    </article>
  );
}
