import { useEffect } from "react";
import { actionTypes } from "../state/reducer";

const useSidebarWidth = (dispatch) => {
  useEffect(() => {
    const updateSidebarWidth = () => {
      const sidebar = document.querySelector(".sidebar");
      if (sidebar) {
        const width = sidebar.getBoundingClientRect().width;
        dispatch({ type: actionTypes.SET_SIDEBAR_WIDTH, payload: width });
      }
    };

    updateSidebarWidth();
    window.addEventListener("resize", updateSidebarWidth);
    return () => window.removeEventListener("resize", updateSidebarWidth);
  }, [dispatch]);
};

export default useSidebarWidth;
