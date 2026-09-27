const BASE_URL = process.env.API_URL ?? "http://localhost:3001";

export type YourNextDeliveryResponse = {
  title: string;
  message: string;
  totalPrice: number;
  freeGift: boolean;
};

export type CommsResult = {
  data: YourNextDeliveryResponse | null;
  error: string | null;
};

export async function getYourNextDelivery({
  userId,
}: {
  userId: string;
}): Promise<CommsResult> {
  try {
    const res = await fetch(
      `${BASE_URL}/comms/your-next-delivery/${encodeURIComponent(userId)}`,
      { cache: "no-store" },
    );
    if (!res.ok) {
      return {
        data: null,
        error:
          res.status === 404
            ? "We couldn't find an upcoming delivery for this customer."
            : res.statusText,
      };
    }
    const data = (await res.json()) as YourNextDeliveryResponse;
    return {
      data: data,
      error: null,
    };
  } catch (e) {
    return {
      data: null,
      error: e instanceof Error ? e.message : "Request failed",
    };
  }
}
