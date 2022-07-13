import '../css/label.css';
import React from 'react';

function Label(props) {
  return (
    <div className="label">
      <p className="label_text">{props.text}</p>
      <hr />
    </div>
  );
}

export default Label;
