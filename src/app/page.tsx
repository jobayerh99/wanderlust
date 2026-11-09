import { Banner } from "@/components/banner";
import { Navbar } from "@/components/navbar";
import { Testimonials } from "@/components/testimonials";
import { WhyChoose } from "@/components/why-choose";

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col">
      <Navbar />
      <Banner />
      <WhyChoose />
      <Testimonials />
    </main>
  );
}
