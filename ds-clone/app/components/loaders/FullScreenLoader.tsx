const FullScreenLoader = () => {
	// Full Screen Loader for when the user tries to go to /channels and is redirected to /channels/messages
	// This is a temporary solution to the issue of the user being redirected to /channels/messages

	return (
		<section
			className="
        absolute
        top-0
        left-0
        w-full
        h-full
        flex
        justify-center
        items-center
        bg-white
        z-50
        ">
			<div className="animate-spin">
				<svg
					className="w-16 h-16 text-gray-500"
					fill="none"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg">
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"></circle>
					<path
						className="opacity-75"
						d="M4 12a8 8 0 018-8V2.5"
						stroke="currentColor"
						strokeWidth="4"></path>
				</svg>
			</div>
		</section>
	);
};

export default FullScreenLoader;
