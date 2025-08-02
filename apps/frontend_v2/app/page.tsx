import { Container } from "./components/container";
import Navbar from "./components/navbar";
import { Hero } from "./components/hero";

export default function Home() {
  return (
    <div className="flex flex-col items-center relative overflow-y-auto h-screen ">
      <Container>
        <Navbar />
        <Hero />
      </Container>
    </div>
  );
}
