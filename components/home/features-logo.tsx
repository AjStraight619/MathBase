"use client";
import { useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

const reactPathData =
  "M2392 750C481.241 750 436.604 750 382.998 750C379.684 750 377 752.686 377 756V2198";

const wolframPathDataRight =
  "M3979 872C5889.76 872 5934.4 872 5988 872C5991.32 872 5994 874.686 5994 878V2284";

const wolframPathDataLeft =
  "M3515 1065V1467.73C3515 1471.05 3517.69 1473.73 3521 1473.73H5011C5014.31 1473.73 5017 1476.42 5017 1479.73V1809";

const nextjsPathData =
  "M2668 1065V1514.74C2668 1518.05 2665.31 1520.74 2662 1520.74H1234C1230.69 1520.74 1228 1523.42 1228 1526.74V2005";

const gptLeftPathData = "M2844 1065.5L2842.81 2106";

const gptRightPathData = "M3329 1065V1914.21";

export default function FeaturesLogo() {
  const [scope, animate] = useAnimate();
  const [isInitialDraw, setIsInitialDraw] = useState(false);

  useEffect(() => {
    const animatePath = async (path: string) => {
      await animate(
        path,
        { pathLength: [0, 1] },
        { duration: 2, ease: "easeInOut" }
      );
    };

    const handleAnimate = async () => {
      if (scope.current) {
        await Promise.all([
          animatePath("#path2"),
          animatePath("#path3"),
          animatePath("#path4"),
          animatePath("#path5"),
          animatePath("#path6"),
          animatePath("#path7"),
          animatePath("#path7"),
          animatePath("#path9"),
          animatePath("#path10"),
          animatePath("#path11"),
          animatePath("#path12"),
          animatePath("#path12"),
          animatePath("#path14"),
          animatePath("#path15"),
          animatePath("#path16"),
        ]);
      }
    };

    handleAnimate();
  }, [scope, animate]);

  return (
    <div ref={scope} className="mx-auto">
      <svg
        width="80vw"
        height="auto"
        viewBox="0 0 6371 1712"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        data-lines="true"
      >
        <g clip-path="url(#clip0_601_9)">
          <g filter="url(#filter0_d_601_9)">
            <rect
              x="2449"
              y="585"
              width="1473"
              height="423"
              rx="40"
              fill="url(#paint0_linear_601_9)"
              shape-rendering="crispEdges"
            />
            <rect
              x="2449"
              y="585"
              width="1473"
              height="423"
              rx="40"
              fill="black"
              fill-opacity="0.2"
              shape-rendering="crispEdges"
            />
            <rect
              x="2449.5"
              y="585.5"
              width="1472"
              height="422"
              rx="39.5"
              stroke="black"
              shape-rendering="crispEdges"
            />
          </g>
          <path
            id="path1"
            d="M2835.72 845V749H2871.72C2879.1 749 2885.28 750.375 2890.28 753.125C2895.32 755.875 2899.11 759.656 2901.68 764.469C2904.27 769.25 2905.57 774.687 2905.57 780.781C2905.57 786.937 2904.27 792.406 2901.68 797.188C2899.08 801.969 2895.25 805.734 2890.19 808.484C2885.13 811.203 2878.89 812.562 2871.49 812.562H2847.63V798.266H2869.14C2873.46 798.266 2876.99 797.516 2879.74 796.016C2882.49 794.516 2884.52 792.453 2885.83 789.828C2887.18 787.203 2887.85 784.187 2887.85 780.781C2887.85 777.375 2887.18 774.375 2885.83 771.781C2884.52 769.187 2882.47 767.172 2879.69 765.734C2876.94 764.266 2873.39 763.531 2869.05 763.531H2853.11V845H2835.72ZM2946.34 846.406C2939.31 846.406 2933.21 844.859 2928.06 841.766C2922.9 838.672 2918.9 834.344 2916.06 828.781C2913.24 823.219 2911.84 816.719 2911.84 809.281C2911.84 801.844 2913.24 795.328 2916.06 789.734C2918.9 784.141 2922.9 779.797 2928.06 776.703C2933.21 773.609 2939.31 772.063 2946.34 772.063C2953.37 772.063 2959.46 773.609 2964.62 776.703C2969.77 779.797 2973.76 784.141 2976.57 789.734C2979.41 795.328 2980.84 801.844 2980.84 809.281C2980.84 816.719 2979.41 823.219 2976.57 828.781C2973.76 834.344 2969.77 838.672 2964.62 841.766C2959.46 844.859 2953.37 846.406 2946.34 846.406ZM2946.43 832.812C2950.24 832.812 2953.43 831.766 2955.99 829.672C2958.56 827.547 2960.46 824.703 2961.71 821.141C2962.99 817.578 2963.63 813.609 2963.63 809.234C2963.63 804.828 2962.99 800.844 2961.71 797.281C2960.46 793.687 2958.56 790.828 2955.99 788.703C2953.43 786.578 2950.24 785.516 2946.43 785.516C2942.52 785.516 2939.27 786.578 2936.68 788.703C2934.12 790.828 2932.2 793.687 2930.91 797.281C2929.66 800.844 2929.04 804.828 2929.04 809.234C2929.04 813.609 2929.66 817.578 2930.91 821.141C2932.2 824.703 2934.12 827.547 2936.68 829.672C2939.27 831.766 2942.52 832.812 2946.43 832.812ZM3004.08 845L2983.73 773H3001.03L3013.69 823.625H3014.34L3027.28 773H3044.39L3057.33 823.344H3058.03L3070.5 773H3087.84L3067.45 845H3049.78L3036.28 796.344H3035.29L3021.79 845H3004.08ZM3125.54 846.406C3118.32 846.406 3112.09 844.906 3106.84 841.906C3101.62 838.875 3097.6 834.594 3094.79 829.062C3091.98 823.5 3090.57 816.953 3090.57 809.422C3090.57 802.016 3091.98 795.516 3094.79 789.922C3097.64 784.297 3101.6 779.922 3106.7 776.797C3111.79 773.641 3117.78 772.063 3124.65 772.063C3129.09 772.063 3133.28 772.781 3137.21 774.219C3141.18 775.625 3144.68 777.812 3147.71 780.781C3150.78 783.75 3153.18 787.531 3154.93 792.125C3156.68 796.687 3157.56 802.125 3157.56 808.437V813.641H3098.54V802.203H3141.29C3141.26 798.953 3140.56 796.062 3139.18 793.531C3137.81 790.969 3135.89 788.953 3133.42 787.484C3130.98 786.016 3128.14 785.281 3124.89 785.281C3121.42 785.281 3118.37 786.125 3115.74 787.812C3113.12 789.469 3111.07 791.656 3109.6 794.375C3108.17 797.062 3107.43 800.016 3107.4 803.234V813.219C3107.4 817.406 3108.17 821 3109.7 824C3111.23 826.969 3113.37 829.25 3116.12 830.844C3118.87 832.406 3122.09 833.187 3125.78 833.187C3128.24 833.187 3130.48 832.844 3132.48 832.156C3134.48 831.437 3136.21 830.391 3137.68 829.016C3139.15 827.641 3140.26 825.937 3141.01 823.906L3156.85 825.687C3155.85 829.875 3153.95 833.531 3151.14 836.656C3148.35 839.75 3144.79 842.156 3140.45 843.875C3136.1 845.562 3131.14 846.406 3125.54 846.406ZM3167.95 845V773H3184.41V785H3185.16C3186.47 780.844 3188.72 777.641 3191.91 775.391C3195.12 773.109 3198.8 771.969 3202.92 771.969C3203.86 771.969 3204.91 772.016 3206.06 772.109C3207.25 772.172 3208.23 772.281 3209.02 772.437V788.047C3208.3 787.797 3207.16 787.578 3205.59 787.391C3204.06 787.172 3202.58 787.062 3201.14 787.062C3198.05 787.062 3195.27 787.734 3192.8 789.078C3190.36 790.391 3188.44 792.219 3187.03 794.562C3185.62 796.906 3184.92 799.609 3184.92 802.672V845H3167.95ZM3245.24 846.406C3238.02 846.406 3231.79 844.906 3226.54 841.906C3221.32 838.875 3217.3 834.594 3214.49 829.062C3211.68 823.5 3210.27 816.953 3210.27 809.422C3210.27 802.016 3211.68 795.516 3214.49 789.922C3217.33 784.297 3221.3 779.922 3226.4 776.797C3231.49 773.641 3237.47 772.063 3244.35 772.063C3248.79 772.063 3252.97 772.781 3256.91 774.219C3260.88 775.625 3264.38 777.812 3267.41 780.781C3270.47 783.75 3272.88 787.531 3274.63 792.125C3276.38 796.687 3277.25 802.125 3277.25 808.437V813.641H3218.24V802.203H3260.99C3260.96 798.953 3260.25 796.062 3258.88 793.531C3257.5 790.969 3255.58 788.953 3253.11 787.484C3250.68 786.016 3247.83 785.281 3244.58 785.281C3241.11 785.281 3238.07 786.125 3235.44 787.812C3232.82 789.469 3230.77 791.656 3229.3 794.375C3227.86 797.062 3227.13 800.016 3227.1 803.234V813.219C3227.1 817.406 3227.86 821 3229.4 824C3230.93 826.969 3233.07 829.25 3235.82 830.844C3238.57 832.406 3241.79 833.187 3245.47 833.187C3247.94 833.187 3250.18 832.844 3252.18 832.156C3254.18 831.437 3255.91 830.391 3257.38 829.016C3258.85 827.641 3259.96 825.937 3260.71 823.906L3276.55 825.687C3275.55 829.875 3273.65 833.531 3270.83 836.656C3268.05 839.75 3264.49 842.156 3260.15 843.875C3255.8 845.562 3250.83 846.406 3245.24 846.406ZM3314.37 846.266C3308.71 846.266 3303.65 844.813 3299.18 841.906C3294.71 839 3291.18 834.781 3288.59 829.25C3285.99 823.719 3284.7 817 3284.7 809.094C3284.7 801.094 3286.01 794.344 3288.63 788.844C3291.29 783.312 3294.87 779.141 3299.37 776.328C3303.87 773.484 3308.88 772.063 3314.42 772.063C3318.63 772.063 3322.1 772.781 3324.82 774.219C3327.54 775.625 3329.7 777.328 3331.29 779.328C3332.88 781.297 3334.12 783.156 3334.99 784.906H3335.7V749H3352.71V845H3336.02V833.656H3334.99C3334.12 835.406 3332.85 837.266 3331.2 839.234C3329.54 841.172 3327.35 842.828 3324.63 844.203C3321.92 845.578 3318.49 846.266 3314.37 846.266ZM3319.1 832.344C3322.7 832.344 3325.76 831.375 3328.29 829.437C3330.82 827.469 3332.74 824.734 3334.06 821.234C3335.37 817.734 3336.02 813.656 3336.02 809C3336.02 804.344 3335.37 800.297 3334.06 796.859C3332.77 793.422 3330.87 790.75 3328.34 788.844C3325.84 786.937 3322.76 785.984 3319.1 785.984C3315.32 785.984 3312.17 786.969 3309.63 788.937C3307.1 790.906 3305.2 793.625 3303.92 797.094C3302.63 800.562 3301.99 804.531 3301.99 809C3301.99 813.5 3302.63 817.516 3303.92 821.047C3305.23 824.547 3307.15 827.312 3309.68 829.344C3312.24 831.344 3315.38 832.344 3319.1 832.344ZM3396.37 845V749H3433.12C3440.05 749 3445.82 750.094 3450.41 752.281C3455.04 754.437 3458.49 757.391 3460.77 761.141C3463.09 764.891 3464.24 769.141 3464.24 773.891C3464.24 777.797 3463.49 781.141 3461.99 783.922C3460.49 786.672 3458.48 788.906 3455.94 790.625C3453.41 792.344 3450.59 793.578 3447.46 794.328V795.266C3450.87 795.453 3454.13 796.5 3457.26 798.406C3460.41 800.281 3462.99 802.937 3464.99 806.375C3466.99 809.812 3467.99 813.969 3467.99 818.844C3467.99 823.812 3466.79 828.281 3464.38 832.25C3461.98 836.187 3458.35 839.297 3453.51 841.578C3448.66 843.859 3442.57 845 3435.23 845H3396.37ZM3413.76 830.469H3432.46C3438.77 830.469 3443.32 829.266 3446.1 826.859C3448.91 824.422 3450.32 821.297 3450.32 817.484C3450.32 814.641 3449.62 812.078 3448.21 809.797C3446.8 807.484 3444.8 805.672 3442.21 804.359C3439.62 803.016 3436.52 802.344 3432.93 802.344H3413.76V830.469ZM3413.76 789.828H3430.96C3433.96 789.828 3436.66 789.281 3439.07 788.187C3441.48 787.062 3443.37 785.484 3444.74 783.453C3446.15 781.391 3446.85 778.953 3446.85 776.141C3446.85 772.422 3445.54 769.359 3442.91 766.953C3440.32 764.547 3436.46 763.344 3431.34 763.344H3413.76V789.828ZM3488.96 872C3486.64 872 3484.5 871.813 3482.54 871.438C3480.6 871.094 3479.05 870.688 3477.89 870.219L3481.83 857C3484.3 857.719 3486.5 858.063 3488.44 858.031C3490.38 858 3492.08 857.391 3493.55 856.203C3495.05 855.047 3496.32 853.109 3497.35 850.391L3498.8 846.5L3472.69 773H3490.69L3507.29 827.375H3508.04L3524.68 773H3542.72L3513.89 853.719C3512.55 857.531 3510.77 860.797 3508.55 863.516C3506.33 866.266 3503.61 868.359 3500.39 869.797C3497.21 871.266 3493.39 872 3488.96 872Z"
            fill="url(#paint1_linear_601_9)"
          />
          <rect
            x="2648"
            y="1008"
            width="39"
            height="57"
            rx="6"
            fill="#A8A8A8"
          />
          <rect
            x="2823"
            y="1008"
            width="39"
            height="57"
            rx="6"
            fill="#B1B1B1"
          />
          <rect
            x="2998"
            y="1008"
            width="39"
            height="57"
            rx="6"
            fill="#B1B1B1"
          />
          <rect
            x="3166"
            y="1008"
            width="39"
            height="57"
            rx="6"
            fill="#B1B1B1"
          />
          <g filter="url(#filter1_i_601_9)">
            <rect
              x="3309"
              y="1008"
              width="39"
              height="57"
              rx="6"
              fill="#B1B1B1"
            />
          </g>
          <rect
            x="3495"
            y="1009"
            width="39"
            height="57"
            rx="6"
            fill="#B1B1B1"
          />
          <rect x="2998" y="528" width="39" height="57" rx="6" fill="#B1B1B1" />
          <rect x="3309" y="528" width="39" height="57" rx="6" fill="#B1B1B1" />
          <rect x="3166" y="528" width="39" height="57" rx="6" fill="#B1B1B1" />
          <rect x="2393" y="729" width="57" height="39" rx="6" fill="#B1B1B1" />
          <rect x="2393" y="851" width="57" height="39" rx="6" fill="#B1B1B1" />
          <rect x="3495" y="528" width="39" height="57" rx="6" fill="#B1B1B1" />
          <rect x="3681" y="528" width="39" height="57" rx="6" fill="#B1B1B1" />
          <rect x="3922" y="729" width="57" height="39" rx="6" fill="#B1B1B1" />
          <rect x="3922" y="851" width="57" height="39" rx="6" fill="#B1B1B1" />
          <rect x="2823" y="528" width="39" height="57" rx="6" fill="#B1B1B1" />
          <rect
            x="3681"
            y="1008"
            width="39"
            height="57"
            rx="6"
            fill="#B1B1B1"
          />
          <rect x="2648" y="528" width="39" height="57" rx="6" fill="#B1B1B1" />
          <path
            id="path2"
            d="M2392 750C481.241 750 436.604 750 382.998 750C379.684 750 377 752.686 377 756V2198"
            stroke="url(#paint2_linear_601_9)"
            stroke-width="2"
            stroke-linejoin="round"
            strokeOpacity="0.2"
            strokeDasharray="1px 1px"
            strokeDashoffset="0px"
            pathLength="1"
          />
          <path
            id="path3"
            d="M3979 872C5889.76 872 5934.4 872 5988 872C5991.32 872 5994 874.686 5994 878V2284"
            stroke="url(#paint3_linear_601_9)"
            stroke-width="2"
            stroke-linejoin="round"
            strokeOpacity="0.2"
            strokeDasharray="1px 1px"
            strokeDashoffset="0px"
            pathLength="1"
          />
          <path
            id="path4"
            d="M2668 1065V1514.74C2668 1518.05 2665.31 1520.74 2662 1520.74H1234C1230.69 1520.74 1228 1523.42 1228 1526.74V2005"
            stroke="url(#paint4_linear_601_9)"
            stroke-width="2"
            stroke-linejoin="round"
            strokeOpacity="0.2"
            strokeDasharray="1px 1px"
            strokeDashoffset="0px"
            pathLength="1"
          />
          <path
            id="path5"
            d="M2393 872H921C917.686 872 915 874.686 915 878V1065"
            stroke="url(#paint5_linear_601_9)"
            stroke-width="2"
            stroke-linejoin="round"
            strokeOpacity="0.2"
            strokeDasharray="1px 1px"
            strokeDashoffset="0px"
            pathLength="1"
          />
          <g style={{ mixBlendMode: "plus-darker" as any }}>
            <circle cx="915" cy="1056" r="18.5" fill="black" />
            <circle cx="915" cy="1056" r="18.5" stroke="black" />
          </g>
          <g style={{ mixBlendMode: "plus-darker" as any }}>
            <circle cx="3018" cy="1430" r="18.5" fill="black" />
            <circle cx="3018" cy="1430" r="18.5" stroke="black" />
          </g>
          <g style={{ mixBlendMode: "plus-darker" as any }}>
            <circle cx="4705" cy="1224" r="18.5" fill="black" />
            <circle cx="4705" cy="1224" r="18.5" stroke="black" />
          </g>
          <g style={{ mixBlendMode: "plus-darker" as any }}>
            <circle cx="5289" cy="749" r="18.5" fill="black" />
            <circle cx="5289" cy="749" r="18.5" stroke="black" />
          </g>
          <g style={{ mixBlendMode: "plus-darker" as any }}>
            <circle cx="4240" cy="288" r="18.5" fill="black" />
            <circle cx="4240" cy="288" r="18.5" stroke="black" />
          </g>
          <g style={{ mixBlendMode: "plus-darker" as any }}>
            <circle cx="3515" cy="214" r="18.5" fill="black" />
            <circle cx="3515" cy="214" r="18.5" stroke="black" />
          </g>
          <g style={{ mixBlendMode: "plus-darker" as any }}>
            <circle cx="3018" cy="39" r="18.5" fill="black" />
            <circle cx="3018" cy="39" r="18.5" stroke="black" />
          </g>
          <g style={{ mixBlendMode: "plus-darker" as any }}>
            <circle cx="2140" cy="389" r="18.5" fill="black" />
            <circle cx="2140" cy="389" r="18.5" stroke="black" />
          </g>
          <path
            id="path6"
            d="M3979 749H5269.5"
            stroke="url(#paint6_linear_601_9)"
            stroke-width="2"
            stroke-linejoin="round"
            strokeOpacity="0.2"
            strokeDasharray="1px 1px"
            strokeDashoffset="0px"
            pathLength="1"
          />
          <path
            id="path7"
            d="M2844 1065.5L2842.81 2106"
            stroke="url(#paint7_linear_601_9)"
            stroke-width="2"
            stroke-linejoin="round"
            strokeOpacity="0.2"
            strokeDasharray="1px 1px"
            strokeDashoffset="0px"
            pathLength="1"
          />
          <path
            id="path8"
            d="M3018 1065V1410.5"
            stroke="url(#paint8_linear_601_9)"
            stroke-width="2"
            stroke-linejoin="round"
            strokeOpacity="0.2"
            strokeDasharray="1px 1px"
            strokeDashoffset="0px"
            pathLength="1"
          />
          <path
            id="path9"
            d="M3702.5 1065.5V1217.5C3702.5 1220.81 3705.19 1223.5 3708.5 1223.5H4686"
            stroke="url(#paint9_linear_601_9)"
            stroke-width="2"
            stroke-linejoin="round"
            strokeOpacity="0.2"
            strokeDasharray="1px 1px"
            strokeDashoffset="0px"
            pathLength="1"
          />
          <path
            id="path10"
            d="M3515 1065V1467.73C3515 1471.05 3517.69 1473.73 3521 1473.73H5011C5014.31 1473.73 5017 1476.42 5017 1479.73V1809"
            stroke="url(#paint10_linear_601_9)"
            stroke-width="2"
            stroke-linejoin="round"
            strokeOpacity="0.2"
            strokeDasharray="1px 1px"
            strokeDashoffset="0px"
            pathLength="1"
          />
          <path
            id="path11"
            d="M3329 1065V1914.21"
            stroke="url(#paint11_linear_601_9)"
            stroke-width="2"
            stroke-linejoin="round"
            strokeOpacity="0.2"
            strokeDasharray="1px 1px"
            strokeDashoffset="0px"
            pathLength="1"
          />
          <path
            id="path12"
            d="M3702.5 528V294C3702.5 290.686 3705.19 288 3708.5 288H4220.5"
            stroke="url(#paint12_linear_601_9)"
            stroke-width="2"
            stroke-linejoin="round"
            strokeOpacity="0.2"
            strokeDasharray="1px 1px"
            strokeDashoffset="0px"
            pathLength="1"
          />
          <path
            id="path13"
            d="M3515 526.5V234"
            stroke="url(#paint13_linear_601_9)"
            stroke-width="2"
            stroke-linejoin="round"
            strokeOpacity="0.2"
            strokeDasharray="1px 1px"
            strokeDashoffset="0px"
            pathLength="1"
          />
          <path
            id="path14"
            d="M2667.5 528V395C2667.5 391.686 2664.81 389 2661.5 389H2159"
            stroke="url(#paint14_linear_601_9)"
            stroke-width="2"
            stroke-linejoin="round"
            strokeOpacity="0.2"
            strokeDasharray="1px 1px"
            strokeDashoffset="0px"
            pathLength="1"
          />
          <path
            id="path15"
            d="M3018 527V58"
            stroke="url(#paint15_linear_601_9)"
            stroke-width="2"
            stroke-linejoin="round"
            strokeOpacity="0.2"
            strokeDasharray="1px 1px"
            strokeDashoffset="0px"
            pathLength="1"
          />
          <path
            id="path16"
            d="M3186 1066V1872"
            stroke="url(#paint16_linear_601_9)"
            stroke-width="2"
            strokeOpacity="0.2"
            strokeDasharray="1px 1px"
            strokeDashoffset="0px"
            pathLength="1"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_601_9"
            x="2445"
            y="585"
            width="1481"
            height="431"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_601_9"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_601_9"
              result="shape"
            />
          </filter>
          <filter
            id="filter1_i_601_9"
            x="3309"
            y="1008"
            width="39"
            height="61"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect1_innerShadow_601_9"
            />
          </filter>
          <linearGradient
            id="paint0_linear_601_9"
            x1="3185.5"
            y1="585"
            x2="3185.5"
            y2="1008"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#474747" />
            <stop offset="1" stop-color="#474747" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_601_9"
            x1="3186"
            y1="749"
            x2="3186"
            y2="845"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="#A6A5A5" stop-opacity="0.93" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_601_9"
            x1="1384.5"
            y1="750"
            x2="1384.5"
            y2="2198"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#C0C0C0" />
            <stop offset="1" stop-color="#141414" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_601_9"
            x1="4986.5"
            y1="872"
            x2="4986.5"
            y2="2284"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#C0C0C0" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_601_9"
            x1="1948"
            y1="1065"
            x2="1948"
            y2="2005"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#C0C0C0" />
            <stop offset="1" stop-color="#141414" />
          </linearGradient>
          <linearGradient
            id="paint5_linear_601_9"
            x1="1654"
            y1="872"
            x2="1654"
            y2="1065"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#C0C0C0" />
            <stop offset="1" stop-color="#141414" />
          </linearGradient>
          <linearGradient
            id="paint6_linear_601_9"
            x1="4624.25"
            y1="749"
            x2="4624.25"
            y2="750"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#C0C0C0" />
            <stop offset="1" stop-color="#141414" />
          </linearGradient>
          <linearGradient
            id="paint7_linear_601_9"
            x1="2844.5"
            y1="1065.5"
            x2="2843.31"
            y2="2106"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#C0C0C0" />
            <stop offset="1" stop-color="#141414" />
          </linearGradient>
          <linearGradient
            id="paint8_linear_601_9"
            x1="3018.5"
            y1="1065"
            x2="3018.5"
            y2="1410.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#C0C0C0" />
            <stop offset="1" stop-color="#141414" />
          </linearGradient>
          <linearGradient
            id="paint9_linear_601_9"
            x1="4194.25"
            y1="1065.5"
            x2="4194.25"
            y2="1223.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#C0C0C0" />
            <stop offset="1" stop-color="#141414" />
          </linearGradient>
          <linearGradient
            id="paint10_linear_601_9"
            x1="4266"
            y1="1065"
            x2="4266"
            y2="1809"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#C0C0C0" />
            <stop offset="1" stop-color="#141414" />
          </linearGradient>
          <linearGradient
            id="paint11_linear_601_9"
            x1="3329.5"
            y1="1065"
            x2="3329.5"
            y2="1914.21"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#C0C0C0" />
            <stop offset="1" stop-color="#141414" />
          </linearGradient>
          <linearGradient
            id="paint12_linear_601_9"
            x1="3961.5"
            y1="288"
            x2="3961.5"
            y2="528"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#C0C0C0" />
            <stop offset="1" stop-color="#141414" />
          </linearGradient>
          <linearGradient
            id="paint13_linear_601_9"
            x1="3515.5"
            y1="234"
            x2="3515.5"
            y2="526.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#C0C0C0" />
            <stop offset="1" stop-color="#141414" />
          </linearGradient>
          <linearGradient
            id="paint14_linear_601_9"
            x1="2413.25"
            y1="389"
            x2="2413.25"
            y2="528"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#C0C0C0" />
            <stop offset="1" stop-color="#141414" />
          </linearGradient>
          <linearGradient
            id="paint15_linear_601_9"
            x1="3018.5"
            y1="58"
            x2="3018.5"
            y2="527"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#C0C0C0" />
            <stop offset="1" stop-color="#141414" />
          </linearGradient>
          <linearGradient
            id="paint16_linear_601_9"
            x1="3186.5"
            y1="1066"
            x2="3186.5"
            y2="1872"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#C0C0C0" />
            <stop offset="1" stop-opacity="0" />
          </linearGradient>
          <clipPath id="clip0_601_9">
            <rect width="6371" height="1712" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
