import React, { useEffect, useRef } from'react';

const CameraStream = () => {
  const videoRef = useRef(null);

  // useEffect(() => {
  //   const streamUrl = 'http://localhost:5000/camera/1/stream';

  //   // Create a MediaSource object
  //   const mediaSource = new MediaSource();

  //   // Create a SourceBuffer object
  //   const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');

  //   // Set up the video element's srcObject
  //   videoRef.current.srcObject = mediaSource;

  //   // Fetch the stream data
  //   fetch(streamUrl)
  //    .then(response => {
  //       // Check if the response is OK
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! ${response.status}`);
  //       }

  //       // Get the response as a ReadableStream
  //       const readableStream = response.body.getReader();

  //       // Pump the stream data into the SourceBuffer
  //       function pump() {
  //         return readableStream.read().then(({ done, value }) => {
  //           if (done) {
  //             // If the stream is done, close the SourceBuffer
  //             sourceBuffer.addEventListener('updateend', () => {
  //               mediaSource.endOfStream();
  //             });
  //             return;
  //           }

  //           // Append the chunk to the SourceBuffer
  //           sourceBuffer.appendBuffer(value);

  //           // Continue pumping the stream
  //           return pump();
  //         });
  //       }

  //       // Start pumping the stream
  //       pump();
  //     })
  //    .catch(error => {
  //       console.error('Error reading stream:', error);
  //     });
  // }, []);

  return (
    <div>
      <div ref={videoRef} />
    </div>
  );
};

export default CameraStream;