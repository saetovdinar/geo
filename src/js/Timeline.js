export default class Timeline {
    constructor(container) {
        this.container = container;
        this.eventRegister();
        this.timeline = document.querySelector('.timeline');
    }

    eventRegister() {
        const recordVideoBtn = document.querySelector('.video_record');
        const stopVideoBtn = document.querySelector('.video_stop');
        
        recordVideoBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            const media = await navigator.mediaDevices.getUserMedia({
                video: true,
        });
            const videoPlayer = document.createElement('video');
            videoPlayer.classList.add('video');
            videoPlayer.setAttribute('controls', 'controls');
            this.timeline.appendChild(videoPlayer);
        
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

            stopVideoBtn.addEventListener('click', async (event) => {
                event.preventDefault();
                recorder.stop();
                media.getTracks().forEach(track => track.stop());
       
            })
    })

        const recordAudioBtn = document.querySelector('.audio_record');
        const stopAudioBtn = document.querySelector('.audio_stop');
       
        recordAudioBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            const media = await navigator.mediaDevices.getUserMedia({
                audio: true,
        });
      
        const audioPlayer = document.createElement('audio');
        audioPlayer.classList.add('audio');
        audioPlayer.setAttribute('controls', 'controls');
        this.timeline.appendChild(audioPlayer);
       
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
            
            const urlBlob =  URL.createObjectURL(blob);

            audioPlayer.src = urlBlob;

            
        });
        recorder.start();

        stopAudioBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            recorder.stop();
            media.getTracks().forEach(track => track.stop());
       
        })
    })
    }

}