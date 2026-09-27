const BASE_URL = process.env.API_URL ?? "http://localhost:3001";

export type YourNextDeliveryResponse = {
  title: string;
  message: string;
  totalPrice: number;
  freeGift: boolean;
};

export type CommsResult =
  | { ok: true; data: YourNextDeliveryResponse }
  | { ok: false; error: string };

export async function getYourNextDelivery({
  userId,
}: {
  userId: string;
}): Promise<CommsResult> {
  let res: Response;
  try {
    res = await fetch(
      `${BASE_URL}/comms/your-next-delivery/${encodeURIComponent(userId)}`,
      { cache: "no-store" },
    );
  } catch {
    return { ok: false, error: "Unable to reach the delivery service." };
  }

  if (res.status === 404) {
    return {
      ok: false,
      error: "We couldn't find an upcoming delivery for this customer.",
    };
  }
  if (!res.ok) {
    return { ok: false, error: `Something went wrong (HTTP ${res.status}).` };
  }

  const data = (await res.json()) as YourNextDeliveryResponse;
  return { ok: true, data };
}
