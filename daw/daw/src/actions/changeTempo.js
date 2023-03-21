"use strict";

DAWCoreActions.set( "changeTempo", ( daw, bpm, timedivision ) => {
	const signChanged = timedivision !== daw.$getTimedivision();
	const bpmChanged = bpm !== daw.$getBPM();

	if ( signChanged || bpmChanged ) {
		const obj = {};
		const objPatterns = {};
		const pats = Object.entries( daw.$getPatterns() );

		if ( signChanged ) {
			const bPM = timedivision.split( "/" )[ 0 ];

			obj.timedivision = timedivision;
			pats.forEach( ( [ id, pat ] ) => {
				if ( pat.type === "keys" || pat.type === "drums" ) {
					const duration = Math.max( 1, Math.ceil( pat.duration / bPM ) ) * bPM;

					if ( duration !== pat.duration ) {
						objPatterns[ id ] = { duration };
					}
				}
			} );
		}
		if ( bpmChanged ) {
			obj.bpm = bpm;
			pats.forEach( ( [ id, pat ] ) => {
				if ( pat.type === "buffer" && !pat.bufferBpm ) {
					const bufDur = daw.$getBuffer( pat.buffer ).duration;
					const duration = Math.ceil( bufDur * ( bpm / 60 ) );

					if ( duration !== pat.duration ) {
						objPatterns[ id ] = { duration };
					}
				}
			} );
		}
		if ( DAWCoreUtils.$isntEmpty( objPatterns ) ) {
			const objBlocks = {};

			obj.patterns = objPatterns;
			Object.entries( daw.$getBlocks() ).forEach( ( [ id, blc ] ) => {
				const pat = objPatterns[ blc.pattern ];

				if ( pat && !blc.durationEdited ) {
					objBlocks[ id ] = { duration: pat.duration };
				}
			} );
			DAWCoreUtils.$addIfNotEmpty( obj, "blocks", objBlocks );
			if ( DAWCoreUtils.$isntEmpty( objBlocks ) ) {
				const dur = DAWCoreActionsCommon.calcNewDuration( daw, obj );

				if ( dur !== daw.$getDuration() ) {
					obj.duration = dur;
				}
			}
		}
		return [
			obj,
			[ "cmp", "changeTempo", bpm, timedivision ],
		];
	}
} );
