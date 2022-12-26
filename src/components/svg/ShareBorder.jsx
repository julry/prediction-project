export const ShareBorder = (props) => {
    const {shareDone, ...restProps} = props;
    return (
        <svg {...restProps} preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.68811" y="2.40472" width="115.972" height="150.582" rx="31.5" fill="url(#paint0_linear_65_39)"
                  stroke="url(#paint1_linear_65_39)" strokeWidth="3"/>
            <defs>
                <linearGradient id="paint0_linear_65_39" x1="59.6742" y1="0.904724" x2="59.6742" y2="154.487"
                                gradientUnits="userSpaceOnUse">
                    <stop stopColor="#006F3B"/>
                    <stop offset="1" stopColor="#3E1D78" stopOpacity="0.39"/>
                </linearGradient>
                <linearGradient id="paint1_linear_65_39" x1="59.6742" y1="0.904724" x2="59.6742" y2="154.487"
                                gradientUnits="userSpaceOnUse">
                    <stop stopColor="#21BA72"/>
                    <stop offset="0.479167" stopColor="#015579"/>
                    <stop offset="1" stopColor="#1E307C"/>
                </linearGradient>
            </defs>
        </svg>
    );
}
