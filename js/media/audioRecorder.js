export async function recordAudio(duration = 10000) {
  try {
    // Must be called inside a user gesture (tap/click)
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.ondataavailable = e => chunks.push(e.data);

    return new Promise((resolve, reject) => {
      recorder.onerror = reject;
      recorder.start();

      setTimeout(() => {
        recorder.stop();
      }, duration);

      recorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop()); // stop mic
        if (chunks.length === 0) {
          reject(new Error("No audio captured. Make sure mic permission is granted."));
        } else {
          resolve(new Blob(chunks, { type: "audio/webm" }));
        }
      };
    });
  } catch (err) {
    alert("Microphone access denied or not supported: " + err.message);
    console.error(err);
    throw err;
  }
}
