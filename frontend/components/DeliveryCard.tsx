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
      {/* Mobile: round avatar overlapping the top edge */}
      <Image
        src="/cat.jpg"
        alt="A tabby cat"
        width={80}
        height={80}
        className="absolute -top-10 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full object-cover ring-4 ring-white md:hidden"
        priority
      />

      {/* Desktop: full-height image panel on the left */}
      <div className="relative hidden min-h-72 md:block md:w-[45%] md:shrink-0">
        <Image
          src="/cat.jpg"
          alt="A tabby cat"
          fill
          sizes="(min-width: 768px) 400px, 0px"
          className="rounded-l object-cover"
          priority
        />
      </div>

      <div className="flex flex-col px-5 pt-14 pb-8 text-center md:px-6 md:py-12 md:text-left">
        <h1 className="text-xl font-bold text-[#3a7d2c]">{title}</h1>
        <p className="mt-2 text-neutral-600">{message}</p>
        <p className="mt-5 font-semibold text-neutral-700">
          Total price: {priceFormatter.format(totalPrice)}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 md:mt-auto md:pt-10">
          <button
            type="button"
            className="rounded bg-[#3a7d2c] px-4 py-2.5 text-sm font-medium uppercase text-white transition-colors hover:bg-[#2f6824]"
          >
            See details
          </button>
          <button
            type="button"
            className="rounded border border-[#3a7d2c] bg-white px-4 py-2.5 text-sm font-medium uppercase text-[#3a7d2c] transition-colors hover:bg-[#3a7d2c]/5"
          >
            Edit delivery
          </button>
        </div>
      </div>

      {freeGift && <FreeGiftTag />}
    </article>
  );
}
