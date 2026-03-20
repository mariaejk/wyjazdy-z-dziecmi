type ForestPatternProps = {
  variant: "fairytale" | "realistic";
};

function FairytaleForest() {
  return (
    <svg
      className="absolute bottom-0 left-0 right-0 h-24 w-full opacity-[0.07] sm:h-32"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Rounded, whimsical trees */}
      <g fill="currentColor" className="text-moss">
        {/* Tree 1 */}
        <rect x="60" y="80" width="6" height="40" rx="3" />
        <circle cx="63" cy="65" r="20" />
        <circle cx="63" cy="50" r="15" />

        {/* Tree 2 */}
        <rect x="150" y="85" width="5" height="35" rx="2.5" />
        <circle cx="152.5" cy="72" r="16" />
        <circle cx="152.5" cy="60" r="12" />

        {/* Tree 3 */}
        <rect x="280" y="75" width="7" height="45" rx="3.5" />
        <circle cx="283.5" cy="58" r="22" />
        <circle cx="283.5" cy="40" r="16" />

        {/* Tree 4 */}
        <rect x="400" y="88" width="5" height="32" rx="2.5" />
        <circle cx="402.5" cy="76" r="14" />
        <circle cx="402.5" cy="65" r="10" />

        {/* Tree 5 */}
        <rect x="520" y="78" width="6" height="42" rx="3" />
        <circle cx="523" cy="62" r="19" />
        <circle cx="523" cy="47" r="14" />

        {/* Tree 6 */}
        <rect x="650" y="82" width="5" height="38" rx="2.5" />
        <circle cx="652.5" cy="68" r="17" />
        <circle cx="652.5" cy="55" r="12" />

        {/* Tree 7 */}
        <rect x="780" y="76" width="7" height="44" rx="3.5" />
        <circle cx="783.5" cy="58" r="21" />
        <circle cx="783.5" cy="42" r="15" />

        {/* Tree 8 */}
        <rect x="910" y="86" width="5" height="34" rx="2.5" />
        <circle cx="912.5" cy="73" r="15" />
        <circle cx="912.5" cy="62" r="11" />

        {/* Tree 9 */}
        <rect x="1040" y="80" width="6" height="40" rx="3" />
        <circle cx="1043" cy="64" r="18" />
        <circle cx="1043" cy="50" r="13" />

        {/* Tree 10 */}
        <rect x="1150" y="84" width="5" height="36" rx="2.5" />
        <circle cx="1152.5" cy="70" r="16" />
        <circle cx="1152.5" cy="58" r="11" />
      </g>

      {/* Small bushes */}
      <g fill="currentColor" className="text-moss-light">
        <circle cx="110" cy="108" r="10" />
        <circle cx="220" cy="105" r="12" />
        <circle cx="350" cy="110" r="8" />
        <circle cx="470" cy="106" r="11" />
        <circle cx="590" cy="109" r="9" />
        <circle cx="720" cy="104" r="13" />
        <circle cx="850" cy="108" r="10" />
        <circle cx="980" cy="107" r="11" />
        <circle cx="1100" cy="110" r="9" />
      </g>
    </svg>
  );
}

function RealisticForest() {
  return (
    <svg
      className="absolute bottom-0 left-0 right-0 h-28 w-full opacity-[0.06] sm:h-36"
      viewBox="0 0 1200 140"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Pine/fir tree silhouettes */}
      <g fill="currentColor" className="text-moss">
        {/* Pine 1 - tall */}
        <polygon points="63,20 40,90 50,80 35,100 55,92 45,110 81,110 71,92 85,100 76,80 86,90" />
        <rect x="59" y="110" width="8" height="30" />

        {/* Pine 2 - medium */}
        <polygon points="163,40 145,95 153,88 140,108 158,100 150,115 176,115 168,100 186,108 173,88 181,95" />
        <rect x="159" y="115" width="8" height="25" />

        {/* Pine 3 - tall */}
        <polygon points="293,15 268,85 278,76 262,98 280,90 270,112 316,112 306,90 324,98 308,76 318,85" />
        <rect x="289" y="112" width="8" height="28" />

        {/* Pine 4 - small */}
        <polygon points="403,55 390,100 396,95 388,112 402,105 397,120 409,120 404,105 418,112 410,95 416,100" />
        <rect x="400" y="120" width="6" height="20" />

        {/* Pine 5 - tall */}
        <polygon points="523,22 498,88 508,80 494,100 512,92 502,112 544,112 534,92 552,100 538,80 548,88" />
        <rect x="519" y="112" width="8" height="28" />

        {/* Pine 6 - medium */}
        <polygon points="653,38 637,92 644,86 633,105 649,98 641,115 665,115 657,98 673,105 662,86 669,92" />
        <rect x="649" y="115" width="8" height="25" />

        {/* Pine 7 - tall */}
        <polygon points="783,18 758,86 768,78 754,99 772,91 762,112 804,112 794,91 812,99 798,78 808,86" />
        <rect x="779" y="112" width="8" height="28" />

        {/* Pine 8 - small */}
        <polygon points="893,50 880,98 886,92 878,110 892,103 887,118 899,118 894,103 908,110 900,92 906,98" />
        <rect x="890" y="118" width="6" height="22" />

        {/* Pine 9 - medium */}
        <polygon points="1023,35 1007,90 1014,84 1003,103 1019,96 1011,115 1035,115 1027,96 1043,103 1032,84 1039,90" />
        <rect x="1019" y="115" width="8" height="25" />

        {/* Pine 10 - tall */}
        <polygon points="1153,25 1128,88 1138,80 1124,100 1142,92 1132,112 1174,112 1164,92 1182,100 1168,80 1178,88" />
        <rect x="1149" y="112" width="8" height="28" />
      </g>

      {/* Background trees - lighter, smaller */}
      <g fill="currentColor" className="text-moss-light">
        <polygon points="120,50 108,95 114,90 106,108 118,102 113,115 127,115 122,102 134,108 126,90 132,95" />
        <polygon points="350,45 336,92 343,87 334,106 348,99 342,115 358,115 352,99 366,106 357,87 364,92" />
        <polygon points="580,52 568,96 574,91 566,108 578,102 573,115 587,115 582,102 594,108 586,91 592,96" />
        <polygon points="720,48 706,94 713,89 704,107 718,100 712,115 728,115 722,100 736,107 727,89 734,94" />
        <polygon points="960,50 948,95 954,90 946,108 958,102 953,115 967,115 962,102 974,108 966,90 972,95" />
      </g>

      {/* Ground line */}
      <rect x="0" y="135" width="1200" height="5" fill="currentColor" className="text-moss" opacity="0.3" />
    </svg>
  );
}

export function ForestPattern({ variant }: ForestPatternProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {variant === "fairytale" ? <FairytaleForest /> : <RealisticForest />}
    </div>
  );
}
