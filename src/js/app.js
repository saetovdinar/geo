// TODO: write code here



videoPlayer = document.querySelector('.video');
startBtn = document.querySelector('.record');
stopBtn = document.querySelector('.stop');

startBtn.addEventListener('click', async () => {
    const media = await navigator.mediaDevices.getUserMedia({
        video: true,
    });

 

    const recorder = new MediaRecorder(media);
    const chunk = [];

    recorder.addEventListener('start', () => {
        console.log('start')
    });
    recorder.addEventListener('dataavailable', (event) => {
        chunk.push(event.data)
    });
    recorder.addEventListener('stop', () => {
        const blob = new Blob(chunk)

        videoPlayer.src = URL.createObjectURL(blob);
    });
    recorder.start();

    startBtn.addEventListener('click', async () => {
        recorder.stop();
        media.getTracks().forEach(track => track.stop());
       
    })
})


audioPlayer = document.querySelector('.audio');
startAudioBtn = document.querySelector('.audio_record');
stopAudioBtn = document.querySelector('.audio_stop');

startAudioBtn.addEventListener('click', async () => {
    const media = await navigator.mediaDevices.getUserMedia({
        audio: true,
    });

 

    const recorder = new MediaRecorder(media);
    const chunk = [];

    recorder.addEventListener('start', () => {
        console.log('start')
    });
    recorder.addEventListener('dataavailable', (event) => {
        chunk.push(event.data)
    });
    recorder.addEventListener('stop', () => {
        const blob = new Blob(chunk)

        audioPlayer.src = URL.createObjectURL(blob);
    });
    recorder.start();

    startAudioBtn.addEventListener('click', async () => {
        recorder.stop();
        media.getTracks().forEach(track => track.stop());
       
    })
})



