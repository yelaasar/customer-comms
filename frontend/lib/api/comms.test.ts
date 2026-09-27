import { afterEach, describe, expect, it, vi } from "vitest";
import { getYourNextDelivery } from "./comms";

const delivery = {
  title: "Your next delivery for Dorian and Ocie",
  message: "Hey Kayleigh!",
  totalPrice: 134,
  freeGift: true,
};

function mockFetch(response: Response | Error) {
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      response instanceof Error
        ? Promise.reject(response)
        : Promise.resolve(response),
    ),
  );
}

describe("getYourNextDelivery", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns the delivery on success", async () => {
    mockFetch(Response.json(delivery));

    await expect(getYourNextDelivery({ userId: "abc" })).resolves.toEqual({
      ok: true,
      data: delivery,
    });
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3001/comms/your-next-delivery/abc",
      { cache: "no-store" },
    );
  });

  it("url-encodes the user id", async () => {
    mockFetch(Response.json(delivery));

    await getYourNextDelivery({ userId: "a/b c" });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/your-next-delivery/a%2Fb%20c"),
      expect.anything(),
    );
  });

  it("maps a 404 to a customer-facing message", async () => {
    mockFetch(new Response(null, { status: 404 }));

    await expect(getYourNextDelivery({ userId: "abc" })).resolves.toEqual({
      ok: false,
      error: "We couldn't find an upcoming delivery for this customer.",
    });
  });

  it("maps other HTTP errors to a message with the status", async () => {
    mockFetch(new Response(null, { status: 500 }));

    await expect(getYourNextDelivery({ userId: "abc" })).resolves.toEqual({
      ok: false,
      error: "Something went wrong (HTTP 500).",
    });
  });

  it("maps a network failure to an unreachable message", async () => {
    mockFetch(new TypeError("fetch failed"));

    await expect(getYourNextDelivery({ userId: "abc" })).resolves.toEqual({
      ok: false,
      error: "Unable to reach the delivery service.",
    });
  });
});
