
const DelayOnStart = 1500;

const DelayBeforeChange = 10000;

const DelayBetweenColumns = 75;

const ColumnsNumber = 25;

const RowsFonts = [
    [ 'A', 'B', 'C' ],
    [ 'D', 'E', 'F' ],
    [ 'G', 'H', 'I' ],
    [ 'J', 'K', 'L' ],
    [ 'M', 'N', 'O' ],
    [ 'P', 'Q', 'R' ],
    [ 'S', 'T', 'U' ],
    [ 'V', 'W', 'X' ]
];

class FlapPart {
    constructor( partName ) {
        const el = document.createElement( 'DIV' );
        el.className = 'flap-part ' + partName;
        this.el = el;
    }
    setImage( src ) {
        if ( !src ) return (this.el.style.backgroundImage = '');
        this.el.style.backgroundImage = "url('" + src + "')";
    }
}

class Flap {
    constructor() {
        const el = document.createElement( 'DIV' );
        const parts = new Map();
        el.className = 'flap one';
        [ 'top one', 'bottom one', 'top two', 'bottom two' ].forEach( partName => {
            parts[ partName ] = new FlapPart( partName );
            el.appendChild( parts[ partName ].el );
        } );
        this.el = el;
        this.parts = parts;
        this.mode = 'one';
    }
    setImage( src ) {
        var mode = this.mode == 'one' ? 'two' : 'one';
        this.parts[ 'top ' + mode ].setImage( src );
        this.parts[ 'bottom ' + mode ].setImage( src );
        this.mode = mode;
        this.el.className = 'flap ' + mode;
    }
}

class FlapLetter {
    constructor( place ) {
        this.place = place.toString().padStart( 2, '0' );
        this.flap = new Flap();
        this.el = this.flap.el;
    }
    setLetter( fontChar ) {
        this.flap.setImage( 'boards/' + fontChar + this.place + '.png' );
    }
}

class FlapRow {
    constructor( length = 25 ) {
        const el = document.createElement( 'DIV' );
        const flaps = [];
        el.className = 'flap-row';
        for ( let i = 0; i < length; i++ ) {
            flaps.push( new FlapLetter( i + 1 ) );
            el.appendChild( flaps[ i ].el );
        }
        this.el = el;
        this.flaps = flaps;
    }
    setFont( fontChar ) {
        this.flaps.forEach( ( flap, i ) => setTimeout( () => flap.setLetter( fontChar ), i * DelayBetweenColumns ) );
    }
}

( function() {

    const board = document.getElementById( 'flapboard' );

    RowsFonts.forEach( ( fontRow, i ) => {
        const row = new FlapRow( ColumnsNumber );
        let cycle = 0;
        const doCycle = () => {
            row.setFont( fontRow[ cycle ] );
            cycle = cycle == 2 ? 0 : cycle + 1;
            setTimeout( doCycle, DelayBeforeChange );
        };
        board.appendChild( row.el );
        setTimeout( doCycle, i * DelayOnStart );
    } );

    window.addEventListener( 'keydown', e => {
        if ( e.code == 'KeyF' ) {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
              if (document.exitFullscreen) {
                document.exitFullscreen(); 
              }
            }
        }
    } );

} )();