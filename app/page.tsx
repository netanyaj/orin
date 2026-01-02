import Hero from "./_components/Hero";
import { Recommendation } from "./_components/Recommendation";
import CreateNewTrip from "./trip/page";

export default function Home() {
  return (
    <div>
      <Hero/>
      <Recommendation/>
    </div>
  );
}
