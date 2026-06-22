import Footer from "@/component/home/Footer";
import Newsletter from "@/component/home/Newsletter";
import Navbar from "@/component/Navbar";


const HomePageLayout = ({children}) => {
    return (
        <div>
          <Navbar />
                <main className="flex-grow flex flex-col">{children}</main>
          <Newsletter></Newsletter>
          <Footer></Footer>      {/* <Footer />   */}
        </div>
    );
};

export default HomePageLayout;