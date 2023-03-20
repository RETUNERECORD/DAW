"use strict";

GSUI.$setTemplate( "gsui-synthesizer", () => {
	return [
		GSUI.$createElement( "div", { class: "gsuiSynthesizer-head" },
			GSUI.$createElement( "gsui-toggle", { "data-related": "env", off: true } ),
			GSUI.$createElement( "span", { class: "gsuiSynthesizer-headTitle" }, "envelope gain" ),
		),
		GSUI.$createElement( "div", { class: "gsuiSynthesizer-env" }, GSUI.$createElement( "gsui-envelope" ) ),
		GSUI.$createElement( "div", { class: "gsuiSynthesizer-head" },
			GSUI.$createElement( "gsui-toggle", { "data-related": "lfo", off: true } ),
			GSUI.$createElement( "span", { class: "gsuiSynthesizer-headTitle" }, "LFO gain" ),
		),
		GSUI.$createElement( "div", { class: "gsuiSynthesizer-lfo" }, GSUI.$createElement( "gsui-lfo" ) ),
		GSUI.$createElement( "div", { class: "gsuiSynthesizer-head gsuiSynthesizer-headOscs" },
			GSUI.$createElement( "span", { class: "gsuiSynthesizer-headTitle" }, "oscillators" ),
			GSUI.$createElement( "span", { class: "gsuiSynthesizer-label gsuiSynthesizer-labelUnison" }, "unison" ),
			GSUI.$createElement( "span", { class: "gsuiSynthesizer-label gsuiSynthesizer-labelPitch" }, "pitch" ),
			GSUI.$createElement( "span", { class: "gsuiSynthesizer-label gsuiSynthesizer-labelPan" }, "pan" ),
			GSUI.$createElement( "span", { class: "gsuiSynthesizer-label gsuiSynthesizer-labelGain" }, "gain" ),
		),
		GSUI.$createElement( "div", { class: "gsuiSynthesizer-oscList" },
			GSUI.$createElement( "button", { class: "gsuiSynthesizer-newOsc" },
				GSUI.$createElement( "i", { class: "gsuiIcon", "data-icon": "plus" } ),
			),
		),
	];
} );
