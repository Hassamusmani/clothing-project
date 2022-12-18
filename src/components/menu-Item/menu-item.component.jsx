import React from "react";
import { Link } from "react-router-dom";
import './menu-item.styles.scss';

export const MenuItem = ({ section: { title, size, imageUrl, linkUrl }}) => (
  <Link className={`menu-item ${size}`} to={linkUrl}>
    <div
      className="background-image"
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    />
    <div className="content">
      <h1 className="title">{title.toUpperCase()}</h1>
      <span className="subtitle">SHOP NOW</span>
    </div>
  </Link>
);