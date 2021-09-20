var TWINKLE_TWINKLE;
var player, viz, vizPlayer;
createSampleSequences();
createSamplePlayers();

function createSampleSequences() {
    TWINKLE_TWINKLE = {
        notes: [
            {pitch: 60, startTime: 0.0, endTime: 0.5},
            {pitch: 60, startTime: 0.5, endTime: 1.0},
            {pitch: 67, startTime: 1.0, endTime: 1.5},
            {pitch: 67, startTime: 1.5, endTime: 2.0},
            {pitch: 69, startTime: 2.0, endTime: 2.5},
            {pitch: 69, startTime: 2.5, endTime: 3.0},
            {pitch: 67, startTime: 3.0, endTime: 4.0},
            {pitch: 65, startTime: 4.0, endTime: 4.5},
            {pitch: 65, startTime: 4.5, endTime: 5.0},
            {pitch: 64, startTime: 5.0, endTime: 5.5},
            {pitch: 64, startTime: 5.5, endTime: 6.0},
            {pitch: 62, startTime: 6.0, endTime: 6.5},
            {pitch: 62, startTime: 6.5, endTime: 7.0},
            {pitch: 60, startTime: 7.0, endTime: 8.0},
        ],
        tempos: [{
            time: 0,
            qpm: 120
        }],
        totalTime: 8
    };
}

function createSamplePlayers() {
    // A plain NoteSequence player
    player = new mm.Player();

    // lets you use real sounds for any of the notes played.
    // player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');

    // can control the player like this
    // player.start(TWINKLE_TWINKLE);
    // player.stop();

    // A Visualizer config

    config = {
        noteHeight: 9,
        pixelsPerTimeStep: 100,  // like a note width
        noteSpacing: 3,
        noteRGB: '8, 41, 64',
        activeNoteRGB: '240, 84, 119',
      }

    // A Visualizer
    viz = new mm.Visualizer(TWINKLE_TWINKLE, document.getElementById('canvas'), config);

    // This player calls back two functions;
    // - run, after a note is played. This is where we update the visualizer.
    // - stop, when it is done playing the note sequence.
    vizPlayer = new mm.Player(false, {
        run: (note) => viz.redraw(note),
        stop: () => {console.log('done');}
    });
}

function startOrStop(event, p, seq = TWINKLE_TWINKLE) {
    if (p.isPlaying()) {
        p.stop();
        event.target.textContent = 'Play';
    } else {
        p.start(seq).then(() => {
            // Stop all buttons.
            const btns = document.querySelectorAll('.controls > button');
            for (let btn of btns) {
                btn.textContent = 'Play';
            }
        });
        event.target.textContent = 'Stop';
    }
}