import { createPortal } from "react-dom";

// Create Portal - RENDERS A COMPONENT IN THE PROVIDED BY US CONTAINER IN HTML
// PLEASE PROVIDE via PROPS A COMPONENT TO RENDER & CONTAINER'S ID WHERE TO RENDER THIS COMPONENT
// USE CustomCreatePortal in return of component - return <CustomCreatePortal component={<Sidemenu/>} id="side"/>

const CustomCreatePortal = ({ component, id }) => {
  return createPortal(component, document.getElementById(id));
};
export default CustomCreatePortal;
