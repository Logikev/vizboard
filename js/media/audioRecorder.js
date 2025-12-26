export async function recordAudio(duration = 10000) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const recorder = new MediaRecorder(stream);
  const chunks = [];

  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.start();

  return new Promise(resolve => {
    setTimeout(() => {
      recorder.stop();
      recorder.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        resolve(new Blob(chunks, { type: "audio/webm" }));
      };
    }, duration);
  });
}
