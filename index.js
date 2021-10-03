var TWINKLE_TWINKLE, ORIGINAL_TWINKLE_TWINKLE, DRUMS, LITTLE_TEAPOT;
var player, viz, drumViz, rnnViz, vaeViz, interpolationViz, vizPlayer, drumVizPlayer, rnnVizPlayer, vaePlayer, interpolationPlayer;
var music_rnn, rnnPlayer, music_vae, vaePlayer;
createSampleSequences();
createSamplePlayers();
setupMusicRNN();
setupMusicVAE();

// just want to try TODO: & FIXME: extension.
// TODO: 
// FIXME:

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

    ORIGINAL_TWINKLE_TWINKLE = {
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

    DRUMS = {
        notes: [
          { pitch: 36, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
          { pitch: 38, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
          { pitch: 42, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
          { pitch: 46, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
          { pitch: 42, quantizedStartStep: 2, quantizedEndStep: 3, isDrum: true },
          { pitch: 42, quantizedStartStep: 3, quantizedEndStep: 4, isDrum: true },
          { pitch: 42, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
          { pitch: 50, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
          { pitch: 36, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
          { pitch: 38, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
          { pitch: 42, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
          { pitch: 45, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
          { pitch: 36, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
          { pitch: 42, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
          { pitch: 46, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
          { pitch: 42, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
          { pitch: 48, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
          { pitch: 50, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
        ],
        quantizationInfo: {stepsPerQuarter: 3},
        tempos: [{time: 0, qpm: 100}],
        totalQuantizedSteps: 11
    };

    LITTLE_TEAPOT = {
        notes: [
          { pitch: 69, quantizedStartStep: 0, quantizedEndStep: 2, program: 0 },
          { pitch: 71, quantizedStartStep: 2, quantizedEndStep: 4, program: 0 },
          { pitch: 73, quantizedStartStep: 4, quantizedEndStep: 6, program: 0 },
          { pitch: 74, quantizedStartStep: 6, quantizedEndStep: 8, program: 0 },
          { pitch: 76, quantizedStartStep: 8, quantizedEndStep: 10, program: 0 },
          { pitch: 81, quantizedStartStep: 12, quantizedEndStep: 16, program: 0 },
          { pitch: 78, quantizedStartStep: 16, quantizedEndStep: 20, program: 0 },
          { pitch: 81, quantizedStartStep: 20, quantizedEndStep: 24, program: 0 },
          { pitch: 76, quantizedStartStep: 24, quantizedEndStep: 26, program: 0 }
        ],
        quantizationInfo: { stepsPerQuarter: 4 },
        totalQuantizedSteps: 26,
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
    drumViz = new mm.Visualizer(DRUMS, document.getElementById('canvas2'), config);
    rnnViz = new mm.Visualizer(ORIGINAL_TWINKLE_TWINKLE, document.getElementById('canvas3'), config);

    // This player calls back two functions;
    // - run, after a note is played. This is where we update the visualizer.
    // - stop, when it is done playing the note sequence.
    vizPlayer = new mm.Player(false, {
        run: (note) => viz.redraw(note),
        stop: () => {console.log('done');}
    });

    drumVizPlayer = new mm.Player(false, {
        run: (note) => drumViz.redraw(note),
        stop: () => {console.log('done');}
    });

    rnnVizPlayer = new mm.Player(false, {
        run: (note) => rnnViz.redraw(note),
        stop: () => {console.log('done');}
    })
}

// musicRNN

var rnn_steps = 30;
var rnn_temperature = 2.0; // the higher the temperature, the more random (and less like the input) your sequence will be
function setupMusicRNN() {
    // Initialize model
    // music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
    music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/melody_rnn');
    music_rnn.initialize();

    // Create a player to play the sampled sequence.
    rnnPlayer = new mm.Player();
}

function playRNN(event) {
    if (rnnPlayer.isPlaying()) {
        rnnPlayer.stop();
        event.target.textContent = 'Play';
        return;
    } else {
        event.target.textContent = 'Stop';
    }
    // The model expects a quantized sequence, and ours was unquantized;
    const qns = mm.sequences.quantizeNoteSequence(ORIGINAL_TWINKLE_TWINKLE, 4);

    music_rnn
    .continueSequence(qns, rnn_steps, rnn_temperature)
    .then((sample) => rnnPlayer.start(sample));
}

// MusicVAE

vae_temperature = 2.0; // changing the temperature changes the randomness of the result.
function setupMusicVAE() {
    // Initialize model
    music_vae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_small_q2');
    music_vae.initialize();

    // Create a player rot play the sampled sequence
    vaePlayer = new mm.Player();
}

function playVAE(event) {
    if (vaePlayer.isPlaying()) {
        vaePlayer.stop();
        event.target.textContent = 'Play';
        return;
    } else {
        event.target.textContent = 'Stop';
    }
    music_vae
    .sample(3, vae_temperature)
    .then((sample) => {
        vaePlayer.start(sample[0])

        // Visualizer
        vaeViz = new mm.Visualizer(sample, document.getElementById('canvas4'));
        vaePlayer = new mm.Player(false, {
            run: (note) => vaeViz.redraw(note),
            stop: () => {console.log('done');}
        });
    });
}

// Interpolation

function playInterpolation() {
    if (vaePlayer.isPlaying()) {
        vaePlayer.stop();
        return;
    }
    // MusicVAE requires quantized melodies, so quantize them first.
    const star = mm.sequences.quantizeNoteSequence(TWINKLE_TWINKLE, 4);

    music_vae
    .interpolate([star, LITTLE_TEAPOT], 4 /* star + teapot + 1 in between */)
    .then((sample) => {
        const concatenated = mm.sequences.concatenate(sample);
        vaePlayer.start(concatenated);

        // Visualizer
        interpolationViz = new mm.Visualizer(concatenated, document.getElementById('canvas5'));
        interpolationPlayer = new mm.Player(false, {
            run: (note) => interpolationViz.redraw(note),
            stop: () => {console.log('done');}
        });
    })
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