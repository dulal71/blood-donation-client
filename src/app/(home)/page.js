import Banner from "@/component/home/Banner";
import Featured from "@/component/home/Featured";
import HowItWorks from "@/component/home/HowItWorks";
import ImpactStats from "@/component/home/ImpactStats";
import Newsletter from "@/component/home/Newsletter";
import Testimonials from "@/component/home/Testimonials";
import UrgentOpportunities from "@/component/home/UrgentOpportunities";
import { discoverValidationDepths } from "next/dist/server/app-render/instant-validation/instant-validation";


export default function Home() {
  return (
  <div> 
    <Banner></Banner>
    <UrgentOpportunities></UrgentOpportunities>
    <HowItWorks></HowItWorks>
    <Featured></Featured>
    <ImpactStats></ImpactStats>
    <Newsletter></Newsletter>
    <Testimonials></Testimonials>
   </div>
  );
}
