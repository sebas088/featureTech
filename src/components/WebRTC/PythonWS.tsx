import { useState, useEffect, useRef } from "react";
import { CircleOut } from "./audio/CircleOut";

// Update the URL as needed for your environment
const URL = 'http://127.0.0.1:8000/voice/offer';

type AgentState = 'Disconnected' | 'Connected' | 'Connecting';

interface PythonWSProps {
    simplified?: boolean;
}

export function PythonWS({ simplified = false }: PythonWSProps) {
    const localVideoRef = useRef<HTMLVideoElement | null>(null);
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
    const pcRef = useRef<RTCPeerConnection | null>(null);
    const remoteStreamRef = useRef<MediaStream>(new MediaStream());
    const [agentState, setAgentState] = useState<AgentState>('Disconnected');
    const [stream, setStream] = useState<MediaStream | null>(null);
    
    const connect = async () => {
        try {
            setAgentState('Connecting');

            // Create RTCPeerConnection
            pcRef.current = new RTCPeerConnection();
            
            // Add remote stream to video element
            pcRef.current.ontrack = (event) => {
                console.log("Remote track received:", event.track.kind);

                if (event.track.kind === "audio") {
                    remoteStreamRef.current.addTrack(event.track);
                    if(remoteVideoRef.current){
                        setStream(new MediaStream(remoteStreamRef.current.getAudioTracks()));
                        remoteVideoRef.current.srcObject = remoteStreamRef.current;
                    }
                }
                
                if (event.track.kind === "video") {
                    remoteStreamRef.current.addTrack(event.track);
                    if(remoteVideoRef.current)
                        remoteVideoRef.current.srcObject = remoteStreamRef.current;
                }
            };
            
            // Audio constraints for optimal speech recognition
            const constraints = {
                audio: {
                    channelCount: 1,
                    sampleRate: 16000
                }
            };

            // Get local media stream
            const localStream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log("Local media stream acquired");
            
            // Attach local stream to video element (if needed)
            if(localVideoRef.current) {
                localVideoRef.current.srcObject = localStream;
            }
            
            // Add tracks to peer connection
            localStream.getTracks().forEach((track) => {
                console.log("Adding local track to peer connection:", track.kind);
                pcRef.current?.addTrack(track, localStream);
            });

            // Create offer
            const offer = await pcRef.current.createOffer();
            await pcRef.current.setLocalDescription(offer);
            console.log("Local description set");
            
            // Wait for ICE gathering to complete
            await waitForIceGatheringComplete();
            
            // Send offer to server
            const offerData = {
                type: pcRef.current.localDescription?.type,
                sdp: pcRef.current.localDescription?.sdp
            };
            
            console.log("Sending offer to server");
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(offerData)
            });
            
            // Process server response
            const answer = await response.json();
            await pcRef.current.setRemoteDescription(answer);
            console.log("Remote description set");
            
            setAgentState('Connected');
        } catch (error) {
            console.error("Error during connection:", error);
            alert(`Connection error: ${error}`);
            setAgentState('Disconnected');
        }
    };

    const waitForIceGatheringComplete = () => {
        return new Promise<void>((resolve) => {
            const checkState = () => {
                if (pcRef.current?.iceGatheringState === "complete") {
                    console.log("ICE gathering complete");
                    resolve();
                }
            };
            
            // Check immediately
            checkState();
            
            // Also listen for state changes if not already complete
            if (pcRef.current?.iceGatheringState !== "complete") {
                pcRef.current?.addEventListener("icegatheringstatechange", checkState);
            }
        });
    };

    const disconnect = () => {
        // Close peer connection
        if (pcRef.current) {
            pcRef.current.close();
            pcRef.current = null;
            console.log("Peer connection closed");
        }
        
        // Clean up media streams
        if (localVideoRef.current) {
            const mediaStream = localVideoRef.current.srcObject as MediaStream | null;
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
                localVideoRef.current.srcObject = null;
            }
        }
        
        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
        }
        
        setStream(null);
        setAgentState('Disconnected');
    };

    // Clean up on unmount
    useEffect(() => {
        return () => {
            if (agentState === 'Connected') {
                disconnect();
            }
        };
    }, [agentState]);

    if (simplified) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                {agentState === 'Connected' && <CircleOut stream={stream} />}
                <div className="flex flex-col items-center">
                    {agentState !== 'Disconnected' && (
                        <div className="text-md mb-2">{agentState}</div>
                    )}
                    <div className="flex gap-3">
                        {agentState === 'Disconnected' ? (
                            <button 
                                onClick={connect}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded"
                            >
                                Start Assistant
                            </button>
                        ) : (
                            <button 
                                onClick={disconnect}
                                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
                            >
                                End Conversation
                            </button>
                        )}
                    </div>
                </div>
                <video ref={remoteVideoRef} autoPlay playsInline className="mt-4 hidden" />
            </div>
        );
    }
    
    return (
        <div className="flex flex-col justify-center items-center gap-10 py-8">
            <h1 className="text-3xl font-bold mb-4">Python WebSocket</h1>
            <CircleOut stream={stream} />
            <h1 className="text-2xl mt-2">{agentState}</h1>
            <div className="flex flex-row gap-4">
                <button 
                    onClick={connect}
                    disabled={agentState !== 'Disconnected'} 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                    Connect
                </button>
                <button 
                    onClick={disconnect}
                    disabled={agentState === 'Disconnected'} 
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                    Disconnect
                </button>
            </div>
            <video ref={remoteVideoRef} autoPlay playsInline className="mt-4" />
        </div>
    );
}
