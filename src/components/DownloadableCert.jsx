import React from 'react';

const DownloadableCert = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className='w-full h-full p-10'>
      <h1>Your Downloadable Content</h1>
      <p>This is the content of the downloadable div.</p>
    </div>
  );
});

export default DownloadableCert;