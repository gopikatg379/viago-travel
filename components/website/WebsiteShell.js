import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";
import VisitorTracker from "./VisitorTracker";

export default function WebsiteShell({ children }) {
  return (
    <>

      <VisitorTracker />

      <Navbar />

      <main>{children}</main>

      <Footer />

      <WhatsAppFloat />
    </>
  );
}