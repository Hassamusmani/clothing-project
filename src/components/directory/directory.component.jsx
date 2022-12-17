import React from "react";
import { MenuItem } from "../menu-Item/menu-item.component";
import { sections as data } from "./directory.data";
import './directory.styles.scss';

class Directory extends React.Component {
  constructor() {
    super();

    this.state = {
      sections: data
    }
  }

  render() {
    return (
      <div className="directory-menu">
        {this.state.sections.map(section => 
          <MenuItem
            key={section.id}
            section={section}
          />
        )}
      </div>
    )
  }
}

export default Directory;