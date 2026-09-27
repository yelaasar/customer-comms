import DeliveryCard from "@/components/DeliveryCard";
import { getYourNextDelivery } from "@/lib/api/comms";

export default async function Welcome(props: PageProps<"/welcome/[userId]">) {
  const { userId } = await props.params;
  const result = await getYourNextDelivery({ userId });

  return (
    <main className="flex min-h-screen items-center justify-center bg-page px-4 py-16">
      {result.ok ? (
        <DeliveryCard {...result.data} />
      ) : (
        <div className="rounded border border-neutral-300 bg-white px-6 py-8 text-center text-neutral-600">
          <p className="font-semibold text-neutral-800">Something went wrong</p>
          <p className="mt-1">{result.error}</p>
        </div>
      )}
    </main>
  );
}
