import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Problems, Solutions, Process, Industries, FAQ } from "@/components/site/Content";
import { WorkflowDemo } from "@/components/site/WorkflowDemo";
import { Calculator } from "@/components/site/Calculator";
import { FinalCTA, Footer } from "@/components/site/Footer";
import { Stats } from "@/components/site/Stats";
import { Dashboard } from "@/components/site/Dashboard";
import { MobileCTA } from "@/components/site/MobileCTA";
import { usePagePolish } from "@/components/site/useEffects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurevix — Intelligence Beyond Operations" },
      { name: "description", content: "We engineer intelligent systems that automate operations, accelerate growth and transform the way businesses work." },
      { property: "og:title", content: "Aurevix — Intelligence Beyond Operations" },
      { property: "og:description", content: "We engineer intelligent systems that automate operations, accelerate growth and transform the way businesses work." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  usePagePolish();
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Dashboard />
        <Problems />
        <Solutions />
        <Process />
        <WorkflowDemo />
        <Calculator />
        <Industries />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}
