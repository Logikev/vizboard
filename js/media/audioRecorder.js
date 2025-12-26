export async function recordAudio() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const recorder = new MediaRecorder(stream);
  const chunks = [];

  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.start();

  return new Promise(resolve => {
    setTimeout(() => {
      recorder.stop();
      recorder.onstop = () =>
        resolve({
          type: "audio",
          blob: new Blob(chunks, { type: "audio/webm" })
        });
    }, 4000);
  });
}
