// import { IoIosLink } from "react-icons/io";
// import Table from "../../components/Table/Table";

import { useContext, useEffect } from "react";
import AdvancedAnalytics from "../../components/AdvancedAnalytics/AdvancedAnalytics";
import Banner from "../../components/Banner/Banner";
import Heading from "../../components/Heading/Heading";
import ManageLinks from "../../components/ManageLinks/ManageLinks";
import { AuthContext } from "../../context/AuthProvider";
import Cookies from "js-cookie";
const Home = () => {
  const { setRefetch } = useContext(AuthContext);
  const isCookeUpdated = Cookies.get("__myapp_user_profile_updated");

  useEffect(() => {
    if (isCookeUpdated === "true") {
      Cookies.set("__myapp_user_profile_updated", false);
      setRefetch(Date.now());
    }
  }, [setRefetch]);
  return (
    <section className="mt-10">
      <Banner></Banner>
      <Heading></Heading>
      <ManageLinks></ManageLinks>
      <AdvancedAnalytics></AdvancedAnalytics>
    </section>
  );
};

export default Home;
