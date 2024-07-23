export default class Timeline {
    constructor(container) {
        this.container = container;
        this.eventRegister();
        this.timeline = document.querySelector('.timeline');
        
    }

    eventRegister() {
        this.videoPost();
        this.audioPost();
        this.textPost();
        this.cancelBtn();
        this.submitBtn();
    }
    videoPost() {
        const recordVideoBtn = document.querySelector('.video_record');
        const stopVideoBtn = document.querySelector('.video_stop');
        
        recordVideoBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            const media = await navigator.mediaDevices.getUserMedia({
                video: true,
        });
            const videoPlayer = document.createElement('video');
            videoPlayer.classList.add('video');
            const postCont = document.createElement('div');
            postCont.classList.add('post_cont');
            postCont.append(videoPlayer);
           
            videoPlayer.setAttribute('controls', 'controls');
            this.timeline.prepend(postCont);
            this.currentPost = postCont;
           
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
                this.postGeo(this.currentPost);
            });
            recorder.start();

            stopVideoBtn.addEventListener('click', async (event) => {
                event.preventDefault();
                recorder.stop();
                media.getTracks().forEach(track => track.stop());
       
            })
    })
    }

    audioPost() {
        
        const recordAudioBtn = document.querySelector('.audio_record');
        const stopAudioBtn = document.querySelector('.audio_stop');
       
        recordAudioBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            const media = await navigator.mediaDevices.getUserMedia({
                audio: true,
        });
      
        const audioPlayer = document.createElement('audio');
        const postCont = document.createElement('div');
        postCont.classList.add('post_cont');
        audioPlayer.classList.add('audio');
        postCont.append(audioPlayer);
       
        audioPlayer.setAttribute('controls', 'controls');
        this.timeline.prepend(postCont);
        
        this.currentPost = postCont;
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
            this.postGeo(this.currentPost);
            
        });
        recorder.start();

        stopAudioBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            recorder.stop();
            media.getTracks().forEach(track => track.stop());
       
        })
    })
    }

    textPost() {
        
        const submitBtn = document.querySelector('.submit');
        const text = document.querySelector('.input');
        submitBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            const postCont = document.createElement('div');
            postCont.classList.add('post_cont');
            postCont.append(text.value);
            this.timeline.prepend(postCont);
            
            this.currentPost = postCont;
            this.postGeo(this.currentPost);
            text.value = '';
        })
    }
    postGeo(postCont) {
        
        const geoCont = document.createElement('div');
        navigator.geolocation.getCurrentPosition((data) => {
            const {latitude, longitude} = data.coords;
            geoCont.append(`[${latitude}, ${longitude}]`)
            postCont.append(geoCont);
           data.coords
        }, (err) => {
            this.modalHTML(postCont);
            
        });
        
        
    }

    modalHTML(postCont) {
        const modaleWindow = `
        <div class="modale_window">
            <p>
                Что-то пошло не так!
            </p>
            <p>
                Широта и долгота через запятую
            </p>
            <input type="text" class="input_modal">
            <button class="submit">OK</button>
            <button class="cancel">Отмена</button>
        </div>`;

        postCont.innerHTML += modaleWindow;
    }
        
    cancelBtn() {
       
        document.addEventListener('click', (event) => {
            if(event.target.classList.contains('cancel')) {
                event.preventDefault();
                const modaleWindow = document.querySelector('.modale_window');
                
                modaleWindow.remove();
            }
            
        })
    }
    submitBtn() {
       
        document.addEventListener('click', (event) => {
            if(event.target.classList.contains('submit')) {
                event.preventDefault();
                const modaleWindow = document.querySelector('.modale_window');
                const inputValue = modaleWindow.querySelector('.input_modal').value;
                const valueCont = document.createElement('div');
                valueCont.append(inputValue);
                this.currentPost.append(this.validateCoords(inputValue));
                this.currentPost = null;
                
                modaleWindow.remove();
            }
            
        })
    }

    validateCoords(coords) {
        
        if(!(/\[.+\]/.test(coords))) {
            return `[${coords}]`;
        }
        if(!(/\[.+ .+\]/.test(coords))) {
            const arrFromCoord = coords.split(',');
            const coord = `${arrFromCoord[0]}, ${arrFromCoord[1]}`;
            return coord;
        }
        return coords;
    }
}