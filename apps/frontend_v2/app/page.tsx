import { Container } from "./components/container";
import Navbar from "./components/navbar";
import { Hero } from "./components/hero";
import { LightRays } from "./components/light-rays";
import { Footer } from "./components/footer";


export default function Home() {
  return (
    <div className="flex flex-col items-center relative overflow-y-auto h-screen ">
      <div
        className="absolute inset-0 z-20 [background-size:40px_40px] [background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] mask-b-from-0% to-100% "
      />
       <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-neutral-900"></div>
        <Container>
        <LightRays />
        <Navbar />
        <Hero />
        </Container>  
        <Footer />
    </div>
  );
}
