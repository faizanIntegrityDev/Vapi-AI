// 'use client'

// import React, { useRef, useState } from 'react';
// import Webcam from 'react-webcam';
// import Vapi from '@vapi-ai/web';

// const InterviewUI = () => {
//   const webcamRef = useRef<any>(null);
//   const [isStarted, setIsStarted] = useState(false);
//   const [videoSrc, setVideoSrc] = useState<string | null>(null);
//   const [isAIInitialized, setIsAIInitialized] = useState(false);
//   const vapiRef = useRef<Vapi | null>(null);

//   const startInterview = () => {
//     if (isStarted) {
//       console.warn('[InterviewUI] Video stream already initialized');
//       return;
//     }

//     setIsStarted(true);

//     // Initialize Vapi AI (only if it's not already initialized)
//     if (!isAIInitialized && process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY) {
//       const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
//       vapiRef.current = vapi;
//       vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || '');
//       setIsAIInitialized(true);
//     }
//   };

//   const cleanupInterview = () => {
//     if (webcamRef.current) {
//       console.log('[InterviewUI] Stopping webcam');
//       setIsStarted(false);
//     }

//     // Cleanup VAPI
//     if (vapiRef.current) {
//       vapiRef.current.stop();
//       vapiRef.current = null;
//     }
//   };

//   const captureImage = () => {
//     const imageSrc = webcamRef.current?.getScreenshot();
//     setVideoSrc(imageSrc);
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.header}>Interview UI</h2>

//       {!isStarted ? (
//         <button style={styles.button} onClick={startInterview}>Start Interview</button>
//       ) : (
//         <button style={styles.button} onClick={cleanupInterview}>End Interview</button>
//       )}

//       {/* Webcam view */}
//       {isStarted && (
//         <div style={styles.webcamContainer}>
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             width="100%"
//             videoConstraints={{
//               facingMode: 'user',
//             }}
//           />
//           {videoSrc && <img src={videoSrc} alt="Captured" style={styles.capturedImage} />}
//         </div>
//       )}

//       {/* VAPI AI Avatar */}
//       {isAIInitialized && (
//         <div style={styles.aiContainer}>
//           <div style={styles.aiAvatar}>
//             <img src="/ai-avatar.png" alt="AI Avatar" style={styles.aiAvatarImage} />
//           </div>
//           <p style={styles.aiText}>AI Assistant is ready to assist you.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// // Corrected Styles
// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column' as 'column', // specify type
//     alignItems: 'center' as 'center', // specify type
//     padding: '2rem',
//     backgroundColor: '#f7f7f7',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     maxWidth: '800px',
//     margin: '0 auto',
//   },
//   header: {
//     fontSize: '2rem',
//     marginBottom: '1rem',
//     color: '#333',
//   },
//   button: {
//     padding: '0.8rem 2rem',
//     fontSize: '1rem',
//     backgroundColor: '#007BFF',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//     marginBottom: '1rem',
//   },
//   webcamContainer: {
//     width: '100%',
//     maxWidth: '600px',
//     height: '400px',
//     backgroundColor: '#000',
//     borderRadius: '8px',
//     overflow: 'hidden',
//     marginBottom: '1rem',
//   },
//   capturedImage: {
//     marginTop: '1rem',
//     width: '100%',
//     borderRadius: '8px',
//   },
//   aiContainer: {
//     marginTop: '2rem',
//     display: 'flex' as 'flex', // specify type
//     flexDirection: 'column' as 'column', // specify type
//     alignItems: 'center' as 'center', // specify type
//     backgroundColor: '#fff',
//     padding: '1.5rem',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     textAlign: 'center' as 'center', // specify type
//   },
//   aiAvatar: {
//     width: '100px',
//     height: '100px',
//     marginBottom: '1rem',
//     borderRadius: '50%',
//     overflow: 'hidden',
//   },
//   aiAvatarImage: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover' as 'cover', // specify type
//   },
//   aiText: {
//     fontSize: '1rem',
//     color: '#333',
//   },
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
      <div style={styles.header}>
        <h2 style={styles.headerText}>AI Interview Session</h2>
      </div>

      <div style={styles.mainContent}>
        {/* Video/AI Container */}
        <div style={styles.videoContainer}>
          {/* User Webcam */}
          {isStarted && (
            <div style={styles.webcamWrapper}>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={styles.webcam}
                videoConstraints={{
                  facingMode: 'user',
                }}
              />
              {videoSrc && (
                <div style={styles.capturedImageWrapper}>
                  <img src={videoSrc} alt="Captured" style={styles.capturedImage} />
                </div>
              )}
            </div>
          )}

          {/* AI Avatar */}
          {isAIInitialized && (
            <div style={styles.aiWrapper}>
              <div style={styles.aiAvatar}>
                <img src="/ai-avatar.png" alt="AI Avatar" style={styles.aiAvatarImage} />
              </div>
              <div style={styles.aiStatus}>
                <div style={styles.statusIndicator}></div>
                <span style={styles.statusText}>AI Assistant Connected</span>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div style={styles.controls}>
          {!isStarted ? (
            <button style={styles.startButton} onClick={startInterview}>
              Start Interview
            </button>
          ) : (
            <button style={styles.endButton} onClick={cleanupInterview}>
              End Interview
            </button>
          )}
          {isStarted && (
            <button style={styles.captureButton} onClick={captureImage}>
              Capture Image
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100vh',
    backgroundColor: '#202124',
    color: '#fff',
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  header: {
    padding: '16px 24px',
    borderBottom: '1px solid #3c4043',
  },
  headerText: {
    fontSize: '18px',
    fontWeight: '500',
    margin: '0',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    flex: '1',
    padding: '24px',
    overflow: 'hidden',
  },
  videoContainer: {
    display: 'flex',
    flex: '1',
    gap: '24px',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '24px',
  },
  webcamWrapper: {
    position: 'relative' as const,
    width: '640px',
    height: '480px',
    backgroundColor: '#3c4043',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
  webcam: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  capturedImageWrapper: {
    position: 'absolute' as const,
    bottom: '16px',
    right: '16px',
    width: '160px',
    height: '120px',
    borderRadius: '4px',
    overflow: 'hidden',
    border: '2px solid #fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  capturedImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  aiWrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '16px',
    width: '320px',
  },
  aiAvatar: {
    width: '320px',
    height: '320px',
    backgroundColor: '#3c4043',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
  aiAvatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  aiStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  statusIndicator: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#0f9d58',
  },
  statusText: {
    fontSize: '14px',
    color: '#e8eaed',
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    padding: '16px',
  },
  startButton: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '500',
    backgroundColor: '#0b57d0',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#1b66c9',
    },
  },
  endButton: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '500',
    backgroundColor: '#d93025',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#e74c3c',
    },
  },
  captureButton: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '500',
    backgroundColor: '#5f6368',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#80868b',
    },
  },
};

export default InterviewUI;