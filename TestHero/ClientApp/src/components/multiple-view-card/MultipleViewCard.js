import { useState } from "react";

// Componentes
import SelectableNavbar from "../selectable-navbar/SelectableNavbar";
/**
 * @author Juan Camilo
 * @version 1.1.1
 * @license Gp
 * @params Recibe nombre,fechaFin y enlace
 * @description Renderea los componentes
 */
export default function MultipleViewCard({ views }) {
  const [currentView, setCurrentView] = useState(views[0]);
  const viewsTitles = getViewsTitles(views);

  const handleTitleSelection = (title) => {
    const view = getViewByTitle(views, title);
    setCurrentView(view);
  };

  return (
    <div>
      <SelectableNavbar
        titles={viewsTitles}
        getSelectedTitle={handleTitleSelection}
      />
      {currentView.component}
    </div>
  );
}

// Funciones auxiliares
const getViewsTitles = (views) => {
  const viewsTitlesList = views.map((view) => view.title);
  return viewsTitlesList;
};

const getViewByTitle = (views, title) => {
  const filteredViewsByTitle = views.filter((view) => view.title === title);
  const firstFilteredViewByTitle = filteredViewsByTitle[0];
  return firstFilteredViewByTitle;
};
