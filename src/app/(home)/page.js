import Banner from "@/component/home/Banner";
import Newsletter from "@/component/home/Newsletter";
import { discoverValidationDepths } from "next/dist/server/app-render/instant-validation/instant-validation";


export default function Home() {
  return (
  <div> 
    <Banner></Banner>
    <Newsletter></Newsletter>
   </div>
  );
}
