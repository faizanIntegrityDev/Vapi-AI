// 'use client';

// import React, { useEffect, useRef } from 'react';
// import Webcam from 'react-webcam';
// import Vapi from '@vapi-ai/web';

// const InterviewUI: React.FC = () => {
//   const webcamRef = useRef<Webcam>(null);
//   const vapiRef = useRef<Vapi | null>(null);

//   useEffect(() => {
//     console.log(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
//     const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || '');
//     vapiRef.current = vapi;

//     // vapi.start({ assistant: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || '' });
//     vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || '');


//     return () => {
//       vapi.stop();
//     };
//   }, []);

//   return (
//     <div style={{ display: 'flex', gap: '2rem' }}>
//       {/* AI Avatar */}
//       <div style={{ width: '300px', height: '300px', backgroundColor: '#f0f0f0' }}>
//         <img src="/ai-avatar.png" alt="AI Avatar" style={{ width: '100%', height: '100%' }} />
//       </div>

//       {/* Candidate Webcam */}
//       <div style={{ width: '300px', height: '300px', backgroundColor: '#000' }}>
//         <Webcam
//           audio={false}
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           videoConstraints={{
//             width: 300,
//             height: 300,
//             facingMode: 'user',
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default InterviewUI;
// 'use client';

// import React, { useEffect, useRef } from 'react';
// import Webcam from 'react-webcam';
// import Vapi from '@vapi-ai/web';

// const InterviewUI: React.FC = () => {
//   const webcamRef = useRef<Webcam>(null);
//   const vapiRef = useRef<Vapi | null>(null);

//   useEffect(() => {
//     const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || '');
//     vapiRef.current = vapi;

//     vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || '');

//     return () => {
//       vapi.stop();
//     };
//   }, []);

//   return (
//     <div style={{ display: 'flex', gap: '2rem' }}>
//       {/* AI Avatar */}
//       <div style={{ width: '300px', height: '300px', backgroundColor: '#f0f0f0' }}>
//         <img src="/ai-avatar.png" alt="AI Avatar" style={{ width: '100%', height: '100%' }} />
//       </div>

//       {/* Candidate Webcam */}
//       <div style={{ width: '300px', height: '300px', backgroundColor: '#000' }}>
//         <Webcam
//           audio={false}
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           videoConstraints={{
//             width: 300,
//             height: 300,
//             facingMode: 'user',
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default InterviewUI;



// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import DailyIframe, { DailyCall } from '@daily-co/daily-js';
// import Vapi from '@vapi-ai/web';

// const InterviewUI: React.FC = () => {
//   const callFrameRef = useRef<DailyCall | null>(null);
//   const vapiRef = useRef<Vapi | null>(null);
//   const [isInitialized, setIsInitialized] = useState(false); // Use state for re-render safety

//   useEffect(() => {
//     // Prevent duplicate initialization
//     if (isInitialized) return;
//     setIsInitialized(true);

//     // Initialize Daily.co video call
//     const callFrame = DailyIframe.createFrame({
//       showLeaveButton: true,
//       iframeStyle: {
//         width: '100%',
//         height: '100%',
//         border: '0',
//         borderRadius: '8px',
//       },
//     });

//     callFrame.join({
//       url: 'https://my-interview-room.daily.co/Mentiro_Interview_Room',
//     });

//     const container = document.getElementById('video-call-container');
//     if (container) {
//       container.appendChild(callFrame.iframe()!);
//     }

//     callFrameRef.current = callFrame;

//     // Initialize Vapi AI
//     if (process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY) {
//       const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
//       vapiRef.current = vapi;
//       vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || '');
//     }

//     // Cleanup on unmount
//     return () => {
//       if (callFrameRef.current) {
//         const iframe = callFrameRef.current.iframe();
//         if (iframe && iframe.parentNode) {
//           iframe.parentNode.removeChild(iframe); // Remove iframe from DOM
//         }
//         callFrameRef.current.leave().then(() => {
//           callFrameRef.current?.destroy();
//           callFrameRef.current = null;
//         });
//       }

//       if (vapiRef.current) {
//         vapiRef.current.stop();
//         vapiRef.current = null;
//       }

//       setIsInitialized(false); // Reset for next mount
//     };
//   }, [isInitialized]); // Add dependency

//   return (
//     <div style={{ display: 'flex', gap: '2rem', padding: '2rem' }}>
//       {/* AI Avatar */}
//       <div style={{ width: '300px', height: '300px', backgroundColor: '#f0f0f0' }}>
//         <img src="/ai-avatar.png" alt="AI Avatar" style={{ width: '100%', height: '100%' }} />
//       </div>

//       {/* Video Call Frame */}
//       <div
//         id="video-call-container"
//         style={{ width: '600px', height: '400px', backgroundColor: '#000', borderRadius: '8px' }}
//       ></div>
//     </div>
//   );
// };

// export default InterviewUI;



// 'use client';

// import React, { useEffect, useRef } from 'react';
// import DailyIframe, { DailyCall } from '@daily-co/daily-js';
// import Vapi from '@vapi-ai/web';

// const InterviewUI: React.FC = () => {
//   const callFrameRef = useRef<DailyCall | null>(null);
//   const vapiRef = useRef<Vapi | null>(null);

//   useEffect(() => {
//     console.log('[InterviewUI] useEffect triggered');

//     // Prevent multiple DailyIframe instances
//     if ((window as any)._dailyInstance) {
//       console.warn('[InterviewUI] DailyIframe instance already exists, skipping frame creation');
//       return;
//     }

//     const container = document.getElementById('video-call-container');
//     console.log('[InterviewUI] container found:', !!container);

//     if (container && container.children.length === 0) {
//       console.log('[InterviewUI] Creating DailyIframe frame...');
//       const frame = DailyIframe.createFrame({
//         showLeaveButton: true,
//         iframeStyle: {
//           width: '100%',
//           height: '100%',
//           border: '0',
//           borderRadius: '8px',
//         },
//       });

//       callFrameRef.current = frame;
//       (window as any)._dailyInstance = frame; // store globally to avoid duplicates

//       frame
//         .join({
//           url: 'https://my-interview-room.daily.co/Mentiro_Interview_Room',
//         })
//         .then(() => console.log('[InterviewUI] Daily join success'))
//         .catch((err) => console.error('[InterviewUI] Daily join error:', err));

//       container.appendChild(frame.iframe()!);
//     } else {
//       console.warn('[InterviewUI] container already has children or is null');
//     }

//     // Initialize Vapi AI
//     if (!vapiRef.current && process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY) {
//       console.log('[InterviewUI] Initializing Vapi...');
//       const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
//       vapiRef.current = vapi;

//       vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || '');
//     }

//     // Cleanup function
//     return () => {
//       console.log('[InterviewUI] Cleaning up');

//       if (callFrameRef.current) {
//         callFrameRef.current.leave();
//         callFrameRef.current.destroy();
//         callFrameRef.current = null;
//         delete (window as any)._dailyInstance;
//       }

//       if (vapiRef.current) {
//         vapiRef.current.stop();
//         vapiRef.current = null;
//       }

//       if (container) {
//         container.innerHTML = '';
//       }
//     };
//   }, []);

//   return (
//     <div style={{ display: 'flex', gap: '2rem', padding: '2rem' }}>
//       {/* AI Avatar */}
//       <div style={{ width: '300px', height: '300px', backgroundColor: '#f0f0f0' }}>
//         <img src="/ai-avatar.png" alt="AI Avatar" style={{ width: '100%', height: '100%' }} />
//       </div>

//       {/* Video Call Frame */}
//       <div
//         id="video-call-container"
//         style={{ width: '600px', height: '400px', backgroundColor: '#000', borderRadius: '8px' }}
//       ></div>
//     </div>
//   );
// };

// export default InterviewUI;

'use client'

import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Vapi from '@vapi-ai/web';

const InterviewUI = () => {
  const webcamRef = useRef<any>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isAIInitialized, setIsAIInitialized] = useState(false);
  const vapiRef = useRef<Vapi | null>(null);

  const startInterview = () => {
    if (isStarted) {
      console.warn('[InterviewUI] Video stream already initialized');
      return;
    }

    setIsStarted(true);

    // Initialize Vapi AI (only if it's not already initialized)
    if (!isAIInitialized && process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY) {
      const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
      vapiRef.current = vapi;
      vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || '');
      setIsAIInitialized(true);
    }
  };

  const cleanupInterview = () => {
    if (webcamRef.current) {
      console.log('[InterviewUI] Stopping webcam');
      setIsStarted(false);
    }

    // Cleanup VAPI
    if (vapiRef.current) {
      vapiRef.current.stop();
      vapiRef.current = null;
    }
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setVideoSrc(imageSrc);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Interview UI</h2>

      {!isStarted ? (
        <button style={styles.button} onClick={startInterview}>Start Interview</button>
      ) : (
        <button style={styles.button} onClick={cleanupInterview}>End Interview</button>
      )}

      {/* Webcam view */}
      {isStarted && (
        <div style={styles.webcamContainer}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            videoConstraints={{
              facingMode: 'user',
            }}
          />
          {videoSrc && <img src={videoSrc} alt="Captured" style={styles.capturedImage} />}
        </div>
      )}

      {/* VAPI AI Avatar */}
      {isAIInitialized && (
        <div style={styles.aiContainer}>
          <div style={styles.aiAvatar}>
            <img src="/ai-avatar.png" alt="AI Avatar" style={styles.aiAvatarImage} />
          </div>
          <p style={styles.aiText}>AI Assistant is ready to assist you.</p>
        </div>
      )}
    </div>
  );
};

// Corrected Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column', // specify type
    alignItems: 'center' as 'center', // specify type
    padding: '2rem',
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#333',
  },
  button: {
    padding: '0.8rem 2rem',
    fontSize: '1rem',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginBottom: '1rem',
  },
  webcamContainer: {
    width: '100%',
    maxWidth: '600px',
    height: '400px',
    backgroundColor: '#000',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '1rem',
  },
  capturedImage: {
    marginTop: '1rem',
    width: '100%',
    borderRadius: '8px',
  },
  aiContainer: {
    marginTop: '2rem',
    display: 'flex' as 'flex', // specify type
    flexDirection: 'column' as 'column', // specify type
    alignItems: 'center' as 'center', // specify type
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center' as 'center', // specify type
  },
  aiAvatar: {
    width: '100px',
    height: '100px',
    marginBottom: '1rem',
    borderRadius: '50%',
    overflow: 'hidden',
  },
  aiAvatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as 'cover', // specify type
  },
  aiText: {
    fontSize: '1rem',
    color: '#333',
  },
};

export default InterviewUI;
