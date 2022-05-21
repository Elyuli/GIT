import React, { useMemo, useCallback, useContext, useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import ApiContext from "../context/ApiContext";

const JoyrideStyles = {
	options: { zIndex: 10000 },
};

const useTour = (steps, localStorageKey, run) => {
	//const [run, setRun] = useState(false);
	//	const { isActiveHelp } = useContext(ApiContext);
	const handleJoyrideCallback = useCallback((data) => {
		const { status } = data;
		console.log("data", data);
		const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

		//	if (finishedStatuses.includes(status)) alert("Tour finalizado");
	}, []);

	console.log("run-tour", run);
	console.log("steps-tour", steps);
	console.log("Joyride-tour", { Joyride });

	const tour = useMemo(
		() => (
			<Joyride
				callback={handleJoyrideCallback}
				continuous={true}
				run={run}
				scrollToFirstStep={true}
				showProgress={true}
				showSkipButton={true}
				steps={steps}
				styles={JoyrideStyles}
			/>
		),
		[steps, handleJoyrideCallback, run]
	);

	return tour;
};

export default useTour;
