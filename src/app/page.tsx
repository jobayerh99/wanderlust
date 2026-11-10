import { Banner } from "@/components/banner";
import { Cta } from "@/components/cta";
import { Testimonials } from "@/components/testimonials";
import { WhyChoose } from "@/components/why-choose";

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col">
      
      <Banner />
      <WhyChoose />
      <Testimonials />
      <Cta />
      
    </main>
  );
}
