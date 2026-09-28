export type HeroSceneName = 'about' | 'services' | 'work' | 'learn' | 'insights' | 'seo' | 'visual-strategy' | 'web-services' | 'social-media-management';

// The supplied artwork stays on its original 1672 × 941 artboard.
// These masks isolate the physical surface, surrounding atmosphere and blue light.
export const heroScenes: Record<HeroSceneName, {
  asset: string; face: string; beam: string; sweep: string; beamWidth: number;
}> = {
  seo: {
    asset:'service-seo.webp',
    face:'M 621 311 C 633 156 845 155 939 313 C 995 389 994 452 948 500 L 1077 651 Q 1097 684 1069 705 Q 1039 724 1019 694 L 894 552 C 735 592 601 459 621 311 Z',
    beam:'M 491 575 C 428 520 679 382 884 343 S 1237 329 1194 387 S 951 541 742 595 S 520 621 491 575 Z',
    sweep:'M -460 -280 L 2140 1250',
    beamWidth:160,
  },
  'visual-strategy': {
    asset:'service-visual-strategy.webp',
    face:'M 564 262 L 665 300 L 665 180 L 961 310 L 966 433 L 1094 493 L 1094 703 L 880 609 L 880 634 L 760 575 L 760 655 L 612 562 L 612 470 L 564 449 Z',
    beam:'M 467 378 C 505 269 906 334 1121 411 S 1289 564 1158 589 S 785 577 615 510 S 442 426 467 378 Z',
    sweep:'M -420 -380 L 1880 1310',
    beamWidth:135,
  },
  'web-services': {
    asset:'service-web.webp',
    face:'M 593 286 L 710 331 L 710 210 L 1044 306 L 1044 531 L 1137 491 L 1137 622 L 1004 701 L 900 675 L 656 602 L 656 556 L 767 507 L 593 465 Z',
    beam:'M 401 407 C 416 306 883 322 1180 413 S 1326 618 1034 638 S 397 501 401 407 Z',
    sweep:'M -460 -330 L 1950 1280',
    beamWidth:140,
  },
  'social-media-management': {
    asset:'service-social.webp',
    face:'M 734 343 A 101 101 0 1 1 936 343 A 101 101 0 1 1 734 343 Z M 601 411 A 54 54 0 1 1 709 411 A 54 54 0 1 1 601 411 Z M 963 411 A 54 54 0 1 1 1071 411 A 54 54 0 1 1 963 411 Z M 550 685 V 565 Q 550 464 668 466 Q 696 435 836 439 Q 940 439 983 475 Q 1124 457 1124 565 V 685 Z',
    beam:'M 446 374 C 495 235 1101 274 1233 381 S 984 678 644 615 S 357 441 446 374 Z M 418 556 C 355 432 826 371 1102 483 S 1327 647 1206 674',
    sweep:'M 1730 -410 L 0 1330',
    beamWidth:135,
  },
  about: {
    asset:'about-handshake.webp',
    face:'M 339 341 L 1063 61 L 731 817 Z',
    beam:'M 1080 45 L 832 524 L 463 870',
    sweep:'M 1470 -360 L 1063 61 L 730 560 L 60 1460',
    beamWidth:400,
  },
  services: {
    asset:'services-panels.webp',
    face:'M 562 422 L 598 440 L 598 199 Q 598 185 612 192 L 712 239 L 712 132 Q 712 116 728 125 L 1018 254 L 1018 324 L 1138 378 L 1138 605 Q 1138 620 1122 613 L 1018 565 L 1018 735 Q 1018 753 1002 744 L 807 651 L 807 758 Q 807 772 790 765 L 562 651 Z',
    beam:'M 712 132 L 1018 254 L 1018 735 L 712 590 M 562 422 L 807 534 L 807 758',
    sweep:'M 350 -440 L 760 210 L 1140 940 L 1390 1410',
    beamWidth:240,
  },
  work: {
    asset:'work-mountain.webp',
    face:'M 590 122 Q 586 118 591 153 L 651 557 L 999 679 L 967 268 Z',
    beam:'M 675 -18 C 779 208 922 558 1135 928',
    sweep:'M 442 -530 C 705 48 779 208 865 421 S 1135 928 1410 1420',
    beamWidth:245,
  },
  learn: {
    asset:'learn-pages.webp',
    face:'M 560 263 Q 560 251 574 258 L 627 282 L 627 195 Q 627 182 641 189 L 706 219 L 706 135 Q 706 117 722 126 L 1081 273 Q 1098 280 1098 297 L 1098 818 L 718 655 L 718 766 L 634 728 L 634 701 L 567 673 Q 560 670 560 657 Z',
    beam:'M 707 138 L 1093 288 L 1098 817 M 627 195 L 627 699 L 706 735',
    sweep:'M 342 -450 L 750 175 L 1150 965 L 1400 1420',
    beamWidth:260,
  },
  insights: {
    asset:'insights-wave.webp',
    face:'M 482 167 L 654 126 L 1113 815 L 939 863 Z',
    beam:'M 209 346 C 467 251 483 454 736 485 S 843 362 1000 435 S 1210 642 1454 628',
    sweep:'M -200 470 L 1820 470',
    beamWidth:330,
  },
};
