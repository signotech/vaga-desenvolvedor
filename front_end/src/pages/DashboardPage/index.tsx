import Collections from "../../components/Collections";
import NavBarDashboard from "../../components/Header/NavBarDashboard";
import Paginatio from "../../components/Paginatio";


const DashboardPage = () => {


   return (
      <>
         <header>
            <NavBarDashboard />
         </header>
         <main className="container max-width-1200">
            <Collections />
            <Paginatio />
         </main>
      </>
   );
};

export default DashboardPage;
