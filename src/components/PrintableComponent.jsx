import React from "react";

const PrintableComponent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <div className="m-10">
        My cool content here!
      </div>
    </div>
  );
});

export default PrintableComponent;
