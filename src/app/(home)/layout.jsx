import Navbar from "@/component/Navbar";


const HomePageLayout = ({children}) => {
    return (
        <div>
          <Navbar />
                <main className="flex-grow flex flex-col">{children}</main>
                {/* <Footer />   */}
        </div>
    );
};

export default HomePageLayout;