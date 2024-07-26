import contact_img from "../assets/img/contact_2.png"
import ContactForm from "../utils/contactForm";
const Contact = () => {
  return (
    <>
      <div className="flex">
        {/* <h1>Trin Trin Trin ....  This is a Contact Page.</h1> */}
        <img src={contact_img} className="ml-36  w-[500] h-[500]"></img>
        <ContactForm></ContactForm>
      </div>
      
    </>
  );
};
export default Contact;

