import { useEffect, useRef, useState } from "react";
import { CircleOut } from "./audio/CircleOut";

type AgentState = "Disconnected" | "Connected" | "Connecting";

const WS_URL = "https://feature-tech-backend-chatbot.onrender.com/voice/ws";

export function PythonWS({ simplified = false }: { simplified?: boolean }) {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const [agentState, setAgentState] = useState<AgentState>("Disconnected");
  const [stream, setStream] = useState<MediaStream | null>(null);

  // captura audio
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);

  // reproducción
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);

  async function handleBinaryAudio(arrayBuffer: ArrayBuffer) {
    try {
      const audioCtx =
        audioContextRef.current ||
        new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioCtx;

      // parar audio anterior
      if (currentSourceRef.current) {
        try {
          currentSourceRef.current.stop();
        } catch {}
        currentSourceRef.current.disconnect();
        currentSourceRef.current = null;
      }

      const decoded = await audioCtx.decodeAudioData(arrayBuffer.slice(0));
      const src = audioCtx.createBufferSource();
      src.buffer = decoded;
      src.connect(audioCtx.destination);
      src.onended = () => {
        if (currentSourceRef.current === src) currentSourceRef.current = null;
      };
      currentSourceRef.current = src;
      src.start();
    } catch (e) {
      console.error("Error reproduciendo audio:", e);
    }
  }

  function stopCurrentAudio() {
    if (currentSourceRef.current) {
      try {
        currentSourceRef.current.stop();
      } catch {}
      currentSourceRef.current.disconnect();
      currentSourceRef.current = null;
    }
  }

  // helper Float32 → Int16 (16kHz)
  function floatTo16BitPCM(
    float32Array: Float32Array,
    inputSampleRate: number,
    outSampleRate = 16000
  ) {
    if (inputSampleRate === outSampleRate) {
      const l = float32Array.length;
      const int16 = new Int16Array(l);
      for (let i = 0; i < l; i++) {
        let s = Math.max(-1, Math.min(1, float32Array[i]));
        int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
      }
      return int16;
    }
    const sampleRateRatio = inputSampleRate / outSampleRate;
    const newLength = Math.round(float32Array.length / sampleRateRatio);
    const result = new Int16Array(newLength);
    let offsetResult = 0;
    let offsetBuffer = 0;
    while (offsetResult < newLength) {
      const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
      let accum = 0;
      let count = 0;
      for (
        let i = offsetBuffer;
        i < nextOffsetBuffer && i < float32Array.length;
        i++
      ) {
        accum += float32Array[i];
        count++;
      }
      const s = count > 0 ? accum / count : 0;
      const clamped = Math.max(-1, Math.min(1, s));
      result[offsetResult] = clamped < 0 ? clamped * 0x8000 : s * 0x7fff;
      offsetResult++;
      offsetBuffer = nextOffsetBuffer;
    }
    return result;
  }

  // conectar WS + mic
  const connect = async () => {
    setAgentState("Connecting");
    try {
      const ws = new WebSocket(WS_URL);
      ws.binaryType = "arraybuffer";
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WS conectado");
        setAgentState("Connected");
      };

      ws.onmessage = async (ev) => {
        if (ev.data instanceof ArrayBuffer) {
          await handleBinaryAudio(ev.data);
        } else if (ev.data instanceof Blob) {
          const ab = await ev.data.arrayBuffer();
          await handleBinaryAudio(ab);
        } else if (typeof ev.data === "string") {
          try {
            const payload = JSON.parse(ev.data);
            if (payload.event === "stop_audio") stopCurrentAudio();
          } catch {
            console.log("WS text:", ev.data);
          }
        }
      };

      ws.onclose = () => {
        console.log("WS cerrado");
        setAgentState("Disconnected");
      };

      ws.onerror = (err) => {
        console.error("WS error", err);
      };

      // captura mic
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = micStream;
      setStream(micStream);
      if (localVideoRef.current) localVideoRef.current.srcObject = micStream;

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(micStream);
      sourceNodeRef.current = source;

      const processor = audioCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;
      processor.onaudioprocess = (e) => {
        const inputBuffer = e.inputBuffer.getChannelData(0);
        const int16 = floatTo16BitPCM(inputBuffer, audioCtx.sampleRate, 16000);
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(int16.buffer);
        }
      };
      source.connect(processor);
      processor.connect(audioCtx.destination);
    } catch (err) {
      console.error("Error conectando:", err);
      setAgentState("Disconnected");
    }
  };

  const disconnect = () => {
    stopCurrentAudio();
    processorRef.current?.disconnect();
    sourceNodeRef.current?.disconnect();
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    wsRef.current?.close();
    audioContextRef.current?.close();
    setAgentState("Disconnected");
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  if (simplified) {
    return (
      <div className="flex flex-col justify-center items-center gap-4">
        {agentState === "Connected" && <CircleOut stream={stream} />}
        <div className="flex flex-col items-center">
          {agentState !== "Disconnected" && (
            <div className="text-md mb-2">{agentState}</div>
          )}
          <div className="flex gap-3">
            {agentState === "Disconnected" ? (
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
        <video ref={localVideoRef} autoPlay playsInline muted className="hidden" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center gap-10 py-8">
      <h1 className="text-3xl font-bold mb-4">Python WebSocket Voice Agent</h1>
      <CircleOut stream={stream} />
      <h1 className="text-2xl mt-2">{agentState}</h1>
      <div className="flex flex-row gap-4">
        <button
          onClick={connect}
          disabled={agentState !== "Disconnected"}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Connect
        </button>
        <button
          onClick={disconnect}
          disabled={agentState === "Disconnected"}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Disconnect
        </button>
      </div>
      <video ref={localVideoRef} autoPlay playsInline muted className="hidden" />
    </div>
  );
}
