import { redirect } from "next/navigation";

// The app only has /welcome/[userId]; send visitors to the README's example
// customer so the root URL lands somewhere useful.
export default function Home() {
  redirect("/welcome/ff535484-6880-4653-b06e-89983ecf4ed5");
}
