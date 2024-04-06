const uservideo = document.getElementById('user-video')
const startbutton = document.getElementById('start-btn')

const state = { media: null }
const socket = io()

startbutton.addEventListener('click', () => {
    if (state.media) {
        const mediaRecorder = new MediaRecorder(state.media, {
            audioBitsPerSecond: 128000,
            videoBitsPerSecond: 2500000,
            framerate: 25
        })

        mediaRecorder.ondataavailable = ev => {
            console.log('Binary Stream available', ev.data)
            socket.emit('binarystream', ev.data)
        }
        
        mediaRecorder.start(25)
    } else {
        console.error("Media stream is not available.")
    }
})

window.addEventListener('load', async e => {
    try {
        const media = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        uservideo.srcObject = media;
        state.media = media;
    } catch (error) {
        console.error('Error accessing media devices:', error)
    }
})
