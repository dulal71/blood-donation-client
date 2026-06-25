import Footer from "@/component/home/Footer";

import Navbar from "@/component/Navbar";


const HomePageLayout = ({children}) => {
    return (
        <div>
          <Navbar />
                <main className="flex-grow flex flex-col">{children}</main>
         
          <Footer></Footer>      {/* <Footer />   */}
        </div>
    );
};

export default HomePageLayout;