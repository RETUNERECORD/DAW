"use strict";

DAWCoreActions.set( "addPatternKeys", ( daw, synthId ) => {
	const pats = daw.$getPatterns();
	const keysId = DAWCoreActionsCommon.getNextIdOf( daw.$getKeys() );
	const patId = DAWCoreActionsCommon.getNextIdOf( pats );
	const patName = DAWCoreActionsCommon.createUniqueName( daw.$getPatterns(), "keys" );
	const synName = daw.$getSynth( synthId ).name;
	const order = Object.values( pats ).reduce( ( max, pat ) => {
		return pat.synth !== synthId
			? max
			: Math.max( max, pat.order );
	}, -1 ) + 1;
	const obj = {
		keys: { [ keysId ]: {} },
		patterns: { [ patId ]: {
			order,
			type: "keys",
			name: patName,
			keys: keysId,
			synth: synthId,
			duration: daw.$getBeatsPerMeasure(),
		} },
		patternKeysOpened: patId,
	};

	if ( synthId !== daw.$getOpened( "synth" ) ) {
		obj.synthOpened = synthId;
	}
	return [
		obj,
		[ "patterns", "addPatternKeys", patName, synName ],
	];
} );
