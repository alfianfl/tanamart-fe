import Aos from "aos";
import "aos/dist/aos.css";

function UseAos() {
  const setAos = () =>
    Aos.init({
      duration: 1500,
    });

  return { setAos };
}

export default UseAos;
